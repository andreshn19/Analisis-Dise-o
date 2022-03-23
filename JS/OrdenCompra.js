function remove(obj){
	console.log($(obj).parents('tr').remove());
	calculate();
}

function addrow(){
	var clon = $('#items > tbody > tr:eq(0)').clone();
	var btn = '<button type="button" onclick="remove(this)" class="btn btn-default"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>';
		clon.find('input,textarea').val('');
		clon.find('td:last-child').append(btn);
		clon.insertBefore( $('tr.noprint') );
		console.log(clon);
	calculate();
}
function calculate(){
	var total = 0;
	var tax = $('#taxval').val();

	$('#text-taxval').html(tax);

	$('.ItemCosto').each(function(i){
		price = $(this).val();
		if (!isNaN(price)) total += Number(price);
		// console.log(price);
	});

	totaliva = parseFloat(total)*tax;

	$('#subtotal').val(roundNumber(total,2));
	$('#tax').val(roundNumber(totaliva,2));
	$('#total').val(roundNumber(total+totaliva,2));

	// console.log((roundNumber(total,2)));
	// console.log((roundNumber(totaliva,2)));
	// console.log((roundNumber(total+totaliva,2))); 
}
	
$('#items, #taxval').keyup(function() {
	calculate();
})

$('[name="colcant"]').change(function() {
	if ($(this).prop('checked')) {
		$('#items').find('tr th:nth-child(2)').hide();
		$('#items').find('tr td:nth-child(2)').hide();
	}else{
		$('#items').find('tr th:nth-child(2)').show();
		$('#items').find('tr td:nth-child(2)').show();
	}
});

$('[name="taxinput"]').change(function() {
	if ($(this).prop('checked')) {
		$('#totales').find('#tax').parents('tr').hide();
		$('#taxval').val('');
	}else{
		$('#totales').find('#tax').parents('tr').show();
		$('#taxval').val('');
	}
	calculate();
});

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
 // from http://www.mediacollege.com/internet/javascript/number/round.html
function roundNumber(number,decimals) {
  var newString;// The new rounded number
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
      numString += ".";// give it one at the end
    }
    var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
    var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
    var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
    if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
      if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
        while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
          if (d1 != ".") {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff,cutoff+1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    } 
    if (d1 == 10) {
      numString = numString.substring(0, numString.lastIndexOf("."));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0,cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
    newString += ".";
  }
  var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;
  for(var i=0;i<decimals-decs;i++) newString += "0";
  //var newNumber = Number(newString);// make it a number if you like
  return newString; // Output the result to the form field (change for your purposes)
}