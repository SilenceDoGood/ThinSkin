$(document).ready(function() {
  $('a[href^="#"]').click(function(e) {
    e.preventDefault();
    var selector = $(this).attr("href");
    var section = $(selector);
    if (section.length)
      $('html,body').animate({
        scrollTop: $(selector).offset().top - 50
      }, 500);
  });

  $(window).resize(function() {
    resizeVideos();
    resizeSections();
  });

  function addResponsiveNavClass() {
    var element = $("#nav");
    var classes = $(element).attr("class").split(' ');
    if($.inArray("responsive", classes) === -1) {
      element.addClass("responsive");
    } else {
      element.removeClass("responsive");
    }
  }

  $(".icon").click(function() {
    addResponsiveNavClass();
  });

  $("#nav a:not(.icon)").click(function() {
    addResponsiveNavClass();
  });

  function resizeVideos() {
    $("iframe").each(function(index, element) {
      var ratio = 16 / 9;
      element = $(element);
      element.width($(window).width() * 0.9);
      element.height(element.width() / ratio);
    });
  }

  function resizeSections() {
    // var sections = [ "section#home" ];
    // $.each(sections, function(index, element) {
    // 	var height = $(window).height();
    // 	$(element).css({'height': height + 'px' });
    // });
  }

  resizeSections();
  resizeVideos();
});
