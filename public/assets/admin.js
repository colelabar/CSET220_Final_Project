$(document).ready(function() {

  // AJAX call to the api for user list from the db
  $.ajax({
    url:'/api/users',
    type: 'GET',
    dataType: 'json',
    success: function (data,status,xhr) {  // success callback function maybe use a loop
      var i;
      console.log(data);
      for(i = 0; i < data.length; i++) {
        if((data[i]['role'] > 2) && (data[i]['role'] < 8)) {
          // if the user is an admin or superadmin, display a crown next to their name
          $('#user-list').append('<div class="userInfoRow"><div class="userInfoCon"><p class="userInfoName">&#9819; ' + data[i]['username'] + '</p><p class="userInfo">' + data[i]['email'] + '</p></div><div class="adminButtonCon"><button value="' + data[i]['username'] + '" class="adminButton-Promote">ROLE&#8593</button><button value="' + data[i]['username'] + '" class="adminButton-Demote">ROLE&#8595</button><button value="' + data[i]['username'] + '" class="adminButton-Ban">BAN</button></div></div>');
        } else if(data[i]['role'] < 4) {
          // display standard user profile row
          $('#user-list').append('<div class="userInfoRow"><div class="userInfoCon"><p class="userInfoName">' + data[i]['username'] + '</p><p class="userInfo">' + data[i]['email'] + '</p></div><div class="adminButtonCon"><button value="' + data[i]['username'] + '" class="adminButton-Promote">ROLE&#8593</button><button value="' + data[i]['username'] + '" class="adminButton-Demote">ROLE&#8595</button><button value="' + data[i]['username'] + '" class="adminButton-Ban">BAN</button></div></div>');
        } else {
          // else just display superadmin name and email
          $('#user-list').append('<div class="userInfoRow"><div class="userInfoCon"><p class="userInfoName">&#9819; ' + data[i]['username'] + '</p><p class="userInfo">' + data[i]['email'] + '</p></div></div>');
        }
      }
      banClick();
      promoteClick();
      demoteClick();
    }
  })

  // ban user onclick using the isFlagged field on the user model
  function banClick() {
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

  // promote user onclick of Role+ button
  function promoteClick() {
    $('.adminButton-Promote').click(function(){
      $.ajax({
        url:'/api/userpromote',
        type: 'PUT',
        data: { 'username': this.value },
        dataType: 'json',
        success: function (data) {
          alert('User has been promoted');
        }
      })
    });
  }

  // demote user onclick of Role- button
  function demoteClick() {
    $('.adminButton-Demote').click(function(){
      $.ajax({
        url:'/api/userdemote',
        type: 'PUT',
        data: { 'username': this.value },
        dataType: 'json',
        success: function (data) {
          alert('User has been demoted');
        }
      })
    });
  }

})
