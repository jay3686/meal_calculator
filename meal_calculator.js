

var Diner = function(name, meal) {
    this.name = name;
    this.meal = meal || [];
};

Diner.prototype.addDish = function(dish) {
    this.meal.push(dish);
};

Diner.prototype.cost = function() {
    var totalCost = 0;
    this.meal.forEach(function(dish) {
        totalCost += dish.cost;
    });

    return totalCost;
};



var Dish = function(name, cost) {
    this.name = cost;
    this.cost = cost;
};


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
        breakdown[diner].tax = breakdown[diner].cost * ( taxPercentage / 100);
        breakdown[diner].totalCost = breakdown[diner].cost + breakdown[diner].tax + perDinerTip;
    }
    return {
        totalBill: totalBill,
        breakdown: breakdown
    };
}

var salad = new Dish('Cobb Salad', 11.95);
var burger = new Dish('Deluxe Cheeseburger', 12.95);
var fries = new Dish('French Fries', 3.99);
var soda = new Dish('Diet Coke', 2.99);
var beer = new Dish('Draught Lager', 6);
var milkShake = new Dish('Milk Shake', 5);

var jay = new Diner('Jay');
jay.addDish(salad);

var christie = new Diner('Christie', [burger, fries]);
christie.addDish(new Dish('Iced Tea', 2.05));

var paul = new Diner('Paul');
paul.addDish(burger);
paul.addDish(fries);
paul.addDish(beer);

var shan = new Diner('Shan', [burger, fries, milkShake]);

var billData = calculateTotalBill([jay, christie, paul, shan], 7, 20);

console.log(billData);
