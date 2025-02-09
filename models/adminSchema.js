const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      minLenght:5,
      maxLenght:18,
    },
    password: {
      type: String,
      required: true,
      minLenght: 8,
      maxLenght: 20,
    }
  });
    module.exports = mongoose.model('admin', adminSchema);