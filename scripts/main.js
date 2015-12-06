(function($) {
  $(document).ready(function() {
    var templates = {
      menu: $('#menu-template').html(),
      chooseUs: $('#choose-us-template').html(),
      innovation: $('#innovation-template').html(),
      integration: $('#integration-template').html(),
      intelligence: $('#intelligence-template').html()
    };

    // Initialize fullpage.js
    $('#fullpage').fullpage({
      anchors: ['', 'choose-us', 'solutions', 'capabilities', 'careers', 'contact'],
      menu: '.menu',
      loopHorizontal: false,
      controlArrows: false,
      verticalCentered: true,
      paddingBottom: '60px',
      responsiveHeight: 400,
      afterLoad: function(anchor) {
        $.fn.fullpage.setAutoScrolling(window.innerWidth >= 992 || anchor !== 'solutions');
      },
      onLeave: function() {
        $.fn.fullpage.setAutoScrolling(true);
      }
    });

    // Initialize responsive font sizes
    $('body').flowtype({
      minimum: 300,
      maximum: 1200
    });

    // interpolate templates
    $('.menu-content').replaceWith(templates.menu);
    $('.choose-us-content').replaceWith(templates.chooseUs);
    $('.innovation-content').replaceWith(templates.innovation);
    $('.integration-content').replaceWith(templates.integration);
    $('.intelligence-content').replaceWith(templates.intelligence);


    $('.glyphicon-chevron-down').on('click', function() {
      $.fn.fullpage.moveSectionDown();
    });

    $('.glyphicon-chevron-up').on('click', function() {
      $.fn.fullpage.moveTo('', 0);
    });

    // Set Copyright to the current year
    $('.copyright').html('&copy; ' + new Date().getFullYear() + ' Captivation Software');
  });
})(jQuery);
