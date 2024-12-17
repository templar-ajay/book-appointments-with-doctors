const mongoose = require("mongoose");

exports.isValidObjectID = (id) => {
  return mongoose.isValidObjectId(id);
};
