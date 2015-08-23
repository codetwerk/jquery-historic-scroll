(function($) {
  $.extend({
    historic: function(options) {
      if (!window.history) {
        console.log("HistoryScroll feature not enabled since your browser doesn't support the HTML5 History API.");
        return false; // just in case browser IE9 & below being used
      }

      var loading = true,
        scrolling = false,
        historyScrollHandler = function() {
          if (loading || scrolling) return false; // kill history update if loading
          var elements = Array.prototype.slice.call(document.querySelectorAll(settings.cssSelector));
          // Find first element in view with data-history attribute and set history state.
          var i = 0,
            len = elements.length;
          while (i < len) {
            if (isScrolledIntoView(elements[i])) {
              var queryString = "?" + elements[i].getAttribute(settings.attribute);
              if (window.location.search === queryString) continue; // if its already set, continue to check next element
              // otherwise update history then break out
              window.history.pushState(null, null, queryString);
              break;
            }
            i++;
          };
        },
        historyOnLoadHandler = function() {
          // scrollTo on load
          var query = window.location.search,
            element = (jQuery(window.location.search.replace('?', '.')).length) ? jQuery(window.location.search.replace('?', '.')) : jQuery(window.location.search.replace('?', '#'));
          // Handle the loading ?query and scrollTo position
          if (window.location.search !== "") {
            if (element.length) {
              scrolling = true;
              jQuery('html, body').animate({
                scrollTop: element.offset().top + "px"
              }, defaults.speed, function() {
                scrolling = false;
              });
            }
          }
          loading = false;
        },
        isScrolledIntoView = function(elem) {
          var $elem = jQuery(elem);
          var $window = jQuery(window);

          var docViewTop = $window.scrollTop();
          var docViewBottom = docViewTop + $window.height();

          var elemTop = $elem.offset().top;
          var elemBottom = elemTop + $elem.height();

          return ((docViewTop < elemTop) && (docViewBottom > elemBottom));
        };

      var defaults = {};
      defaults.callback = historyOnLoadHandler;
      defaults.attribute = 'data-history';
      defaults.cssSelector = '[' + defaults.attribute + ']';
      defaults.speed = 800;

      var settings = $.extend({}, defaults, options);

      window.onscroll = function() {
        historyScrollHandler();
      };
      window.onload = historyOnLoadHandler;

      // Can override default handling on popstate event if necessary.
      window.addEventListener('popstate', settings.callback);

      return this;
    }
  });
}(jQuery));
