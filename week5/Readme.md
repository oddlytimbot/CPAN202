Included in this week's examples are:

* A simple node based web server
* An example of JSON validation with JSON Schema

In the last lesson we looked at validation methods for XML, including DTD and Schema.

Schema is  method of validating one XML document via another XML document. The first, the target of validation, contains data. The second, the schema, defines data structure and datatypes (which makes it different, and superior, to DTD validation)

This week we continue the discussion of data validation by going deeper with XML schema, and comparing it to two methods for validaing JSON.

## XML Schemas Part 2

Last week we took a quick look at XML Schemas in advance of diving in deeper in this lesson.

Do you recall?

* Schemas are used for validation
* Schemas support data types, including strings, numbers, booleans
* Schemas support namespaces and can be extended
* Schemas are written in XML (and so can be validated themselves!)

### Why Care About Data types?

Support for data types is a huge strength of Schemas over DTD validation.

* It is easier to describe allowable document content
* It is easier to validate the correctness of data
* It is easier to define restrictions on data
* It is easier to define data patterns (data formats)
* It is easier to convert data between different data types

Additionally because schemas are written in XML, all the extensibility rules apply. In other words, XML schemas can be loaded in and composed with other XML schemas to make fairly complex validators.

### Referencing a Schema in an XML Document

This XML document has a reference to an XML Schema:

```html
<?xml version="1.0"?>

<note xmlns="https://www.oddlystudios.com"
xmlns:xsi="http://www.oddlystudios.com/2018/XMLSchema-instance"
xsi:schemaLocation="https://www.oddlystudios.com note.xsd">

<to>Timbot</to>
<from>Mila</from>
<heading>Reminder</heading>
<body>Don't forget our special weekend!</body>
</note>
```
The schema is contained in the `note.xsd` file, and is in the same local directory with the XML document.

The `xmlns` reference declares that all the elements in the XML are in the same namespace (distinguished by a URL).

Take a look at the `schemaLocation` attribute. This attribute has two values, separated by a space. The first value is the namespace to use. The second value is the location of the XML schema to use for that namespace, in this case `note.xsd`.

```html
<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
targetNamespace="https://www.oddlystudios.com"
xmlns="https://www.oddlystudios.com"
elementFormDefault="qualified">

<xs:element name="note">
  <xs:complexType>
    <xs:sequence>
      <xs:element name="to" type="xs:string"/>
      <xs:element name="from" type="xs:string"/>
      <xs:element name="heading" type="xs:string"/>
      <xs:element name="body" type="xs:string"/>
    </xs:sequence>
  </xs:complexType>
</xs:element>

</xs:schema>
```

### Using a Validator

To validate an XML document against and XSD schema requires the use of validation software, outside of the browser.

Many such validators exist, and some are available online.

Try out the examples in the "xml_examples" folder with an online validator:

