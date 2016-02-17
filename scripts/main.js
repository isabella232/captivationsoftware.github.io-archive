(function($) {

  $(document).ready(function() {

    var $window = $(window);
    var $body = $('body');
    var $landing = $('.landing.section .background-overlay');
    var $overview = $('.overview.section');
    var $layout = $('.layout');

    $body.flowtype({
      maxFont: 30,
      minFont: 10
    });

    $window.on('pageshow load resize', function() {
      var top = 'inherit';
      if ($(window).width() > 992) {
        top = $(window).innerHeight() - $overview.outerHeight();
        if (top < 500) top = 500;
      }
      $layout.css('top', top);
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
