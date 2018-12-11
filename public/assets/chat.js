$(document).ready(function() {

  // AJAX call to get the response headers
  $.ajax({
    url:'/api/chat'
  }).done(function (data, textStatus, xhr) {
    $('#username').append(xhr.getResponseHeader('username'));
    $('#un-housing').append(xhr.getResponseHeader('username'));
    $('#if-housing').append(xhr.getResponseHeader('isFlagged'));
    if(xhr.getResponseHeader('role') > 2) {
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
    template = template.replace('{{body}}', DOMPurify.sanitize(data.message));
    if($('#btn-admin').hasClass('hidden')) {
      template = template.replace('{{name}}', ('<strong>' + data.name + '</strong> <em>on ' + data.time + '</em>'));
    } else {
      template = template.replace('{{name}}', ('<strong>' + '&#9819;' + ' ' + data.name + '</strong> <em>on ' + data.time + '</em>'));
    }

    $('#chat').append(template);

    // fix to force auto-scrolling on new message send
    $("#panel-body").stop().animate({ scrollTop: $("#panel-body")[0].scrollHeight}, 1000);
  }

  // functionality to get all previous messages for chat window
  $.ajax({
    url:'/api/previousmessages',
    type: 'GET',
    dataType: 'json',
    success: function (data,status,xhr) {  // success callback function maybe use a loop
      var n;
      for(n = 0; n < data.length; n++) {
        let template = $('#new-message').html();
        template = template.replace('{{body}}', data[n]['message']);
        template = template.replace('{{name}}', ('<strong>' + data[n]['username'] + '</strong> <em>on ' + data[n]['createdAt'].slice(0,10) + '@' + data[n]['createdAt'].slice(11,16) + ' UTC</em>'));

        $('#chat').append(template);
        $("#panel-body").stop().animate({ scrollTop: $("#panel-body")[0].scrollHeight}, 1000);
      }
    }
  });

  // Subscribing the messaging user to the chat channel

  var channel = pusher.subscribe('private-chat');
  channel.bind('client-message-added', onMessageAdded);

  // function to post the users message to the /message endpoint

  $('#btn-chat').click(function(){
    const message = $('#message').val();
    const cTime = new Date().toLocaleString();
    $('#message').val("");
      //send message
    $.post( '/message', { message, name: $('#un-housing').text(), time: cTime } );
  });

  // Extra functionality to allow message posting on "enter" press

  $('#message').keypress(function(e){
    if(e.which == 13){
      $('#btn-chat').click();
    }
  });

  // function to take the admin user to the admin page when the correct button is pressed

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

    function logout() {
      localStorage.clear();
      try { window.location.replace('/'); }
      catch(err) { window.location = '/'; }
    }

    // functionality to enable night mode for users
    $("#nightmode").click((e) => {
      e.preventDefault();
      nightmode();
    });

    function nightmode() {
      if($('#body').hasClass('mainBody')) {
        $('#body').removeClass('mainBody') && $('#body').addClass('mainBodyDark');
      } else {
        $('#body').removeClass('mainBodyDark') && $('#body').addClass('mainBody');
      }

      if($('#panel-heading').hasClass('panel-heading')) {
        $('#panel-heading').removeClass('panel-heading') && $('#panel-heading').addClass('panel-heading-dark');
      } else {
        $('#panel-heading').removeClass('panel-heading-dark') && $('#panel-heading').addClass('panel-heading')
      }

      if($('#panel-body').hasClass('panel-body')) {
        $('#panel-body').removeClass('panel-body') && $('#panel-body').addClass('panel-body-dark');
      } else {
        $('#panel-body').removeClass('panel-body-dark') && $('#panel-body').addClass('panel-body')
      }

      if($('#panel-footer').hasClass('panel-footer')) {
        $('#panel-footer').removeClass('panel-footer') && $('#panel-footer').addClass('panel-footer-dark');
      } else {
        $('#panel-footer').removeClass('panel-footer-dark') && $('#panel-footer').addClass('panel-footer')
      }

      if($('#chat').hasClass('chat')) {
        $('#chat').removeClass('chat') && $('#chat').addClass('chat-dark');
      } else {
        $('#chat').removeClass('chat-dark') && $('#chat').addClass('chat');
      }
    }
})
