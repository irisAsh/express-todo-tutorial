exports.date2ISOS = function (dateStr) {
  var dateObj = new Date(dateStr);

  if (!dateObj || dateObj.toString() === 'Invalid Date') {
    return '';
  }

  return dateObj.toISOString().substr(0,19);
}
exports.date2Str = function (dateObj) {
  if (!dateObj || dateObj.toString() === 'Invalid Date') {
    return '';
  }
  var yyyy = dateObj.getFullYear();
  var mm = ('00' + (dateObj.getMonth()+1)).slice(-2);
  var dd = ('00' + dateObj.getDate()).slice(-2);
  var str = yyyy + '/' + mm + '/' + dd;
  return str;
}
