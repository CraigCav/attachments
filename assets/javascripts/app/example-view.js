define(function(require) {
  "use strict";

  var $ = require('jquery'),
      downloader = require('./downloader'),
      appcache = require('./appcache');

  function logControls() {
    return $('<ul id="log" />');
  }

  function log( text ) {
    var $log = $('<li class="log-entry" />');

    $log.text( text );

    return $log;
  }

  function syncControls() {
    var $log = logControls(),
        $trigger = $('<button class="sync-trigger" />');

    function setButtonText() {
      $trigger.text( 'Download attachments' );
    }

    $trigger.on( 'click', function( event ) {

      downloader.getIndex().then(function( attachments ) {

        attachments.forEach( function(key) {

          log( key ).appendTo( $log );

          downloader.addToCache( key );

        });

      });

      event.preventDefault();

    });

    appcache.on('checking', function( event ) {
      log( 'Checking for updates to ' + event.origin ).appendTo( $log );
    });

    appcache.on('downloading', function() {
      log( 'Started Download.' ).appendTo( $log );
    });
    
    appcache.on('progress', function( event ) {
      log( event.loaded + " of " + event.total + " downloaded." ).appendTo( $log );
    });

    setButtonText();
    $log.prependTo( document.body );

    return $trigger;
  }

  var render = function(element) {
    syncControls().prependTo( document.body );
  };

  return render;
});