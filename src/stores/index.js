//default atom, dispatcher - can be overriden server-side
import atom from '../lib/atom';
import httpApi from '../lib/httpApi';
import Dispatcher from '../lib/dispatcher';
//stores
import Contacts from './contacts';
import Route from './route';


module.exports = {
  ContactStore: Contacts(atom, Dispatcher, httpApi),
  RouteStore: Route(atom, Dispatcher)
}