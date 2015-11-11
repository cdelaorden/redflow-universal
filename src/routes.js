'use strict';
import { CONTACTS_LOAD_ALL, CONTACTS_LOAD_ONE, ROUTE_SET } from './action_types';
import { IS_SERVER } from './lib/is_server';
const noop = function(){};

const RouteFactory = function(dispatcher){
  function loadContacts(next = noop){
    dispatcher.emit(CONTACTS_LOAD_ALL, { next });
  }

  function loadContactById(contactId, next = noop){
    dispatcher.emit(CONTACTS_LOAD_ONE, { contactId, next });
  }

  function setPage(page){
    //we use rest params because this setPage could be passed route parameters
    //like contactId BEFORE the next callback needed for server rendering
    return function(...rest){
      console.log('SetPage', page, rest);
      const next = Array.isArray(rest) ? rest[rest.length-1] : noop;
      dispatcher.emit(ROUTE_SET, { page, next });
      //if(IS_SERVER) next();
    }
  }

  return {
    '/contacts/create': [setPage('contact_create')],
    '/contacts/:id': [loadContactById, setPage('contact_view')],
    '/contacts/:id/edit': [loadContactById, setPage('contact_edit')],
    '/contacts/:id/delete': [loadContactById, setPage('contact_delete')],
    '/contacts': [loadContacts, setPage('contact_list')],
    '/': [loadContacts, setPage('contact_list')]
  };
}

export default RouteFactory;
