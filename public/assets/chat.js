$(document).ready(function() {
  $.ajax({
    url:'/api/chat'
  }).done(function (data, textStatus, xhr) {
    $('#username').append(xhr.getResponseHeader('username'));
  });

  var pusher = new Pusher("a19df17ab917f69b30da", {
    cluster: "us2"
  });

  function onMessageAdded(data) {
    let template = $('#new-message').html();
    template = template.replace('{{body}}', data.message);
    template = template.replace('{{name}}', data.name);

    $('#chat').append(template);
  }

  var channel = pusher.subscribe('private-chat');
  channel.bind('client-message-added', onMessageAdded);

  $('#btn-chat').click(function(){
      const message = $("#message").val();
      $("#message").val("");
        //send message
      $.post( "http://localhost:8080/message", { message, name: $('#username').text() } );
    });

    $("#logout").click((e) => {
      e.preventDefault();
      logout();
    });

    function logout(){
      localStorage.clear();
      try { window.location.replace('/'); }
      catch(err) { window.location = '/'; }
    }
})
