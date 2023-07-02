const mongodb = require("mongoose");

const contactSchema= new mongodb.Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
});

const Contact=  mongodb.model('contact', contactSchema);
module.exports = Contact;


