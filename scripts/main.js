(function($) {
  $(document).ready(function() {
    var $menu = $('.menu').hide();
    var $hero = $('.hero');

    function centerHero() {
      var interval = 16;
      var iterations = 10;
      var loop = setInterval(function() {
        var max = 0;
        $hero.find('p').each(function(i, p) {
          var current = $(p).width();
          if (current > max) max = current;
        });
        $hero.width(max);
        if (--iterations <= 0) clearInterval(loop);
      }, interval);
    }

    // Initialize fullpage.js
    $('#fullpage').fullpage({
      anchors: ['', 'choose-us', 'solutions', 'capabilities', 'careers', 'contact'],
      menu: '.menu',
      loopHorizontal: false,
      controlArrows: false,
      verticalCentered: true,
      responsiveWidth: 768,
      responsiveHeight: 700,
      afterRender: function() {
        $(window).resize(centerHero);
        centerHero();
      }
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
