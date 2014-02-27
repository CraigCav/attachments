define(function(require) {
  "use strict";

  var $ = require('jquery'),
      syncUrl = '/sync/attachments';

  function selectIndex(json) {
    return json && json.attachments || [];
  }

  function cachingIframe(url) {
    var $iframe = $('<iframe style="position:absolute;top:-999em;visibility:hidden"></iframe>');

    $iframe.attr('src', url);

    return $iframe;
  }

  return {
    getIndex: function() {
      return $.ajax( syncUrl )
              .then( selectIndex );
    },
    addToCache: function( url ) {
      cachingIframe( url ).prependTo( document.body );
    }
  };
});