## XML Validation

There are two sides to having XML documents that work well. They must be both *well formed* and *valid*.

Well-formed refers to an XML document that is syntactically correct, with no mal-formed tags or elements.

Valid XML refers to a document that has had it's hierarchy and datatypes confirmed to abide by a specification.

Consider natural language. With a good understanding of syntax you can speak full sentences that are gramatically valid...but people may not understand you if you don't understand context and loca custom. Communicating well requires both proper grammar and understanding of context and culture. The situation is similar with XML, which requires to be both well-formed and valid for the context of the software.

## Well Formed XML Documents
An XML document with the right syntax is called "Well Formed".

Do you recall?

* XML documents need a single root element
* XML elements must always have an opening and closing tag
* XML tags are case sensitive
* XML elements must maintain a hierarchy
* XML attribute values must be strings inside quotes

Here is an example of a well-formed document:

```html
<?xml version="1.0" encoding="UTF-8"?>
<note>
<to>Timbot</to>
<from>Mila</from>
<heading>Reminder</heading>
<body>Don't forget our special weekend!</body>
</note>
```

## XML Errors Halt Operation
Mal-formed XML documents will halt your XML applications.

The W3C XML specification states that a program should stop processing an XML document if it finds an error. The software is required to throw an error and bail out. So for example the browser will be much more strict with XML than it is with HTML, where it will gloss over common errors and attempt to render. 

HTML browsers are allowed to display HTML documents with errors (like missing end tags).

With XML, such errors are not allowed. This is strictly enforced.

## XML Syntax Checking

Because the browser is strict in interpreting XML, one way to validate an XML document is to simply load it into the browser and see what happens.

But there are better validators we can use that can highlight a problem in our code.

*Try validating the XML for the menu you created in week3*

[XML Validation Online](https://codebeautify.org/xmlvalidator)

The tool above will check that the XML is well-formed. But we need to do more to ensure the XML is also "valid".

## Valid XML Documents

This check for validity is performed against a document type definition - a list of types allowed in the XML, against a hierarchy.

There are two different document type definitions that can be used with XML:

* DTD - The original Document Type Definition
* XML Schema - An XML-based alternative to DTD

A document type definition defines the rules and the legal elements and attributes for an XML document.

## Using DTD Validation

The earliest means for enforcing type-checking on an XML document is the DTD (document type declaration).

The DTD is a set of type rules that can be either declared inside the XML document, or stored in a separate document that accompanies the XML. Let's start by making a very simple validator for our note example above.

*Example note.dtd*

```html
<!DOCTYPE note
[
<!ELEMENT note (to,from,heading,body)>
<!ELEMENT to (#PCDATA)>
<!ELEMENT from (#PCDATA)>
<!ELEMENT heading (#PCDATA)>
<!ELEMENT body (#PCDATA)>
]>
```

This file would be stored alongside the XML document.

`!DOCTYPE note` - defines the root element of the XML
`<!ELEMENT note (to,from,heading,body)>` - enforces that the root must contain to, from, heading, and body elements (hierarchy)

Following that, each of the elements are defined as "#PCDATA", which refers to parse-able text data (or strings of alpha-numeric characters).

Besides enforcing hierarchy, a DTD can also be used to define special characters for use in the XML document. The following are examples of declarations that can be used inside the "note" root element:

```html
<!DOCTYPE note [
<!ENTITY nbsp "&#xA0;"> 
<!ENTITY writer "Writer: Donald Duck.">
<!ENTITY copyright "Copyright: W3Schools.">
]>
```

Here we have declared a space special character, some content (a writer and a copyright notice). To use these declarations in the XML is simple.

```html
<note>
<footer>&writer;&nbsp;&copyright;</footer>
</note>
```

Because these declarations are used inside the "note" root element, they with be substituted with values from the DTD. 

## What is the Point?

By using a DTD, distributed groups of people can agree on a starndard for exchanging information. This can be enforced by defining the DTD, and using it to verify the XML document.

## When to Use DTD

Data type declarations are good to implement when the data form is relatively well known - past the rapid prototyping stage. In other words the software is far enough along to write a specification based on use-cases.

If the DTD is written too early, it can impede progress by restricting flexibility in the software.

While the humble DTD was a good start in validating XML, more sophisticated methods exist. Lets move forward and look at schemas.

## XML Schemas

XML Schema is an XML-based alternative to DTD. Here is an example, based on our note above.

```xml
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
```

Schemas work much like a DTD, but are more powerful because they support true data types, unlike our DTD which only knows about "PCDATA" types. Schemas support defining strings, numbers, booleans.

`<xs:element name="note">` - defines the root element
`<xs:complexType>` - states that "note" is a complex type, composed of elements
`<xs:sequence>` - starts the sequence of elements

Within the sequence, each element has a type definition. For example the "to" element is defined as a string:

`<xs:element name="to" type="xs:string"/>`

XML Schemas have the following options not included in DTD validation:

* they are written in XML
* they can be extended
* they support true data types
* they support namespaces

## Why Use Schemas?

The reason for using schemas is the exact same as the reasons for using DTDs. The XML file gets a description of it's format. Distributed teams can agree on standards and enforce them. They can be used to verify data.

There are some additional benefits as well. Since Schemas are XML, they can be checked for being well-formed using validation tools like the one above. They can be parsed like any XML document, and edited in any XML editor. Later on we will see that they can also be transformed with tools like XSLT.

Schemas allow us to use XML to validate XML - very cool.