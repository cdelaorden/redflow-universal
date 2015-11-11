import React, { Component } from 'react';
import Link from './link';

class NotFound extends Component {
  render(){
    return (
      <div>
        <h1>Oooooops!</h1>
        <p>You just broke Internet. RUN AWAY!</p>
        <p><Link url='/contacts'>Back to Home</Link></p>
      </div>
    );
  }
}

export default NotFound;