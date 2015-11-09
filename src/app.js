'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './ui/contacts/layout';
import Dispatcher from './lib/dispatcher';
import atom from './lib/atom';
import routeFactory from './routes';
import { NAVIGATE } from './action_types';
import { Router } from 'director';

window.onload = () => {
  const router = Router(routeFactory(Dispatcher));
  Dispatcher.listen(NAVIGATE, ({url}) => {
    router.setRoute(url);
  })
  router.configure({
    html5history: true
  });

  ReactDOM.render(<Layout atom={atom} />, document.getElementById('app'));
  router.init('/contacts');
}

