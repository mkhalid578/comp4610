/*
 Partners:
 Muhammed Khalid, muhammed_khalid@student.uml.edu
 Huma Sheikh, Huma_Khokhar@student.uml.edu
 Computer Science Department, UMass Lowell
 Comp.4610, GUI Programming I
 File: /usr/cs/temp/f2014/mkhalid/public_html/461f2017/final/index.html
 Created: 13-Dec-2017
 Last updated by HS: 13-Dec-2017, 12:24
 Sources:
 https://www.w3schools.com/html/html_tables.asp
 https://www.w3schools.com/css/css_howto.asp
 https://www.w3schools.com/css/css_align.asp
 https://www.w3schools.com/tags/att_input_placeholder.asp
 https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
 https://www.w3schools.com/howto/howto_css_modals.asp
 https://getbootstrap.com/docs/4.0/content/tables/
 http://myvedham.blogspot.in/2013/09/jquery-select-by-name-and-id.html
 https://stackoverflow.com/questions/171027/add-table-row-in-jquery
 // Div scrolling
 Sources: http://plnkr.co/edit/H0Rr0wTYYsTHZLuD3DPN?p=preview
 // tab interface
 https://www.w3schools.com/bootstrap/bootstrap_tabs_pills.asp
 // tab interface
 https://getbootstrap.com/docs/4.0/components/navs/#javascript-behavior
 // radio group
 https://mdbootstrap.com/components/bootstrap-radio-button/
 // JQuery
 http://api.jquery.com/html/

*/


// List of general major fields and counters
var major = {
  "medicalLifeSciences" : 0,
  "visualPerformanceArts": 0,
  "liberalArts": 0,
  "engineerTechnology": 0,
  "Business": 0
}

// Fields of studies for each major
var fieldofStudies = {
  'medicalLifeSciences': [
    "Athletic Training",
    "Biology",
    "Chemistry",
    "Environmental Sciences",
    "Food Science",
    "Forest Management",
    "Marine Science",
    "Nursing",
    "Organic Urban Farming",
    "Pharmacy",
    "Dental"
  ],
  'visualPerformanceArts' : [
    "Textile Design",
    "Architectural Design",
    "Dance",
    "Broadcast",
    "Music",
    "Theatre",
    "Graphic Design",
  ],
  'liberalArts': [
    "Arts Management",
    "Education",
    "Emergency Management",
    "English/Writing",
    "Equine Science/Mgmt",
    "Family & Child Science",
    "History",
    "Journalism",
    "Language Studies",
    "Non-Profit Management",
    "Peace/Conflict Studies",
    "Philosophy",
    "Political Science",
    "Social Science",
    "Sports Turf/Golf Mgmt",
    "Women/Gender Studies"
  ],
  'engineerTechnology':[
    "Aerospace Engineering",
    "Astronomy",
    "Aviation/Aeronautics",
    "Biomedical Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Science",
    "Electrical Engineering",
    "Energy Science",
    "Engineering",
    "Imaging Science",
    "Industrial Engineering",
    "Industrial Technology",
    "Materials Science",
    "Mathematics",
    "Mechanical Engineering"
  ],
  'Business': [
    "Accounting - General",
    "Business - General",
    "Construction Management",
    "Finance & Economics",
    "Hospitality Management",
    "Human Resources Mgmt",
    "Information Systems (MIS)",
    "Insurance & Risk Mgmt",
    "National Parks Management",
    "Public Health Administration",
    "Sport Management",
    "Supply Chain Mgmt (Logistics)"
  ]

}


// scrolling from div to div upon button press

$(document).ready(function(){
  $('.btn').click(function() {
    var target;
    $(".jumbotron").each(function(i, element) {
      target = $(element).offset().top;
      if (target - 10 > $(document).scrollTop()) {
        return false; // break
      }
    });
    $("html, body").animate({
      scrollTop: target
    }, 700);
  });
});

$(document).ready(function() {
  $("#refresh").click(function() {
    $('html,body').animate({
      scrollTop: $("#myTabContent").offset().top
    }, 200);
    for (var counter in major) {
      major[counter] = 0;
    }
    $('input:checkbox').removeAttr('checked');
    $('#refresh').hide();
    $("#results").hide();
    $("#decisionMaker").show();
  });
});



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


      var question5selection = $("input[name='question5']:checked").val();
      var question2selection = $("input[name='question2']:checked").val();
      var question4selection = $("input[name='question4']:checked").val();

      question1();
      question2(question2selection);
      question3();
      question4(question4selection);
      question5(question5selection);

      $("#cs").progressbar({
        value: major['medicalLifeSciences'],
        create: function(event, ui) {$(this).find('.ui-widget-header').css({'background-color':'#4285F4'})}
      });

      $("#humanities").progressbar({
        value: major['liberalArts'],
        create: function(event, ui) {$(this).find('.ui-widget-header').css({'background-color':'#4285F4'})}
      });

      $("#engineering").progressbar({
        value: major['engineerTechnology'],
        create: function(event, ui) {$(this).find('.ui-widget-header').css({'background-color':'#4285F4'})}
      });

      $("#business").progressbar({
        value: major['Business'],
        create: function(event, ui) {$(this).find('.ui-widget-header').css({'background-color':'#4285F4'})}
      });

      $("#IT").progressbar({
        value: major['visualPerformanceArts'],
        create: function(event, ui) {$(this).find('.ui-widget-header').css({'background-color':'#4285F4'})}
      });

      idealMajor();



      // Hide and show the correponding buttons
      $("#decisionMaker").hide();
      $("#results").fadeIn();
      $("#refresh").fadeIn();

    });

});

