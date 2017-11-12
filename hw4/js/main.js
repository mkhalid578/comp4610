/*
 Name: Muhammed Khalid, muhammed_khalid@student.uml.edu
 Computer Science Department, UMass Lowell
 Comp.4610, GUI Programming I
 File: /usr/cs/temp/f2014/mkhalid/public_html/comp4610f2017/hw4/js/main.js
 Created: 11-Nov-2017
 Last updated by MK: 12-Nov-2017, 01:37
 Sources:
 https://www.w3schools.com/html/html_tables.asp
 https://www.w3schools.com/css/css_howto.asp
 https://www.w3schools.com/css/css_align.asp
 https://www.w3schools.com/tags/att_input_placeholder.asp
 https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
 https://www.w3schools.com/howto/howto_css_modals.asp
 */

function calculate() {
    var carPrice = $('input[name="carPrice"]').val();
    console.log(carPrice);
    var carMPG = $('input[name="carMPG"]').val();
    var carGasPrice = $('input[name="carGasPrice"]').val();
    var milesPerGasPrice = carMPG / carGasPrice;
    var totalGasCost = 60000 / milesPerGasPrice;

    return {
	"carPrice": carPrice,
	"carMPG": carMPG,
	"carGasPrice": carGasPrice,
	"milesPerGasPrice": milesPerGasPrice,
	"totalGasCost": totalGasCost
    };

}

function generateTable() {
    
    var calculations = calculate();
    var totalCost = parseFloat(calculations['totalGasCost']) + parseFloat(calculations['carPrice']);
  /*  $('.text-center').hide().prop('required', false); */
    $('.table tr:last').after('<tr><td><i class="fa fa-usd" aria-hidden="true"></i> ' + calculations['carPrice'] + '</td><td><i class="fa fa-usd" aria-hidden="true"></i>' + calculations['carGasPrice'] + '</td><td>' + calculations['milesPerGasPrice'].toFixed(2) + '</td><td class="text-success"><i class="fa fa-usd" aria-hidden="true"></i> ' + totalCost.toFixed(2) + '</td></tr>');
    $('.table').show();
}

function hideThings() {

    $('.table').hide().prop('required', false);
}
