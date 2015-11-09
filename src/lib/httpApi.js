'use strict';
import request from 'superagent';
import m from 'mori';
const BASE_URL = '/api';


function getApiUrl(url){
  return BASE_URL + (url[0] !== '/' ? '/':'') + url;
}

function ensureClj(data){
  return !m.isCollection(data) ? m.toClj(data) : data;
}

function ensureJs(data){
  return m.isCollection(data) ? m.toJs(data): data;
}

const httpApi = {
  get: function(url){
    return new Promise((resolve,reject) => {
      request(getApiUrl(url))
      .end((err, res) => {
        return err ? reject(err) : resolve(res.body);
      })
    });
  },
  post: function(url, data){
    return new Promise((resolve,reject) => {
      request.post(getApiUrl(url))
        .send(ensureJs(data))
        .end((err, res) => {
          return err ? reject(err) : resolve(res.body);
        });
    });
  },
  put: function(url, data){
    return new Promise((resolve,reject) => {
      request(getApiUrl(url))
      .send(ensureJs(data))
      .end((err,res) => {
        return err ? reject(err): resolve(res.body)
      });
    });
  },
  del: function(url){
    return new Promise((resolve,reject) => {
      request.del(getApiUrl(url))
      .end((err,res) => {
        return err ? reject(err) : resolve(res.body)
      });
    });
  },
  getClj: function(url){
    return this.get(url).then(ensureClj);
  },
  postClj: function(url, cljData){
    return this.post(url, cljData).then(ensureClj);
  },
  putClj: function(url, cljData){
    return this.put(url, cljData).then(ensureClj);
  }
};

export default httpApi;