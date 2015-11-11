'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './ui/contacts/layout';
import Dispatcher from './lib/dispatcher';
import atom from './lib/atom';
import initialState from './config/initial_state';
import routeFactory from './routes';
import { NAVIGATE } from './action_types';
import { Router } from 'director';

window.onload = () => {
  const router = Router(routeFactory(Dispatcher));
  Dispatcher.listen(NAVIGATE, ({url}) => {
    router.setRoute(url);
  })
  router.configure({
    html5history: true,
    async: true
  });
  if(typeof(window.__initialState) !== 'undefined'){
    console.log('Hydrating atom', window.__initialState);
    atom.swap(window.__initialState);
  }
  else {
    atom.swap(initialState);
  }


  ReactDOM.render(<Layout atom={atom} />, document.getElementById('app'));
  router.init();
}

