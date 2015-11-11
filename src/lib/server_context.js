import { Atom } from './atom';
import { Dispatcher } from './dispatcher';
import director from 'director';
import RouteStore from '../stores/route';
import ContactStore from '../stores/contacts';

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
  const atom = new Atom();
  atom.swap(initialState);
  const dispatcher = new Dispatcher();
  //create stores
  const stores = {
    Route: RouteStore(atom, dispatcher),
    Contacts: ContactStore(atom, dispatcher)
  };
  const routes = makeServerRoutes(routeConfig(dispatcher));
  const router = new director.http.Router(routes);
  router.configure({ async: true, recurse: false });


  return {
    atom,
    dispatcher,
    stores,
    router,
    reset: function(){
      this.atom.swap(initialState);
    }
  }
}