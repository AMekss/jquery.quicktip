// JQuery Quick Tip
// Inspired by Owain Lewis (www.Owainlewis.com)
// Fully rewritten by Artūrs Mekšs
(function($){
  jQuery.fn.quicktip = function(externalOptions){

    var options = $.extend({
          speed: 250,
          xOffset: 10,
          yOffset: 10,
          className: 'title',
          altTip: '-',
          css: {},
          cursor: 'default'
        }, externalOptions),
        titleElSelector = [".", options.className].join("");

    //Bind live events
    return (function(selector){
      $(selector).die().live({
        mouseover: function(e){
          //Show tooltip
          e.preventDefault();
          var $this = $(this),
              $titleEl = $(titleElSelector, $this);

          if (!$titleEl[0]){
            $this.append( $(["<span>", ($this.attr("title") || options.altTip), "</span>"].join("")).addClass(options.className).hide() );
            $titleEl = $(titleElSelector, $this);
          }
          $this.attr("title", "");  //IE fix attr("title", "") instead of removeAttr("title")
          if (options.cursor) $this.css('cursor', options.cursor);

          $("#tooltip").remove();
          $("body").append($(["<div>", $titleEl.html(),"</div>"].join("")).attr("id", "tooltip"));

          $("#tooltip")
            .css($.extend({
               top: (e.pageY + options.xOffset) + "px",
               left: (e.pageX + options.yOffset) + "px"
             }, options.css))
            .fadeIn(options.speed);
        },
        mousemove: function(e){
          //Recalc tooltip's position
          $("#tooltip").css({
            top: (e.pageY + options.xOffset) + "px",
            left: (e.pageX + options.yOffset) + "px"
          });
        },
        mouseout: function(e){
          //Remove tooltip from the DOM
          $("#tooltip").remove();
        }
      });
    })(this.selector);
  };
})(jQuery);

