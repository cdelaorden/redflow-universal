import React, { Component } from 'react';
import { login } from '../../actions';
import { UserStore } from '../../stores'

class Login extends Component {
  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e){
    e.preventDefault();
    const username = this.refs.username.value,
          password = this.refs.password.value;
    console.log('Signing in user', username);
    login(username, password);
  }

  render(){
    const loginError = UserStore.isLoginError(this.props.state);
    return (
      <div>
        <h1>Login</h1>
        { loginError ? <p><strong>User / password not valid</strong></p>: null }
        <p>
          Username<br />
          <input type='text' name='username' ref='username' placeholder='Username' />
        </p>
        <p>
          Password<br />
          <input type='password' name='password' ref='password' />
        </p>
        <p>
          <button onClick={ this.handleLogin }>Sign in</button>
        </p>
      </div>
    );
  }
}

export default Login;