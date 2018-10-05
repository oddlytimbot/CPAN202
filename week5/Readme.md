Notes for week 5

In the last lesson we looked at validation methods for XML, including DTD and Schema.

Schema is  method of validating one XML document via another XML document. The first, the target of validation, contains data. The second, the schema, defines data structure and datatypes (which makes it different, and superior, to DTD validation)

This week we continue the discussion of data validation by going deeper with XML schema, and comparing it to two methods for validaing JSON.

## XML Schema Part 2

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

To try out validation with AJV, let's start with client-side validation for the example above.

We will need a way of serving up a web page. For this purpose, we will use Node to get a static server running.

### Install Node

Visit the following link to download and install Node if you do not already have it installed.

[Download Node](https://nodejs.org/en/download/)

Once installed, return to the "week5" folder in your CPAN202 repository.

In the repo for this course, you can find a very simple node server in the week 5 folder, which is simply called "server.js". This server is run with the command `node server.js 9000` which will run the server and set it listening on port 9000. Once this is running, you can visit the server in the browser by navigating to `http://localhost:9000`

The server looks for an index.html file to serve.

In the example folder you can find an HTML file that loads in a sample Javascript file. The JS file includes a data JSON and a schema JSON. The AJV tool is used to validate the data against the schema. Can you spot why the test fails with an error (*hint, look at the required fields)

## JSON Validation at Database

While the JSON Schema specification has been underway for some time now, in practice it is much more common to employ validation of data outside of the JSON, and instead employ validation at the database. After all, JSON is simply a text serialization of javascript objects, and as such there is little difference between validating it directly or validating it at the storage mechanism, which increasingly is some kind of document-based database (or "schema-less database" as they are commonly called).

A popular example is the combination of MongoDB and the Mongoose Schema Validator. 

MongoDB is a document-based schema-less database that uses JSON-style documents for data storage rather than the tables we find in traditional databases. With this style of database, it is very common to employ validation at the database. This is the purpose of Mongoose, a popular validation tool for the Mongo database.
