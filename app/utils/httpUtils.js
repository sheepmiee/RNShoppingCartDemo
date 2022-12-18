import {baseUrl} from '../api';
import Toast from 'teaset/components/Toast/Toast';

const JsonHeaders = {
  'Content-Type': 'application/json',
};

//get请求
const get = (api, params) => {
  if (params) {
    let paramsArray = [];
    Object.keys(params).forEach(key =>
      paramsArray.push(key + '=' + params[key]),
    );
    if (api.search(/\?/) === -1) {
      api += '?' + paramsArray.join('&');
    } else {
      api += '&' + paramsArray.join('&');
    }
  }

  return new Promise((resolve, reject) => {
    Promise.race([
      fetch(baseUrl + api, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      }),
      new Promise(function (resolve, reject) {
        setTimeout(() => reject({message: '请求超时'}), 10000);
      }),
    ])
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          reject({status: response.status, message: '请求错误'});
        }
      })
      .then(responseData => {
        resolve(responseData);
      })
      .catch(error => {
        Toast.fail(error.message);
        reject(error);
      });
  });
};

//post请求
const post = (api, data, headers = {}) => {
  return new Promise((resolve, reject) => {
    Promise.race([
      fetch(baseUrl + api, {
        method: 'POST',
        headers: {...JsonHeaders, ...headers},
        body: JSON.stringify(data),
      }),
      new Promise(function (resolve, reject) {
        setTimeout(() => reject({message: '请求超时'}), 150000);
      }),
    ])
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          reject({status: response.status, message: '请求错误'});
        }
      })
      .then(responseData => {
        resolve(responseData);
      })
      .catch(error => {
        Toast.fail(error.message);
        reject(error);
      });
  });
};

export default {get, post};
