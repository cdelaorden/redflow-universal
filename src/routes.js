'use strict';
import { CONTACTS_LOAD_ALL, CONTACTS_LOAD_ONE, ROUTE_SET } from './action_types';

const RouteFactory = function(dispatcher){
  function loadContacts(){
    dispatcher.emit(CONTACTS_LOAD_ALL, {});
  }

  function loadContactById(contactId){
    dispatcher.emit(CONTACTS_LOAD_ONE, { contactId });
  }

  function setPage(page){
    return () => dispatcher.emit(ROUTE_SET, { page });
  }

  return {
    '/contacts': [loadContacts, setPage('contact_list')],
    '/contacts/create': [setPage('contact_create')],
    '/contacts/:id': [loadContactById, setPage('contact_view')],
    '/contacts/:id/edit': [loadContactById, setPage('contact_edit')],
    '/contacts/:id/delete': [loadContactById, setPage('contact_delete')]
  };
}

export default RouteFactory;
