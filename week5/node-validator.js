const Ajv = require('ajv');
const ajv = new Ajv();

//the schema json object
const scma = {
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
  };

//the data json object
const dta = {
    "productId": 1
};

let valid = ajv.validate(scma, dta);
if (!valid) console.log(ajv.errors);