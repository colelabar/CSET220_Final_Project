$(document).ready(function() {

  // AJAX call to fetch the response headers and assign an error message if any exists
  $.ajax({
    url:'/signup'
  }).done(function (data, textStatus, xhr) {
    if(xhr.getResponseHeader('message')) {
      $('#errorBox').append(xhr.getResponseHeader('message'));
    }
  });

})
