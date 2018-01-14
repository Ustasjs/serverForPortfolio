module.exports.toClient = function toClient(inputObj) {
  let obj = inputObj.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
};

module.exports.dateForBlog = function dateForBlog(inputObj) {
  let obj = inputObj.toObject();
  const date = obj.date;
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  const resultDate = `${day}.${month}.${year}`;

  obj.date = resultDate;

  return obj;
};