const should = require('should');
const under = require('../lib/require-under');

const requireUnder = under.wrap({
  'a': __dirname + '/modules/a',
  'b': __dirname + '/modules/b',
  'c': __dirname + '/modules/b/c',
})

suite('RequireUnder', function () {
  test('reading base modules', function () {
    should(requireUnder('./modules/a/index.js')()).eql('a');
  });

  test('reading modules under a namespace', function () {
    should(requireUnder('a', 'index.js')()).eql('a');
    should(requireUnder('b', 'index.js')()).eql('b');
    should(requireUnder('c', 'index.js')()).eql('c');
  });

  test('joining modules under a namespace', function () {
    should(requireUnder('b', 'c')()).eql('c');
    should(requireUnder('b', './c')()).eql('c');
    should(requireUnder('b', '../a')()).eql('a');
  });
});
