$(document).ready(function () {
  $("#loginApp").on("click", function (event) {
    event.preventDefault();

    const userLoginInfo = {
      userEmail: $("#userEmail").val().trim(),
      userPassword: $("#userPassword").val().trim()
    };

    // we are sending the information to the backend
    $.ajax({
      type: POST,
      data: userLoginInfo
    }).then(function () {
      // need to reroute the user to the profile page
    });

  });


}); // end of the document ready