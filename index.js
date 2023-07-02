const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
app.use(express.static('./assets'));
const db=  require('./config/mongoose')
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is running on", port);
});
