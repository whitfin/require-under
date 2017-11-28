const caller = require('caller');
const path = require('path');
const main_require = require;

/**
 * Wraps a set of namespaces and returns a function which
 * can be used to require modules.
 *
 * @param {object} under
 *    the namespaces to register paths for.
 */
function wrap(under) {
  if (!under) {
    throw new Error('No namespaces provided!');
  }

  if (Object.prototype.toString.call(under) !== '[object Object]') {
    throw new Error('Invalid namespaces object provided');
  }

  return function require(from, to) {
    if (to === undefined) {
      if (from && from[0] === '.') {
        from = path.join(path.dirname(caller()), from);
      }
      return main_require(from);
    }

    let root = under[from];
    if (root && typeof root === 'string') {
      return main_require(path.join(root, to));
    }

    throw new Error('Invalid namespace');
  };
}

/**
 * Export the interface.
 */
module.exports.wrap = wrap;
