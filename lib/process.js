/**
 * Created by WindomZ on 17-3-13.
 */
const process = require('process');

const co = require('co');
require('colors');

const trans_baidu = require('./translate/baidu');

function processing(param) {
  if (param.query.length <= 0) {
    process.stdout.write(`Now, type the text that will be translated:\n`.yellow);
    process.stdin.on('data', function (data) {
      param.query = data + '';
      co(function*() {
        const result = yield trans_baidu(param);
        process.stdout.write(`${result.green.underline}\n`);
      }).catch(function (err) {
        console.error(err);
      });
    });
  } else {
    // process.stdout.write(`Now, automatically translated...\n`.yellow);
    co(function *() {
      const result = yield trans_baidu(param);
      process.stdout.write(`${result.green.underline}\n`);
      process.exit(0);
    }).catch(function (err) {
      console.error(err);
    });
  }
}

module.exports = processing;
