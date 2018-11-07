var mongodb = require('mongodb');

var base = (function() {

  var mongo = null

  var connect = function(callback) {
    if (mongo) {
      callback(mongo)
    }
    mongoClient(callback)
  }

  var mongoClient = function(callback, close=true) {
    close_connection = true;
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/game_frontend';

    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log('Unable to connect')
        callback(null, 500, err);
      }
      else {
        console.log('Connection establised');
        mongo = db
        callback(db, 200);
        if (close) {
          db.close();
        }
      }
    });
  }

  var mongoClientSafe = function(callback, close=true) {
    mongoClient(function(db, status, err) {
      if (!db) {
        console.log(`${err} with status: ${status}`);
        return;
      }
      callback(db, status, err);
    }, close)
  }

  var getFilteredData = function(schema, args={}, normalize=false) {
    let schema_keys = Object.keys(schema);
    let arg_keys = Object.keys(args);
    let filterd_data = {}

    let filterd_keys = schema_keys.filter(s => arg_keys.includes(s));

    filterd_keys.map((f) => {
      let type_in_arg = typeof(args[f]);
      let type_in_scheme = schema[f];
      if (type_in_arg == type_in_scheme) {
        filterd_data[f] = args[f];
      }
      else if (normalize) {
        filterd_data[f] = null;
      }
    });

    return filterd_data;
  }

  return {
    mongoClient: mongoClient,
    mongoClientSafe: mongoClientSafe,
    getFilteredData: getFilteredData
  }
})();

module.exports = base;
