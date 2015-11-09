import React, { Component, PropTypes } from 'react';
import { navigate } from '../../actions';

export default class Link extends Component {
  handleClick(e){
    if(this.props.skip) return;
    e.preventDefault();
    navigate({ url: this.props.url });
  }

  render(){
    return (
      <a href={ this.props.url } onClick={ (e) => this.handleClick(e) }>
        { this.props.children }</a>
    )
  }
}

Link.propTypes = {
  url: PropTypes.string.isRequired,
  target: PropTypes.string,
  skip: PropTypes.bool
}