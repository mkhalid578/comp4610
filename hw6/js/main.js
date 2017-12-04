/*
 Name: Muhammed Khalid, muhammed_khalid@student.uml.edu
 Computer Science Department, UMass Lowell
 Comp.4610, GUI Programming I
 File: /usr/cs/temp/f2014/mkhalid/public_html/461f2017/hw6/js/main.js
 Created: 03-Dec-2017
 Last updated by MK: 03-Dec-2017, 10:16
 Sources:
 https://www.w3schools.com/html/html_tables.asp
 https://www.w3schools.com/css/css_howto.asp
 https://www.w3schools.com/css/css_align.asp
 https://www.w3schools.com/tags/att_input_placeholder.asp
 https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
 https://www.w3schools.com/howto/howto_css_modals.asp
 https://jqueryvalidation.org
 */

var answer = ""

function generateTable() {
    $('#inputForm').validate({
        errorClass:"error",
	submitHandler: function(form) {
	    var carPrice = form.carPrice.value;
	    var carMPG = form.carMPG.value;
	    var carGasPrice = form.gasPrice.value;
	    var carMake = form.carMake.value;
	    var carModel = form.carModel.value;
	    var carColor = form.carColor.value;
	    $('.table tr:last').after('<tr><td><i class="fa fa-usd" aria-hidden="true"></i> ' + carPrice + '</td><td><i class="fa fa-usd" aria-hidden="true"></i>' + carMPG + '</td><td>' + carGasPrice + '</td><td class="text-success"><i class="fa fa-usd" aria-hidden="true"></i> ' + carMake + '</td>' + '<td>' + carModel + '</td>' + '<td>' + carColor + '</td></tr>'); 
	    $('.table').show();
	},
	rules: {
	    carPrice: {
		required: true,
		range: [0.01,100000]
	    },
	    carMPG: {
		required: true,
		range: [0.01,52]
	    },
	    gasPrice: {
		required: true,
		range: [0.01,5],
		minlength: 1
	    },
	    carMake: {
		required: true
	    },
	    carModel: {
		required: true
	    },
	    carColor: {
		required: true
	    },
	},
	messages: {
	    carPrice: {
		required: "Please enter the price of the car",
		range: "Please enter a price range between 0 and $200,000"
	    },
	    carMPG: {
		required: "Please enter the car's MPG",
		range: "Please enter a valid MPG"
	    },
	    gasPrice: {
		required: "Please enter the current gas price",
		range: "Please enter a value above 0",
		minlength: "You should have at least 2 places after the decimal"
	    },
	    carMake: {
	    required: "Please enter the make of the car"
	    },
	    carModel: {
		required: "Please enter the model of the car"
	    },
	    carColor: {
		required: "Please enter the color of the car"
	    },
	}
    });
}

$( function() {
    $( "#slider-range" ).slider({
	range: "min",
	value: 1,
	min: 1,
	max: 100000,
	slide: function( event, ui ) {
            $( "#carPriceSlider" ).val( ui.value );
	}
    });
    $( "#carPriceSlider" ).val( $( "#slider-range" ).slider( "value" ) );
} );

$( function() {
    $( "#mpg-range" ).slider({
        range: "min",
        value: 1,
        min: 1,
        max: 52,
        slide: function( event, ui ) {
            $( "#carMPGSlider" ).val( ui.value );
        }
    });
    $( "#carMPGSlider" ).val( $( "#mpg-range" ).slider( "value" ) );
} );

$( function() {
    $( "#gasprice-range" ).slider({
        range: "min",
        value: 0.01,
        min: 0.01,
        max: 5.00,
	step: 0.01,
        slide: function( event, ui ) {
            $( "#gasPriceSlider" ).val( ui.value );
        }
    });
    $( "#gasPriceSlider" ).val( $( "#mpg-range" ).slider( "value" ) );
} );

$("#add").click(function(){
    var ul = $('#tabs ul');
    ul.find('li:first').clone(true).appendTo(ul);
    
});

$("#delete").click(function(){
    var ul = $('#tabs ul');
    ul.empty();
});

$("#playGame").click(function() {

    var displayWord = "";
    var words = ["JavaScript", "Haim", "Levkowitz", "GUI"];
    var playWord = words[Math.floor(Math.random()*words.length)];

    var hint = wordHint(playWord);
    document.getElementById("displayWord").innerHTML = "<h2 class='p-3'> Hint: " + hint + "</h2>";

    
    if ($('#guess').val() == playWord) {
	$('#badGuess').hide()
	$('#correctGuess').text('Correct');
	$('#correctGuess').show();
    } else {
	$('#badGuess').text('Wrong');
	$('#correctGuess').hide();
	$('#badGuess').show();
    }

});

function wordHint(word) {
    var hint = "";
    switch(word) {
    case "JavaScript":
	hint = "A Programming Language";
	break;
    case "Haim":
	hint = "First Name of Professor";
	break;
    case "Levkowitz":
	hint = "Last Name of Professor";
	break;
    case "GUI":
	hint = "The name of our class";
	break;
    default:
	hint = "Please take a guess";	break;
    }

    return hint;
}

// Close each tab individually
$('.close').on('click', function(){
    $(this).parent().fadeOut('fast', function(){
    });
});	

// reload the web page to reload all the tabs
$("#reload").click(function() {
    window.location.reload();
});

//Hides the table initially
function hideThings() {   
    $('.table').hide().prop('required', false);
    $('#correctGuess').hide().prop('required', false);
    $('#badGuess').hide().prop('required', false);
}

$('#factButton').click(function(){
    var facts = [
	"More Photos Were Taken in the Last 2 Minutes than in the Entire 19th Century",
	"Your iPhone Has More Computing Power than NASA Used for the Moon Landing",
	"There Are Whales Alive Who Are Older than the Book Moby Dick",
	"Martin Luther King Jr., Anne Frank, and Barbara Walters Were Born in the Same Year",
	"Betty White Is Literally Older than Sliced Bread",
	"Pluto Was Made and Unmade a Planet Before It Completed One Orbit of the Sun",
	"Neil Armstrong Had to Go Through U.S. Customs after Returning from the Moon",
	"More People Have Been Killed by Molasses Than by Coyotes",
	"Saudi Arabia Imports Camels from Australia",
    ]

    document.getElementById("chosenFact").innerHTML = facts[Math.floor(Math.random()*facts.length)];
});