[XML XSD Validator](https://www.freeformatter.com/xml-validator-xsd.html)

In the time since 2010, XML has lost favour as a transmission format for data on the web. As such, there are not a lot of validators available for use on modern servers like Node, which tend to support JSON.

## JSON Validation with Schema

There is actually and effort underway to submit a JSON Schema specification as an RFC (request for consideration) with the W3C. If accepted, this specification would become an official standard, and a candidate to become a first-place citizen in browsers. This would mean browsers would incorporate methods for validation of JSON into their core code based on those specifications.

Currently JSON Schema is an opt-in process involving Javascript software that validates data against a schema document following the standard.

Here is an example of a JSON Schema validation document:

```javascript
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/product.schema.json",
  "title": "Product",
  "description": "A product in the catalog",
  "type": "object"
}
```
The format roughly follows the format of an XML Schema document, beginning with a prolog, then an `$id` that resembles a namespace.

Following the initial prolog and namespace, each data type is described in detail, including a description and a type.

Thinking of an example like a product catalog, how might we model the JSON Schema of items in the catalog? We might come up with:

```javascript
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/product.schema.json",
  "title": "Product",
  "description": "A product from Acme's catalog",
  "type": "object",
  "properties": {
    "productId": {
      "description": "The unique identifier for a product",
      "type": "integer"
    }
  },
  "required": [ "productId" ]
}
```
This validation schema defines a product.

Note the "type" and "properties" keywords. These indicate the the "product" type is an object datatype (a complex type). Those product objects have a "productId" property, which has it's own description and is defined as an "integer" type.

The "productId" is marked as "required" by being included in an array of required properties.

Adding additional properties is a matter of defining their types and descriptions alongside the "productId". These additional properties can also be included as required by adding their names to the array.

The following example adds a "productName" property, and makes it required.

```javascript
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/product.schema.json",
  "title": "Product",
  "description": "A product from Acme's catalog",
  "type": "object",
  "properties": {
    "productId": {
      "description": "The unique identifier for a product",
      "type": "integer"
    },
    "productName": {
      "description": "Name of the product",
      "type": "string"
    }
  },
  "required": [ "productId", "productName" ]
}
```

A valid JSON document that matches the schema would include an Id and name, whose types would be an integer and a string respectively.

```javascript
{
    "productId": 1,
    "productName": "An ice sculpture"
}
```

### Validation

There are several ways we might validate the JSON data against the schema. In web applications, we could employ either server-side validation or client-side validation.

Server-side validation is accomplished by running software that compares the data against the schema and flags it as either valid or invalid. This software can be written in any language that can run on the server, but it is typical to employ Javascript in a Node environment.

Client-side validation is always accomplished via Javascript in the browser.

At times, we might employ both server-side and client-side validation but this is typically not necessary. Still, since Javascript can be run both on the server and in the browser, the possibility exists for performing validation in either environment or both.

Since the JSON Schema specification is not yet a standard, we will need a tool to perform validation, such as the "AJV" library.

[AJV on Github](https://github.com/epoberezkin/ajv)

### Client-Side Validation

To try out validation with AJV, let's start with client-side validation for the example above.

We will need a way of serving up a web page. For this purpose, we will use Node to get a static server running.

### Install Node

Visit the following link to download and install Node if you do not already have it installed.

[Download Node](https://nodejs.org/en/download/)

Once installed, return to the "week5" folder in your CPAN202 repository.

In the repo for this course, you can find a very simple node server in the week 5 folder, which is simply called "server.js". This server is run with the command `node server.js 9000` which will run the server and set it listening on port 9000. Once this is running, you can visit the server in the browser by navigating to `http://localhost:9000`

The server looks for an index.html file to serve.

In the example folder you can find an HTML file that loads in a sample Javascript file. The JS file includes a data JSON and a schema JSON. The AJV tool is used to validate the data against the schema. Can you spot why the test fails with an error (*hint, look at the required fields)

### Server-side Validation

For our next example, we will detect errors server-side using a node application. We will use the same validation tool AJV for this - showing that the same javascript library can be used in both situations.

Take a look at server-validation.js, and try running it with the command:

 `node server-validation.js`

 In this case the validation process is the same, but is performed by a node module entirely server-side.

 The output from the console should indicate the error, and it does so as a json object.

 ```javascript
 [ { keyword: 'required',
    dataPath: '',
    schemaPath: '#/required',
    params: { missingProperty: 'productName' },
    message: 'should have required property \'productName\'' } ]

```

With these two examples, we can see a method of validating JSON both client-side and server-side.

All of this said, it is important to remember that JSON Schema is a specification, but not yet a standard. Therefore it is important to know about other ways that validation is achieved in the Javascript world.

## JSON Validation at Database

While the JSON Schema specification has been underway for some time now, in practice it is much more common to employ validation of data outside of the JSON, and instead employ validation at the database. After all, JSON is simply a text serialization of javascript objects, and as such there is little difference between validating it directly or validating it at the storage mechanism, which increasingly is some kind of document-based database (or "schema-less database" as they are commonly called).

A popular example is the combination of MongoDB and the Mongoose Schema Validator. 

MongoDB is a document-based schema-less database that uses JSON-style documents for data storage rather than the tables we find in traditional databases. With this style of database, it is very common to employ validation at the database. This is the purpose of Mongoose, a popular validation tool for the Mongo database.