function hideStuff() {

  $("#results").hide();
  $("#refresh").hide();
}

function question1() {
  var checkedValues = $('input:checkbox:checked').map(function() {
    return this.value;
}).get();

  for (var choice in checkedValues) {
    if (checkedValues[choice] == "Working with Children") {
      major['engineerTechnology'] += 10;
      major['liberalArts'] += 10;
      major['visualPerformanceArts'] += 10;
      major['medicalLifeSciences'] += 10;
    } else if (checkedValues[choice] == "Being Outdoors") {

      major['liberalArts'] += 5;
      major['visualPerformanceArts'] += 5;

    } else if (checkedValues[choice] == "Fashion and Design") {

      major['liberalArts'] += 10;

    }
    else {
      major['engineerTechnology'] += 1;
      major['medicalLifeSciences'] += 1;
      major['Business'] += 1;
      major['liberalArts'] += 1;
      major['visualPerformanceArts'] += 1;
    }
  }
}

function question2(value) {
  switch(value) {
    case "A Risk Taker":
      major['engineerTechnology'] += 5;
      major['medicalLifeSciences'] += 5;
      major['Business'] += 5;
      break;
    case "Innovative":
      major['engineerTechnology'] += 5;
      break;
    case "Leader":
      major['medicalLifeSciences'] += 5;
      major['Business'] += 5;
      major['liberalArts'] += 5;
    case "Listener":
      major['Business'] += 5;
      major['liberalArts'] += 5;
      break;
    default:
      break;
  }
}

function question3() {

  var checkedValues = $('input:checkbox:checked').map(function() {
    return this.value;
  }).get();

  for (var choice in checkedValues) {
    if (checkedValues[choice] == "Math") {

      major['engineerTechnology'] += 10;
      major['medicalLifeSciences'] += 10;
      major['Business'] += 10;

    } else if (checkedValues[choice] == "Biology") {

      major['medicalLifeSciences'] += 10;

    } else if (checkedValues[choice] == "Chemistry") {

      major['medicalLifeSciences'] += 10;

    } else if (checkedValues[choice] == "Physics") {

      major['engineerTechnology'] += 10;
      major['medicalLifeSciences'] += 10;

    } else if (checkedValues[choice] == "History") {

      major['liberalArts'] += 10;

    } else if (checkedValues[choice] == "Art") {

      major['liberalArts'] += 10;
      major['visualPerformanceArts'] += 10;

    } else {
        major['engineerTechnology'] += 1;
        major['medicalLifeSciences'] += 1;
        major['Business'] += 1;
        major['liberalArts'] += 1;
        major['visualPerformanceArts'] += 1;
    }
  }

}

function question4(value) {

  switch (value) {
    case "making money":
      major['engineerTechnology'] += 5;
      major['medicalLifeSciences'] += 5;
      major['Business'] += 5;
      break;

    case "solving complex problems":
      major['engineerTechnology'] += 5;
      major['medicalLifeSciences'] += 5;
      break;

    case "helping others":
      major['engineerTechnology'] += 5;
      major['medicalLifeSciences'] += 5;
      major['Business'] += 5;
      major['liberalArts'] += 5;
      major['visualPerformanceArts'] += 5;
      break;

    case "creating something new":
      major['engineerTechnology'] += 5;
      break;

    default:
      break;
  }

}

function question5(value) {
  switch (value) {
    case "documentaries":
      major['engineerTechnology'] += 10;
      major['medicalLifeSciences'] += 10;
      major['Business'] += 10;
      break;

    case "soap operas":
      major['liberalArts'] += 10;
      major['visualPerformanceArts'] += 10;
      break;

    case "sitcoms":
      major['engineerTechnology'] += 10;
      major['medicalLifeSciences'] += 10;
      major['Business'] += 10;
      major['liberalArts'] += 10;
      major['visualPerformanceArts'] += 10;
      break;

    case "news":
      major['engineerTechnology'] += 10;
      major['medicalLifeSciences'] += 10;
      major['Business'] += 10;
      break;

    case "reality tv":
      major['visualPerformanceArts'] += 10;
      major['liberalArts'] += 10;
      break;

    default:
      break;
  }
}

function idealMajor() {

  largestKey = Object.keys(major).reduce(function(a, b){ return major[a] > major[b] ? a : b });
  $("#idealMajor").html("<h4> Possible Degree Plans: </h4>");
  var listItems = "";

  for (var fields in fieldofStudies[largestKey]) {
    listItems += "<li class='text-success list-group-item'>" + fieldofStudies[largestKey][fields] + "</li>";
  }

  $("#possibleMajors").html(listItems);
}
