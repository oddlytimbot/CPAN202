## The Impact of Javascript

By now we have seen some of the similarities and differences between JSON and XML, and it is worth taking a moment to understand why JSON has become the predominant format for web development today. This has to do with the impact of javascript - the language that became the most popular coding language in the world.

By 2006, developers began to wonder about the fate of XML, and by 2010 it was largely displaced. What happened?

Firstly, we have to grasp that JSON is a *format* whereas XML is a *language*. What is the difference? As a format, JSON is best for transmission and interpretation at runtime. On the other hand, as a language XML needs to be interpreted and compiled like any other language such as Java or C++.

The tools for validating and  compiling XML are many, but they all work essentially the same - pull in the XML, interpret it, transform it in some way. Then a separate technology (like the browser) utilizes the result. A typical example would be to verify an XML document with a schema, then transform the document to HTML using XSLT. The resulting HTML would be served to a browser that can interpret HTML.

JSON, on the other hand generally bypasses that whole process. It is transmitted directly to the browser, where we rely on Javascript to interpret the data, utilizing it directly.

JSON won the battle because of fundamental changes to the way web applications are made today, which favors a client-side javascript-centric approach. Today it is impossible to argue this fact, given that all modern services are JSON-based and do not offer XML options.

XML is still in use in situations that do not require data transmission - for example generating email templates. These XML documents will be batched and run through some tool like XSLT to produce HTML files that the mailer will send out. In this case, the XML is not being transmitted anywhere.

But even for these use-cases, XML is steadily falling out of favor. Why maintain two stacks, when Javascript and JSON can do what XML is being used for? In the above example, a JSON document can replace the XML, and a Node app can replace the XSLT (more on this below).

The driver behind this change is Javascript. How did it become such a ubiquitous technology?

### Enter Node

In 2009, everything changed with the introduction of Node.js

In a nutshell, Node is a software that took the javascript interpreter from the open-source Chromium browser and used it to interpret javascript outside of the browser, notably on the server.

The natural progression of the growing popularity of Node was that Javascript quickly became adopted as a server-side language. Developers that had been constrained to client-side development now had the chance to be "full stack" developers, handling the server-side code, as well as database administration - all in one language. Add on to this a growing number of IT-as-service options like AWS and Azure, whose APIs are JSON-based, and the Javascript developer could now do everything.

Along with this, document-based databases emerged to support the trend to an all-javascript stack. These allow JSON to be stored directly, with no need for transformation. A web application employing Javascript, JSON, a database like Mongo and a Node server utilizes a single language all the way down, which is a very attractive proposition for most organizations.

Large organizations that drive trends in web development recognized this, and have switched over to JSON and Javascript-based solutions. They offer up services based on JSON, and quite often offer Javascript clients for consuming those services. This includes Google, Facebook, AirBnB, Twitter, and Amazon - all of whom have converted their online products to JSON.

This trend is going to continue. Today efforts are based on better utilizing the advantages of JSON with tools like GraphQL.

GraphQL is a standard for querying JSON-based services. It was created by Facebook to address the growing number of ways that service may be offered. In the past, REST was the popular standard, but today there are a wide variety of ways to offer services, many of them based on web-sockets (a popular example being Firebase by Google).

It is particularly notable that **all** AI and machine-learning APIs today are JSON-based. It is unlikely that XML will make a comeback.

In this lesson, we will create a full example of a modern development stack that utilizes Javascript-based technologies for serving up JSON.

This lesson will include:

* MongoDB - a document-based schema-less database
* Mongoose - a JSON validator
* Node.js - to establish a server
* Express module - server routing
* GraphQL - querying format for talking to the server

In the end, we will have a modern stack that is capable of receiving queries and returning JSON-formatted data. (In the future we will look at popular javascript frameworks for visualizing that data in UI)

## Software Installation

For this lesson we will need Node. You should have this already installed on your system from the previous lesson.

Along with Node, the installer would have installed NPM the node package manager, which we will use for installing some other tools.

### Mongo

For this example we will use MongoDB as our database. Along with the database we will need a client-driver used to connect and talk with the database.