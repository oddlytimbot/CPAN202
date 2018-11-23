/*
This example shows a common problem with attempting to convert XML into JSON. The XML document contains entities (used in the copyright ). When you run this file you'll notice that these entities do not get converted.

What is happening there?

When an XML document with entities is loaded into a browser, or a processing application, behind the scenes XPath is used to automatically replace the entities with their content.

The xml2js module used here does not have an implementation of XPath. Accordingly, it can convert XML to JSON, but will not always provide the expected result.

For an example of a node module that DOES have an Xpath integration, see index2.js
*/

const fs = require( 'fs' );//the filesystem module
const x2j = require( 'xml2js' );//a common converter for changing xml to json
const DOMParser = require('xmldom').DOMParser;

const sInputFile = "menu.xml";

let p = new x2j.Parser({explicitArray: false});//parameter removes a zero-element that occurs during conversion
let sXMLData = fs.readFileSync( sInputFile, 'utf8' );//read in the xml
const xmlStringSerialized = new DOMParser().parseFromString(sXMLData, "text/xml");//convert the file to XML data

console.log("Got the data");
console.log(sXMLData);

p.parseString( xmlStringSerialized, ( err, result )=>{ 

   const s = JSON.stringify( result, undefined, 3 );
   console.log( "Result" + "\n", s, "\n" );
});