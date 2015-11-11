import m from 'mori';
import { ROUTE_SET } from '../action_types';

export default function RouteStoreFactory(atom, Dispatcher){
  const p = {
    route: ['route', 'page']
  }

  function getRoute(state){
    return m.getIn(state, p.route);
  }

  function setRoute({ page, next }){
    atom.set(p.route, page);
    if(next) next();
  }

  Dispatcher.listen(ROUTE_SET, setRoute);

  return {
    paths: p,
    getRoute
  }
}