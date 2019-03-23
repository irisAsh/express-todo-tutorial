var dbUtils = require('../lib/dbUtils');

exports.index = function(req, res) {
  var dbClient;

  var countTodos = function(db) {
    return new Promise(function(resolve, reject) {
      db.collection('todos')
      .countDocuments(function(error, count) {
        if (error) {
          reject(error);
        } else {
          resolve(count);
        }
      });
    });
  }

  dbUtils.connectionToDB()
  .then(function({ client, db }) {
    dbClient = client;
    return countTodos(db);
  })
  .then(function(result) {
    res.render('home/index', {
      remainingTodoCount: result,
      todayTodoCount: 2,
      completedTodoCount: 1
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
