import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { Atom } from './lib/atom';
import { Dispatcher } from './lib/dispatcher';
import Layout from './ui/contacts/layout';
import RouteStore from './stores/route';
import ContactStore from './stores/contacts';
import httpApi from './lib/httpApi';
import director from 'director';
import initialState from './config/initial_state';
import universalRoutes from './routes';

//REST APIs
import api from './api';

const server = global.server = express();
const port = process.env.PORT || 3000;
const address = process.env.ADDRESS || '0.0.0.0';


//api
var apiRouter = express.Router();
server.use('/api/', api(apiRouter));

//static
server.use(express.static(path.join(__dirname, 'public')));

server.set('view engine', 'jade');
server.set('views', __dirname + '/views');

//React server-side rendering
server.get('*', function(req,res){
  //create a request-specific environment
  const atom = new Atom();
  atom.swap(initialState);
  const dispatcher = new Dispatcher();
  //create stores
  req.stores = {
    Route: RouteStore(atom, dispatcher),
    Contacts: ContactStore(atom, dispatcher, httpApi)
  };
  const routes = makeServerRoutes(universalRoutes(dispatcher));
  const router = new director.http.Router(routes);
  router.configure({ async: true, recurse: false });
  //now process the route
  router.dispatch(req, res, function(err){
    console.log('Route handled', atom.toString());
    // console.log('Route handled!');
    const app = ReactDOM.renderToString(<Layout atom={ atom } />);

    console.log('Rendered app', app);
    this.res.render('index', { body: app, initialState: JSON.stringify(atom.toJs())});
  });


});

//Not found
server.use(function(req,res){
  res.status(404).end();
});

server.listen(port, address, () => {
  console.log('Express listening at port', port);
});


function makeServerRoutes(routes){
  //console.log(routes);
  return Object.keys(routes).reduce((acc,k) => {
    acc[k] = {
      get: routes[k]
    };
    return acc;
  }, {});
}