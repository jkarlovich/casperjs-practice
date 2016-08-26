var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});

casper.start('https://www.goodreads.com', function() {
  this.fillSelectors('form#sign_in', {
   'input[name="user[email]"]': 'jkjammers@hotmail.com',
   'input[name="user[password]"]': 'password'
  }, true);

});

casper.then(function() {
    this.echo(this.getTitle());
});

casper.then(function() {
    this.fill('form[action="/search"]', {q: 'The Da Vinci Code'}, true);
});

casper.then(function() {
  var foo = [];
  foo.push(casper.fetchText('a.bookTitle'));
  this.echo(foo); //prints the whole thing, this is not an array
});

casper.then(function() {
  var bookToAdd = this.getElementAttribute('.wtrButtonContainer > .wtrRight > .hiddenShelfForm > input[name="name"]', 'value');
  this.echo('value: ' + bookToAdd);
  this.evaluate(function() {
    document.querySelector('.wtrButtonContainer > .wtrRight > .hiddenShelfForm > input[name="name"]').setAttribute('value', 'currently-reading');
    //book.value = 'currently-reading';
    document.querySelector('form.hiddenShelfForm').submit();
    //return book.value;
  });
  this.echo('value: ' + this.getElementAttribute('.wtrButtonContainer > .wtrRight > .hiddenShelfForm > input[name="name"]', 'value'));
  //this.echo(this.getCurrentUrl());
});

// casper.then(function() {
//   var hager = this.getElementAttribute('.wtrButtonContainer > .wtrRight > .hiddenShelfForm > input[name="name"]', 'value');
//   // require('utils').dump(bookToAdd);
//   // this.echo(bookToAdd);
//   this.echo('getElementAttribute');
//   this.echo(hager);
// });

// casper.then(function() {
//   var startingPage = this.getElementAttribute('.wtrUserStatusPrompt > input', 'value');
//   this.echo('userstatusprompt.value ' + startingPage);
//   this.evaluate(function() {
//     document.querySelector('.wtrUserStatusPrompt > input').setAttribute('value', 84);
//     // pageNumber.value = 48;
//     // return pageNumber.value;
//   });
 
//   //require('utils').dump(percent);
//   this.echo(this.getCurrentUrl());
// });

casper.then(function() {
  this.echo('what is shelf value? ' + this.getElementAttribute('.wtrButtonContainer > .wtrRight > .hiddenShelfForm > input[name="name"]', 'value'));
  //this.click('a[href="/"]');
});

  casper.waitFor(function() {
    return casper.open('https://www.goodreads.com');
  }, function() {
    this.echo('url at now: ' + this.getCurrentUrl());
    this.click('div[aria-live="polite"] > button');
  });

  casper.then(function() {
    var aria = this.getElementAttribute('.longTextPopupForm > div > div > span > input', 'aria-label');
    this.echo('aria-label: ' + aria);
    var origval = this.getElementAttribute('.longTextPopupForm > div > div > span > input', 'placeholder');
    this.echo('original value: ' + origval);
    this.evaluate(function() {
      document.querySelector('.longTextPopupForm > div > div > span > input').setAttribute('value', 27);
    });
    this.echo('new value: ' + this.getElementAttribute('.longTextPopupForm > div > div > span > input', 'value'));
    this.click('.updateReadingProgress__headerToggle > button');
    this.click('button.longTextPopupForm__submitButton');
    this.reload(function () {
      this.echo('reloaded');
    });
    //this.evaluate(function () {
      //document.querySelector('form[action="/user/edit_fav_genres"]').submit();
      // document.querySelector('button.longTextPopupForm__submitButton').submit();
    //});
  });

  // casper.waitFor(function() {
  //   return res.currentHTTPStatus === 200;
  // }, function then() {
  //   this.echo(res.currentHTTPStatus);
  // });
  casper.waitFor(function () {
    return this.visible('.longTextPopupForm') === false ;
    }, function() {
      if(this.visible('.longTextPopupForm')) {
        this.echo('visible'); 
      } else {
        this.echo('not visible');
      }
      var checkvalue = this.getElementAttribute('.longTextPopupForm > div > div > span > input', 'value');
      this.echo('value: ' + checkvalue);
      //var checkvalue = casper.fetchText('.gr-progressBar > small > span > span');  
    }
  // casper.then(function() {
  //   if(this.visible('.longTextPopupForm')) {
  //     this.echo('visible'); 
  //     } else {
  //       this.echo('not visible');
  //     }
    // }, function() {
    //   var kolve = casper.fetchText('.gr-progressBar > small');
    //   this.echo(kolve);
    );
casper.run();