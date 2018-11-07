var base = require('./../models/base');

var user = (function() {

  const schema = {
    firstName: 'string',
    lastName: 'string',
    age: 'number',
    email: 'string',
    username: 'string'
  }

  var create = function(args={}) {
    let filterd_data = getFilteredData(args);
    console.log(filterd_data);
  }

  var getFilteredData = function(args={}, normalize=false) {
    let filterd_data = base.getFilteredData(schema, args, normalize)

    return filterd_data;
  }

  return {
    create: create
  };
})();
