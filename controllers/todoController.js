var dateUtils = require('../lib/dateUtils');
var Todo = require('../models/todo');

exports.index = function(req, res, next) {
  Todo.queryNotCompleted().find().exec()
  .then(function(todos) {
    res.render('todo/index', {
      todos: todos,
      date2Str: dateUtils.date2Str
    });
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  });
};
exports.today = function(req, res) {
  Todo.queryToday().find().exec()
  .then(function(todos) {
    res.render('todo/today', {
      todos: todos,
      date2Str: dateUtils.date2Str
    });
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  });
};
exports.completed = function(req, res) {
  Todo.queryCompleted().find().exec()
  .then(function(todos) {
    res.render('todo/completed', {
      todos: todos,
      date2Str: dateUtils.date2Str
    });
  })
  .catch(function(err) {
    console.log(err);
    next(err);
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
