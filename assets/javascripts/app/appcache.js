define(function(require) {
  'use strict';

  var $ = require('jquery');
 
  var statuses = {
    "-1": 'timeout',
    "0": 'uncached',
    "1": 'idle',
    "2": 'checking',
    "3": 'downloading',
    "4": 'updateready',
    "5": 'obsolete'
  };

  var eventAggregator = $('<div />');

  var appcache = {
    logEvent: function ( event, url ) {   
      event.origin = url;  

      var customEvent = $.Event( event.type );
      
      $.extend( customEvent, event.originalEvent, { origin: url } );
      
      // publish the event for any interested subscribers
      eventAggregator.trigger( customEvent );
      
      // TODO: remove caching iframes 
    },
    on: function( eventName, callback ) {
      eventAggregator.on( eventName, callback );
    },
    off: function( eventName ) {
      eventAggregator.off( eventName );
    }
  };

  // expose global to allow communication across iframes
  window.APP = {
    appcache: appcache
  };
 
  return appcache;
});