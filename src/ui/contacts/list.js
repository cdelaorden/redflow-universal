import React, { Component } from 'react';
import ListItem from './list_item';
import { ContactStore } from '../../stores';
import m from 'mori';
import { navigate } from '../../actions';

export default class ContactList extends Component {
  _renderContactItems(){
    const contacts = ContactStore.getContactList(this.props.state);
    return m.intoArray(m.map(c => {
      return <ListItem key={m.get(c, 'id')} contact={ c } />;
    }, contacts));
  }

  render(){
    return (
      <div>
        <ul>
        { this._renderContactItems() }
        </ul>
      </div>
    )
  }
}

