import React, { Component } from 'react';
import Link from '../common/link';
import { ContactStore } from '../../stores';
import m from 'mori';
import { navigate } from '../../actions';

class ContactItem extends Component {
  render(){
    const { state, contact } = this.props;
    return (
      <li key={ m.get(contact, 'id')}>
        <Link url={ "/contacts/" + m.get(contact, 'id') }>
          {m.get(contact, 'first')} {m.get(contact, 'last')}
        </Link>
      </li>
    )
  }
}

ContactItem.propTypes = {
  contact: React.PropTypes.object.isRequired
}

export default ContactItem;