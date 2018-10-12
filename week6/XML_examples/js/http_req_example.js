function reqListener() {
    var dcmt = this.responseText;
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

    var bookCount = document.evaluate('count(//book)', xmlDoc, null, XPathResult.ANY_TYPE, null );
    console.log(dcmt);
    console.log("Number of books: "+bookCount.numberValue);
  }
  
  function reqError(err) {
    console.log('Fetch Error :-S', err);
  }
  
  console.log("loading request");
  var oReq = new XMLHttpRequest();
  oReq.onload = reqListener;
  oReq.onerror = reqError;
  oReq.open('get', './xml/bookstore.xml', true);
  oReq.send();