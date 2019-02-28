exports.index = function(req, res) {
  res.render('home/index', {
    remainingTaskCount: 4,
    todayTaskCount: 2
  });
};
