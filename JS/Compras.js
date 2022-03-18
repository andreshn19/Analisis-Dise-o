var app = angular.module("listaCompras", []);
app.controller("listaComprasController", function($scope, $filter) {
  $scope.items = [{
    IDCompra: 01,
    IDInventario: 01,	
    IDUsuario: 01,
    observacion: 'Lanche',
    precio: 23.50,
    cantidad: 10,
    fecha: '18/10/2015',
    nombreproducto: 'Chorizo',
    tipoCompra: 'Efectivo', 
    tipoProducto: 'Insumo Venta',
    totalCompra: 235
  }, {
    IDCompra: 02,
    IDInventario: 01,	
    IDUsuario: 02,
    observacion: 'Cinema',
    precio: 35,
    cantidad: 5,
    fecha: '18/10/2015',
    nombreproducto: 'Tajo',
    tipoCompra: 'Crédito',
    tipoProducto: 'Insumo Venta',
    totalCompra: 175
  }, {
    IDCompra: 03,
    IDInventario: 01,	
    IDUsuario: 03,
    observacion: 'Carne',
    precio: 26.30,
    cantidad: 30,
    fecha: '19/10/2015',
    nombreproducto: 'Pechuga',
    tipoCompra: 'Efectivo',
    tipoProducto: 'Insumo Venta',
    totalCompra: 789
  }, {
    IDCompra: 04,
    IDInventario: 01,	
    IDUsuario: 04,
    observacion: 'Cerveja',
    precio: 33,
    cantidad: 15,
    fecha: '20/10/2015',
    nombreproducto: 'Res',
    tipoCompra: 'Cheque',
    tipoProducto: 'Insumo Venta',
    totalCompra: 495
  }, {
    IDCompra: 05,
    IDInventario: 01,	
    IDUsuario: 05,
    observacion: 'Mercado',
    precio: 56.12,
    cantidad: 20,
    fecha: '21/10/2015',
    nombreproducto: 'Cerdo',
    tipoCompra: 'Efectivo',
    tipoProducto: 'Insumo Venta',
    totalCompra: 1042.4
  }];
  
  $scope.adicionaItem = function() {
    $scope.items.push({
      observacion: $scope.item.observacion,
      precio: $scope.item.precio,
      cantidad: $scope.item.cantidad,
      fecha: $scope.item.fecha,
      nombreproducto: $scope.item.nombreproducto,
      IDCompra: $scope.item.IDCompra,
      IDInventario: $scope.item.IDInventario,
      IDUsuario: $scope.item.IDUsuario,
      tipoCompra: $scope.item.tipoCompra,
      tipoProducto: $scope.item.tipoProducto,
      totalCompra: $scope.item.totalCompra
    });
    $scope.item.tipoProducto = $scope.item.totalCompra = $scope.item.tipoCompra = $scope.item.cantidad = $scope.item.observacion = $scope.item.precio = $scope.item.fecha, $scope.item.nombreproducto  = $scope.item.IDCompra = $scope.item.IDInventario = $scope.item.IDUsuario =  '';
    $scope.totalCompra = $scope.sum($scope.items, 'totalCompra'); 
  };
  
  $scope.sum = function(items, prop){
      return items.reduce( function(a, b){
          return a + b[prop];
      }, 0);
  };
  $scope.totalCompra = $scope.sum($scope.items, 'totalCompra'); 
  
  $scope.submitForm = function() {

			// check to make sure the form is completely valid
			if ($scope.formItem.$valid) {
        console.log($scope.formItem.IDCompra);
        console.log($scope.formItem.IDInventario);
        console.log($scope.formItem.IDUsuario);
				console.log($scope.formItem.fecha);
        console.log($scope.formItem.precio);
        console.log($scope.formItem.cantidad);
        console.log($scope.formItem.observacion);
        console.log($scope.item.nombreproducto);
        console.log($scope.item.tipoCompra);
        console.log($scope.item.tipoProducto);
        console.log($scope.item.totalCompra);
        $scope.adicionaItem();
			}else{
        console.log("form invalid");
      }

		};
  
});

app.filter('sumOfValue', function () {
    return function (fecha, key) {
        if (typeof (fecha) === 'undefined' && typeof (key) === 'undefined') {
            return 0;
        }
        var sum = 0;
        for (var i = 0; i < fecha.length; i++) {
            sum = sum + parseInt(fecha[i][key]);
        }
        return sum;
    }
});
