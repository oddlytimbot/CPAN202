var ajv = new Ajv();

var scma = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/product.schema.json",
  "title": "Product",
  "description": "A product from Acme's catalog",
  "type": "object",
  "properties": {
    "productId": {
      "description": "The unique identifier for a product",
      "type": "integer" },

    "productName": {
      "description": "Name of the product",
      "type": "string" } },


  "required": ["productId", "productName"] };


var dta = {
  "productId": 1 
};

var valid = ajv.validate(scma, dta);
if (!valid) {
  console.log(ajv.errors);
  document.getElementById("status").innerHTML = ajv.errors.length;
}