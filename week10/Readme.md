# GraphQL Endpoint

In this lesson, we will continue with modernizing our legacy XML service by implmenting a GraphQL endpoint, much like we previewed in week 7.

But what is GraphQL, and why do we need it?

In the previous lesson we created a simple web service capable of serving the same data (a list of foods) in XML or JSON. The standard we used is called REST.

REST is based on the four main http "verbs", namely;

- GET to retrieve data
- POST to provide data
- PUT to update data
- DELETE to remove data

A REST service will have an endpoint for every collection of data. So as an example an endpoint to retrieve a list of blog posts might look like `GET someurl.com:8080/posts`

With basic services the standard is pretty straightforward. But services rarely remain so simple. For example what if we wanted to limit the number of posts the service sends back to us? What if we wanted to filter or sort them by latest post? In these scenarios, developers have to start creating their own standards and best-practices for how to handle these options. So we might see the request done like this:

`GET someurl.com:8080/posts/latest`

But we also might see this:

`GET someurl.com:8080/posts?limit=10&sort=desc`

There are about a hundred ways to handle these kinds of specifics, and the specification is not strict about it. As a result, no two REST services work the same. Furthermore, organizations often end up having to version thier API as they run into problems with their REST implementation and are forced to re-write it. So we end up seeing endpoints multiply, like so:

`GET someurl.com:8080/v2.1/posts`

In some scenarios, developers have even ended up writing additional information into the headers of the http requests to work around stubborn API requirements.

This lack of specifics causes APIs to lack portability, and puts extra strain on developers.

GraphQL provides a solution for this problem.

From the GraphQL official website:

"GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data."

If we think about it, developers were already attempting to create a query language using variables in the URL of their REST services. GraphQL embraces that notion, and provides a set of standards for that query language, along with imposing type-checking. The goal is to have all web services work the same, so that developers do not have to adjust their front-end code with every change.

So how does it work?

### GraphQL Simplified

GraphQL does away with the four verbs of the REST service, paring it down to only POST calls. That POST call is used to make a request of the single GraphQL endpoint. The request may be to retrieve data, add new data, update or delete it.

The big difference from REST is that the GraphQL endpoint will apply type-checking to the data to ensure the request is being properly handled.

In previous lessons, we have looked at the concept of "schema" in XML. A schema allows a processor to validate each node of an XML document by type-checking the content of the node. GraphQL brings this same concept to API requests - something that has been lacking from REST services.

A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type. In our food list example, each food would be a type.

```javascript
type Food {
  name: String
  price: Number
  description: String
  calories: Number
  copy: String
}
```

In this case "Food" is a type, and it's properties like name, price, etc. are called "fields".

An important concept in GraphQL is that a client can request _just the fields it needs_ rather than receiving ALL fields as REST would usually do.

To support this, after declaring fields for a type, we move on to creating functions for retrieving values for each of the fields on that type. These functions collectively are called "resolvers".

In GraphQL terms, any request for data is called a query. Any request to add, change, or delete data is called a mutation. And there is a third operation type called "subscription" that can be used for getting realtime updates about data changes.

### Server vs. Client

It is important to understand that GraphQL defines a specification for communicating between a client and a server. In both places, the GraphQL implementation needs to be in place for that communication to work. Thankfully, libraries exist for most languages on both the client and server.

We have been working on wrapping a legacy XML-based service with a JSON-based API. The next step is creating a GraphQL endpoint for this service that will bring it up to modern standards - all without disrupting the function of the original service.

Let's get started!

To create our GraphQL endpoint, we will need

- The node express module
- The express-graphql library module
- The graphql module

Express provides the server, and will listen to incoming http requests. Express-graphql provides bindings between graphql and the express server. And the graphql module actually provides the functionality of the endpoint, handling all the type-checking on requests and responses.

Setting up our server is fairly straightforward.

_see index.js_

```javascript
const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema.js");

const app = express();
app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);
app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
```

This sets up our express server, gets it listening on port 4000, and creates the binding to graphql. Notice the two configuration options:

- schema - this is where we will define our types, queries, and mutations
- graphiql - this enables a GUI that will be very helpful for testing our service

Our server is ready, now we have to define the schema. Defining the schema happens in two steps. First we define types for the objects in our collection, then we define queries for working with those types.

### Define the Food Type

Because GraphQL is meant to be used in any language, it defines it's own types to type-check against that map to types native to that language. This allows GraphQL types to be used across languages without significant modification.

Using GraphQL types is pretty easy. First we must import them from the GraphQL library. Then we use them to define our own object types, in this case the "Food" object.

First, require the types we need:

```javascript
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
```

We can now use these types to define the fields of our objects. Type defenitions require at a minimum a name, and fields, which is a function that returns an object listing out all the relevant fields for that type.

It sounds complex, but it actually is pretty straightforward. The code below is an example of defining the "Food" object type. The fields are taken directly from the week9 example files. Here we define fields for name, price, description, calories, and copy.

```javascript
const FoodType = new GraphQLObjectType({
  name: "Food",
  fields: () => ({
    name: { type: GraphQLString },
    price: { type: GraphQLString },
    description: { type: GraphQLString },
    calories: { type: GraphQLInt },
    copy: { type: GraphQLString }
  })
});
```

We now have the Food type defined. By doing this alone we have greatly enhanced our API over a standard REST API, which does not include type checking.

The implications of this type checking are even bigger - in a few more steps we will see how these type definitions enable a client to request just the specific fields they need from any query.

Speaking of queries, every GraphQL endpoint needs at least one. This first query is called the RootQuery, and it is time for us to create one.

A query looks a lot like a type definition, in that it takes a "name" and a "fields" object. Optionally, it can also take an "args" or arguments property that can be used to filter the query. Take a look at an example:

```javascript
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    food: {
      type: FoodType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        //this is where we actually dig into the data
      }
    }
  }
});
```

In the example above we have filled out the RootQuery by giving it a "food" field. Requests to that food query expect to return objects that validate against our FoodType object.

Now we see why we needed to define FoodType, giving it types like string or integer for each field.

In this example, we have allowed one argument to be given to the query - the name of the food we are searching for. This is defined as a string.

Lastly, the resolve function is very important - this is where we finally dig into the data. This data might come from a database, a REST service, a third-party API, flat-file, or anything else we could think of. This is quite powerful!

To complete this example for testing, we can copy some output from our week9 'jsonREST.js' service. We will put it into our schema file directly as an object.

_see schema.js_

```javascript
const foods = [
  {
    name: "Belgian Waffles",
    price: "$5.95",
    description:
      "Two of our famous Belgian Waffles with plenty of real maple syrup",
    calories: "650",
    copy: "Copyright: OddlyStudios."
  },
  {
    name: "Strawberry Belgian Waffles",
    price: "$7.95",
    description:
      "Light Belgian waffles covered with strawberries and whipped cream",
    calories: "900",
    copy: "Copyright: OddlyStudios."
  }
];
```

We can now return to fill out our resolve function in the query. A simple loop that compares args.name to each name in our foods array should do it.

Our resolve function ends up looking like this:

```javascript
resolve(parentValue, args) {
        for (let i = 0; i < foods.length; i++) {
          if (foods[i].name == args.name) {
            return foods[i];
          }
        }
      }
```

And just like that, we have a completed GraphQL endpoint ready for testing.

Thankfully, a very good GUI for querying GraphQL is provided out of the box. You'll recall we turned it on in our index.js file by specifying "graphiql: true".

Go ahead and start up the service:

`node index.js`

You can now visit the GUI for testing:

`http://localhost:4000/graphql`
