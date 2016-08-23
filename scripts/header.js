(function($) {

  $(document).ready(function() {
    var $window = $(window);
    var $header = $('.header');
    var $toggle = $header.find('.nav.btn');
    var $expander = $toggle.find('.expand');
    var $contracter = $toggle.find('.contract');
    var $menu = $header.find('.mobile-menu');

    var maxScroll;

    function toggleMenu(isOpen) {
      $expander.toggleClass('hidden', !isOpen);
      $contracter.toggleClass('hidden', isOpen);

      maxScroll = !isOpen ? $window.scrollTop() : undefined;

      $header.css({
        position: isOpen ? 'fixed' : 'absolute',
        top: isOpen ? 0 : $window.scrollTop()
      });

      $menu.toggleClass('hidden', isOpen);
    }

    $toggle.on('click', function() {
      var isOpen = $menu.is(':visible');

      toggleMenu(isOpen);
    });

    $window.on('resize', function() {
      toggleMenu(true);
    });

    $window.on('scroll', function() {
      if (maxScroll && $window.scrollTop() < maxScroll)
        window.scrollTo(0, maxScroll);
    });
  });
})(jQuery);
