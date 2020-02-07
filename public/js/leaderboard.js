$(document).ready(function () {
  const queryURL = placeholder; // this is going to be how we pull from the backend to get our leaderboard

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // empty arrays to push info to
    let allHighScores = [];
    let top10Scores = [];

    // for loop to loop through the responses and pull out the info, then sort it
    for (let i = 0; i < response.length; i++) {
      allHighScores.push(response[i]);
    }

    // need to sort them so that the person with the most wins is on top
    allHighScores.sort();

    // then we're going to cycle through and push all of that into an array - this will be our top 10
    for (let j = 0; j < 10; j++) {
      top10Scores.push(allHighScores[j]);
    }

    // here, we're going to use Tina's initial design, but we're going to populate it all and place it using JQuery


  });



}); // end of the document.ready function