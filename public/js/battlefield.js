$(document).ready(function() {
  // creating howler for the music
  const battletheme = new Howl({
    src: ["../soundfiles/Music/battle.mp3"],
    loop: true,
    autoplay: true
  });

  // play the music
  battletheme.fadeIn(10);

  $(".button-attack").on("click", function(event) {
    event.preventDefault();

    // get data from the game setting
    // let thisButtonData = $(this).attr("data-attack");
    let userSprite = $("#user-sprite");
    let opponentSprite = $("#opponent-sprite");

    // console.log(thisButtonData);

    // the first animation is going to be that the user's mon will do some kind of slow rise then quick thud
    userSprite
      .animate(
        {
          width: "50%"
        },
        450
      )
      .animate(
        {
          width: "100%"
        },
        150
      );

    opponentSprite
      .delay(800)
      .animate(
        {
          width: "90%"
        },
        175
      )
      .animate(
        {
          width: "100%"
        },
        150
      )
      .animate(
        {
          width: "80%"
        },
        125
      )
      .animate(
        {
          width: "100%"
        },
        100
      )
      .animate(
        {
          width: "70%"
        },
        75
      )
      .animate(
        {
          width: "100%"
        },
        50
      )
      .animate(
        {
          width: "80%"
        },
        75
      )
      .animate(
        {
          width: "100%"
        },
        100
      )
      .animate(
        {
          width: "90%"
        },
        125
      )
      .animate(
        {
          width: "100%"
        },
        150
      );

    // there will be a half/quarter second pause
    // the opponents sprite will shake left/right like 5 times over the course of half a second
  });
});
