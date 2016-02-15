(function($) {

  $(document).ready(function() {

    var $window = $(window);
    var $body = $('body');
    var $header = $('.header');
    var $footer = $('.footer');
    var $landing = $('.landing.section');
    var $contact = $('.contact.section');

    $window.on('pageshow load resize', function() {
      $landing.css('minHeight', window.innerHeight - landingOffset());

      var footerOffset = $footer.outerHeight();
      $contact.css('minHeight', window.innerHeight - footerOffset);
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

    function landingOffset() {
      var offset = 0;
      if (window.innerWidth > 992) offset = $landing.next('.section').outerHeight();
      return offset;
    }

    function headerOffset() {
      return $header.outerHeight();
    }
  });
})(jQuery);
