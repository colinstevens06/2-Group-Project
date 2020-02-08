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

  // going to need to create the buttons here w/ JQuery, using the styling etc. I already have on the front end

  // going to need to populate the sprites from here via JQuery based on the send from the DB

  // REMEMBER: we are just trying to get a minimum viable product for tomorrow... it just has to work


});