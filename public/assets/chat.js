$(document).ready(function() {

  // AJAX call to get the response headers
  $.ajax({
    url:'/api/chat'
  }).done(function (data, textStatus, xhr) {
    $('#username').append(xhr.getResponseHeader('username'));
    if(xhr.getResponseHeader('role') > 6) {
      $('#btn-admin').removeClass('hidden');
    }
  });

  // Initialize Pusher instance

  var pusher = new Pusher("a19df17ab917f69b30da", {
    cluster: "us2"
  });

  // function call to replace existing chat template with passed data values

  function onMessageAdded(data) {
    let template = $('#new-message').html();
    template = template.replace('{{body}}', data.message);
    template = template.replace('{{name}}', data.name);

    $('#chat').append(template);

    // fix to force auto-scrolling on new message send
    $(".panel-body").stop().animate({ scrollTop: $(".panel-body")[0].scrollHeight}, 1000);
  }

  // Subscribing the messaging user to the chat channel

  var channel = pusher.subscribe('private-chat');
  channel.bind('client-message-added', onMessageAdded);

  // function to post the users message to the /message endpoint

  $('#btn-chat').click(function(){
    const message = $('#message').val();
    $('#message').val("");
      //send message
    $.post( '/message', { message, name: $('#username').text() } );
  });

  $('#btn-admin').click(function(e){
    e.preventDefault();
    $.ajax({
      url: '/api/admin',
      type: 'GET',
      success: function(){
         try { window.location.replace('/api/admin'); }
         catch(err) { window.location = '/api/chat'; }
      },
      error: function(){
         alert('error');
      }
    });
  });

    // functionality to log the user out and clear local storage when they click "logout"

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
