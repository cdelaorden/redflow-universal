import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { Atom } from './lib/atom';
import { Dispatcher } from './lib/dispatcher';
import Layout from './ui/contacts/layout';
import RouteStore from './stores/route';
import ContactStore from './stores/contact';
import httpApi from './lib/httpApi';
import director from 'director';
import initialState from './config/initial_state';
import universalRoutes from './routes';

//REST APIs
import api from './api';

const server = global.server = express();
const port = process.env.PORT || 3000;


//api
var apiRouter = express.Router();
server.use('/api/', api(apiRouter));

//static
server.use(express.static(path.join(__dirname, 'public')));

//React server-side rendering
server.get('*', function(req,res){
  console.log(req.path);
  //create a request-specific environment
  const atom = new Atom();
  atom.swap(initialState);
  const dispatcher = new Dispatcher();
  //create stores
  req.stores = {
    Route: RouteStore(req.atom, atom),
    Contacts: ContactStore(req.atom, dispatcher, httpApi);
  };
  const routes = universalRoutes(dispatcher);
  const router = director.http.Router(routes);
  //now process the route
  router.dispatch(req, res, function(err){
    if(err){
      console.log('Error processing clientRoute', err);
      return res.status(500).end();
    }

  });

  res.status(404).end();
});

//Not found
server.use(function(req,res){
  res.status(404).end();
});

server.listen(port, () => {
  console.log('Express listening at port', port);
});