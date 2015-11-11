import path from 'path';
import express from 'express';
import compression from 'compression';
import session from 'express-session';
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

//enable gzip
server.use(compression());
//static
server.use(express.static(path.join(__dirname, 'public')));
//session middleware
server.use(session({
  name: 'rfsession',
  secret: 'redflowuniversal',
  resave: false,
  saveUninitialized: false
}));


//REST api
var apiRouter = express.Router();
server.use('/api/', api(apiRouter));

//React server-side rendering
const context = createServerContext(initialState, routeConfig);
server.get('*', function(req,res){
  //initialize context from request - for example, for req.session stuff
  context.beginRequest(req);
  //process the route with the iso router (Director)
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
  console.log(`Express listening at port ${port}, let the magic happen!`);
});


