//Todo API
var _nextId = 0;

var todos = [{
  id: ++_nextId,
  text: 'Do something!',
  completed: false
},
{
  id:++_nextId,
  text: 'Foobar',
  completed: true
}
];

const TodoAPI = {
  getTodos(query){
    return Promise.resolve(todos);
  },

  getById(id){
    return Promise.resolve(todos.filter(t => t.id === id)[0]);
  },

  save(todo){
    return todo.id ? this.update(todo) : this.create(todo);
  },

  create(todo){
    todo.id = ++_nextId;
    todos.push(todo);
    return Promise.resolve(todo);
  },

  update(todo){
    todos = todos.map(t => t.id === todo.id ? todo : t);
    return Promise.resolve(todo);
  },

  delete(todo){
    todos = todos.filter(t => t.id !== todo.id);
    return Promise.resolve();
  }

};

export default TodoAPI;