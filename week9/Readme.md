Final project details:

We are moving into the final project for the course, which will use our knowledge of legacy XML-based technology, while demonstrating modern coding techniques.

The scenario is one you may come across.

In this scenario, your organization has a number of legacy services that are based on XML. It is your task to modernize them so that they end up with a modern service based on GraphQL and JSON.

A requirement from the organization is that the current XML based service can not be disrupted while the new service is being created - you'll need to keep it running and layer your GraphQL endpoint in front of it.

This task is complicated by the fact that the XML uses a number of older conventions, such as entities in DTD, that may foil your efforts to provide JSON.

### Week 9 Expectations

You should use the xml you have created in previous weeks in the following steps. Examples have been provided to follow along with, but you should have your own unique XML file and work through the following steps with it. In doing so, you will demonstrate:

* Using XSLT to transform an XML document (using Saxon)
* Using DTD to embed entities
* Using Schema for validation
* Converting XML to JSON
* Serving up data via REST API
* Setting up a GraphQL endpoint

Detailed instructions follow.

Step One:
Use XSLT to transform the XML into a format that will easily convert to JSON. This transform should validate the document, and also parse any entities.

Step Two:
Create a REST service that provides XML in response to queries.

Step Three:
Create a GraphQL endpoint that transforms the XML from the REST service to JSON and provides it to the client.

In this week 9 we will look at some of the issues involved in converting XML to JSON, and serving that through a REST based service. Next lesson, we will set up a GraphQL endpoint.

## Converting XML

Consider a normal XML document, such as food.xml:

```xml
<food>
    <name>Belgian Waffles</name>
    <price>$5.95</price>
    <description>Two of our famous Belgian Waffles with plenty of real maple syrup</description>
    <calories>650</calories>
  </food>
```

Converting this xml to JSON is fairly simple, and there are many node modules that can do it. The most popular is likely the xml2js library. But it can't do it easily on it's own.

At this time, it is important to review what is happening behind the scenes when an XML document is loaded into an environment like the browser. In the background, the browser has a standards-based implementation of Xpath, which it uses for common tasks like filling in entities. The process is the same when using an XSLT processor like "Saxon" - behind the scenes an implementation of Xpath is used to traverse the document.

Many modules designed to convert XML to JSON run into problems because they do not have any Xpath implementation.

