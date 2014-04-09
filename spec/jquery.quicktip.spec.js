describe("jQuery.QuickTip", function() {
  it("should be available as jQuery plugin", function() {
    expect($.fn.quicktip).toBeDefined();
  });

  beforeEach(function() {
    loadFixtures("test_example.html");
    jasmine.Clock.useMock();
  });

  describe("testing with defaults", function(){
    beforeEach(function() {
      $(".tooltip").quicktip();
    });

    it("should show up on mouse over", function() {
      var scope = $("#tip_example").mouseover();
      jasmine.Clock.tick(1);
      expect($("#tooltip")).toBeVisible();
      expect($("#tooltip")).toHaveText("test tooltip");
      expect(scope.css("cursor")).toEqual("auto");
    });

    it("should hide on mouse out", function() {
      $("#tip_example").mouseover().mouseout();
      expect($("#tooltip")).not.toBeVisible();
      expect($("#tooltip")).not.toExist();
    });

    xit("should chane position on mouse move over the target", function() {
      // TODO need to find good way how to simulate mousemove with coords
    });

    it("should show tooltip from nested span with class title", function() {
      $("#tip_example_with_span1").mouseover();
      expect($("#tooltip")).toHaveText("test tooltip from span");
    });

    it("should show default tip text if tip text is empty", function() {
      $("#tip_example_with_empty_text1").mouseover();
      expect($("#tooltip")).toHaveText("-");
    });

    it("should be enable for elements which are inserted after DOM was loaded", function() {
      $("body").append("<span id='inserted_tip_example' class='tooltip' title='some text' > mouse over here </span>");
      $("#inserted_tip_example").mouseover();
      expect($("#tooltip")).toHaveText("some text");
    });
  });

  describe("testing with custom options", function() {
    it("should be able to change alternate tip", function() {
      $(".tooltip").quicktip({altTip: "this is alternate tip"});
      $("#tip_example_with_empty_text1").mouseover();
      expect($("#tooltip")).toHaveText("this is alternate tip");
    });

    it("should be able to change tip's placeholder class", function() {
      $(".tooltip").quicktip({className: "custom_class"});
      $("#tip_example_with_span2").mouseover();
      expect($("#tooltip")).toHaveText("test tooltip from span with custom class");
    });

    it("should be able to change cursor property", function() {
      $(".tooltip").quicktip({cursor: "pointer"});
      expect($("#tip_example").mouseover().css("cursor")).toEqual("pointer");
    });

    it("should be able to change css for tip", function() {
      $(".tooltip").quicktip({css: {color: "red", border: "1px solid green"}});
      $("#tip_example").mouseover();
      expect($("#tooltip").attr("style")).toContain("1px solid green");
    });

    it("should be able to bind tip on more then one selector with different optipons for each", function() {
      $(".tooltip").quicktip();
      $(".tooltip_custom").quicktip({altTip: "this is alternate tip"});
      $("#tip_example_with_empty_text1").mouseover();
      expect($("#tooltip")).toHaveText("-");
      $("#tip_example_with_empty_text2").mouseover();
      expect($("#tooltip")).toHaveText("this is alternate tip");
    });

    it("should be able to delay tip's show", function() {
      $(".tooltip").quicktip({delay: 500});

      $("#tip_example").mouseover();
      expect($("#tooltip")).not.toBeVisible();
      $("#tip_example_with_span1").mouseover();
      expect($("#tooltip")).not.toBeVisible();

      jasmine.Clock.tick(501);
      expect($("#tooltip")).toBeVisible();
      expect($("#tooltip")).toHaveText("test tooltip from span");
    })

  });
});