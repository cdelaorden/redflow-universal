import { NAVIGATE } from './action_types';
import Dispatcher from './lib/dispatcher';

export function navigate(url){
  Dispatcher.emit(NAVIGATE, { url: url })
}