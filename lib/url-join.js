(function (name, context, definition) {
  if (typeof module !== 'undefined' && module.exports) module.exports = definition();
  else if (typeof define === 'function' && define.amd) define(definition);
  else context[name] = definition();
})('urljoin', this, function () {

  function normalize (str, options) {
    var match;

    // make sure protocol is followed by two slashes
    str = str.replace(/:\//g, '://');

    if ((match = str.match(/:\/\//g)) !== null && match.length > 1) {
      throw new Error('Duplicate protocol signifier in ' + str);
    }

    // remove consecutive slashes
    str = str.replace(/([^:\s])\/+/g, '$1/');

    // remove trailing slash before parameters or hash
    str = str.replace(/\/(\?|&|#[^!])/g, '$1');

    // replace ? in parameters with &
    str = str.replace(/(\?.+)\?/g, '$1&');

    return str;
  }

  /**
   * Creates a URL on the segments given to it as arguments
   *
   * @param {Boolean} [trailingSlash=false] Whether or not to include a
   *   trailing slash
   * @param {..(String|Number|undefined} segments URL segments to construct
   *   the URL from
   *
   * @returns {String} URL
   /
  /**TODO
   * Creates a URL from the given options
   *
   * @param {Object} options Options to use in constructing the URL
   * @param {String} [options.protocol] Protocol
   * @param {String} [options.domaion] URL domain
   * @param {String} [options.baseURL] Base URL for the constructed URL
   * @param {Object} [options.params] Object of key/value pairs of query
   *   parameters
   * @param {Array|String} [options.url] URL segments to construct the URL from
   *
   * @returns {String} URL
   */
  return function () {
    var input;

    var options = {};
    
    if (arguments[0] instanceof Array) {
      input = arguments[0];
    } else {
      input = Array.prototype.slice.call(arguments);

      if (typeof input[0] === 'boolean') {
        options.trailingSlash = input.shift();
      }
    }

    var i, length = input.length, parts = [];

    for (i = 0; i < length; i++) {
      switch (typeof input[i]) {
        case 'number':
          parts.push(input[i].toString());
        case 'string':
          if (input[i].endsWith('/')) {
            parts.push(input[i].slice(0, -1));
          } else {
            parts.push(input[i]);
          }
          break;
        case 'undefined':
          break;
        default:
          throw new Error('Illegal url part ' + (i + 1));
      }
    }
    
    return normalize(parts.join('/') + (options.trailingSlash ? '/' : ''));
  };
});
