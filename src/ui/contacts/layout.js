import React from 'react';
import { RouteStore } from '../../stores';
import List from './list';
import View from './view';
import Edit from './edit';
import Delete from './delete';
import NotFound from '../common/notfound';

export default class Layout extends React.Component {
  constructor({ atom }){
    super();
  }
  componentDidMount(){
    this.props.atom.addChangeListener(this._onChange.bind(this));
  }

  _onChange(newState){
    this.forceUpdate();
  }

  componentWillUnmount() {
    this.props.atom.removeChangeListener(this._onChange);
  }

  getComponentForRoute(route){
    switch(route){
    case 'contact_list':
      return List;
      break;
    case 'contact_view':
      return View;
      break;
    case 'contact_edit':
      return Edit;
      break;
    case 'contact_create':
      return Edit;
      break;
    case 'contact_delete':
      return Delete;
      break;
    default:
      return NotFound;
    }
  }

  render(){
    var state = this.props.atom.get();
    var route = RouteStore.getRoute(state);
    var Component = this.getComponentForRoute(route);
    return (
      <div>
        <h1>Contacts</h1>
        <Component state={ state } />
      </div>
    );
  }
}