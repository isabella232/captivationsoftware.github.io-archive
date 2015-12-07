(function($) {
  $(document).ready(function() {
    var templates = {
      menu: $('#menu-template').html(),
      chooseUs: $('#choose-us-template').html(),
      innovation: $('#innovation-template').html(),
      integration: $('#integration-template').html(),
      intelligence: $('#intelligence-template').html(),
      jobs: $('#jobs-template').html(),
      capabilities: $('#capabilities-template').html(),
      contact: $('#contact-template').html()
    };

    // Initialize fullpage.js
    $('#fullpage').fullpage({
      anchors: ['', 'choose-us', 'solutions', 'capabilities', 'careers', 'contact'],
      menu: '.menu',
      loopHorizontal: false,
      controlArrows: false,
      verticalCentered: true,
      paddingBottom: '60px',
      responsiveHeight: 600,
      responsiveWidth: 992,
      fixedElements: '.sticky',
      onLeave: toggleSticky,
      afterLoad: toggleSticky,
      afterResize: function() {
        $('.section .menu').fixTo('refresh');
      },
      afterRender: function() {
        // interpolate templates
        $('.menu-content').replaceWith(templates.menu);
        $('.choose-us-content').replaceWith(templates.chooseUs);
        $('.innovation-content').replaceWith(templates.innovation);
        $('.integration-content').replaceWith(templates.integration);
        $('.intelligence-content').replaceWith(templates.intelligence);
        $('.jobs-content').replaceWith(templates.jobs);
        $('.capabilities-content').replaceWith(templates.capabilities);
        $('.contact-content').replaceWith(templates.contact);

        $('.section').each(function(i, section) {
          var $section = $(section);
          $section.find('.menu').fixTo($section, {
            top: window.innerHeight / 2 - 80,
            bottom: window.innerHeight / 2 - 80
          });
        });

        $('form')[0].reset();
        $('button').prop('disabled', true);
      }
    });

    function toggleSticky(index1, index2) {
      $('.sticky').toggleClass('invisible', index1 == 0 || index2 == 0)
    }

    // Initialize responsive font sizes
    $('body').flowtype({
      minimum: 300,
      maximum: 1200
    });

    $('.glyphicon-chevron-down').on('click', function() {
      $.fn.fullpage.moveSectionDown();
    });

    $('.glyphicon-chevron-up').on('click', function() {
      $.fn.fullpage.moveTo('', 0);
    });

    // Set Copyright to the current year
    $('.copyright').html('&copy; ' + new Date().getFullYear() + ' Captivation Software, LLC');

    $('form :input').on('input change', function(e) {
      var $input = $(e.currentTarget);
      var $form = $input.closest('form');

      var missingRequired = false;
      $form.find('.required :input:visible').each(function(i, input) {
        if (input.value === '') missingRequired = true;
      });
      $form.find('button').prop('disabled', missingRequired);
    });

    $('form button').on('click', function(e) {
      var $button = $(e.currentTarget);
      if ($button.is(':disabled')) return;

      var $form = $button.closest('form');

      $.ajax({
          url: "//formspree.io/info@captivationsoftware.com",
          method: 'POST',
          data: $form.serialize(),
          dataType: 'json',
          success: function() {
            $button.off('click')
              .removeClass('error')
              .addClass('success')
              .text('Sent');
          },
          error: function() {
            $button.addClass('error').text('Try Again');
          }
      });

    });
  });
})(jQuery);
