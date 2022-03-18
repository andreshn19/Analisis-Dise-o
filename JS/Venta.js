
var shoppingList = angular.module("root", []);

shoppingList.controller("index", ["$scope", function ($scope){
  
  $scope.itemName;
  $scope.itemShop;
  $scope.itemQuantity;
  $scope.itemPrice;
  
  var success = document.getElementById('successMessage');
  var error = document.getElementById('errorMessage');
  
  $scope.selection = [];
  
  $scope.list = [
   
  ];
  
  
  $scope.getSubtotal = function(){
    var subtotal = 0;
    for(var i = 0; i < $scope.list.length; i++){
        subtotal += $scope.list[i].price;
    }
    return subtotal;
  };
  $scope.getImpueto = function(){
    var VAl=0;
    var ISV =0.15;
    var Resul =0;
    for(var i = 0; i < $scope.list.length; i++){
      VAl += $scope.list[i].price;
      Resul=VAl*ISV;
  }
    return Resul;
  };
    
  $scope.getTotal = function(){
    var total = 0;
    var RE = 0;
    for(var i = 0; i < $scope.list.length; i++){
        total += $scope.list[i].price;
        RE=total + $scope.getImpueto();
    }
    return RE;
  };
  $scope.inventory = [

  ];

  $scope.remove = function(item) { 
    var index = $scope.list.indexOf(item)
    $scope.list.splice(index, 1);     
  }
  
  $scope.removeInventory = function(item) { 
    var index = $scope.inventory.indexOf(item)
    $scope.inventory.splice(index, 1);     
  }
    
  $scope.clearAll = function(list){
    var length = list.length;
     list.splice(0, length);
  };
    
    $scope.addItem = function() {
       if($scope.itemName && $scope.itemQuantity && $scope.itemPrice && $scope.itemShop){
            $scope.list.push({name: $scope.itemName, shop: $scope.itemShop, quantity: $scope.itemQuantity, price: $scope.itemPrice * $scope.itemQuantity, checked: false});
    
            $scope.itemName = '';
            $scope.itemShop = '';
            $scope.itemQuantity = '';
            $scope.itemPrice = '';
    
            success.style.display = 'block';
            var timer = setTimeout(function(){
              success.style.display = 'none';
            }, 2000);
      }
    }
    
    $scope.add = function(item){
      var item = $scope.list.indexOf(item);
      $scope.inventory.push($scope.list[item]);
      $scope.list[item].checked = true;
    }
}]);
