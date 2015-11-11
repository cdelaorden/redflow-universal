//default Singleton atom, dispatcher - can be overriden server-side
import atom from '../lib/atom';
import Dispatcher from '../lib/dispatcher';
//stores
import Contacts from './contacts';
import Route from './route';
import Users from './users';


module.exports = {
  ContactStore: Contacts(atom, Dispatcher),
  RouteStore: Route(atom, Dispatcher),
  UserStore: Users(atom, Dispatcher)
}