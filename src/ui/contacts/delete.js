import React, { Component, PropTypes } from 'react';
import m from 'mori';
import Link from '../common/link';
import { ContactStore } from '../../stores';
import Dispatcher from '../../lib/dispatcher';
import { CONTACTS_DELETE } from '../../action_types';


export default class ContactDelete extends Component {
  handleDeleteClick(e, id){
    e.preventDefault();
    Dispatcher.emit(CONTACTS_DELETE, { id: id });
  }

  render(){
    const contact = ContactStore.getDetailContact(this.props.state),
          id = m.get(contact, 'id'),
          firstName = m.get(contact, 'first'),
          lastName = m.get(contact, 'last');

    return (
      <div>
        <h1>Delete Contact</h1>
        <p>Are you sure you want to delete contact <strong>{firstName + ' ' + lastName}</strong>?</p>
        <p>
          <Link url={ '/contacts/' + id }>No, cancel</Link> |
          <a href='#' onClick={ (e) => this.handleDeleteClick(e, id) }>Yes, delete it!</a>
        </p>
      </div>
    )
  }

}
