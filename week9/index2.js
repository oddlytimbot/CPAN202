/*
This example shows an aternative approach for converting XML to JSON data.

The 'node-libxml' module makes use of Xpath, and so is able to parse entities for either a DTD or a Schema. The XPath being used here is actually a C++ version of Xpath that the node service has bindings to talk to. (It is not javascript)

Since this module has XPath built in, we can use it to retreive individual queries, as seen in the example. But on it's own, the module has no ability to transform the entire XML document to JSON.

*/

const Libxml = require('node-libxml');
  let libxml = new Libxml();
 
  let xmlIsWellformed = libxml.loadXml('menu.xml');
 
  console.log(xmlIsWellformed);
  console.log(xmlIsWellformed.wellformedErrors);
 
  console.log(libxml.getDtd());
 
  //get how many foods there are with xpath
  let resultCount = libxml.xpathSelect('string(//food[calories>600][2])');
  console.log(resultCount);
  /*
  libxml.loadDtds(['path/to/dtd1', 'path/to/dtd2']);
  let xmlIsValid = libxml.validateAgainstDtd();
  console.log(xmlIsValid);
  console.log(xmlIsValid.validationDtdErrors);
 
  //Get some xpaths;
  let aRandomPathBoolean = libxml.xpathSelect('boolean(//some/path'));
  let aRandomPathNumber = libxml.xpathSelect('number(//some/path'));
  let countSomeElements = libxml.xpathSelect('count(//some/path'));
  //... & all xpath could do I think
  */