
class Dispatcher {
  constructor(){
    this.__listeners = {};
  }

  emit(actionType, payload){
    if(actionType === undefined){
      throw new Error('Dispatcher.emit called without actionType');
    }
    const listeners = this.__listeners[actionType];
    console.log('Dispatcher.emit', actionType, payload);
    if(Array.isArray(listeners)){
      listeners.forEach(cb => cb(payload));
    }
  }

  listen(actionType, cb){
    if(actionType === undefined){
      throw new Error('Dispatcher.listen called without actionType');
    }
    if(!Array.isArray(this.__listeners[actionType])){
      this.__listeners[actionType] = [];
    }
    this.__listeners[actionType].push(cb);
  }

  stopListening(actionType, cb){
    let listeners = this.__listeners[actionType];
    if(!Array.isArray(listeners)) return;
    this.__listeners[actionType] = listeners.filter(_cb => _cb !== cb);
  }

  removeAllListeners(){
    this.__listeners = {};
  }

}


export default new Dispatcher();
export {
  Dispatcher
}