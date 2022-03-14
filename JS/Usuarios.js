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

//+++++++++++++
$("html").on("keydown", ".tabber", function(e){
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if (key == 13) {
      var index = $(this).index('.tabber'); // Busca el index actual dentro del array
      var total = $('.tabber').length; // Busca el tamaño actual
      if (total > index+1) { // Compara con el array de index 0
        $('.tabber').get(index+1).focus();
        e.preventDefault();
      }
    }
  });
  
  $("input#ot").blur(function(e) {
    var tok = Math.floor((Math.random() * 2) + 1);
    if(tok==1) {
      $(".panel2").fadeIn();
      $(".saldo").fadeIn();
      $(".informativo").fadeOut();
      $(".panel1").fadeOut();
      $("select#metodo_pago").focus();
    } else {
      $(".saldo").fadeOut();
      $(".informativo").fadeIn();
    }
  });
  
  $("input#banco, input#cant").blur(function(e) {
    //Make checks
    $(".panel2").fadeOut();
    $(".panel3").fadeIn();
    $("select#tipo_boleta").focus();
  });
  
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
  
  /*
  $(document).ready(function(){
    $(".panel2").hide();
    $(".panel3").hide();
    $(".saldo").hide();
    $(".informativo").hide();
    $("input#ot").focus();
    $(".cheque, .vale-vista").fadeOut().find("input").removeClass("tabber");
    $(".efectivo").fadeIn().find("input").addClass("tabber");
  });/*
  
  var cleaveNumeral = new Cleave('input#monto', {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand'
  });
  
  var cleaveNumeral2 = new Cleave('input#cant', {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand'
  });*/