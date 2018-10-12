function reqListener() {
    var dcmt = JSON.parse(this.responseText);
    console.log(dcmt);
    console.log("Number of books: "+dcmt.bookStore.books.length);
  }
  
  function reqError(err) {
    console.log('Fetch Error :-S', err);
  }
  

  var oReq = new XMLHttpRequest();
  oReq.onload = reqListener;
  oReq.onerror = reqError;
  oReq.open('get', './json/bookstore.json', true);
  oReq.send();