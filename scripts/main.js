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

        resetForm();
        $('button').prop('disabled', true);
      }
    });

    function resetForm() {
      $('form')[0].reset();
    }

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

    $('.glyphicon-chevron-up, .footer .brand').on('click', function() {
      $.fn.fullpage.moveTo('', 0);
    });

    $('.sticky.footer .menu li').on('click', function(e) {
      var anchor = $(e.currentTarget).data('menuanchor');
      var $section = $('.section[data-anchor="' + anchor + '"]');
      if ($section.length === 0) return;

      var nextY =  $(window).scrollTop() + $section[0].getBoundingClientRect().y;
      window.scrollTo(0, nextY);
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
      if ($button.is(':disabled')) return;

      var $form = $button.closest('form');
      $button.addClass('active').text('Sending...');
      $.ajax({
          url: "//formspree.io/info@captivationsoftware.com",
          method: 'POST',
          data: $form.serialize(),
          dataType: 'json',
          success: function() {
            // remove event listeners and update button
            $form.find(':input').off();
            resetForm();
            $button.off('click')
              .removeClass('error active')
              .addClass('success')
              .text('Sent')
              .show();
          },
          error: function() {
            $button.removeClass('active').addClass('error').text('Try Again');
          }
      });
    });
  });
})(jQuery);
