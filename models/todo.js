var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  title: String,
  description: String,
  status: String,
  estimatedDate: Date
});

// Query ============================================
TodoSchema.statics.queryNotCompleted = function() {
  return this.where('status').ne('completed');
}
TodoSchema.statics.queryToday = function() {
  var now = Date();
  return this
    .where('estimatedDate')
    .gte(new Date(now).setHours(0,0,0,0))
    .lte(new Date(now).setHours(23,59,59,999))
}
TodoSchema.statics.queryCompleted = function() {
  return this.where('status').equals('completed');
}

module.exports = mongoose.model('Todo', TodoSchema);
