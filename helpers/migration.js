var base = require('./../models/base');

// import migrations
const user = require('./../migrations/user');

var migrations = (function() {

  var registered_mirations = [user]

  var run = function() {
    listCollections(function(data) {
      let unrun_migrations = registered_mirations.filter(r => !data.includes(r.get_name()))

      unrun_migrations.map((um) => {
          um.create();
      });
    })
  }

  var dropAll = function() {
    listCollections(function(data) {
      let ran_migrations = registered_mirations.filter(r => data.includes(r.get_name()))

      ran_migrations.map((um) => {
          um.drop();
      });
    })
  }

  var listCollections = function(callback) {
    base.mongoClientSafe(function(db, status, err) {
      db.listCollections().toArray(function(err, collInfos) {
        let data = collInfos.map(c => c.name);
        callback(data);
      });
    })
  }

  return {
    run: run,
    dropAll: dropAll
  }
})()

module.exports = migrations;
