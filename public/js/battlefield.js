$(document).ready(function () {

     // creating howler for the music
  const battletheme = new Howl({
    src: ["../soundfiles/Music/battle.mp3"],
    loop: true,
    autoplay: true,
  });

  // play the music
  battletheme.fadeIn(10);





// set up a function to display the battlefield, be able to call that whenever we need to
// on-click listeners

// all the buttons (use one class), on click, battlefield.attack(clicked-button.text())


});