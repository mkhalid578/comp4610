/*
  Muhammed Khalid
  Huma Khokhar

*/

// Global counters

var cs = 0;
var art = 0;
var science = 0;
var engineer = 0;
var history = 0;

$(document).ready(function(){
    $("#moodButton").click(function(){
        var userInput = $('#moodInput').val();
        userInput = encodeURIComponent(userInput.trim().replace(/\./g,' '));
        $.ajax({url: "https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?text=%22" + userInput + "%22&version=2017-09-21&sentences=true&tones=language",
               success: function(result){
                 var feelings = "<h4>You feel:</h4> "
                 for (var tones in result) {
                   for (var tone in result[tones]) {
                     for (var feeling in result[tones][tone]) {
                          feelings += "<li class='text-success list-group-item'>" + (result[tones][tone][feeling].tone_name) + "</li>";
                     }
                   }
                }
                document.getElementById('returnBox').innerHTML = feelings;
        }});
    });


    $("#decisionMaker").click(function() {


      /*
      var artMajors = [
          "advertising",
          "Law",
          "Political Science",
          "Public Administration",
          "Publishing",
          "Teaching"
      ];
      var engineerMajors = [
        "Electrical Engineering",
        "Plastics Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Mechanical Engineering"
      ]; */

      //TODO the logic for displaying


      question1();
      var selectedValue = $("input[name='question5']:checked").val();
      question5(selectedValue);


      $("#cs").progressbar({
        value: cs
      });

      $("#humanities").progressbar({
        value: 80
      });

      $("#engineering").progressbar({
        value: cs
      });

      $("#business").progressbar({
        value: science
      });

      $("#IT").progressbar({
        value: cs
      });

      $("#idealMajor").html("<h4> The select value is: " + selectedValue + "</h4>");


      // Hide and show the correponding buttons
      $("#decisionMaker").hide();
      $("#results").fadeIn();

    });

});

function hideStuff() {
  $("#results").hide();
}

function question1() {
  var checkedValues = $('input:checkbox:checked').map(function() {
    return this.value;
}).get();

console.log(checkedValues);
}


function question5(value) {
  switch (value) {
    case "documentaries":
      cs += 5;
      science += 5;
      engineer += 5;
      break;

    case "soap operas":
      art += 5;
      history += 5;
      break;

    case "sitcoms":
      cs += 5;
      science += 5;
      engineer += 5;
      art += 5;
      history += 5;
      break;

    case "news":
      cs += 5;
      science += 5;
      engineer += 5;
      art += 5;
      history += 5;
      break;

    case "reality tv":
      art += 5;
      history += 5;
      break;

    default:
      break;
  }
}
