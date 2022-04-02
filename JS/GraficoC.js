google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart1);
function drawChart1() {
  var data = google.visualization.arrayToDataTable([
    ['Mes', 'Compras'],
    ['Enero',  1000],
    ['Febrero',  1170],
    ['Marzo',  1060],
    ['Abril',  1010],
    ['Mayo',  1030],
    ['Junio',  1050],
    ['Julio',  1030],
    ['Agosto',  1010],
    ['Septiembre',  1060],
    ['Octubre',  1090],
    ['Noviembre',  1100],
    ['Diciembre',  1030]
  ]);

  var options = {
    title: ' "Empresa Servicios Múltiples Jóvenes Profesionales" ',
    hAxis: {title: 'Meses', titleTextStyle: {color: 'Blue'}}
 };

var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
  chart.draw(data, options);
}

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart2);
function drawChart2() {
  var data = google.visualization.arrayToDataTable([
    ['Mes', 'Compras'],
    ['Enero',  1000],
    ['Febrero',  1170],
    ['Marzo',  1060],
    ['Abril',  1010],
    ['Mayo',  1030],
    ['Junio',  1050],
    ['Julio',  1030],
    ['Agosto',  1010],
    ['Septiembre',  1060],
    ['Octubre',  1090],
    ['Noviembre',  1100],
    ['Diciembre',  1030]
  ]);

  var options = {
    title: ' "Empresa Servicios Múltiples Jóvenes Profesionales" ',
    hAxis: {title: 'Meses',  titleTextStyle: {color: 'Green'}},
    vAxis: {minValue: 0}
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
  chart.draw(data, options);
}

$(window).resize(function(){
  drawChart1();
  drawChart2();
});