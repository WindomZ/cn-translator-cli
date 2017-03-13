/**
 * Created by WindomZ on 17-3-13.
 */
const http = require('http');
const querystring = require('querystring');

const co = require('co');
const Promise = require('bluebird');

function langdetect(param) {
  let promise = Promise.defer();
  let data = querystring.stringify({
    query: param.query,
  });

  let req = http.request(
    {
      host: 'fanyi.baidu.com',
      port: 80,
      path: '/langdetect',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Length': data.length,
      }
    },
    function (res) {
      let responseStr = '';
      res.on('data', data => responseStr += data);
      res.on('end', function () {
        let response = {};
        let result = '';
        try {
          console.log(responseStr);
          // response = JSON.parse(responseStr);
          // console.log(response);
          // result = response.trans_result.data[0].dst;
          promise.resolve(responseStr);
        } catch (err) {
          promise.reject(err)
        }
      });
    });

  req.on('error', err => promise.reject(err));

  req.write(data);
  req.end();

  return promise.promise;
}

function queryData(param) {
  return querystring.stringify({
    from: param.from,
    to: param.to,
    query: param.query,
  });
}

function translate(param) {
  let promise = Promise.defer();

  // langdetect(param)
  //   .then(r => console.log(r))
  //   .catch(err => {
  //     promise.reject(err);
  //     return promise.promise;
  //   });

  let data = queryData(param);

  let req = http.request(
    {
      host: 'fanyi.baidu.com',
      port: 80,
      path: '/v2transapi',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Length': data.length,
      }
    },
    function (res) {
      let responseStr = '';
      res.on('data', data => responseStr += data);
      res.on('end', function () {
        let response = {};
        let result = '';
        try {
          // console.log(responseStr.length);
          response = JSON.parse(responseStr);
          // console.log(response);
          result = response.trans_result.data[0].dst;
        } catch (err) {

        }
        promise.resolve(result);
      });
    });

  req.on('error', err => promise.reject(err));

  req.write(data);
  req.end();

  return promise.promise;
}

module.exports = translate;
