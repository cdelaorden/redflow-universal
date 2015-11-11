import atom, { Atom } from './atom';
import dispatcher, { Dispatcher } from './dispatcher';
import { USER_SET_AUTH } from '../action_types';
import stores from '../stores';
import director from 'director';

/**
* Transforms client-side route syntax to server-side compatible routes
* Example: '/path': [xxx,xxx] -> '/path': { get: [xxx,xxx] }
**/
function makeServerRoutes(routes){
  return Object.keys(routes).reduce((acc,k) => {
    acc[k] = {
      get: routes[k]
    };
    return acc;
  }, {});
}

/**
* Creates a server Flux context, including the router
* This context will be common for every Express request
* Stores are connected to this specific dispatcher and atom instances
**/
export function createServerContext(initialState, routeConfig){
  atom.swap(initialState);
  const routes = makeServerRoutes(routeConfig(dispatcher));
  const router = new director.http.Router(routes);
  router.configure({ async: true, recurse: false });


  return {
    atom,
    dispatcher,
    stores,
    router,
    beginRequest: function(req){
      console.log('SSR begin Request');
      dispatcher.emit(USER_SET_AUTH, { user: req.session.user || null })
    },
    reset: function(){
      this.atom.swap(initialState);
    }
  }
}