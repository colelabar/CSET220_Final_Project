$(document).ready(function() {

  // AJAX call to the api for user list from the db
  $.ajax({
    url:'/api/users',
    type: 'GET',
    dataType: 'json',
    success: function (data,status,xhr) {   // success callback function maybe use a loop
      var i;
      console.log(data);
      for(i = 0; i < data.length; i++) {
        $('#user-list').append('<div class="userInfoRow"><p class="userInfo">' + data[i]['username'] + ' /// ' + data[i]['email'] + '</p><button value="' + data[i]['username'] + '" class="adminButton-Ban">BAN</button></div>');
      }
      banCLick();
    }
  })

  // ban user onclick using the isFlagged field on the user model
  function banCLick() {
    $('.adminButton-Ban').click(function(){
      $.ajax({
        url:'/api/userban',
        type: 'PUT',
        data: { 'username': this.value },
        dataType: 'json',
        success: function (data) {
          alert('User has been banned');
        }
      })
    });
  }

})
