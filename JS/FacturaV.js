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

$(document).ready(function() {
	$("#inp-producto").focus();
	//S$("#snick").snackbar("show");
});

$("#imprimir").click(function() {
	var ventimp = window.open(' ', 'Impresion');
	$("#imprimir").hide();
	ventimp.document.write("<style>#tabla1{width:90%; border-collapse: collapse;}td, th{ border-bottom: 1px solid black;} tr{text-align: left;}</style><center>" + $("#mdl-ticket").html() + "</center>");
	ventimp.document.close();
	ventimp.print();
	ventimp.close();
	$("#imprimir").show();
});

$("#enviar").click(function() {
	//var simbolos = ["#", "@", "!"];
	// var floatRegex = new RegExp('[0-9]');
	// $('#inp-precio').val($('#inp-precio').val().replace(floatRegex, ''));
	if ($('#inp-producto').val().trim() != '') {
		if ($('#inp-precio').val().trim() != '') {
			if ($("#sel-tipopago option:selected").attr("id").toString() != "elija") {
				if ($("#sel-tipopago option:selected").attr("id").toString() == "efectivo" || $("#sel-periodo option:selected").val().toString() != "Elija un periodo...") {

				} else {
					//alert("Elija un periodo de pago");
					$.snackbar({
						content: "Elija un periodo de pago"
					}, $(".snackbar").remove());
					$("#sel-periodo").focus();
					return false;
				}
			} else {
				// alert("Elija un tipo de pago");
				$.snackbar({
					content: "Elija un tipo de pago"
				}, $(".snackbar").remove());
				$("#sel-tipopago").focus();
				return false;
			}
		} else {
			// alert("Ingrese el precio del producto");
			$.snackbar({
				content: "Ingrese el precio del producto"
			}, $(".snackbar").remove());
			$("#inp-precio").focus();
			return false;
		}
	} else {
		//alert("Ingrese el nombre de un producto");
		$.snackbar({
			content: "Ingrese el nombre del producto"
		}, $(".snackbar").remove());
		//var notaid = $(".snackbar").attr('id');
		//alert(notaid);
		//$("#"+notaid).snackbar("toggle");
		$('#inp-producto').val('');
		$("#inp-producto").focus();
		return false;
	}

	slow();

	function slow() {
		//$( "#tabla1" ).fadeOut( "slow", function(){
		$("#tabla1").hide(); //change if not modal
		$("#tablainfo").empty();
		$('#mdl-ticket').modal('show'); //del if not modal
		addTabla();
		$("#loading").fadeTo("slow", 1);
		$("#loading").fadeOut("slow", showTable);
		//});
	}

	function showTable() {
		$("#tabla1").fadeTo("slow", 1);
		$("#imprimir").fadeTo("slow", 1);
		$("#imprimir").attr("disabled", false);
	}

	function addTabla() {
		var numPagos = 1;
		var monto = $("#inp-precio").val();
		var fecha = new Date();
		var mes = fecha.getMonth() + 1;
		var month;
		var dia = fecha.getDate();
		var year = fecha.getFullYear();
		switch (mes) {
			case 1:
				month = "Enero";
				break;
			case 2:
				month = "Febrero";
				break;
			case 3:
				month = "Marzo";
				break;
			case 4:
				month = "Abril";
				break;
			case 5:
				month = "Mayo";
				break;
			case 6:
				month = "Junio";
				break;
			case 7:
				month = "Julio";
				break;
			case 8:
				month = "Agosto";
				break;
			case 9:
				month = "Septiembre";
				break;
			case 10:
				month = "Octubre";
				break;
			case 11:
				month = "Noviembre";
				break;
			case 12:
				month = "Diciembre";
				break;
		}
		if ($("#sel-tipopago option:selected").attr("id").toString() == "credito") {
			numPagos = $("#sel-periodo").val();
			var monto = monto / numPagos;

			for (var i = 0; i < numPagos; i++) {

				switch (mes) {
					case 1:
						month = "Enero";
						break;
					case 2:
						month = "Febrero";
						break;
					case 3:
						month = "Marzo";
						break;
					case 4:
						month = "Abril";
						break;
					case 5:
						month = "Mayo";
						break;
					case 6:
						month = "Junio";
						break;
					case 7:
						month = "Julio";
						break;
					case 8:
						month = "Agosto";
						break;
					case 9:
						month = "Septiembre";
						break;
					case 10:
						month = "Octubre";
						break;
					case 11:
						month = "Noviembre";
						break;
					case 12:
						month = "Diciembre";
						break;
				}
				//alert(month + " / " + year);
				var mesesno = [4, 6, 9, 11];
				var diapago = dia;
				//para pruebas le asigne valores en la caja de texto

				if (mesesno.indexOf(mes) > -1) {
					//alert(mesesno.indexOf(mes));
					if (diapago > 30) {
						diapago = 30;
					} else {
						diapago = dia;
					}
				}
				//
				else if (mes == 2) {
					if (diapago > 28) {
						if (year % 4 == 0) {
							diapago = 29;
						} else {
							diapago = 28;
						}
					}
				} else {
					diapago = dia;
				}

				$("#tablainfo").append("<tr class='info'><td>" + (i + 1) + "</td><td>" + diapago + " de " + month + " de " + year + "</td><td>$" + Math.floor(monto * 100) / 100 + "</td></tr>");
				mes++;
				if (mes == 13) {
					mes = 1;
					//console.log(mes);
					year++;
					//console.log(year);
				}
			}
		} else if ($("#sel-tipopago option:selected").attr("id").toString() == "efectivo") {
			for (var i = 0; i < numPagos; i++) {
				$("#tablainfo").append("<tr class='info'><td>" + (i + 1) + "</td><td>" + dia + " de " + month + " de " + year + "</td><td>$" + monto + "</td></tr>");
			}
		}
	}

});

$("#limpiar").click(function() {
	$('#inp-producto').val('');
	$('#inp-precio').val('');
	$("#sel-periodo").attr("disabled", true);
	$('#sel-tipopago option:first-child').attr("selected", "selected");
	$('#sel-periodo option:first-child').attr("selected", "selected");
	$("#tabla1").fadeOut("slow");
	$('#inp-producto').focus();
});

$("#sel-tipopago").change(function() {
	if ($("#sel-tipopago option:selected").attr("id").toString() == "credito") {
		$("#sel-periodo").attr("disabled", false);
	} else {
		$('#sel-periodo option:first-child').attr("selected", "selected");
		$("#sel-periodo").attr("disabled", true);
	}
});

$("#inp-precio").keypress(function(event) {
	var controlKeys = [13];
	var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
	// if ($('#inp-precio').val().toString().indexOf(".") > -1) {
	// 	if (!event.which || (49 <= event.which && event.which <= 57) || 48 == event.which || isControlKey) {
	// 		return;
	// 	}
	// 	else {
	// 		event.preventDefault();
	// 	}
	// } else{
	// 	var conZero = $('#inp-precio').val().toString().indexOf("0") > -1 ? conZero = true : conZero = false;
	// 	if (!event.which || (49 <= event.which && event.which <= 57) || 48 == event.which && $(this).val() > 0 || isControlKey || event.which==46) {
	// 		return;
	// 	}
	// 	else {
	// 		event.preventDefault();
	// 	}
	// }

	if (!event.which || (49 <= event.which && event.which <= 57) || (48 == event.which && ($(this).val() > 0)) || isControlKey) {
		return;
	} else {
		event.preventDefault();
	}

});