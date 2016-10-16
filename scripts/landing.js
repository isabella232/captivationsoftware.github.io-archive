(function($) {

  $(document).ready(function() {
    var $html = $('html');
    var $body = $('body');
    var $scroller = $('html,body');
    var $landing = $body.find('.landing');
    var $hero = $landing.find('.hero');
    var $moreButton = $hero.find('.btn');
    var $moreSection = $landing.next();

    $body.flowtype({
      minFont: 10,
      maxFont: 30
    })

    $moreButton.on('click', function() {
      $scroller.animate({
        scrollTop: $moreSection.offset().top - 40
      });
    });

  });
})(jQuery);
