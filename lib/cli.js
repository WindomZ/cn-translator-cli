/**
 * Created by WindomZ on 17-3-13.
 */
const process = require('process');

const program = require('commander');

const pkg = require('../package.json');
const translate = require('./process');

let noArgs = true;

program
  .version(pkg.version)
  .usage('[options] [contents...]')
  .description('chinese translator in cli')
  .option('-f, --from <lang>', 'From Language, short locale name, e.g. en,zh', null, null)
  .option('-t, --to <lang>', 'To Language, short locale name, e.g. zh,en', null, null)
  .action(function (contents) {
    noArgs = false;
    translate({
      from: program.from || '',
      to: program.to || '',
      query: contents + ''
    });
  })
  .parse(process.argv);

if (noArgs) {
  translate({
    from: program.from || '',
    to: program.to || '',
    query: [].slice.call(process.argv).splice(2).join(' ') + ''
  });
}
