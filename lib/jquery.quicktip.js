// JQuery Quick Tip
// Inspired by Owain Lewis (www.Owainlewis.com)
// Fully rewritten by Artūrs Mekšs
;(function($){

  var $tooltip = function(){
    return $("#tooltip");
  };

  jQuery.fn.quicktipCleanUp = function(){
    $tooltip().remove();
  };

  jQuery.fn.quicktip = function(externalOptions){
    var options, titleElSelector, positionY, positionX, coords, extEventsMap, liveEventsMap;

    options = $.extend({
      speed: 250,
      delay: 0,
      xOffset: 10,
      yOffset: 10,
      className: 'title',
      altTip: '-',
      css: {},
      cursor: null
    }, externalOptions);

    titleElSelector = [".", options.className].join("");

    positionY = function(e, $tooltip) {
      var topPos, tipHeight, winHeight, scrollTop, overflowTop, overflowBottom;

      tipHeight = $tooltip.outerHeight();
      winHeight = $(window).height();
      scrollTop = $(window).scrollTop();

      overflowBottom = ((winHeight + scrollTop) < (e.pageY + options.yOffset + tipHeight));
      overflowTop = overflowBottom && (e.pageY - scrollTop) < (options.yOffset + tipHeight);

      if (overflowBottom && !overflowTop) {
        topPos = (e.pageY - options.yOffset - tipHeight);
      } else {
        topPos = (e.pageY + options.yOffset);
      }

      return {top: topPos};
    };

    positionX = function(e, $tooltip) {
      var posX, tipWidth, winWidth, scrollLeft, overFlowLeft, overFlowRight;

      tipWidth =  $tooltip.outerWidth();
      winWidth = $(window).width();
      scrollLeft = $(window).scrollLeft();

      overFlowRight = (winWidth - scrollLeft) < (e.pageX +  options.xOffset + tipWidth);
      overFlowLeft = overFlowRight && (winWidth < tipWidth);

      posX = {};
      if (overFlowRight) posX.right = (0 - scrollLeft + options.xOffset);
      if (overFlowLeft) posX.left = (0 + scrollLeft + options.xOffset);
      // normal case - no overflows detected
      if (!overFlowLeft && !overFlowRight) posX.left = (e.pageX + options.xOffset);

      return posX;
    };

    coords = function(e) {
      return $.extend({}, positionX(e, $tooltip()), positionY(e, $tooltip()));
    };

    extEventsMap = {
      mousemove: function(e) {
        $tooltip().css(coords(e)); //Recalc tooltip's position
      },
      mouseout: function(e) {
        $(this).unbind(extEventsMap); //Clear events
        $tooltip().remove(); //Remove tooltip from the DOM
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
        $tooltip().remove();
        $("body").append($(["<div>", $titleEl.html(),"</div>"].join("")).attr("id", "tooltip"));
        $tooltip()
          .css($.extend(coords(e), options.css))
          .delay(options.delay)
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
