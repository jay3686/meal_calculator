'use strict';

/* global require */
var util = require('util');

/**
 * Total up the cost of all of the diners' meals, add tax and tip.
 * @param  {array} diners array of diners that ate together
 * @param  {int} taxPercentage split per diners meal
 * @param  {int} tipPercentage slit evenly among diners
 * @return {object} returns `totalBill` and breakdown per diner
 */
function calculateTotalBill(diners, taxPercentage, tipPercentage) {
    var preTaxBill = 0;
    var breakdown = {};

    diners.forEach(function(diner) {
        var dinerCost = diner.cost();
        preTaxBill += dinerCost;
        breakdown[diner.name] = {
            cost : dinerCost
        };
    });

    var totalTax = preTaxBill * taxPercentage / 100;
    var totalTip = preTaxBill * tipPercentage / 100;
    var totalBill = preTaxBill + totalTax + totalTip;

    var perDinerTip = totalTip / diners.length;
    for(var diner in breakdown) {
        breakdown[diner].tip = perDinerTip;
        breakdown[diner].tax = breakdown[diner].cost * ( taxPercentage / 100);
        breakdown[diner].totalCost = breakdown[diner].cost + breakdown[diner].tax + perDinerTip;
    }
    return {
        totalBill: totalBill,
        breakdown: breakdown
    };
}

/**
 * Prints out a human readable summary of a split bill.
 * @param  {array} diners array of diners that ate together
 * @param  {int} taxPercentage split per diners meal
 * @param  {int} tipPercentage slit evenly among diners
 * @return {object} returns `totalBill` and breakdown per diner
 */function printSplitBill(diners, taxPercentage, tipPercentage) {
    var billData = calculateTotalBill(diners, taxPercentage, tipPercentage);

    console.log("The total bill is $", billData.totalBill.toFixed(2));
    console.log("The breakdown per diner is:");

    for (var diner in billData.breakdown) {
        console.log(util.format('%s paid %s (subtotal: $%s tax: $%s tip: $%s',
            diner,
            billData.breakdown[diner].totalCost.toFixed(2),
            billData.breakdown[diner].cost.toFixed(2),
            billData.breakdown[diner].tax.toFixed(2),
            billData.breakdown[diner].tip.toFixed(2)));
    }
}


module.exports = {
    calculateTotalBill: calculateTotalBill,
    printSplitBill: printSplitBill
};
