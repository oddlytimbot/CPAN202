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

Lately Mongo has been pushing their cloud services, but the free community edition of Mongo is still available at the following link:

[Download Mongo 4.0.3](https://www.mongodb.com/download-center/v2/community)

[Installation Instructions](https://docs.mongodb.com/manual/administration/install-community/)

Extract the zip file you download. 

Place the "bin" folder at a location you are comfortable with. The suggestion on Windows is to place it at `C:\Program Files\MongoDB\Server\4.0\`

If you like, you can add this location to your PATH on Windows.

[Adding Environment Variables](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)

Alternatively, you can also download the MSI installer if you are on a Windows system. MongoDB Community Edition requires Microsoft Windows Server 2008 R2 or later or Microsoft Windows 7 or later for the x86 64-bit architecture. If you are unsure about your Windows installation, the MSI is a better option.

**Start the Server**

On Windows, you will use the command prompt to start up the mongo server, and specify a location to store your mongo databases. Using the command-line interpreter you will issue this command:

`"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\data\db"`

The command-line will issue a stream of information as the server opens up, ending in 'waiting for connections on port 27017'.

Keep that command-line window open to keep the server running.

In a second command-line window, use the client to connect to the server:

`"C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"`

You should see the client connect and you'll be left with an interpretive prompt you can use to run commands in your mongo databases. Try this command:

`show dbs`

This will show you any mongo databases currently installed. Among them will be the default "admin", "config", and "local" databases. You're ready to do some database work!


### Node Dependencies

We need several Node modules for this example. These are outlined in the `package.json` configuration file for easy installation.

Take note of the dependencies section.

```javascript
"dependencies": {
    "babel": "^5.8.23",
    "express": "^4.13.3",
    "express-graphql": "^0.4.5",
    "graphql": "^0.4.14",
    "mongoose": "^4.3.5"
  }
  ```

  From inside the 'week7/graphql-server' folder, run the following command using your terminal program:

  `npm install`

  This will cause NPM to look in the package.json and install all dependencies into your 'node_modules' folder.

  With the dependencies installed, you're ready to run the example, with the following command:

  `npm start`

  With the server open in one window, and the client open in another, we will see the client connect to the server - hooray! We now have a working service that uses GraphQL to connect and query a database using JSON.
  