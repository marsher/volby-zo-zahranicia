var App = window.election;

function clearForm() {
  $('.preukaz-ps').hide();
  $('.posta-tp').hide();
  $('.preukaz-tp').hide();
  $('.nemam-tp').hide();

}

function nemamTP() {
  // update back button
  clearForm();
  $('.nemam-tp').show();
  $('#photo-link').show();

  App.request_form = 'volbaPostouBezTrvalehoPobytu';
  $("#adresa").val("Ministerstvo vnútra Slovenskej republiky\nodbor volieb, referenda a politických strán\nDrieňová 22\n826 86  Bratislava 29\nSLOVAK REPUBLIC");

}

function postaTP() {
  clearForm();
  $('.posta-tp').show();
  $('#photo-link').hide();
  App.request_form = 'volbaPostouSTrvalymPobytom';
}

function preukazTP() {
  clearForm();
  $('.preukaz-tp').show();
  $('#photo-link').hide();
  App.request_form = 'ziadostOPreukazPostou';
}

function preukazPS() {
  clearForm();
  $('.preukaz-ps').show();
  $('#photo-link').hide();
  App.request_form = 'ziadostOPreukaPreSplnomocnenca';
}






canvas = document.querySelector("canvas");
// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
  // When zoomed out to less than 100%, for some very strange reason,
  // some browsers report devicePixelRatio as less than 1
  // and only part of the canvas is cleared then.
  var ratio = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;

function makeSecondStep6ButtonPrimary(){
	  $('#step6but1').addClass("btn-volby-gray").removeClass("btn-volby-blue");
	  $('#step6but2').addClass("btn-volby-blue").removeClass("btn-volby-gray");
}

$(document).ready(function ()
{
  resizeCanvas();

  signaturePad = new SignaturePad(canvas);

  $('#clear-button').on("click", function (event)
  {
    signaturePad.clear();
  });

  $('#step6but1').on("click", function(event){
	  makeSecondStep6ButtonPrimary();
  });
  
  $('#id-button').on("click", function (event)
  {
    createDocument(true);
  });

  $('#camera-input').change(function ()
  {
    var reader = new FileReader();
    reader.onloadend = function ()
    {
      $('#camera-preview').attr('src', reader.result)
    }
    reader.readAsDataURL($('#camera-input')[0].files[0]);
  });

  if (detectIE())
  {
    $("#alertie").show();
    $(".body-content .section").css("padding", "100px 0 0 0");
    $("#intro").css("padding", "100px 0 0 0");
    $("#final").hide();
    $("#preview").hide();
	
	$("#download-preview-btn").hide();
	$("#download-final-btn").hide();
	makeSecondStep6ButtonPrimary();
  }
  if(isAndroid()){
    $("#final").hide();
    $("#preview").hide();
    $("#download-final-btn").hide();
	$("#download-preview-btn").hide();
	makeSecondStep6ButtonPrimary();
  }
  iosver =iOSversion();
  if(iosver){
	$("#download-final-ios-text").show();
	if(iosver >= 8){
		//$("#download-final-btn").hide();
		//makeSecondStep6ButtonPrimary();
	}
  }
  if(isAndroid() || iosver > 1){
	$("#intromobile").show();
	$("#intro").hide();
  }else{
	$("#intro").show();
	$("#intromobile").hide();
  }

  nacitajKraje();
  nastavObec();
  nastavPosteRestante();// osetrenie refreshu stranky
  findZIP();//detto
  
  $("#showhelp").on("click",function(){
	  $(".help").show();	
	  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
  });
  $(".help").hide();

  
  var clipboard = new Clipboard('.copy-btn');
  clipboard.on('success', function(e) {
     e.clearSelection();
  });
  
});

