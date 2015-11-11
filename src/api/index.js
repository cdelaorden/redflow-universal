import Contacts from './contacts';
import bodyParser from 'body-parser';

const apiRoutes = function(router){

  router.use(bodyParser.json());

  Contacts.attachRoutes(router);
  //rest of API modules...

  return router;

};

export default apiRoutes;