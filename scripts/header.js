(function($) {

  $(document).ready(function() {
    var $window = $(window);
    var $toggle = $('.header .nav.btn');
    var $menu = $('.header .mobile-menu');

    $toggle.on('click', function() {
      $menu.toggleClass('hidden');
    });

    $window.on('resize', function() {
      $menu.addClass('hidden');
    });
  });
})(jQuery);
