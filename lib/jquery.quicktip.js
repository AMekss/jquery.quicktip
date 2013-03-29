// JQuery Quick Tip
// Inspired by Owain Lewis (www.Owainlewis.com)
// Fully rewritten by Artūrs Mekšs
;(function($){
  jQuery.fn.quicktip = function(externalOptions){
    var options, titleElSelector, coords, extEventsMap, liveEventsMap;

    options = $.extend({
      speed: 250,
      xOffset: 10,
      yOffset: 10,
      className: 'title',
      altTip: '-',
      css: {},
      cursor: 'default'
    }, externalOptions);

    titleElSelector = [".", options.className].join("");

    coords = function(e) {
      return {
        top: (e.pageY + options.xOffset) + "px",
        left: (e.pageX + options.yOffset) + "px"
      };
    };

    extEventsMap = {
      mousemove: function(e) {
        $("#tooltip").css(coords(e)); //Recalc tooltip's position
      },
      mouseout: function(e) {
        $(this).unbind(extEventsMap); //Clear events
        $("#tooltip").remove(); //Remove tooltip from the DOM
      }
    };

    liveEventsMap = {
      mouseover: function(e){
        e.preventDefault();
        var $this = $(this),
            $titleEl = $(titleElSelector, $this);

        $this.bind(extEventsMap); //Bind additional mouse events

        if (!$titleEl[0]){
          var tip_html = ["<span>", ($this.attr("title") || options.altTip), "</span>"].join("");
          $this.append( $(tip_html).addClass(options.className).hide() );
          $titleEl = $(titleElSelector, $this);
        }

        $this.attr("title", "");  //IE fix attr("title", "") instead of removeAttr("title")

        if (options.cursor) $this.css('cursor', options.cursor);

        //Show tooltip
        $("#tooltip").remove();
        $("body").append($(["<div>", $titleEl.html(),"</div>"].join("")).attr("id", "tooltip"));
        $("#tooltip")
          .css($.extend(coords(e), options.css))
          .fadeIn(options.speed);
      }
    };

    //Bind live events
    return (function(selector){
      //.live .die events are deprecated since jQuery 1.7, use .on and .off methods instead with jQuery 1.7+
      if ($(document).on === undefined){
        $(selector).die().live(liveEventsMap);
      } else {
        $(document).off(false, selector).on(liveEventsMap, selector);
      }
    })(this.selector);
  };
})(jQuery);

