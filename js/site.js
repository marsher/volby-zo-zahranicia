/* STEP 0 */
var krok = 0;

$('a.btn-step').click(function(){
  if ($(this).is('#krokomer a')) { krok--; } else { krok++; }
  updateStep();
  $('.row').hide();
  $.when($($(this).attr('href')).show()).done(resizeCanvas())
});

function updateStep() {
  $('#krokomer li').hide();
  $('#krokomer li:nth-child('+krok+')').show();
  $('#krokomer h6 span').text(krok);
}

function updateMenu(i) {
  if(i) {
    $('#krokomer li:nth-child(3) a').attr('href', '#ziadost');
    $('#krokomer li:nth-child(4) a').attr('href', '#pdf');
    $('#krokomer li:nth-child(5) a').attr('href', '#sign');
    $('#krokomer li:nth-child(6) a').attr('href', '#photo');
  } else {
    $('#krokomer li:nth-child(3) a').attr('href', '#preukaz-zahranicie');
    $('#krokomer li:nth-child(4) a').attr('href', '#ziadost');
    $('#krokomer li:nth-child(5) a').attr('href', '#pdf');
    $('#krokomer li:nth-child(6) a').attr('href', '#sign');
  }
}



/*
function preukazPoslat(){
	$('#address-slovakia').show();
	$('#address-foreign').show();
	$('#tpFlag').val('pp');
	$('#photo-link').hide();
	$('#addressforeign-country').val('Slovensko');
	$('#foreign-header').hide();
	$('#local-header').show();
	$('#proxy').hide();
}

function preukazSplnomocnenec(){
	$('#address-slovakia').show();
	$('#address-foreign').hide();
	$('#tpFlag').val('ps');
	$('#photo-link').hide();
	$('#local-header').show();
	$('#proxy').show();

}

*/



canvas = document.querySelector("canvas");
// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;

$(document).ready(function(){
	resizeCanvas();

	signaturePad = new SignaturePad(canvas);

	$('#clear-button').on("click", function (event) {
		signaturePad.clear();
	});

	$('#sign-button').on("click", function (event) {
		$('#signature').val(signaturePad.toDataURL());
		createDocument(true);
	});

	$('#id-button').on("click", function (event) {
		createDocument(true);
	});

	$('#camera-input').change(function(){
		var reader = new FileReader();
		reader.onloadend = function(){
			$('#camera-preview').attr('src',reader.result)
		}
		reader.readAsDataURL($('#camera-input')[0].files[0]);
	})


});


