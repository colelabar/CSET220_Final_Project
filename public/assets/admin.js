$(document).ready(function() {

  // AJAX call to the api for db transactions
  $.ajax({
    url:'/api/users',
    type: 'GET',
    dataType: 'json',
    success: function (data,status,xhr) {   // success callback function maybe use a loop
      var i;
      console.log(data);
      for(i = 0; i < data.length; i++) {
        $('#user-list').append('<p>' + data[i]['username'] + ' /// ' + data[i]['email'] + '</p>');
      }
    }
  })

})
