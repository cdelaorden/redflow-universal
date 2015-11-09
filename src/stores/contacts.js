import m from 'mori';
import * as ActionTypes from '../action_types';

export default function ContactStoreFactory(atom, dispatcher, httpApi){
  const p = {
    contacts: ['data', 'contacts'],
    detailContact: ['data', 'detailContact'],
    isEditing: ['ui', 'contacts', 'isEditing'],
    editErrors: ['ui', 'contacts', 'editErrors']
  };

  let lastListFetch, lastSingleFetch;

  function _getIn(path, state){
    return m.getIn(state, path)
  }

  const getContactList = m.partial(_getIn, p.contacts);
  const getDetailContact = m.partial(_getIn, p.detailContact);
  const isEditingDetails = m.partial(_getIn, p.isEditing);

  function loadContacts(){
    httpApi.getClj('/contacts')
      .then(contacts => {
        lastListFetch = Date.getTime();
        atom.set(p.contacts, contacts);
      })
      .catch(err => {
        console.log('loadContacts failed', err);
      })
  }

  function loadContactById({ contactId }){
    const id = parseInt(contactId);
    //if we already have it cached, don't refetch
    if(atom.getIn(p.detailContact.concat('id')) === id) return;
    lastSingleFetch = Date.getTime();
    httpApi.getClj('/contacts/' + id)
      .then(contact => atom.set(p.detailContact, contact));
  }

  function createContact(){
    const newContact = m.toClj({
      id: null,
      first: '',
      last: '',
      email: ''
    });
    atom.set(p.detailContact, newContact);
  }

  function saveContact({ contact }){
    console.log('Save contact', contact.toString());
  }

  //Dispatcher handlers
  dispatcher.listen(ActionTypes.CONTACTS_LOAD_ALL, loadContacts);
  dispatcher.listen(ActionTypes.CONTACTS_LOAD_ONE, loadContactById);


  return {
    getContactList,
    getDetailContact,
    isEditingDetails
  }
}