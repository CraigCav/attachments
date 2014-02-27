define(function(require) {
  "use strict";

  var $ = require('jquery'),
      downloader = require('./downloader');

  function logControls() {
    return $('<ul id="log" />');
  }

  function attachment(url) {
    var $attachment = $('<li class="attachment" />');

    $attachment.text( url );

    return $attachment;
  }

  function syncControls() {
    var $trigger = $('<button class="sync-trigger" />');

    function setButtonText() {
      $trigger.text( 'Download attachments' );
    }

    $trigger.on( 'click', function( event ) {

      downloader.getIndex().then(function( attachments ) {

        attachments.forEach( function(key) {

          attachment( key ).appendTo( document.getElementById('log') );

          downloader.addToCache( key );

        });

      });

      event.preventDefault();

    });

    setButtonText();

    return $trigger;
  }

  var render = function(element) {
    logControls().prependTo( document.body );
    syncControls().prependTo( document.body );
  };

  return render;
});