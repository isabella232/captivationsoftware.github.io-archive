(function($) {
  $(document).ready(function() {
    var templates = {
      menu: $('#menu-template').html()
    }

    // center the hero section so that it looks awesome
    function centerHero() {
      var max = 0;
      var $hero = $('.hero');
      $hero.find('p').each(function(i, p) {
        var current = $(p).width();
        if (current > max) max = current;
      });
      $hero.width(max);
    }

    // Initialize fullpage.js
    $('#fullpage').fullpage({
      anchors: ['', 'choose-us', 'solutions', 'capabilities', 'careers', 'contact'],
      menu: '.menu',
      loopHorizontal: false,
      controlArrows: false,
      verticalCentered: true
    });

    // Initialize responsive font sizes
    $('body').flowtype({
      minimum: 300,
      maximum: 1200
    });

    $('.menu-placeholder').append(templates.menu);

    $('.glyphicon-chevron-down').on('click', function() {
      $.fn.fullpage.moveSectionDown();
    });

    $('.glyphicon-chevron-up').on('click', function() {
      $.fn.fullpage.moveTo('', 0);
    });

    // Set Copyright to the current year
    $('.copyright').html('&copy; ' + new Date().getFullYear() + ' Captivation Software');

    // Due to issues with fullpage and flowtype, always
    // check to see if the hero needs to be updated
    var defer = requestAnimationFrame || setTimeout;
    var loop = function() {
      centerHero();
      defer(loop, 16)
    }
    loop();

  });
})(jQuery);
