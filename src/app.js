import React from 'react';
import TodoApp from './ui/todoapp';

window.onload = () => {
  React.render(<TodoApp />, document.getElementById('app'));
}

