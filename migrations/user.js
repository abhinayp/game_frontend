var base = require('./../models/base');

var user = (function() {

  var name = 'users';

  var get_name = function() {
    return name;
  }

  var create = function() {
    base.mongoClient((db, status) => {
      db.createCollection(name, function(err, res) {
        if (err) throw err;
        console.log(`${name} collection created!`);
        db.close();
      });
    }, false)
  }

  var drop = function() {
    base.mongoClient((db, status) => {
      db.collection(name).drop(function(err, res) {
        if (err) throw err;
        if (res) console.log(`${name} collection dropped!`);
        db.close();
      });
    }, false)
  }

  return {
    create: create,
    drop: drop,
    get_name: get_name
  }
})();

module.exports = user;
