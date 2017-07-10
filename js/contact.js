$(document).ready(function() {
  $("form").submit(function(e){
    e.preventDefault();

    var inputs = $("input[type='text']");
    var dictionary = {};
    inputs.each(function(index, element) {
      $(element).removeClass("form-validation");
      dictionary[$(element).attr('name')] = $(element).val();
    });

    $.post($(this).attr('action'), dictionary, function(data) {
      var button = $("button[type='submit']");
      button.css('display', 'none');
      button.siblings('p').text('Thank you for your interest in the Thin Skin Movie, expect updates soon!');
      inputs.each(function(index, element) {
        $(element).addClass("form-success");
      });
    }).fail(function(data) {
      var errors = $.parseJSON(data.responseText)["errors"];
      $.each(errors, function(index, element) {
        var input = $("input[name='" + index + "']");
        var sibs = input.siblings("span");
        sibs.text(element);
        input.removeClass("form-success");
        input.addClass("form-validation");
        input.siblings("span").val(element)
      });
    });
  });
});
