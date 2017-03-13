/**
 * Created by WindomZ on 17-3-13.
 */
const http = require('http');
const querystring = require('querystring');

const Promise = require('bluebird');

function queryData(param) {
  return querystring.stringify(param);
}

function translate(param) {
  let deferred = Promise.defer();
  let data = queryData(param);
  const options = {
    host: 'fanyi.baidu.com',
    port: 80,
    path: '/v2transapi',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  };

  let req = http.request(options, function (res) {
    res.setEncoding('utf8');
    let responseStr = '';
    res.on('data', data => responseStr += data);
    res.on('end', function () {
      let response = {};
      let result = '';
      try {
        response = JSON.parse(responseStr);
        result = response.trans_result.data[0].dst;
      } catch (err) {

      }
      deferred.resolve(result);
    });
  });

  req.on('error', err => deferred.reject(err));

  req.write(data);

  req.end();
  return deferred.promise;
}

module.exports = translate;
