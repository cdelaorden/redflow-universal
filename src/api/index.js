import Contacts from './contacts';

const apiRoutes = function(router){

  Contacts.attachRoutes(router);
  //rest of API modules...

  return router;

};

export default apiRoutes;