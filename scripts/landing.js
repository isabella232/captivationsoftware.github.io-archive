(function($) {

  $(document).ready(function() {

    var $window = $(window);
    var $body = $('body');
    var $page = $body.find('.page');
    var $hero = $page.find('.hero');
    var $header = $page.find('.header');
    var $overlayImage = $page.find('.background-overlay img');

    $body.flowtype({
      maxFont: 30,
      minFont: 10
    });

    $window.on('pageload resize load', function() {
      var isWide = $window.width() > 991;
      var $overview = $page.find('.overview:visible');

      $page.height(isWide ? 0 : '')

      // Magic numbers, galore!!!
      // (I can't help what looks good...)
      var overlayRect = $overlayImage[0].getBoundingClientRect();
      var heroHeight = $hero.height();
      var top = isWide ?
        Math.max(($window.height() - heroHeight) / 2 - 50, 125) :
        overlayRect.height / 2 - (heroHeight / 2) + 90;

      $hero.css({ top: top });
    });

    // Set Copyright to the current year
    $('.copyright').html('&copy; ' + new Date().getFullYear() + ' Captivation Software, LLC');

    // Simple validation
    $('form :input').on('input change', function(e) {
      var $input = $(e.currentTarget);
      var $form = $input.closest('form');

      var missingRequired = false;
      $form.find('.required :input:visible').each(function(i, input) {
        if (input.value === '') missingRequired = true;
      });
      $form.find('button').prop('disabled', missingRequired);
    });

    // Send email
    $('form button').on('click', function(e) {
      var $button = $(e.currentTarget);
      var $form = $button.closest('form');
      $button.addClass('active').text('Sending...');
      $.ajax({
          url: '//formspree.io/info@captivationsoftware.com',
          method: 'POST',
          data: $form.serialize(),
          dataType: 'json',
          success: function() {
            // remove event listeners and update button
            $form.find(':input').off().val('');

            $button.off('click')
              .removeClass('error active')
              .addClass('success')
              .text('Sent');
            },
          error: function() {
            $button.removeClass('active').addClass('error').text('Try Again');
          }
      });
    });
  });
})(jQuery);
