casper.test.begin('Suite', 1, function(test) {
  casper.start('https://www.goodreads.com', function() {
    test.assertUrlMatch('https://www.goodreads.com', 'url matches')
  });

  casper.then(function() {
    this.fillSelectors('form#sign_in', {
    'input[name="user[email]"]': 'jkjammers@hotmail.com',
    'input[name="user[password]"]': 'password'
    }, true);
    this.echo('logged in');
    //test.assert();
  });

  casper.waitFor(function() {
    return 'form[action="/search"]';
  }, function then() {
    this.fill('form[action="/search"]', {q: 'The Da Vinci Code'}, true);
  });

  casper.then(function() {
    var bar = this.evaluate(function (){
      var links = document.querySelectorAll('a.bookTitle span');
        return Array.prototype.map.call(links, function(e) {
          return casper.fetchText(e);
      });
    });
    this.echo(bar);
    // var books = document.getElementsByClassName('bookTitle');
    // for (i=0; i < books.length; i++) {
    //   foo.push(books[i].textContent());
    // };
    // this.echo(foo[0]);
    // })
    // this.echo(bar);
  });

  casper.then(function() {
    // var book = this.evaluate(function() {
    //   return this.getElementAttribute('a.bookTitle', 'itemprop');
    // });
    // this.echo(book);
    //this.echo(bookTitle);
    //test.assertEquals('casper.fetchText("a.bookTitle")', 'The Da Vinci Code (Robert Langdon, #2');
  // var bookToAdd = this.getElementAttribute('.wtrButtonContainer > .wtrRight > .hiddenShelfForm > input[name="name"]', 'value');
  // this.echo(bookToAdd);
  // this.evaluate(function() {
  //   document.querySelector('.wtrButtonContainer > .wtrRight > .hiddenShelfForm > input[name="name"]').setAttribute('value', 'currently-reading');
  //   //book.value = 'currently-reading';
  //   document.querySelector('form.hiddenShelfForm').submit();
  //   //return book.value;
  // });
  // this.echo(this.getElementAttribute('.wtrButtonContainer > .wtrRight > .hiddenShelfForm > input[name="name"]', 'value'));
  // this.echo('alkdfjalskdfjalsdkfj');
  // //this.echo(this.getCurrentUrl());
});


  casper.run(function() {
    test.done();
  });
});