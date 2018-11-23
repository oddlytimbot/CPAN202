const express = require("express");
const app = express();
const fs = require("fs");
const x2j = require("xml2js");
const DOMParser = require("xmldom").DOMParser;

const sInputFile = "menuTransformed.xml";
/*
compare to:
const sInputFile = "menu.xml";
*/

app.get("/menu", function(req, res) {
  let p = new x2j.Parser({ explicitArray: false });
  fs.readFile(__dirname + "/" + sInputFile, "utf8", function(err, data) {
    const xmlStringSerialized = new DOMParser().parseFromString(
      data,
      "text/xml"
    );
    p.parseString(xmlStringSerialized, (err, result) => {
      const s = JSON.stringify(result, undefined, 3);
      res.end(s);
    });
  });
});

const server = app.listen(8081, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Example app listening at http://${host}:${port}`);
});
