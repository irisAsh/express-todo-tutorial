var MongoClient = require('mongodb').MongoClient;
var dbName = 'express-todo-tutorial'
var url = 'mongodb://127.0.0.1:27017/' + dbName;

exports.index = function(req, res, next) {
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

  var getTodos = function({ client, db }) {
    return new Promise(function(resolve, reject) {
      db.collection('todos')
      .find({})
      .toArray(function(error, docs) {
        if (error) {
          reject(error);
        } else {
          client.close();
          resolve(docs);
        }
      });
    });
  }

  connectionToDB()
  .then(function(db) {
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
