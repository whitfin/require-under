const path = require('path');
const main_require = require;

/**
 * Wraps a set of namespaces and returns a function which
 * can be used to require modules.
 *
 * @param {object} namespaces
 *    the namespaces to register paths for.
 */
function wrap(namespaces) {
  if (!namespaces) {
    throw new Error('No namespaces provided!');
  }

  if (Object.prototype.toString.call(namespaces) !== '[object Object]') {
    throw new Error('Invalid namespaces object provided');
  }

  return function require(from, to) {
    if (to === undefined) {
      return main_require(from);
    }

    let root = namespaces[from];
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
