$(document).ready(function() {
  $("form").submit(function(e){
    e.preventDefault();

    var inputs = $("input[type='text']");
    var dictionary = [];
    inputs.each(function(index, element) {
      dictionary[$(element).attr('name')] = $(element).val();
    });

    $.post($(this).attr('action'), dictionary, function(data) {
      alert('SUCCESS!');
    }).fail(function(data) {
      alert('FAILURE');
    });
  });
});
