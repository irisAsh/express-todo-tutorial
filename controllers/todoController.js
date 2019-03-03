var MongoClient = require('mongodb').MongoClient;
var dbName = 'express-todo-tutorial'
var url = 'mongodb://127.0.0.1:27017/' + dbName;

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

exports.index = function(req, res, next) {
  var dbClient;

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
    if (dbClient) {
      dbClient.close();
    }
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

exports.createPost = function(req, res) {
  var dbClient;
  var createOneTodo = function(db, data) {
    return new Promise(function(resolve, reject) {
      db.collection('todos')
      .insertOne(data, function(error, r) {
        if (error) {
          reject(error);
        } else {
          resolve(r);
        }
      });
    });
  };

  connectionToDB()
  .then(function({ client, db }) {
    dbClient = client;
    var { title, description, status, estimatedDate } = req.body;
    return createOneTodo(db, {
      title,
      description,
      status,
      estimatedDate: new Date(estimatedDate)
    });
  })
  .then(function(result) {
    res.redirect('/todo');
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  })
  .then(function() {
    if (dbClient) {
      dbClient.close();
    }
  });
};
