var Todo = require('../models/todo');

exports.index = function(req, res) {
  Promise.all([
    Todo.queryNotCompleted().countDocuments().exec(),
    Todo.queryToday().countDocuments().exec(),
    Todo.queryCompleted().countDocuments().exec()
  ])
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
  });
};
