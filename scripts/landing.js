(function($) {

  $(document).ready(function() {

    var $window = $(window);
    var $body = $('body');
    var $page = $body.find('.page');
    var $landing = $page.find('.landing');
    var $hero = $page.find('.hero');
    var $overlayImage = $page.find('.background-overlay img');

    $body.flowtype({
      maxFont: 30,
      minFont: 10
    });

    $window.on('pageload resize load', function() {
      var isWide = window.innerWidth > 991;

      $landing.css({
        height: isWide ? $window.height() : ''
      });

      // Magic numbers, galore!!!
      // (I can't help what looks good...)
      var overlayRect = $overlayImage[0].getBoundingClientRect();
      var heroHeight = $hero.height();
      var top = isWide ?
        Math.max(($window.height() - heroHeight) / 2 - 50, 125) :
        overlayRect.height / 2 - (heroHeight / 2) + 90;

      $hero.css({ top: top });
    });

  });
})(jQuery);
