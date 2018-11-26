## Exercise:

In a previous lesson, you learned to version code using Git, and your environment is set up for working.

It's time to write some XML!

Your mission has you working on an online menu for your favorite restaurant or hangout. To complete this assignment, I encourage you to find an actual restaurant menu, and attempt to model the data using what you know about XML.

Following completing the assignment with XML, you should attempt to model the same data using JSON to get familiar with the differences.

- Visit your favorite place to eat and snap a picture of the menu.
- Model the menu in XML
- Model the menu in JSON

_hints_

While completing this assignment, keep the documentation open that details best practices for formatting.

- think about good uses for [attributes](https://oddlylabs.com/Humber/CPAN202/src/master/week3#overusing-attributes)
- follow [best-practices for naming](https://oddlylabs.com/Humber/CPAN202/src/master/week3#xml-naming-rules) XML nodes

- be careful in JSON! It expects double-quotes to be used on keys, and any string values

There is an example document titled `simple.xml`, and another called `simple.json` to look at.

In the XML, note that the use of attributes is intentionally kept very light. The dollar-sign is taken out of the `<price>` node - this is so that the value of the node can be easily handled mathematically as a number. In the coming lessons, we can see how to sort/filter the nodes by price.

In the JSON, notice that string values must be encased in double-quotes, unlike the XML where everything is treated like a string. The "enum" is just one more key, since attributes are not used in JSON.

### Deliverables

When completed, you should have a menu.xml document, a menu.json document inside your week3 folder, that you have worked on in a "week3" branch. Add, commit, and push this to your repo. Then create a pull request to merge your week3 work to the master branch.

## Coming Up

In upcoming lessons we will learn how to parse, sort, and filter data. We will gain the critical skill of imposing validation on the data structure.

And beyond that, we will look at how tools like XSLT could be used to change the value of the "enum" attribute to support multiple currencies.

Further on, we will learn how to wrap legacy systems in very modern GraphQL endpoints - the new hotness that every organization is moving to.

In order to complete those exciting upcoming lessons, we will need a good working of knowledge of XML, and the various ways we work with it.
