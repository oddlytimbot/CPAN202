## About the Course

In 2018, we may wonder why we need to pay any attention to XML.

That is a valid question. XML essentially peaked in 2010. A quick look at Google Trends shows us a rapid drop in search patterns related to XML, and a steady rise of interest in JSON. Most notable texts related to XML were written between 2001 and 2007, and the standard has not changed since version 1.1.

[Google Trends](https://trends.google.com/trends/explore?date=all&geo=US&q=%2Fm%2F08745,%2Fm%2F05cntt)

Today most web services, and ALL cloud services are based on JSON.

But there are still quite a lot of reasons to be familiar with XML.

1. Legacy Systems

XML made such a huge impact on the world wide web that today many critical systems are still using it, and likely will be until they are entirely replaced. XML created the first mature standards for financial services, weather services, website syndication and more. Up to now it still permeates the web.

2. Configuration Documents

XML is still being used extensively today - it just might be hidden from you by a graphical interface. Because the XML standard became mature, many of the tools we use today store configuration information as XML. This is a smart choice because this data does not require transmission over the web, and thus does not benefit from the less verbose syntax of JSON. As an example, every Android application requires an XML-based configuration document. Many video-game mods rely on XML. Microsoft’s software suite uses it behind the scenes. And the widely popular SVG format for graphics is....you guessed it....XML.

3. Current Frameworks

Modern frameworks borrow heavily from concepts introduced in the heyday of XML and XSLT. Understanding these origins leads to a host of good practices related to separation of data and presentation. For example, the declarative syntax of the Angular framework bears a striking resemblance to functions built into XSLT, which is used to transform XML into presentation documents like XHTML. Validation for popular schema-less databases like Mongo with modern schema tools like Mongoose may happen via Javascript, but they owe a lot to earlier validation formats like DTD and Schemas. Understand these earlier formats and you'll comprehend newer methods much better.

We are unlikely to ever be entirely separated from XML.

That said, it is obvious that modern web development leans much more heavily on JSON today. The new standard is simpler, easier to write and parse, requires less bandwidth, and meshes perfectly with Javascript - the most ubiquitous programming language in the world.

For that reason, our course has an updated critical path that offers parallel information on both XML and JSON at each step. We will look at the way something is done in XML, then compare it to modern methods using JSON. Take a look at the course outline here:

[Course Outline](https://learn.humber.ca/bbcswebdav/pid-185725-dt-blog-rid-36587845_1/courses/3564.201870/XML-CriticalPath%20-%20Sheet1.pdf)

Notice that the course is organized according to the five essential aspects of working with data that you need to know, beginning with how to model data in both XML and JSON.

From there, we move on to the other aspects of working with data that you will always need no matter what format you are working in - validation, parsing/traversing/transforming, transmission, and finally some frameworks.

Notably absent in the critical path are some topics like securing data with authentication/encryption, as well as data persistence/storage. While these are critical topics, they are better covered in in courses like "MEAN stack". We will touch on them lightly, but will devote most of our attention to understanding modelling data and providing it via services.

I look forward to it!
