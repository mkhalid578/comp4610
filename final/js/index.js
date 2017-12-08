/*
  Muhammed Khalid
  Huma Khokhar

*/

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
      var cs = 50;
      var art = 0;
      var science = 0;
      var engineer = 0;
      var history = 0;

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

      $("#cs").progressbar({
        value: cs
      });

      $("#humanities").progressbar({
        value: 40
      });

      $("#engineering").progressbar({
        value: 46
      });

      $("#business").progressbar({
        value: 78
      });

      $("#IT").progressbar({
        value: 91
      });

      $("#idealMajor").html("<h4> Ideal Major is IT </h4>");


      // Hide and show the correponding buttons
      $("#decisionMaker").hide();
      $("#results").fadeIn();

    });

});

function hideStuff() {
  $("#results").hide();
}
