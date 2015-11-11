import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import atom from '../lib/atom';
import TodoList from './todolist';
import Contacts from './contacts';

if(process.env.NODE_ENV === 'development'){
  window.atom = atom;
}

export default class TodoApp extends Component {
  componentDidMount(){
    atom.addChangeListener((atomState) => {
      console.log('Atom changed', atom.toJs());
      this.forceUpdate();
    })
  }

  getComponentForRoute(route){
    switch(route){
    case 'contact_list':
      return Contacts.List;
      break;
    case 'contact_view':
      return Contacts.View;
      break;
    case 'contact_edit':
      return Contacts.Edit;
      break;
    case 'contact_delete':
      return Contacts.Delete;
      break;
    default:
      return Contacts.List;
    }
  }

  render(){
    var state = atom.get();
    console.log('App render', atom.toString());
    var Component = this.getComponentForRoute()
    return (
      <div>
        <h1>Todos</h1>
        <TodoList state={ state } />
      </div>
    );
  }
}