exports.index = function(req, res) {
  res.render('todo/index');
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
