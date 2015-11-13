import m from 'mori';

class Atom {
  constructor(){
    this.__state = m.hashMap();
    this.__listeners = [];
  }

  __notifyChange(){
    //console.log('Atom change', this.toString());
    this.__listeners.forEach(cb => cb(this.__state));
  }

  swap(val){
    if(!m.isCollection(val))
      val = m.toClj(val);

    this.__state = val;
    this.__notifyChange();

  }

  assocIn(keyPath, val, options){
    return this.set(keyPath, val, options);
  }

  updateIn(keyPath, fn){
    return this.set(keyPath, fn, options)
  }

  //Serves both as assocIn and updateIn
  set(keyPath, val, options = { silent: false }){
    if(typeof(val)==='function'){
      this.__state = m.updateIn(this.__state, keyPath, val);
    }
    else {
      this.__state = m.assocIn(this.__state, keyPath, val);
    }
    if(!options.silent){
      this.__notifyChange();
    }
  }

  get(){
    return this.__state;
  }

  getIn(keyPath){
    return m.getIn(this.__state, keyPath);
  }

  addChangeListener(fn){
    this.__listeners.push(fn);
  }

  removeChangeListener(fn){
    this.__listeners = this.__listeners.filter(cb => cb !== fn);
  }

  toJs(){
    return m.toJs(this.__state);
  }

  toString(){
    return this.__state.toString();
  }

};

export default new Atom();
export {
  Atom
}