
var con = require('./connection');
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");
var multer = require("multer");
var express = require('express');
var app = express();
var session = require('express-session');
var flash = require('connect-flash');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const { createConnection } = require('net');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use("/assets", express.static("assets"));
app.use(cookieParser());
//response.setHeader("Content-Type", "text/html");

app.get('/', function (req, res) {
  //res.sendFile(__dirname + '/view.html');
  res.render(__dirname + "/view")
  

});


app.get('/ex', function (req, res) {
  
  con.connect(error => {
    if (error) throw error;
    // query data from MySQL
    con.query("SELECT * FROM users", function(error, data, fields) {
      if (error) throw error;
      const jsonData = JSON.parse(JSON.stringify(data));
      console.log("jsonData", jsonData);
      const json2csvParser = new Json2csvParser({ header: true});
      const csv = json2csvParser.parse(jsonData);
      
      fs.writeFile("expoert.csv", csv, function(error) {
        if (error) throw error;
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=expoert.csv");
      res.status(200).end(csv);
      res.render(__dirname + "/view")

        console.log("export successfully!");
      });
    });
  });
 
  });

app.listen(8000);
module.exports=app;
