(function($) {
  $(document).ready(function() {
    var $menu = $('.menu').hide();
    var $hero = $('.hero');

    setInterval(function() {
      var max = 0;
      $hero.find('p').each(function(i, p) {
        var current = $(p).width();
        if (current > max) max = current;
      });
      $hero.width(max);
    }, 16);

    // Initialize fullpage.js
    $('#fullpage').fullpage({
      anchors: ['', 'our-difference', 'solutions', 'capabilities', 'careers', 'contact'],
      menu: '.menu',
      loopHorizontal: false,
      controlArrows: false,
      verticalCentered: false,
      responsiveWidth: 768,
      responsiveHeight: 700
    });

    // Initialize responsive font sizes
    $('body').flowtype({
      minimum: 300,
      maximum: 1200
    });

    $('.menu-placeholder').append($menu.show());

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
