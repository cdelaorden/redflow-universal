import Contacts from './contacts';
import Users from './users';
import bodyParser from 'body-parser';

const apiRoutes = function(router){

  router.use(bodyParser.json());

  router.all('*', (req,res,next) => {
    console.log('API -> ', req.method, req.path);
    next();
  });

  Contacts.attachRoutes(router);
  Users.attachRoutes(router);
  //rest of API modules...

  return router;

};

export default apiRoutes;