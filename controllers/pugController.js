exports.index = function(req, res, next) {
  res.render('pug/index');
}
exports.includeExample = function(req, res, next) {
  res.render('pug/include_example');
}
exports.templateExample = function(req, res, next) {
  res.render('pug/template_example');
}
