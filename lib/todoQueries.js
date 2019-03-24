exports.completed = function() {
  return { status: { $eq: 'completed' } };
};
exports.notCompleted = function() {
  return { status: { $ne: 'completed' } };
};
exports.today = function() {
  var now = new Date();
  var start = new Date(new Date(now).setHours(0,0,0,0));
  var end = new Date(new Date(now).setHours(23,59,59,999));
  return {
    estimatedDate: {
      $gte: start,
      $lte: end
    }
  };
};
