var constants = require('./constants');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

exports.connectionToDB = function() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(
      constants.DB_URL + constants.DB_NAME,
      { useNewUrlParser: true },
      function(error, client) {
        if (error) {
          reject(error);
        } else {
          var db = client.db(constants.DB_NAME);
          resolve({ client, db });
        }
      }
    );
  });
};
