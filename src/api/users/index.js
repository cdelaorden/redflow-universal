//User / Session API
let _nextId = 0;
let users = [
  {
    id: ++_nextId,
    username: 'admin',
    password: '4dm1n',
    first: 'Carlos',
    last: 'de la Orden',
    email: 'carlos@redradix.com'
  }
];

//avoid sending passwords through the API
function sanitizeUser(u){
  return {
    id: u.id,
    username: u.username,
    first: u.first,
    last: u.last,
    email: u.email
  }
}

const API = {
  getUsers(){
    return Promise.resolve(users.map(sanitizeUser));
  },

  getById(userId){
    let user = users.find(u => u.id === userId);
    return user ? Promise.resolve(sanitizeUser(user)) : Promise.reject();
  },

  save(user){
    return user.id ? this.update(user) : this.create(user);
  },

  create(user){
    user.id = ++_nextId;
    users.push(user);
    return Promise.resolve(user).then(sanitizeUser);
  },

  update(user){
    users = users.map(u => u.id === user.id ? Object.create({}, u, user) : u);
    return Promise.resolve(user).then(sanitizeUser);
  },

  delete(user){
    users = users.filter(u => u.id !== user.id);
    return Promise.resolve();
  },

  login(username, password){
    let user = users.find(u => u.username === username);
    if(user.password === password){
      return Promise.resolve(user).then(sanitizeUser);
    }
    else {
      return Promise.reject();
    }
  }
}

function attachRoutes(router){
  function parseUser(req, res, next){
    req.postedUser = {
      id: req.body.id,
      username: req.body.username,
      first: req.body.first,
      last: req.body.last,
      email: req.body.email
    }
    next();
  }

  function parseLogin(req, res, next){
    req.login = {
      username: req.body.username,
      password: req.body.password
    };
    next();
  }

  router.param('userId', (req,res,next) => {
    const id = parseInt(req.params.userId);
    API.getById(id).then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      res.status(404).end();
    })
  });

  router.get('/users', (req, res) => {
    API.getUsers().then((users) => res.send(users));
  });

  router.post('/users', parseUser, (req, res) => {
    API.save(req.postedUser).then(user => res.status(201).send(user));
  });

  router.get('/users/:userId', (req, res) => {
    res.status(200).send(req.user);
  });

  router.put('/users/:userId', parseUser, (req, res) => {
    API.save(req.postedUser).then(user => res.status(200).send(user));
  });

  router.delete('/users/:userId', (req, res) => {
    API.delete(req.user).then(() => res.status(200).end());
  });

  router.get('/session', (req, res) => {
    if(!req.session.user){
      return res.status(404).end();
    }

    API.getById(req.session.user.id)
    .then(user => {
      res.send(user);
    })
    .catch(err => res.status(404).end());
  });

  router.post('/session', parseLogin, (req, res) => {
    API.login(req.login.username, req.login.password)
    .then(user => {
      req.session.user = user;
      res.status(201).send(user);
    })
    .catch(err => res.status(404).end());
  });

  router.delete('/session', (req, res) => {
    req.session.destroy();
    res.status(200).end();
  });

}

export default {
  attachRoutes
}