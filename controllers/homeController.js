exports.index = function(req, res) {
  res.render('home/index', {
    remainingTodoCount: 4,
    todayTodoCount: 2,
    completedTodoCount: 1
  });
};
