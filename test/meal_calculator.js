'use strict';

/* global describe, it, before, beforeEach, after, afterEach, require */

var assert = require('assert');
var meal_calculator = require('../lib/meal_calculator');
var Dish = meal_calculator.Dish;
var Diner = meal_calculator.Diner;

describe('Class tests', function() {
    it('should be able to create a Dish', function() {
        var dish = new Dish('Burger', 9.95);
        assert.equal('Burger', dish.name);
        assert.equal(9.95, dish.cost);
    });


    it('should be able to create a Diner', function() {
        var diner = new Diner('Jay');
        assert.equal('Jay', diner.name);
        assert.equal(0, diner.cost());
    });

    it('should be able to create a Diner with a meal', function() {
        var dish = new Dish('Burger', 9.95);
        var diner = new Diner('Alice', [dish]);
        assert.equal('Alice', diner.name);
        assert.equal(9.95, diner.cost());
    });

    it('should be able to create a Diner without a meal and then add a dish', function() {
        var dish = new Dish('Burger', 9.95);
        var diner = new Diner('Bob');
        diner.addDish(dish);
        assert.equal('Bob', diner.name);
        assert.equal(9.95, diner.cost());
    });

    it('should correctly calculate total bill for a single diner', function() {
        var meal = new Dish('Burger', 9.95);
        var drink = new Dish('Coke', 2);

        var diner = new Diner('Jay', [meal, drink]);
        assert.equal('Jay', diner.name);
        assert.equal(11.95, diner.cost());
        var billData = meal_calculator.calculateTotalBill([diner], 0, 0);
        assert.equal(11.95, billData.totalBill);
    });

    it('should correctly calculate total bill for a single diner with tax and tip', function() {
        var meal = new Dish('Burger', 10);
        var drink = new Dish('Coke', 2);

        var diner = new Diner('Jay', [meal, drink]);
        assert.equal('Jay', diner.name);
        assert.equal(12, diner.cost());
        var billData = meal_calculator.calculateTotalBill([diner], 10, 20);
        assert.equal(15.60, billData.totalBill.toFixed(2));

        // breakdown data is correct
        var breakdown = billData.breakdown.Jay;
        assert.equal(15.60, breakdown.totalCost.toFixed(2));
        assert.equal(12.00, breakdown.cost.toFixed(2));
        assert.equal(1.20, breakdown.tax.toFixed(2));
        assert.equal(2.40, breakdown.tip.toFixed(2));
    });

    it('should correctly print the split bill for a multiple diners with tax and tip', function() {
        var salad = new Dish('Cobb Salad', 11.95);
        var burger = new Dish('Deluxe Cheeseburger', 12.95);
        var fries = new Dish('French Fries', 3.99);
        var soda = new Dish('Diet Coke', 2.99);
        var beer = new Dish('Draught Lager', 6);
        var milkShake = new Dish('Milk Shake', 5);

        var jay = new Diner('Jay');
        jay.addDish(salad);

        var alice = new Diner('Alice', [burger, fries]);
        alice.addDish(new Dish('Iced Tea', 2.05));

        var bob = new Diner('Bob');
        bob.addDish(burger);
        bob.addDish(fries);
        bob.addDish(beer);

        var carol = new Diner('Carol', [burger, fries, milkShake]);
        var diners = [jay, alice, bob, carol];
        var billData = meal_calculator.calculateTotalBill(diners, 7, 20);

        /**
         * Prints out the following: 
         * The total bill is $ 96.29
         * The breakdown per diner is:
         * Jay paid 16.58 (subtotal: $11.95 tax: $0.84 tip: $3.79
         * Alice paid 24.11 (subtotal: $18.99 tax: $1.33 tip: $3.79
         * Bob paid 28.34 (subtotal: $22.94 tax: $1.61 tip: $3.79
         * Carol paid 27.27 (subtotal: $21.94 tax: $1.54 tip: $3.79
         */

        assert.equal(96.29, billData.totalBill.toFixed(2));

        var jayBreakdown = billData.breakdown.Jay;
        assert.equal(16.58, jayBreakdown.totalCost.toFixed(2));
        assert.equal(11.95, jayBreakdown.cost.toFixed(2));
        assert.equal(0.84, jayBreakdown.tax.toFixed(2));
        assert.equal(3.79, jayBreakdown.tip.toFixed(2));


        var aliceBreakdown = billData.breakdown.Alice;
        assert.equal(24.11, aliceBreakdown.totalCost.toFixed(2));
        assert.equal(18.99, aliceBreakdown.cost.toFixed(2));
        assert.equal(1.33, aliceBreakdown.tax.toFixed(2));
        assert.equal(3.79, aliceBreakdown.tip.toFixed(2));

        var bobBreakdown = billData.breakdown.Bob;
        assert.equal(28.34, bobBreakdown.totalCost.toFixed(2));
        assert.equal(22.94, bobBreakdown.cost.toFixed(2));
        assert.equal(1.61, bobBreakdown.tax.toFixed(2));
        assert.equal(3.79, bobBreakdown.tip.toFixed(2));


        var carolBreakdown = billData.breakdown.Carol;
        assert.equal(27.27, carolBreakdown.totalCost.toFixed(2));
        assert.equal(21.94, carolBreakdown.cost.toFixed(2));
        assert.equal(1.54, carolBreakdown.tax.toFixed(2));
        assert.equal(3.79, carolBreakdown.tip.toFixed(2));

        assert.doesNotThrow(function() {
            meal_calculator.printSplitBill(diners, 7, 20);
        });
    });
});