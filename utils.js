module.exports.toClient = function toClient(inputObj) {
  var obj = inputObj.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
};