import 'babel-core/polyfill';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';

//REST APIs
import api fron './api';

const server = global.server = express();
const port = process.env.PORT || 3000;


server.use(express.static(path.join(__dirname, 'public')));



server.listen(port, () => {
  console.log('Express listening at port', port);
});