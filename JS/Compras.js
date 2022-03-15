$("#showmenu").click(function(e){
    $("#menu").toggleClass("show");
});
$("#menu a").click(function(event){
    if($(this).next('ul').length){
event.preventDefault();
        $(this).next().toggle('fast');
        $(this).children('i:last-child').toggleClass('fa-caret-down fa-caret-left');
    }
});


var app = angular.module("listaCompras", []);
app.controller("listaComprasController", function($scope, $filter) {
  $scope.itens = [{
  }];
  
  $scope.adicionaItem = function() {
    $scope.itens.push({
      descricao: $scope.item.descricao,
      valor: $scope.item.valor,
      data: $scope.item.data
    });
    $scope.item.descricao = $scope.item.valor = $scope.item.data = '';
    $scope.valorTotal = $scope.sum($scope.itens, 'valor'); 
  };
  
  $scope.sum = function(items, prop){
      return items.reduce( function(a, b){
          return a + b[prop];
      }, 0);
  };
  $scope.valorTotal = $scope.sum($scope.itens, 'valor'); 
  
  $scope.submitForm = function() {

			// check to make sure the form is completely valid
			if ($scope.formItem.$valid) {
				console.log($scope.formItem.data);
        console.log($scope.formItem.valor);
        console.log($scope.formItem.descricao);
        $scope.adicionaItem();
			}else{
        console.log("form invalid");
      }

		};
  
});

app.filter('sumOfValue', function () {
    return function (data, key) {
        if (typeof (data) === 'undefined' && typeof (key) === 'undefined') {
            return 0;
        }
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum = sum + parseInt(data[i][key]);
        }
        return sum;
    }
})