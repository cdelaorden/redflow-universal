import m from 'mori';
import * as ActionTypes from '../action_types';
import { navigate } from '../actions';
import httpApi from '../lib/httpApi';

export default function UserStoreFactory(atom, dispatcher){
  const p = {
    me: ['data', 'me'],
    loginError: ['ui', 'loginError']
  }

  function login({username, password}){
    httpApi.postClj('/session', { username, password })
    .then(user => {
      atom.set(p.loginError, false, { silent: true });
      atom.set(p.me, user);
      //navigate('/contacts');
    })
    .catch(err => {
      console.log('Login err');
      atom.set(p.loginError, true);
    });
  }

  function logout({ next }){
    httpApi.del('/session')
    .then(() => {
      atom.set(p.me, null, { silent: true });
      navigate('/');
      next();
    })
    .catch(err => {
      console.log('Error in logout', err);
      next();
    });
  }

  function authorize({ next }){
    if(atom.getIn(p.me) !== null) return next();
    httpApi.getClj('/session')
    .then(user => {
      console.log('Authorize. Me:', user.toString());
      atom.set(p.me, user);
      next();
    })
    .catch(err => {
      console.log('Auth error');
      //navigate('/login');
      next();
    })
  }

  function saveAuth({ user }){
    atom.set(p.me, m.toClj(user), { silent: true });
  }

  function getLoggedUser(state){
    return m.getIn(state, p.me);
  }

  function isLoginError(state){
    return m.getIn(state, p.loginError);
  }

  dispatcher.listen(ActionTypes.LOGIN, login);
  dispatcher.listen(ActionTypes.LOGOUT, logout);
  dispatcher.listen(ActionTypes.AUTHORIZE, authorize);
  dispatcher.listen(ActionTypes.USER_SET_AUTH, saveAuth);

  return {
    selectors: p,
    getLoggedUser,
    isLoginError
  }
}