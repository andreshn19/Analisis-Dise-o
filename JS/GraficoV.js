google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart1);
function drawChart1() {
  var data = google.visualization.arrayToDataTable([
    ['Mes', 'Ventas'],
    ['Enero',  1000],
    ['Febrero',  2170],
    ['Marzo',  3060],
    ['Abril',  4010],
    ['Mayo',  5030],
    ['Junio',  1050],
    ['Julio',  2030],
    ['Agosto',  3000],
    ['Septiembre',  4060],
    ['Octubre',  9090],
    ['Noviembre',  2100],
    ['Diciembre',  5030]
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
    ['Mes', 'Ventas'],
    ['Enero',  1000],
    ['Febrero',  2170],
    ['Marzo',  3060],
    ['Abril',  4010],
    ['Mayo',  5030],
    ['Junio',  1050],
    ['Julio',  2030],
    ['Agosto',  3000],
    ['Septiembre',  4060],
    ['Octubre',  9090],
    ['Noviembre',  2100],
    ['Diciembre',  5030]
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