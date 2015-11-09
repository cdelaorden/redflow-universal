import React from 'react';
import { RouteStore } from '../../stores';
import List from './list';
import View from './view';

export default class Layout extends React.Component {
  constructor({ atom }){
    super();
  }
  componentDidMount(){
    this.props.atom.addChangeListener(this._onChange.bind(this));
  }

  _onChange(newState){
    console.log('Atom changed')
    this.forceUpdate();
  }

  componentWillUnmount() {
    this.props.atom.removeChangeListener(this._onChange);
  }

  getComponentForRoute(state){
    const route = RouteStore.getRoute(state);
    switch(route){
    case 'contact_list':
      return List;
      break;
    case 'contact_view':
      return View;
      break;
    case 'contact_edit':
    case 'contact_delete':
    default:
      return List;
    }
  }

  render(){
    var state = this.props.atom.get();
    var route = RouteStore.getRoute(state);
    var Component = this.getComponentForRoute(state);
    return (
      <div>
        <h1>Contacts</h1>
        <Component state={ state } />
      </div>
    );
  }
}