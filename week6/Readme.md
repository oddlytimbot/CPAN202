## Parsing Data with XML and JSON

Up to now we have looked at formatting and validating data structures using XML and JSON. When a document is well-formatted, it becomes easier to 1)parse, then 2)sort and filter.

This is an area where XML and JSON diverge significantly, so it will be necessary to look at each separately.

### Introducing XPath

The primary tool used to parse, or extract information from, and XML source is called Xpath.

* XPath stands for XML Path Language
* XPath uses path syntax to navigate nodes in an XML document
* XPath is convenient, with more than 200 functions for navigating data
* XPath is an element in the XSLT standard (which we will learn about)

Xpath consists of expressions used to navigate nodes, and functions used to qualify or transform the data of those nodes. This concept gets more clear by looking at some examples.

### XPath Nodes

In XPath, there are seven kinds of nodes: *element*, *attribute*, *text*, *namespace*, *processing-instruction*, *comment*, and *document* nodes.

XML documents are treated as trees of nodes. The topmost element of the tree is called the root element (as we have learned previously)

### Parents and Children

In order to start using Xpath, we have to understand the hierarchy of XML nodes, expressed as a parent-child relationship.

Consider the following XML document:

```html
<book>
  <title>Harry Potter</title>
  <author>J K. Rowling</author>
  <year>2005</year>
  <price cur="usd">29.99</price>
</book>
```

The document has a single root element `<book>`

Other than the root element, every element in the document is said to have a single parent. So in this example the `<title>` element has the root element `<book>` as a parent.

The same can be said for attributes, which always have an element as a parent. In the example above the attribute `cur` has as a parent the `<price>` element.

While nodes can have only one parent, they may have many children.

In the example, the `<title>`, `<author>`, `<year>` and `<price>` elements are all children of the `<book>` root element. They would also be termed siblings of each other, since they share the common parent. And any element can have multiple attributes, which are also considered children of the element. Those attributes would likewise be called sibling attributes.

### Ancestors and Descendants

Ancestors and descendants are related to parents and children but not exactly the same. Let's say we take the example above and change it so that the book is part of a collection.

```html
<bookStore>
    <book>
        <title>Harry Potter</title>
        <author>J K. Rowling</author>
        <year>2005</year>
        <price cur="usd">29.99</price>
    </book>
    <book>
        <title>Great Divide</title>
        <author>Timly K. Bot</author>
        <year>2097</year>
        <price cur="usd">29.99</price>
    </book>
</bookStore>
```

In this case, the `<book>` element is the only child of `<bookStore>`. But `<book>`, `<title>`, `<author>`, `<year>` and `<price>` would ALL be considered descendants of `<bookStore>`.

We can think of descendants as children and any children-of-children. Similarly ascendants are parents, and any parents-of-parents all the way up to a root node.

With a basic understanding of the terminology, it is useful to move on to an example of using Xpath to parse an XML document.

## Examples

In the following examples, we will use Javascript to parse XML (though it is important to understand that most languages have some version of Xpath)

In this example, we will assume that the XML document will be loaded in via something like an `XMLHttpRequest` or with the new fetch API. The main difference in these methods is that the Fetch API is promise-based, a more modern way to await a response from a network request.

As we did last week, we will use a Node based static server to run our tests.

The server will provide access to the HTML page, which will load in the Javascript. The Javascript will then need to load in the xml document, handle success or failure. Upon success, the responseText must be converted into an XML object which can then be parsed using Xpath. Let's set that up, then we can look into parsing.

In Javascript, we write two functions. One is for a successful load of the document, and one is to handle a failure.

```javascript
function reqListener() {
    var dcmt = this.responseText;
    console.log(dcmt);//string of xml
  }
function reqError(err) {
    console.log('Fetch Error :-S', err);
  }
```

Next we need to create the request object and actually load in the XML.

```javascript
var oReq = new XMLHttpRequest();
  oReq.onload = reqListener;
  oReq.onerror = reqError;
  oReq.open('get', './xml/bookstore.xml', true);
  oReq.send();
```

The object is configured to recognize the success and failure listener functions as callbacks. It is set to do an HTTP GET operation.

Assuming the XML document loads in, we should see it in the console.

At this time, the XML is treated as a single string of text (the `responseText`). That won't do - we need to be able to navigate through the ascender and descender nodes. There is a simple way to do this conversion from text to an xml object, but alas there is a browser incompatability with older IE browsers, so we will also need to use an ActiveX object with those.

```javascript
var xmlDoc;
    if (window.DOMParser)
    {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(dcmt, "text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(dcmt);
    }
```

In any case, the end-result is an XML object we can navigate with Xpath. Let's use it to see how many books are in the store.

```javascript
var bookCount = document.evaluate('count(//book)', xmlDoc, null, XPathResult.ANY_TYPE, null );
console.log("Number of books: "+bookCount.numberValue);
  
```


