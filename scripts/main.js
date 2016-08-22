(function($) {

  $(document).ready(function() {

    var $window = $(window);
    var $body = $('body');
    var $page = $body.find('.page');
    var $bgOverlay = $page.find('.background-overlay');
    var $bgOverlayImg = $bgOverlay.find('img');
    var $hero = $bgOverlay.find('.hero');

    $body.flowtype({
      maxFont: 30,
      minFont: 10
    });

    $window.on('pageload resize load', function() {
      var isWide = $window.width() > 991;

      $page.height(isWide ? 0 : '')

      var heroTop = '';
      if (isWide) {
        heroTop = Math.min($bgOverlayImg.height(), $window.height()) / 2;
      }
      $hero.css({top: heroTop});
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
