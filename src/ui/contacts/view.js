import React, { Component } from 'react';
import Link from '../common/link';
import { ContactStore } from '../../stores';
import m from 'mori';
import { navigate } from '../../actions';

class ContactView extends Component {
  handleClick(e){
    navigate(e);
  }

  render(){
    var contact = ContactStore.getDetailContact(this.props.state);
    return (
      <div className='contact-view'>
        <h2>View Contact</h2>
        <p>
          First: {m.get(contact, 'first')}<br />
          Last: { m.get(contact, 'last')}<br />
          Email: { m.get(contact, 'email')}
        </p>
        <Link url='/contacts'>Go back</Link> |
        <Link url={ '/contacts/' + m.get(contact, 'id') + '/edit'}>Edit</Link> |
        <Link url={ '/contacts/' + m.get(contact, 'id') + '/delete'}>Delete</Link>
      </div>

    )
  }
}

ContactView.propTypes = {
  state: React.PropTypes.object.isRequired
}

export default ContactView;