/**
 * Created by WindomZ on 17-3-13.
 */
const http = require('http');
const querystring = require('querystring');

const co = require('co');
const Promise = require('bluebird');
const Translation = require('./translation');

function langDetectData(param) {
  return querystring.stringify({
    query: param.query,
  });
}

function langDetect(param) {
  let promise = Promise.defer();
  let data = langDetectData(param);

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
        try {
          let response = JSON.parse(responseStr);
          if (response.msg === 'success') {
            promise.resolve(response.lan);
            return;
          }
          promise.reject(response.msg)
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

function transApiData(param) {
  if (!param.from) {
    param.from = 'en';
  }
  if (!param.to) {
    param.to = param.from !== 'zh' ? 'zh' : 'en';
  }
  return querystring.stringify({
    from: param.from,
    to: param.to,
    query: param.query,
  });
}

function transApi(param) {
  let promise = Promise.defer();
  let data = transApiData(param);

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
        try {
          // console.log(responseStr);
          response = JSON.parse(responseStr);
          // console.log(response.trans_result.data[0]);
          // console.log(response);
          let result = new Translation(
            response.trans_result.data[0].src,
            response.trans_result.data[0].dst
          );
          if (response.dict_result && response.dict_result.simple_means) {
            let simple_means = response.dict_result.simple_means;
            if (simple_means.symbols) {
              result.symbols(simple_means.symbols[0]);
            }
            if (simple_means.word_means) {
              result.means(simple_means.word_means);
            }
          }

          promise.resolve(result);
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

function translate(param) {
  let promise = Promise.defer();

  langDetect(param)
    .then(f => {
      param.from = f;
      transApi(param)
        .then(f => {
          promise.resolve(f);
        })
    })
    .catch(err => {
      promise.reject(err);
    });

  return promise.promise;
}

module.exports = translate;
