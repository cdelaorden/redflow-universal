//Contacts API
var _nextId = 0;
var contacts = [
  {
    id: ++_nextId,
    first: 'Mickey',
    last: 'Mouse',
    email: 'mickey@disney.com'
  }
]
const API = {
  getContacts(query){
    return Promise.resolve(contacts);
  },

  getById(id){
    var contact = contacts.find(c => c.id === id);
    return typeof(contact)!=='undefined' ? Promise.resolve(contact): Promise.reject();
  },

  save(contact){
    return contact.id ? this.update(contact) : this.create(contact);
  },

  create(contact){
    contact.id = ++_nextId;
    contacts.push(contact);
    return Promise.resolve(contact);
  },

  update(contact){
    todos = todos.map(c => c.id === contact.id ? contact : t);
    return Promise.resolve(contact);
  },

  delete(contact){
    todos = todos.filter(c => c.id !== contact.id);
    return Promise.resolve();
  }
}

function attachRoutes(router){
  function parseContact(req, res, next){
    req.postedContact = {
      id: req.body.id,
      first: req.body.first,
      last: req.body.last,
      email: req.body.email
    };
    next();
  }

  router.param('contactId', function(req,res,next){
    const id = parseInt(req.params.contactId);
    API.getById(id)
    .then(contact => {
      req.contact = contact;
      return next();
    })
    .catch(err => res.status(404).end());
  });


  //CONTACTS
  router.get('/contacts', function(req, res){
    API.getContacts().then(contacts => res.send(contacts));
  });

  router.get('/contacts/:contactId', function(req, res){
    res.status(200).send(req.contact);
  });

  router.post('/contacts', parseContact, function(req,res){
    API.save(req.postedContact).then(contact => res.send(contact));
  });

  router.put('/contacts/:contactId', parseContact, function(req, res){
    API.save(req.postedContact).then(contact => res.send(contact));
  });

  router.delete('/contacts/:contactId', function(req,res){
    API.delete(req.contact).then(() => res.status(200).end());
  });
}

export default {
  attachRoutes
}