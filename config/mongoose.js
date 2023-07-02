const mongoose = require('mongoose');

setTimeout(function() {
    mongoose.connect('mongodb://127.0.0.1:27017/test');
  }, 1000);

const db= mongoose.connection;
db.on('errror', console.error.bind(console, "db not connected"));
db.once('open', function(){
    console.log('db connected');
})

