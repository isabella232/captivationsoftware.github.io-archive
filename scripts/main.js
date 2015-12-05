(function($) {
  $(document).ready(function() {
    var templates = {
      menu: $('#menu-template').html()
    }

    // center sections of the app
    function centerize() {
      var max = 0;
      var $hero = $('.hero');
      $hero.find('p').each(function(i, p) {
        var current = $(p).width();
        if (current > max) max = current;
      });
      $hero.width(max);
    }

    function progressiveFix() {
      for (var delay = 10; delay < 1000; delay *= 2) {
        setTimeout(centerize, delay);
      }
    }

    // Initialize fullpage.js
    $('#fullpage').fullpage({
      anchors: ['', 'choose-us', 'solutions', 'capabilities', 'careers', 'contact'],
      menu: '.menu',
      loopHorizontal: false,
      controlArrows: false,
      verticalCentered: true,
      paddingBottom: '85px',
      responsiveHeight: 400,
      afterResize: progressiveFix,
      afterRender: progressiveFix,
      onLeave: progressiveFix
    });

    // Initialize responsive font sizes
    var throttle;
    $('body').flowtype({
      minimum: 300,
      maximum: 1200
    });

    $('.menu-placeholder').replaceWith(templates.menu);

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
