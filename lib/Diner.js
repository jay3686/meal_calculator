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

module.exports = Diner;
