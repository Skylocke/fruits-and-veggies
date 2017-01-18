/* setup your angular app here */
var app = angular.module("fruitgetables", []);

app.controller("fvcontroller", ["$scope", function($scope) {

  $scope.fruits = [];
  fruits.forEach(function(fruit) {
    $scope.fruits.push({ name: fruit, category: "fruit", wrong: false, correct: false });
  });

  $scope.vegetables = [];
  vegetables.forEach(function(vegetable) {
    $scope.vegetables.push({ name: vegetable, category: "vegetable", wrong: false, correct: false });
  });


  $scope.produceBasket = shuffle($scope.fruits.concat($scope.vegetables));

  $scope.fruitBasket = [];
  $scope.veggieBasket = [];

  $scope.moveToFruits = function(index) {
    $scope.fruitBasket.push($scope.produceBasket[index])
    $scope.removeProduce(index);
    $scope.checkBaskets();
  }

  $scope.moveToVeggies = function(index) {
    $scope.veggieBasket.push($scope.produceBasket[index]);
    $scope.removeProduce(index);
    $scope.checkBaskets();
  }

  $scope.returnFruit = function(index) {
    $scope.fruitBasket[index].wrong = false;
    $scope.fruitBasket[index].correct = false;
    $scope.produceBasket.push($scope.fruitBasket[index]);
    $scope.removeFruit(index);
  }

  $scope.returnVeggie = function(index) {
    $scope.veggieBasket[index].wrong = false;
    $scope.veggieBasket[index].correct = false;
    $scope.produceBasket.push($scope.veggieBasket[index])
    $scope.removeVeggie(index);
  }

  $scope.removeProduce = function(index) {
    $scope.produceBasket.splice(index, 1);
  }

  $scope.removeFruit = function(index) {
    $scope.fruitBasket.splice(index, 1);
  }

  $scope.removeVeggie = function(index) {
    $scope.veggieBasket.splice(index, 1);
  }

  $scope.checkBaskets = function() {
    if($scope.produceBasket.length === 0) {
      $scope.checkFruitBasket();
      $scope.checkVeggieBasket();
    }
  }

  $scope.checkFruitBasket = function() {
    $scope.fruitBasket.forEach(function(item) {
      if(item.category !== "fruit") {
        item.wrong = true;
      } else {
        item.correct = true;
      }
    });
  }

  $scope.checkVeggieBasket = function() {
    $scope.veggieBasket.forEach(function(item) {
      if(item.category !== "vegetable") {
        item.wrong = true;
      } else {
        item.correct = true;
      }
    });
  }

}]);

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function merge(a1, a2) {
  var sorted = [];
  var i1 = 0;
  var i2 = 0;
  while (i1<a1.length && i2<a2.length) {
    if (a1[i1]<a2[i2]) {
      sorted.push(a1[i1]);
      i1++;
    } else {
      sorted.push(a2[i2]);
      i2++;
    }
  }
  if (i1 >= a1.length) {
    a2.slice(i2, a2.length).forEach(function(item){
      sorted.push(item);
    })
  } else {
    a1.slice(i1, a1.length).forEach(function(item){
      sorted.push(item);
    })
  }
  return sorted;
}

// debug stuff to show the app is loading and fruit / veggies are available
console.log('App Started');
console.log('Fruit count', fruits.length);
console.log('Veggie count', vegetables.length);
