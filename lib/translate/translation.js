/**
 * Created by WindomZ on 17-3-13.
 */
require('colors');

class Translation {

  constructor(src, dst) {
    this.trans_src = src;
    this.trans_dst = dst;
  }

  symbols(symbols) {
    this.dict_symbols = symbols;
  }

  means(means) {
    this.dict_means = means;
  }

  toString() {
    if (!this.trans_dst) {
      return '-_-!'
    }
    let s = ``;
    if (this.dict_symbols) {
      s += `AM:[${this.dict_symbols.ph_am.yellow}] EN:[${this.dict_symbols.ph_en.yellow}]\n`;
    }
    s += `${this.trans_dst.green.underline}\n`;
    if (this.dict_means && this.dict_means.length > 0) {
      s += `${this.dict_means.join(' | ').yellow}\n`;
    }
    return s;
  }

}

module.exports = Translation;
