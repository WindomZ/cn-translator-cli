/**
 * Created by wd on 17-3-14.
 */
const trans_baidu = require('./translate/baidu');

function translate(param) {
  switch (param.plat) {
    case 'baidu':
      return trans_baidu(param);
    case 'youdao':
    case 'google':
  }
  return trans_baidu(param);
}

module.exports = translate;