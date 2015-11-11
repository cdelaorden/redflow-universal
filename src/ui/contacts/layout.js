import React from 'react';
import m from 'mori';
import { RouteStore, UserStore } from '../../stores';
import List from './list';
import View from './view';
import Edit from './edit';
import Delete from './delete';
import Link from '../common/link';
import NotFound from '../common/notfound';
import Login from '../common/login';

class Layout extends React.Component {
  componentDidMount(){
    this.props.atom.addChangeListener(this._onChange.bind(this));
  }

  _onChange(newState){
    this.forceUpdate();
  }

  componentWillUnmount() {
    this.props.atom.removeChangeListener(this._onChange);
  }

  getComponentForRoute(route, loggedUser){
    switch(route){
    case 'contact_list':
      return List;
      break;
    case 'contact_view':
      return View;
      break;
    case 'contact_edit':
      if(!loggedUser) return Login;
      return Edit;
      break;
    case 'contact_create':
      if(!loggedUser) return Login;
      return Edit;
      break;
    case 'contact_delete':
      if(!loggedUser) return Login;
      return Delete;
      break;
    case 'login':
      return Login;
      break;
    default:
      return NotFound;
    }
  }

  renderLogin(){
    return (<Link url={'/login'}>Sign in</Link>);
  }

  renderLogout(loggedUser){
    return (<Link url={'/logout'}>Logout {m.get(loggedUser, 'username')}</Link>)
  }

  render(){
    const state = this.props.atom.get();
    const route = RouteStore.getRoute(state);
    const loggedUser = UserStore.getLoggedUser(state);
    const Component = this.getComponentForRoute(route, loggedUser);
    return (
      <div>
        <h1>Contacts</h1>
        { loggedUser ? this.renderLogout(loggedUser) : this.renderLogin() }
        <Component state={ state } />
      </div>
    );
  }
}

export default Layout;