var dbUtils = require('../lib/dbUtils');
var todoQueries = require('../lib/todoQueries');

exports.index = function(req, res) {
  var dbClient;

  var countTodos = function(db, condition) {
    return new Promise(function(resolve, reject) {
      db.collection('todos')
      .countDocuments(
        condition,
        function(error, count) {
          if (error) {
            reject(error);
          } else {
            resolve(count);
          }
        }
      );
    });
  }

  dbUtils.connectionToDB()
  .then(function({ client, db }) {
    dbClient = client;
    return Promise.all([
      countTodos(db, todoQueries.notCompleted()),
      countTodos(db, todoQueries.today()),
      countTodos(db, todoQueries.completed()),
    ]);
  })
  .then(function(result) {
    res.render('home/index', {
      remainingTodoCount: result[0],
      todayTodoCount: result[1],
      completedTodoCount: result[2]
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
