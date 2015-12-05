(function($) {
  $(document).ready(function() {
    var templates = {
      menu: $('#menu-template').html(),
      chooseUs: $('#choose-us-template').html(),
    }

    // Initialize fullpage.js
    $('#fullpage').fullpage({
      anchors: ['', 'choose-us', 'solutions', 'capabilities', 'careers', 'contact'],
      menu: '.menu',
      loopHorizontal: false,
      controlArrows: false,
      verticalCentered: true,
      paddingBottom: '85px',
      responsiveHeight: 400
    });

    // Initialize responsive font sizes
    var throttle;
    $('body').flowtype({
      minimum: 300,
      maximum: 1200
    });

    // interpolate templates
    $('.menu-content').replaceWith(templates.menu);
    $('.choose-us-content').replaceWith(templates.chooseUs);


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
