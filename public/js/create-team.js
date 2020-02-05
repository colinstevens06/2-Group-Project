$(document).ready(function () {
  // query URL for the AJAX call
  let queryURL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";

  // selectors for our different dropdowns
  let pokeSelect1 = $("#poke-select-1");
  let pokeSelect2 = $("#poke-select-2");
  let pokeSelect3 = $("#poke-select-3");
  let pokeSelect4 = $("#poke-select-4");
  let pokeSelect5 = $("#poke-select-5");
  let pokeSelect6 = $("#poke-select-6");

  // AJAX call to the Poke API to get all the pokemon names and populate the dropdown items
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // empty array to hold all the pokemon names
    let pokemonTeamOptions = [];
    let constructor = response.results;

    // looping through the responses to get all the names into an array
    for (let i = 0; i < 151; i++) {
      let thisMon = constructor[i].name;
      pokemonTeamOptions.push(thisMon);
      pokemonTeamOptions.sort();
    }

    // Populating the buttons with content
    pokemonTeamOptions.forEach(function (mon) {
      let pokeOptions1 = $("<option>").text(mon);
      let pokeOptions2 = $("<option>").text(mon);
      let pokeOptions3 = $("<option>").text(mon);
      let pokeOptions4 = $("<option>").text(mon);
      let pokeOptions5 = $("<option>").text(mon);
      let pokeOptions6 = $("<option>").text(mon);

      // appending the options
      pokeSelect1.append(pokeOptions1);
      pokeSelect2.append(pokeOptions2);
      pokeSelect3.append(pokeOptions3);
      pokeSelect4.append(pokeOptions4);
      pokeSelect5.append(pokeOptions5);
      pokeSelect6.append(pokeOptions6);

    });

  });

  $("#choose-team-submit").on("click", function (event) {
    event.preventDefault();

    const newTeam = {
      pokemon1: pokeSelect1.val().trim(),
      pokemon2: pokeSelect2.val().trim(),
      pokemon3: pokeSelect3.val().trim(),
      pokemon4: pokeSelect4.val().trim(),
      pokemon5: pokeSelect5.val().trim(),
      pokemon6: pokeSelect6.val().trim()

    };

    console.log(newTeam);

    // $.ajax("/api/team", {
    //   type: "POST",
    //   data: newTeam
    // }).then(function () {
    //   console.log("create new team");
    //   location.reload();
    // });


  });

}); // end of the document.ready

