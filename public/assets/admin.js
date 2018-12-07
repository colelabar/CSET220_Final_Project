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
          $('#user-list').append('<div class="userInfoRow"><div class="userInfoCon"><div class="adminUser"><p class="adminUserSymbol">&#9819; User is Admin </p><p class="userInfoName">' + data[i]['username'] + '</p></div><p class="userInfo">' + data[i]['email'] + '</p></div><div class="adminButtonCon"><button value="' + data[i]['username'] + '" class="adminButton-Promote">ROLE&#8593</button><button value="' + data[i]['username'] + '" class="adminButton-Demote">ROLE&#8595</button><button value="' + data[i]['username'] + '" class="adminButton-Ban">BAN</button></div></div>');
        } else if((data[i]['role'] < 4) && (data[i]['isFlagged'] == 0)) {
          // display standard user profile row
          $('#user-list').append('<div class="userInfoRow"><div class="userInfoCon"><p class="userInfoName">' + data[i]['username'] + '</p><p class="userInfo">' + data[i]['email'] + '</p></div><div class="adminButtonCon"><button value="' + data[i]['username'] + '" class="adminButton-Promote">ROLE&#8593</button><button value="' + data[i]['username'] + '" class="adminButton-Demote">ROLE&#8595</button><button value="' + data[i]['username'] + '" class="adminButton-Ban">BAN</button></div></div>');
        } else if((data[i]['role'] < 4) && (data[i]['isFlagged'] == 1)) {
          // display standard user profile row for banned user with an X next to their name
          $('#user-list').append('<div class="userInfoRow"><div class="userInfoCon"><div class="bannedUser"><p class="bannedSymbol">&#9888; User is Banned</p><p class="userInfoName">' + data[i]['username'] + '</p></div><p class="userInfo">' + data[i]['email'] + '</p></div><div class="adminButtonCon"><button value="' + data[i]['username'] + '" class="adminButton-Promote">ROLE&#8593</button><button value="' + data[i]['username'] + '" class="adminButton-Demote">ROLE&#8595</button><button value="' + data[i]['username'] + '" class="adminButton-Ban">BAN</button></div></div>');
        } else {
          // else just display superadmin name and email
          $('#user-list').append('<div class="userInfoRow"><div class="userInfoCon"><div class="adminUser"><p class="adminUserSymbol">&#9819; User is Admin </p><p class="userInfoName">' + data[i]['username'] + '</p></div><p class="userInfo">' + data[i]['email'] + '</p></div></div></div>');
        }
      }
      banClick();
      promoteClick();
      demoteClick();
      getMessages();
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

  // Visualization ajax call goes here
  // call to router, router calls function for query and D3 / Chartjs
  // sets an empty array, an array of zeros, and an array of labels. As the loop iterates over the returned data, it adds the instances of unique times to the empty array, returning it as the dataset for the chart
  function getMessages() {
    $.ajax({
      url:'/api/messageovertime',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var timesList = [];
        var timesCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var labels = ['7PM', '8PM', '9PM', '10PM', '11PM', '12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM'];
        var a;
        for(a = 0; a < data.length; a++) {
          // data needs to be an array of counts
          var singleTime = parseInt(data[a]['createdAt'].slice(11,13));
          if(timesList.includes(singleTime)) {
            (timesCount[singleTime] += 1)
          } else {
            timesList.push(singleTime) && (timesCount[singleTime] += 1)
          }
            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: labels,
                datasets: [{
                  label: '# of Messages',
                  data: timesCount,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255,99,132,1)'
                  ],
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero:true
                    }
                  }]
                }
              }
            });
          }
        }
    })
  }

})
