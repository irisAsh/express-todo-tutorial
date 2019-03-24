var dbUtils = require('../lib/dbUtils');
var dateUtils = require('../lib/dateUtils');
var todoQueries = require('../lib/todoQueries');

var getTodos = function(db, condition) {
  return new Promise(function(resolve, reject) {
    db.collection('todos')
    .find(condition)
    .toArray(function(error, docs) {
      if (error) {
        reject(error);
      } else {
        resolve(docs);
      }
    });
  });
}

exports.index = function(req, res, next) {
  var dbClient;

  dbUtils.connectionToDB()
  .then(function({ client, db }) {
    dbClient = client;
    return getTodos(db, todoQueries.notCompleted());
  })
  .then(function(result) {
    res.render('todo/index', {
      todos: result,
      date2Str: dateUtils.date2Str
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
  var dbClient;

  dbUtils.connectionToDB()
  .then(function({ client, db }) {
    dbClient = client;
    return getTodos(db, todoQueries.today());
  })
  .then(function(result) {
    res.render('todo/today', {
      todos: result,
      date2Str: dateUtils.date2Str
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

exports.completed = function(req, res) {
  var dbClient;

  dbUtils.connectionToDB()
  .then(function({ client, db }) {
    dbClient = client;
    return getTodos(db, todoQueries.completed());
  })
  .then(function(result) {
    res.render('todo/completed', {
      todos: result,
      date2Str: dateUtils.date2Str
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

  dbUtils.connectionToDB()
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

exports.delete = function(req, res) {
  var dbClient;
  var deleteOneTodo = function(db, id) {
    return new Promise(function(resolve, reject) {
      db.collection('todos')
      .deleteOne({ _id: dbUtils.createObjectID(id) }, function(error, r) {
        if (error) {
          reject(error);
        } else {
          resolve(r);
        }
      });
    });
  };

  dbUtils.connectionToDB()
  .then(function({ client, db }) {
    dbClient = client;
    var { id } = req.params;
    return deleteOneTodo(db, id);
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
