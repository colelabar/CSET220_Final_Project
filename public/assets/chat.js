$(document).ready(function() {
  $.ajax({
    url:'/api/chat'
  }).done(function (data, textStatus, xhr) {
      $('#username').append(xhr.getResponseHeader('username'));
  });
})