Go ahead and run `index.js` using Node. (Don't forget to `npm install` the dependencies listed in the package.json)

Take a look at the output, and you'll notice something strange:

```json
 {
            "name": "Homestyle Breakfast",
            "price": "$6.95",
            "description": "Two eggs, bacon or sausage, toast, and our ever-popu
lar hash browns",
            "calories": "950",
            "copy": "&copyright;"
         }
```

See how the copyright information has not been converted from an entity? This is the problem we will run into quite a bit. Without a full implementation of Xpath, the module will likely stumble on entities and other things that would normally get converted automatically by the browser or processor.

## Module AND Xpath

There are modules available that have implementations of Xpath. This is possible because Node has a very good ability to communicate with programming written in other languages through 'bindings'.

If you take a look at index2.js, you'll find another library implementation called `node-libxml`.

This library is more complete. During `npm install` this library will actually compile a C-based version of Xpath, and create bindings between it and the javascript. Cool right?

As a result, this library has support for DTD and Schema. It can even use external schema docs and DTD files, and will accurately convert entities.

Go ahead and try out index2.js using `node index2.js`.

Note in your console that the program is capable of indicating whether the XML is well-formed, and can apply a DTD. Our copyright information gets transformed as we would expect it to.

But this module is not without issues. For one, it is only possible to retrieve data from the document using Xpath selectors. If we want to treat the entire document as JSON, there is no easy way to do it.

We can do individual Xpath selectors and convert what we get out of the document to JSON, but this may be tedious.

There is a better way.

## Using Saxon Processor

A better way of dealing with XML transforms is the trusted old-school method for doing so - with a dedicated processor like Saxon (written in Java).

Processors have been around as long as XSLT, and are extremely reliable for doing XML transforms (as we have explored in previous weeks)

To solve our legacy-service issue, we will first write an XSL style sheet, which we will use to transform our XML, filling out the copyright entity. We will use Saxon for this, and have it save the transformed XML document. We will then create a REST based service capable of responding to queries with that XML, and another one capable of responding with JSON.

## Writing the XSL

This is a fairly straightforward task - we just want the XSLT processor to grab the XML and fill out it's entities, which it will get from the DTD descriptor. We are not doing a big conversion from one format to another.

Even so, an XSL stylesheet must describe every node that the processor will output - there is no way to simply copy the xml from the source document into the target. So we will need to create a template, in which we will have a loop for every 'food' node in the menu.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<breakfast_menu>
<xsl:for-each select="breakfast_menu/food">
    <food>
        <name><xsl:value-of select="name"/></name>
        <price><xsl:value-of select="price"/></price>
        <description><xsl:value-of select="description"/></description>
        <calories><xsl:value-of select="calories"/></calories>
        <copy><xsl:value-of select="copy"/></copy>
    </food>
</xsl:for-each>
</breakfast_menu>
</xsl:template>
</xsl:stylesheet>
```

Take note of the `<copy>` node. It's select-attribute is based on the node-name (copy), not the entity, because the value of the entity in the DTD will get processed before the XSL stylesheet information.

So now we have a source XML document, an XSL stylesheet, and we are ready to process the two and output a complete XML document.

For this step, you'll need a processor. I recommend Saxon, a very well-known open-source tool for the job. It is available as a jar file from the following link:

[Download Saxon](http://saxon.sourceforge.net/)

You will want "Saxon HE" (or "home edition") which is free to use.

And you'll need to be sure you have the Jave runtime installed on your system (which is quite likely). If you aren't sure if you have Java, try the following command:

`java -version`

You will likely see output like

`java version "1.8.0_131"`

which is the major and minor version of java installed on your system.

Place the Saxon jar file you downloaded somewhere you can access it. We will use the command line to do our XSLT transform. The command will look like

`java -jar saxon9he.jar menu.xml theXSL.xsl -o:menuTransformed.xml`

Specifically we are specifying that our java runtime should use a jar file (the -jar flag) called saxon9he.jar. Our first option is the source document (menu.xml), followed by the style sheet (theXSL.xsl), and finally the output file, which is specified the the output flag just in front of the file name ("-o:").

With a bit of luck, we should have a nicely transformed document. Take a look in "menuTransformed.xml" and you'll see the copyright information filled out from our DTD entity.

We are now ready to serve up this transformed XML via a REST service!

## Creating an XML REST Service

We're now moving along to the kind of service our fictional company might be using with their current client base.

Let's make a REST service that is capable of receiving GET http requests from a client (like a browser) and returning the list of foods.

Take a look at the `xmlREST.js` file in the examples.

We need to use two dependencies for this task. The first, called "Express" needs to be installed using npm.

`npm install --save express`

In the javascript, you'll see that we require this module.

`const express = require('express');`

The second module we are going to use is called "fs", which stands for "file system". This module is built in to the core of Node, so we will not need to install it with npm.

Express is by far the most common module for creating any kind of response server with Node. It can be used to hear and respond to http requests from a browser (or any other client) and is used extensively for creating REST based services.

The steps to making a simple service include:

- creating the server app
- telling the app what port to listen on
- creating routes for handling requests

Let's do it!

### Creating the Server App

The code to create the app an tell it what port to listen on can be done in one step. And we will console log a message to tell us the service is running.

```javascript
const express = require("express");
const app = express();

const server = app.listen(8081, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Example app listening at http://${host}:${port}`);
});
```

Even now you can run this code using node, and your server will start up - a console log message will appear telling you that the server is listening on port 8081.

But without any routes, the server will not really do anything.

So what is a route?

A route is a handler for an http request coming from the client (likey the browser). These requests come in the form that http is capable of, namely GET, POST, PUT and DELETE (with a few other less-used options).

These headers or "verbs" indicate what the client wants to do with some data. The simplest is the "GET", which is a request for some data.

Lets make a route capable of serving back our list of menu items. We will use our original XML document to do so, by getting Node to read in the file using the "fs" module.

```javascript
const fs = require("fs");

const sInputFile = "menu.xml";

