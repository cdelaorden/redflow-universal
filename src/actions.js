import { NAVIGATE, LOGIN } from './action_types';
import Dispatcher from './lib/dispatcher';

export function navigate(url){
  Dispatcher.emit(NAVIGATE, { url: url })
}

export function login(username, password){
  Dispatcher.emit(LOGIN, { username: username, password: password });
}