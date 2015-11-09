import React, { Component, PropTypes } from 'react';
import m from 'mori';
import Link from '../common/link';
import { ContactStore } from '../stores';


export default class ContactEdit extends Component {
  render(){
    const contact = ContactStore.getDetailContact
    return (
      <h2>Edit contact</h2>
    )
  }
}

ContactEdit.propTypes = {
  state: PropTypes.object.isRequired
}