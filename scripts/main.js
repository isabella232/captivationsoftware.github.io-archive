(function($) {

  $(document).ready(function() {

    var $window = $(window);
    var $body = $('body');
    var $landing = $('.landing.section');
    var $bgOverlay = $landing.find('.background-overlay');
    var $bgOverlayImg = $bgOverlay.find('img');
    var $overview = $('.overview');
    var $layout = $('.layout');

    $body.flowtype({
      maxFont: 30,
      minFont: 10
    });

    $window.on('pageload resize load', function() {
      var isWide = $window.width() > 991;

      if (isWide) {
        var height = $window.height();
        $landing.height(height - 80);
        $bgOverlayImg.css('clip', 'rect(0px, 2000000px, ' + (height + 50) + 'px, 0px)');
      } else {
        $landing.height($bgOverlayImg.height());
      }
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
