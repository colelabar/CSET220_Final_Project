$(document).ready(function() {
  $.ajax({
    url:'/signup'
  }).done(function (data, textStatus, xhr) {
    if(xhr.getResponseHeader('message')) {
      $('#errorBox').append(xhr.getResponseHeader('message'));
    }
  });

})
