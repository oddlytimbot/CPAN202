const express = require('express');
const app = express();
const fs = require("fs");

const sInputFile = "menu.xml";

app.get('/menu', function (req, res) {
   fs.readFile( __dirname + "/" + sInputFile, 'utf8', function (err, data) {
      console.log( data );
      res.header('Content-Type','text/xml').send(data);
   });
})

const server = app.listen(8081,  ()=> {
   const host = server.address().address;
   const port = server.address().port;
   console.log(`Example app listening at http://${host}:${port}`);
})