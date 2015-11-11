import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { createServerContext } from './lib/server_context';
import Layout from './ui/contacts/layout';
import initialState from './config/initial_state';
import routeConfig from './routes';

//REST APIs
import api from './api';

const server = global.server = express();
const port = process.env.PORT || 3000;
const address = process.env.ADDRESS || '0.0.0.0';

server.set('view engine', 'jade');
server.set('views', __dirname + '/views');

//static
server.use(express.static(path.join(__dirname, 'public')));

//api
var apiRouter = express.Router();
server.use('/api/', api(apiRouter));

//React server-side rendering
const context = createServerContext(initialState, routeConfig);

server.get('*', function(req,res){
  //now process the route
  context.router.dispatch(req, res, err => {
    if(err){
      console.log('Error handling server-side route', err);
      res.status(404).end();
    }
    else {
      const app = ReactDOM.renderToString(<Layout atom={ context.atom } />);
      res.render('index', {
        body: app,
        initialState: JSON.stringify(context.atom.toJs())
      });
    }
    //restore atom for next request
    context.reset();
  });
});

//Not found
server.use(function(req,res){
  res.status(404).end();
});

server.listen(port, address, () => {
  console.log('Express listening at port', port);
});


