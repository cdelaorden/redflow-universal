import m from 'mori';
import * as ActionTypes from '../action_types';
import { navigate } from '../actions';
import httpApi from '../lib/httpApi';

export default function ContactStoreFactory(atom, dispatcher){
  const p = {
    contacts: ['data', 'contacts'],
    detailContact: ['data', 'detailContact'],
    isEditing: ['ui', 'contacts', 'isEditing'],
    editErrors: ['ui', 'contacts', 'editErrors'],
    lastListFetch: ['ui','contacts', 'lastListFetch'],
    lastDetailFetch: ['ui', 'contacts', 'lastDetailFetch']
  };

  const CACHE_TIME = 5000;

  function shouldFetchAgain(ts){
    return Date.now() - ts > CACHE_TIME;
  }

  function _getIn(path, state){
    return m.getIn(state, path)
  }

  const getContactList = m.partial(_getIn, p.contacts);
  const getDetailContact = m.partial(_getIn, p.detailContact);
  const getEditErrors = m.partial(_getIn, p.editErrors);
  const isEditingDetails = m.partial(_getIn, p.isEditing);

  function loadContacts({ next }){
    if(!shouldFetchAgain(atom.getIn(p.lastListFetch)))
      return next();

    httpApi.getClj('/contacts')
      .then(contacts => {
        atom.set(p.lastListFetch, Date.now(), { silent: true });
        atom.set(p.contacts, contacts);
        next();
      });
  }

  function loadContactById({ contactId, next }){
    const id = parseInt(contactId);
    //if we already have it cached, don't refetch
    if(atom.getIn(p.detailContact.concat('id')) === id) return next();
    if(!shouldFetchAgain(atom.getIn(p.lastDetailFetch)))
      return next();

    httpApi.getClj('/contacts/' + id)
      .then(contact => {
        console.log('Load contact by id', contact.toString());
        atom.set(p.lastDetailFetch, Date.now(), { silent: true });
        atom.set(p.detailContact, contact);
        next();
      })
      .catch(err => {
        console.log('Error fetching contact by id');
        dispatcher.emit(ActionTypes.ROUTE_SET, { page: 'not_found' });
        //return false to stop the router from trying next route handler
        next(false);
      });
  }

  function createContact({ next }){
    const newContact = m.toClj({
      id: null,
      first: '',
      last: '',
      email: ''
    });
    atom.set(p.detailContact, newContact);
    next();
  }

  function deleteContact({ id }){
    httpApi.del('/contacts/' + id).then(() => {
      atom.set(p.lastListFetch, 0, { silent: true });
      navigate('/contacts');
    });
  }

  function saveContact({ contact }){
    console.log('Save contact', contact);
    let errors = m.hashMap();
    if(contact.first.trim() === ''){
      errors = m.assoc(errors, 'first', 'First name is required');
    }
    if(contact.last.trim() === ''){
      errors = m.assoc(errors, 'last', 'Last name is required');
    }
    if(contact.email.trim() === ''){
      errors = m.assoc(errors, 'email', 'Email required');
    }

    if(m.count(errors)){
      //form is invalid
      console.log('Form invalid', errors.toString());
      atom.set(p.editErrors, errors);
    }
    else {
      atom.set(p.editErrors, { silent: true });
      if(contact.id){
        //update contact
        httpApi.putClj('/contacts/' + contact.id, contact).then(c => {
          console.log('Contacted updated', c.toString());
          atom.set(p.detailContact, c);
          navigate('/contacts/' + m.get(c, 'id'));
        })
        .catch(err => {
          console.log('Error updating contact', err);
        })
      }
      else {
        //new contact
        httpApi.postClj('/contacts', contact).then(c => {
          atom.set(p.lastListFetch, 0, {silent: true});
          atom.set(p.detailContact, c);
          navigate('/contacts/' + m.get(c, 'id'));
        })
        .catch(err => {
          console.log('Error saving contact', err);
        })
      }
    }
  }

  //Dispatcher handlers
  dispatcher.listen(ActionTypes.CONTACTS_LOAD_ALL, loadContacts);
  dispatcher.listen(ActionTypes.CONTACTS_LOAD_ONE, loadContactById);
  dispatcher.listen(ActionTypes.CONTACTS_CREATE, createContact);
  dispatcher.listen(ActionTypes.CONTACTS_SAVE, saveContact);
  dispatcher.listen(ActionTypes.CONTACTS_DELETE, deleteContact);

  return {
    selectors: p,
    getContactList,
    getDetailContact,
    getEditErrors,
    isEditingDetails
  }
}