import React, { Component, PropTypes } from 'react';
import m from 'mori';
import Link from '../common/link';
import { ContactStore } from '../../stores';
import Dispatcher from '../../lib/dispatcher';
import { CONTACTS_SAVE } from '../../action_types';


class ContactEdit extends Component {
  constructor(props){
    super(props);
    this.contact = ContactStore.getDetailContact(props.state);
    this.state = m.toJs(this.contact);
  }

  handleSaveClick(e){
    e.preventDefault();
    console.log('Saving', this.state);
    Dispatcher.emit(CONTACTS_SAVE, { contact: this.state });
  }

  handleFieldChange(e, fieldName){
    const patchState = {};
    patchState[fieldName] = e.target.value;
    this.setState(patchState);
  }

  fieldClass(fieldName, errors, defaultClass = '', errorClass = 'error'){
    if(m.get(errors, fieldName)){
      return errorClass;
    }
    else {
      return defaultClass;
    }
  }

  render(){
    const formTitle = m.get(this.contact, 'id') ? 'Edit Contact' : 'Create Contact';
    const formErrors = ContactStore.getEditErrors(this.props.state);
    return (
      <form>
        <h2>{ formTitle }</h2>
        <p>
          <label htmlFor='first'>First name</label><br />
          <input className={ this.fieldClass('first', formErrors )} type='text' name='first' value={ this.state.first } onChange={ (e) => { this.handleFieldChange(e, 'first') } } /><br />
          <span className={ this.fieldClass('first', formErrors, 'hidden', 'form-error')}>{ m.get(formErrors, 'first')}</span>
        </p>
        <p>
          <label htmlFor='last'>Last name</label><br />
        <input className={ this.fieldClass('last', formErrors )} type='text' name='last' value={ this.state.last } onChange={ (e) => { this.handleFieldChange(e, 'last') } } /><br />
        <span className={ this.fieldClass('last', formErrors, 'hidden', 'form-error')}>{ m.get(formErrors, 'last')}</span>
        </p>
        <p>
          <label htmlFor='email'>Email</label><br />
          <input className={ this.fieldClass('email', formErrors )} type='text' name='email' value={ this.state.email } onChange={ (e) => { this.handleFieldChange(e, 'email') } } /><br />
          <span className={ this.fieldClass('email', formErrors, 'hidden', 'form-error')}>{ m.get(formErrors, 'email')}</span>
        </p>
        <p>
          <button onClick={ (e) => this.handleSaveClick(e) }>Save</button>
        </p>

        <div>
          <Link url='/contacts'>Back to Contacts</Link>
        </div>
      </form>
    )
  }
}

ContactEdit.propTypes = {
  state: PropTypes.object.isRequired
}

export default ContactEdit;