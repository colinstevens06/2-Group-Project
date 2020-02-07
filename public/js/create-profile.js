$(document).ready(function () {
  // query URL for the AJAX call
  let queryURL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";

  // selectors for different input fields
  const userFirstNameInput = $("#first-name");
  const userLastNameInput = $("#last-name");
  const userTeamNameInput = $("#team-name");
  const userEmailInput = $("#user-email");
  const userPasswordInput = $("#user-password");

  // selectors for our different dropdowns
  const pokeSelect1 = $("#poke-select-1");
  const pokeSelect2 = $("#poke-select-2");
  const pokeSelect3 = $("#poke-select-3");
  const pokeSelect4 = $("#poke-select-4");
  const pokeSelect5 = $("#poke-select-5");
  const pokeSelect6 = $("#poke-select-6");

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

    let newUser = {
      userFirstName: userFirstNameInput.val().trim(),
      userLastName: userLastNameInput.val().trim(),
      userTeamName: userTeamNameInput.val().trim(),
      userEmail: userEmailInput.val().trim(),
      userPassword: userPasswordInput.val().trim(),
      pokemon1: {
        name: pokeSelect1.val().trim()
      },
      pokemon2: {
        name: pokeSelect2.val().trim()
      },
      pokemon3: {
        name: pokeSelect3.val().trim()
      },
      pokemon4: {
        name: pokeSelect4.val().trim()
      },
      pokemon5: {
        name: pokeSelect5.val().trim()
      },
      pokemon6: {
        name: pokeSelect6.val().trim()
      }

    };

    // GET THE FIRST POKEMON'S INFORMATION
    $.ajax({
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon/" + newUser.pokemon1.name

    }).then(function (res) {

      let pokemonInfo1 = {
        move1: {
          moveName: res.moves[0].move.name,
          moveURL: res.moves[0].move.url
        },
        move2: {
          moveName: res.moves[1].move.name,
          moveURL: res.moves[1].move.url
        },
        move3: {
          moveName: res.moves[2].move.name,
          moveURL: res.moves[2].move.url
        },
        move4: {
          moveName: res.moves[3].move.name,
          moveURL: res.moves[3].move.url
        },
        frontSprite: res.sprites.back_default,
        backSprite: res.sprites.front_default
      };

      $.ajax({
        method: "GET",
        url: pokemonInfo1.move1.moveURL
      }).then(function (moveRes1) {
        pokemonInfo1.move1.movePower = moveRes1.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo1.move2.moveURL
      }).then(function (moveRes2) {
        pokemonInfo1.move2.movePower = moveRes2.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo1.move3.moveURL
      }).then(function (moveRes3) {
        pokemonInfo1.move3.movePower = moveRes3.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo1.move4.moveURL
      }).then(function (moveRes4) {
        pokemonInfo1.move4.movePower = moveRes4.power;
        newUser.pokemon1.data = pokemonInfo1;

      });

    });

    // GET THE SECOND POKEMON'S INFORMATION
    $.ajax({
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon/" + newUser.pokemon2.name

    }).then(function (res) {

      let pokemonInfo2 = {
        move1: {
          moveName: res.moves[0].move.name,
          moveURL: res.moves[0].move.url
        },
        move2: {
          moveName: res.moves[1].move.name,
          moveURL: res.moves[1].move.url
        },
        move3: {
          moveName: res.moves[2].move.name,
          moveURL: res.moves[2].move.url
        },
        move4: {
          moveName: res.moves[3].move.name,
          moveURL: res.moves[3].move.url
        },
        frontSprite: res.sprites.back_default,
        backSprite: res.sprites.front_default
      };

      $.ajax({
        method: "GET",
        url: pokemonInfo2.move1.moveURL
      }).then(function (moveRes1) {
        pokemonInfo2.move1.movePower = moveRes1.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo2.move2.moveURL
      }).then(function (moveRes2) {
        pokemonInfo2.move2.movePower = moveRes2.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo2.move3.moveURL
      }).then(function (moveRes3) {
        pokemonInfo2.move3.movePower = moveRes3.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo2.move4.moveURL
      }).then(function (moveRes4) {
        pokemonInfo2.move4.movePower = moveRes4.power;
        newUser.pokemon2.data = pokemonInfo2;

      });

    });

    // GET THE THIRD POKEMON'S INFORMATION
    $.ajax({
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon/" + newUser.pokemon3.name

    }).then(function (res) {

      let pokemonInfo3 = {
        move1: {
          moveName: res.moves[0].move.name,
          moveURL: res.moves[0].move.url
        },
        move2: {
          moveName: res.moves[1].move.name,
          moveURL: res.moves[1].move.url
        },
        move3: {
          moveName: res.moves[2].move.name,
          moveURL: res.moves[2].move.url
        },
        move4: {
          moveName: res.moves[3].move.name,
          moveURL: res.moves[3].move.url
        },
        frontSprite: res.sprites.back_default,
        backSprite: res.sprites.front_default
      };

      $.ajax({
        method: "GET",
        url: pokemonInfo3.move1.moveURL
      }).then(function (moveRes1) {
        pokemonInfo3.move1.movePower = moveRes1.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo3.move2.moveURL
      }).then(function (moveRes2) {
        pokemonInfo3.move2.movePower = moveRes2.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo3.move3.moveURL
      }).then(function (moveRes3) {
        pokemonInfo3.move3.movePower = moveRes3.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo3.move4.moveURL
      }).then(function (moveRes4) {
        pokemonInfo3.move4.movePower = moveRes4.power;
        newUser.pokemon3.data = pokemonInfo3;

      });

    });

    // GET THE FOURTH POKEMON'S INFORMATION
    $.ajax({
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon/" + newUser.pokemon4.name

    }).then(function (res) {

      let pokemonInfo4 = {
        move1: {
          moveName: res.moves[0].move.name,
          moveURL: res.moves[0].move.url
        },
        move2: {
          moveName: res.moves[1].move.name,
          moveURL: res.moves[1].move.url
        },
        move3: {
          moveName: res.moves[2].move.name,
          moveURL: res.moves[2].move.url
        },
        move4: {
          moveName: res.moves[3].move.name,
          moveURL: res.moves[3].move.url
        },
        frontSprite: res.sprites.back_default,
        backSprite: res.sprites.front_default
      };

      $.ajax({
        method: "GET",
        url: pokemonInfo4.move1.moveURL
      }).then(function (moveRes1) {
        pokemonInfo4.move1.movePower = moveRes1.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo4.move2.moveURL
      }).then(function (moveRes2) {
        pokemonInfo4.move2.movePower = moveRes2.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo4.move3.moveURL
      }).then(function (moveRes3) {
        pokemonInfo4.move3.movePower = moveRes3.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo4.move4.moveURL
      }).then(function (moveRes4) {
        pokemonInfo4.move4.movePower = moveRes4.power;
        newUser.pokemon4.data = pokemonInfo4;
      });
    });

    // GET THE FIFTH POKEMON'S INFORMATION
    $.ajax({
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon/" + newUser.pokemon5.name

    }).then(function (res) {

      let pokemonInfo5 = {
        move1: {
          moveName: res.moves[0].move.name,
          moveURL: res.moves[0].move.url
        },
        move2: {
          moveName: res.moves[1].move.name,
          moveURL: res.moves[1].move.url
        },
        move3: {
          moveName: res.moves[2].move.name,
          moveURL: res.moves[2].move.url
        },
        move4: {
          moveName: res.moves[3].move.name,
          moveURL: res.moves[3].move.url
        },
        frontSprite: res.sprites.back_default,
        backSprite: res.sprites.front_default
      };

      $.ajax({
        method: "GET",
        url: pokemonInfo5.move1.moveURL
      }).then(function (moveRes1) {
        pokemonInfo5.move1.movePower = moveRes1.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo5.move2.moveURL
      }).then(function (moveRes2) {
        pokemonInfo5.move2.movePower = moveRes2.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo5.move3.moveURL
      }).then(function (moveRes3) {
        pokemonInfo5.move3.movePower = moveRes3.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo5.move4.moveURL
      }).then(function (moveRes4) {
        pokemonInfo5.move4.movePower = moveRes4.power;
        newUser.pokemon5.data = pokemonInfo5;
      });
    });

    // GET THE SIXTH POKEMON'S INFORMATION
    $.ajax({
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon/" + newUser.pokemon6.name

    }).then(function (res) {

      let pokemonInfo6 = {
        move1: {
          moveName: res.moves[0].move.name,
          moveURL: res.moves[0].move.url
        },
        move2: {
          moveName: res.moves[1].move.name,
          moveURL: res.moves[1].move.url
        },
        move3: {
          moveName: res.moves[2].move.name,
          moveURL: res.moves[2].move.url
        },
        move4: {
          moveName: res.moves[3].move.name,
          moveURL: res.moves[3].move.url
        },
        frontSprite: res.sprites.back_default,
        backSprite: res.sprites.front_default
      };

      $.ajax({
        method: "GET",
        url: pokemonInfo6.move1.moveURL
      }).then(function (moveRes1) {
        pokemonInfo6.move1.movePower = moveRes1.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo6.move2.moveURL
      }).then(function (moveRes2) {
        pokemonInfo6.move2.movePower = moveRes2.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo6.move3.moveURL
      }).then(function (moveRes3) {
        pokemonInfo6.move3.movePower = moveRes3.power;
      });

      $.ajax({
        method: "GET",
        url: pokemonInfo6.move4.moveURL
      }).then(function (moveRes4) {
        pokemonInfo6.move4.movePower = moveRes4.power;
        newUser.pokemon6.data = pokemonInfo6;
      });
    });



    console.log(newUser);

    // $.ajax("/api/team", {
    //   type: "POST",
    //   data: newUser
    // }).then(function () {
    //   console.log("create new team");
    //   location.reload();
    // });


  });

}); // end of the document.ready

