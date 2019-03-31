var dateUtils = require('../lib/dateUtils');

exports.index = function(req, res, next) {
  res.render('todo/index', {
    todos: [
      {
        title: '買い物に行く',
        description: 'キャベツを買う',
        status: 'progress',
        estimatedDate: new Date()
      }
    ],
    date2Str: dateUtils.date2Str
  });
};
exports.today = function(req, res) {
  res.render('todo/today', {
    todos: [
      {
        title: '買い物に行く',
        description: 'キャベツを買う',
        status: 'progress',
        estimatedDate: new Date()
      }
    ],
    date2Str: dateUtils.date2Str
  });
};
exports.completed = function(req, res) {
  res.render('todo/completed', {
    todos: [
      {
        title: '買い物に行く',
        description: 'キャベツを買う',
        status: 'progress',
        estimatedDate: new Date()
      }
    ],
    date2Str: dateUtils.date2Str
  });
};
exports.createGet = function(req, res) {
  res.render('todo/create', { todo: {} });
};
exports.createPost = function(req, res) {
  res.redirect('/todo');
};
exports.delete = function(req, res) {
  res.redirect('/todo');
};
exports.updateGet = function(req, res, next) {
  res.render('todo/update', { todo: {} });
};
exports.updatePatch = function(req, res, next) {
  res.redirect('/todo');
};
