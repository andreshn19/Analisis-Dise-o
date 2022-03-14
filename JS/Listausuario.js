
//+++++++++++++
$("select#metodo_pago").change(function(e) {
  var metodo = $("#metodo_pago option:selected").val();
  if(metodo=="Efectivo") {
    $(".cheque, .vale-vista").fadeOut().find("input, select").removeClass("tabber");
    $(".efectivo").fadeIn().find("input, select").addClass("tabber");
  } else if(metodo=="Transbank") {
    $(".efectivo, .cheque, .vale-vista").fadeOut().find("input, select").removeClass("tabber");
    $(".transbank").fadeIn().find("input, select").addClass("tabber");
  } else {
    $(".efectivo").fadeOut().find("input, select").removeClass("tabber");
    $(".cheque, .vale-vista").fadeIn().find("input, select").addClass("tabber");
  }
});