app.get("/menu", function(req, res) {
  fs.readFile(__dirname + "/" + sInputFile, "utf8", (err, data) => {
    console.log(data);
    res.header("Content-Type", "text/xml").send(data);
  });
});
```

With this route, we are indicating that any "GET" request at the "/menu" route should be handled by reading the XML document from the local folder. Note that reading a file is an asynchronous operation, which is a fancy way of saying we don't know just how long it will take. So we use a callback function (done in the ES6 arrow-style), that will be executed once the file has fully read into memory.

After that, we set a header on the response to indicate that the response is XML-formatted, and send it off to the client.

`res.header('Content-Type','text/xml').send(data);`

Pretty easy yes?

When the client receives the response, it will show a response code of 200 (success). And since the browser has an implementation of Xpath, the copyright entities will get transformed, and be visible.

Try it out!

Start the service:

`node xmlREST.js`

Now create a GET request by visiting the locally running service with the correct route:

`http://localhost:8081/menu`

Note that visiting any other route will time out, because no other routes have been set up in the service, and there is no default route. These are implementation details we can work on. And along with our GET request, we would create routes for POST (new data), PUT (updating data), and DELETE (removing data)

But before we go too far down that path, it is important to recognize that it is rare today to create an XML based service. By around 2007, most organizations were seeking to either replace them, or at the least offer JSON based versions of their API. Why?

From earlier weeks, we looked at the fact that JSON data requires no transformation at the client (the browser). Over time, more and more of web development moved from the server to the client, until today we see a large push to "serverless" architecture, where almost everything is done via javascript in the browser, assisted by hosted micro-services.

In that environment, JSON proves to be a much better format, along with being more compact, less verbose, and less memory-consuming (which is vital on mobile devices)

So let's re-write our XML service to provide JSON. For this, we will use our transformed XML document.

## JSON Based Service

The steps are almost the same, with the exception that we will use that "xml2js" module we examined earlier to transform the XML to JSON before sending it back to the client. We can do so now, because the DTD entities have already been transformed by the processor Saxon.

We can re-write our route with the updated step:

```javascript
const x2j = require("xml2js");
const DOMParser = require("xmldom").DOMParser;

const sInputFile = "menuTransformed.xml";

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
```

Here we have included the two new modules we need.

- "xml2js" parses XML into JSON objects.
- "xmldom" handles safe conversion of any special characters in the xml

We first create an XML parser:

`let p = new x2j.Parser({ explicitArray: false });`

That "explicitArray: false" is a setting of the parser that tells it to not try returning single nodes as an array, which makes for slightly more straightforward JSON.

Next we load in the XML and feed it into the DOMParser as a string. This makes sure any special characters are safely encoded.

And finally we do the conversion from safe, clean XML to JSON, using the "parseString" function like so:

```javascript
p.parseString(xmlStringSerialized, (err, result) => {
  const s = JSON.stringify(result, undefined, 3);
  res.end(s); //send JSON to the client
});
```

Give the example a try:

`node jsonREST.js`

Visit the URL again

`http://localhost:8081/menu`

You'll see nicely formatted JSON with the same data that our XML service provided.

## Coming Up

In the next lesson, we will revisit the GraphQL endpoint we created in week 7. We will create a new GraphQL endpoint that stands between the client (browser) and our REST service.

Today there is a huge push to convert APIs to GraphQL and away from exposing REST services. Why is this?

Well look at our service now. When we ask for the food items, it returns all of them at once.

But what if we only wanted items lower than 600 calories? Or perhaps items less than \$5 in price?

The REST specification makes no strong recommendations on how to handle such sorting and filtering, instead leaving it up to the developer to decide on best practices.

As a result, _almost every REST service functions slightly differently from other REST services._

Even in the same organization, you'll see multiple versions of the same API as decisions are made, then revised, then revised again about how to handle the specifics of the four "verbs". All of this leads to a great deal of inefficiency.

GraphQL is a proposed standard for APIs that allows the client to specify the exact information it wants. It is much more specific than the REST standard.

In our scenario, we are going to move our fictional organization forward to this latest standard - all while avoiding service disruptions to their older XML-based services.

Sounds good yes?

Let's step into the future!
