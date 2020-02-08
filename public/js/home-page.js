$(document).ready(function () {

  // creating howler for the music
  const theme = new Howl({
    src: ["../soundfiles/Music/themelounge.mp3"],
    loop: true,
    autoplay: true,
  });

  // play the music
  theme.fadeIn(10);

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