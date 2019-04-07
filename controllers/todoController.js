var dateUtils = require('../lib/dateUtils');
var Todo = require('../models/todo');

exports.index = function(req, res, next) {
  Todo.find().queryNotCompleted().exec()
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
  Todo.find().queryToday().exec()
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
  Todo.find().queryCompleted().exec()
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
  var { title, description, status, estimatedDate } = req.body;
  Todo.create({
    title,
    description,
    status,
    estimatedDate
  })
  .then(function(result) {
    res.redirect('/todo');
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  });
};
exports.delete = function(req, res, next) {
  var { id } = req.params;
  Todo.findOne({ _id: id })
  .then(function(result) {
    if (!result) {
      throw new Error('削除対象が見つかりません');
    }
    return result.remove();
  })
  .then(function(result) {
    res.redirect('/todo');
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  });
};
exports.updateGet = function(req, res, next) {
  var { id } = req.params;
  Todo.findOne({ _id: id })
  .then(function(result) {
    if (!result) {
      throw new Error('削除対象が見つかりません');
    }
    res.render('todo/update', { todo: result });
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  });
};
exports.updatePatch = function(req, res, next) {
  var { id } = req.params;
  var { title, description, status, estimatedDate } = req.body;
  Todo.updateOne({ _id: id }, { title, description, status, estimatedDate })
  .then(function(result) {
    res.redirect('/todo');
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  });
};
