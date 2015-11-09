import m from 'mori';
import { ROUTE_SET } from '../action_types';

export default function(atom, Dispatcher){
  const p = {
    route: ['activePage']
  }

  function getRoute(state){
    return atom.getIn(p.route);
  }

  function setRoute({ page }){
    atom.set(p.route, page);
  }

  Dispatcher.listen(ROUTE_SET, setRoute);

  return {
    paths: p,
    getRoute
  }
}