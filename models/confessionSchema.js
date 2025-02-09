const mongoose = require('mongoose');

const confessionSchema = mongoose.Schema({
   confession:{
     type: String,
     required: true
   },
   user:{
    string: {
      type: String,
      required: false,
    }
   }
  });
    module.exports = mongoose.model('confession', confessionSchema);