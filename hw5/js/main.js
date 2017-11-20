/*
 Name: Muhammed Khalid, muhammed_khalid@student.uml.edu
 Computer Science Department, UMass Lowell
 Comp.4610, GUI Programming I
 File: /usr/cs/temp/f2014/mkhalid/public_html/461f2017/hw5/js/main.js
 Created: 19-Nov-2017
 Last updated by MK: 19-Nov-2017, 10:56
 Sources:
 https://www.w3schools.com/html/html_tables.asp
 https://www.w3schools.com/css/css_howto.asp
 https://www.w3schools.com/css/css_align.asp
 https://www.w3schools.com/tags/att_input_placeholder.asp
 https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
 https://www.w3schools.com/howto/howto_css_modals.asp
 https://jqueryvalidation.org
 */


// Used the jquery validation tool to validate input
function generateTable() {
    $('#inputForm').validate({
	errorClass:"error",
	submitHandler: function(form) {
	    var carPrice = form.carPrice.value;
	    var carMPG = form.carMPG.value;
	    var carGasPrice = form.carGasPrice.value;
	    var milesPerGasPrice = carMPG / carGasPrice;
	    var totalGasCost = 60000 / milesPerGasPrice;
	    var totalCost = parseFloat(totalGasCost) + parseFloat(carPrice);
	    $('.table tr:last').after('<tr><td><i class="fa fa-usd" aria-hidden="true"></i> ' + carPrice + '</td><td><i class="fa fa-usd" aria-hidden="true"></i>' + carGasPrice + '</td><td>' + milesPerGasPrice.toFixed(2) + '</td><td class="text-success"><i class="fa fa-usd" aria-hidden="true"></i> ' + totalCost.toFixed(2) + '</td></tr>');
	    $('.table').show();
	},
	rules: {
	    carPrice: {
		required: true,
		range: [0,200000]
	    },
	    carMPG: {
		required: true,
		range: [0,100]
	    },
	    carGasPrice: {
		required: true,
		range: [1,10],
		minlength: 1
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
	    carGasPrice: {
		required: "Please enter the current gas price",
		range: "Please enter a value above 0",
		minlength: "You should have at least 2 places after the decimal"
	    },
	}
    });
}

// a simple function to hide the table upon loading the webpage

function hideThings() {

    $('.table').hide().prop('required', false);
}
