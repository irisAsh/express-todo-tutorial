var MongoClient = require('mongodb').MongoClient;
var dbName = 'express-todo-tutorial'
var url = 'mongodb://127.0.0.1:27017/' + dbName;

exports.index = function(req, res, next) {
  var dbClient;
  var connectionToDB = function() {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, {useNewUrlParser: true}, function(error, client) {
        if (error) {
          reject(error);
        } else {
          var db = client.db(dbName);
          resolve({ client, db });
        }
      });
    });
  };

  var getTodos = function(db) {
    return new Promise(function(resolve, reject) {
      db.collection('todos')
      .find({})
      .toArray(function(error, docs) {
        if (error) {
          reject(error);
        } else {
          resolve(docs);
        }
      });
    });
  }

  connectionToDB()
  .then(function({ client, db }) {
    dbClient = client;
    return getTodos(db);
  })
  .then(function(result) {
    res.render('todo/index', {
      todos: result
    });
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  })
  .then(function() {
    dbClient.close();
  });
};

exports.today = function(req, res) {
  res.render('todo/today');
};

exports.completed = function(req, res) {
  res.render('todo/completed');
};

exports.createGet = function(req, res) {
  res.render('todo/create');
};
