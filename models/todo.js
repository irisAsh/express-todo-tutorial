var dateUtils = require('../lib/dateUtils');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  title: String,
  description: String,
  status: String,
  estimatedDate: Date
});

// Query ============================================
TodoSchema.query.queryNotCompleted = function() {
  return this.where('status').ne('completed');
}
TodoSchema.query.queryToday = function() {
  var now = Date();
  return this
    .where('estimatedDate')
    .gte(new Date(now).setHours(0,0,0,0))
    .lte(new Date(now).setHours(23,59,59,999))
}
TodoSchema.query.queryCompleted = function() {
  return this.where('status').equals('completed');
}

// Virtuals =========================================
TodoSchema.virtual('estimatedDateISOS').get(function () {
  return dateUtils.date2ISOS(this.estimatedDate);
});

module.exports = mongoose.model('Todo', TodoSchema);
