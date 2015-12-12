var App = window.election;

App.currentStep = 0;
$('a.btn-step').click(function() {
    var $btn = $(this);
    var isStepBack = false;

    if (!$btn.hasClass("dontcountstep")) {
        isStepBack = $btn.is('#krokomer a');
        (isStepBack)
            ? App.currentStep--
            : App.currentStep++;

        updateStep(App.currentStep);
    }

    $('.row').hide();
    $.when($($btn.attr('href')).show()).done(function() {
        resizeCanvas();
        App.Analytics.trackStep($btn.prop('hash'), App.currentStep, isStepBack);
    })
});

function updateStep(step) {
    var $progressContainer = $('.nav--progress');

    if (0 === step) {
        $progressContainer.hide();
        return;
    }

    $progressContainer
        .find('li:nth-child('+step+')')
        .siblings('li')
            .hide()
        .end()
        .show();

    var $stepCounter = $progressContainer.find('.counter');
    $stepCounter
        .children('.counter__step')
            .text(step)
        .end()
        .show();

    $progressContainer.show();
}

function clearForm() {
	$('#ziadost h2').hide();
	$('#ziadost form').hide();
}

function updateMenu(i) {
	if (i) {
		$('#krokomer li:nth-child(3) a').attr('href', '#ziadost');
		$('#krokomer li:nth-child(4) a').attr('href', '#pdf');
		$('#krokomer li:nth-child(5) a').attr('href', '#sign');
		$('#krokomer li:nth-child(6) a').attr('href', '#pdf-final');
	} else {
		$('#krokomer li:nth-child(3) a').attr('href', '#preukaz-zahranicie');
		$('#krokomer li:nth-child(4) a').attr('href', '#ziadost');
		$('#krokomer li:nth-child(5) a').attr('href', '#pdf');
		$('#krokomer li:nth-child(6) a').attr('href', '#sign');
		$('#krokomer li:nth-child(7) a').attr('href', '#pdf-final');
	}
}

function nemamTP() {
  // update back button
  clearForm();
  updateMenu(true);
  $('.nemam-tp').show();
  $('#photo-link').show();

  $('#tpFlag').val('volbaPostouBezTrvalehoPobytu');
  $("#addressslovakia-kraj").val("Mimo SR");
  nastavKraj();
  $("#addressslovakia-okres").val("Mimo SR");
  nastavOkres();
  $("#addressslovakia-obec").val("mvsr");

}

function postaTP() {
  clearForm();
  updateMenu(false);
  $('.posta-tp').show();
  $('#photo-link').hide();
  $('#tpFlag').val('volbaPostouSTrvalymPobytom')
}

function preukazTP() {
  clearForm();
  updateMenu(0);
  $('.preukaz-tp').show();
  $('#photo-link').hide();
  $('#tpFlag').val('ziadostOPreukazPostou')
}

function preukazPS() {
  clearForm();
  updateMenu(0);
  $('.preukaz-ps').show();
  $('#photo-link').hide();
  $('#tpFlag').val('ziadostOPreukaPreSplnomocnenca')
}


function getAddressOneLine(id) {
  var ret = "";
  var format = $('#' + id + '-format').val();
  if(!format) format = "sk";

  if ($('#' + id + '-street').val()) {
	if(format=="sk"){
     ret += $('#' + id + '-street').val() + " " + $('#' + id + '-streetno').val();
	}else if(format == "usa"){
     ret += $('#' + id + '-streetno').val() + " " + $('#' + id + '-street').val();
	}
  } else {
    if (id == "addressslovakia") {
      getObec() + " " + $('#' + id + '-streetno').val();
    } else {

 	 if(format=="sk"){
      ret += $('#' + id + '-city').val() + " " + $('#' + id + '-streetno').val();
	 }else if(format == "usa"){
      ret += $('#' + id + '-streetno').val() + " " + $('#' + id + '-city').val();
	 }
    }

  }
  if (ret != " ") ret += ", ";


  if (id == "addressslovakia") {
	ret += $('#' + id + '-zip').val() + " " + getObec();
  } else {
   if(format=="sk"){
    ret += $('#' + id + '-zip').val() + " " + $('#' + id + '-city').val();
   }else if(format == "usa"){
    ret += $('#' + id + '-city').val() + " " + $('#' + id + '-zip').val();
   }
  }

  if (ret != " ") ret += ", ";

  if (id == "addressslovakia") {
    ret += "Slovenská republika";
  } else {
    ret += $('#' + id + '-country').val();
  }
  return ret;
}


function nacitajKraje(){
	var options = $("#addressslovakia-kraj");
	options.find('option').remove();
	for (var key in election.cities) {
		options.append($("<option />").text(key));
	}
	nastavKraj();
}
function nastavKraj(){
	var options = $("#addressslovakia-okres");
	options.find('option').remove();
    var kraj = $("#addressslovakia-kraj").val();
	for (var key in election.cities[kraj]) {
		options.append($("<option />").text(key));
	}
	nastavOkres();
}
function nastavOkres(){
	var options = $("#addressslovakia-city");
	options.find('option').remove();
    var kraj = $("#addressslovakia-kraj").val();
    var okres = $("#addressslovakia-okres").val();
	for (var key in election.cities[kraj][okres]) {
		options.append($("<option />").val(key).text(election.cities[kraj][okres][key][10]));
	}
	nastavObec();
}
function getObec(){

  var ico = $("#addressslovakia-city").val();
  var kraj = $("#addressslovakia-kraj").val();
  var okres = $("#addressslovakia-okres").val();
  var o = election.cities;

  if (ico && o[kraj] && o[kraj][okres] && o[kraj][okres][ico]) {
	return o[kraj][okres][ico][10];
  }
  return "Nepodarilo sa načítať obec";
}
function nastavObec() {

	// list/db of all cities comes from external file (js/cities)
  var o = election.cities;

  var adresa = "";
  var ico = $("#addressslovakia-city").val();
  var kraj = $("#addressslovakia-kraj").val();
  var okres = $("#addressslovakia-okres").val();

  if (ico) {

    if (o[kraj] && o[kraj][okres] && o[kraj][okres][ico]) {
	  var data = o[kraj][okres][ico];
      adresa = data[0] + "\n";
      if (data[1] != "") {
        adresa += data[1] + "\n";
      }
      if (data[2] != "" || data[3] != "") {
        if (data[2]) {
          adresa += data[2] + " ";
        }
        if (data[3]) {
          adresa += data[3];
        }
        adresa += "\n";
      }
      adresa += data[4] + " " + data[5] + "\n" + data[6].replace(/;/i, "\n");

    $("#adresa").val(adresa);

    var type =  $('#tpFlag').val();
    var subj = "Ziadost";
    var textemailu = "";
	var meno = $('#basicinfo-name').val()+" "+$('#basicinfo-lastname').val();
    if(type == 'volbaPostouSTrvalymPobytom'){
      var subj = "Žiadosť o voľbu poštou pre voľby do NRSR";
      var textemailu = "Podľa § 60 ods. 1 zákona č. 180/2014 Z. z. o podmienkach výkonu volebného práva a o zmene a doplnení niektorých zákonov žiadam o voľbu poštou pre voľby do Národnej rady Slovenskej republiky v roku 2016. Žiadosť odosielam v prílohe. Zároveň Vás chcem poprosiť o potvrdenie e-mailom že žiadosť bola prijatá a spracovaná. "+decodeURIComponent("%0D%0A")+"Ďakujem,"+decodeURIComponent("%0D%0A")+" "+meno;
    }else if(type == 'volbaPostouBezTrvalehoPobytu'){
      var subj = "Žiadosť o voľbu poštou pre voľby do NRSR";
      var textemailu = "Podľa   § 59 ods. 1   zákona   č. 180/2014 Z. z. o podmienkach výkonu volebného práva a o zmene a doplnení niektorých zákonov žiadam o voľbu poštou pre voľby do Národnej rady Slovenskej republiky v roku 2016 a o zaslanie hlasovacích lístkov a obálok na adresu uvedenú v žiadosti. Zároveň Vás chcem poprosiť o potvrdenie e-mailom že žiadosť bola prijatá a spracovaná. "+decodeURIComponent("%0D%0A")+"Ďakujem,"+decodeURIComponent("%0D%0A")+" "+meno;
    }else if(type == "ziadostOPreukazPostou"){
      var subj = "Žiadosť o hlasovací preukaz";
      var textemailu = "Podľa § 46 zákona č. 180/2014 Z. z. o podmienkach výkonu volebného práva a o zmene a doplnení niektorých zákonov o vydanie hlasovacieho preukazu pre voľby do Národnej rady Slovenskej republiky v roku 2016. Hlasovací preukaz si želám odoslať na adresu uvedenú v žiadosti. Zároveň Vás chcem poprosiť o potvrdenie e-mailom že žiadosť bola prijatá a spracovaná. "+decodeURIComponent("%0D%0A")+"Ďakujem,"+decodeURIComponent("%0D%0A")+" "+meno;
    }else if(type =="ziadostOPreukaPreSplnomocnenca"){
      var subj = "Žiadosť o hlasovací preukaz";
      var textemailu = "Podľa § 46 zákona č. 180/2014 Z. z. o podmienkach výkonu volebného práva a o zmene a doplnení niektorých zákonov o vydanie hlasovacieho preukazu pre voľby do Národnej rady Slovenskej republiky v roku 2016. Hlasovací preukaz za mňa preberie splnomocnenec. Zároveň Vás chcem poprosiť o potvrdenie e-mailom že žiadosť bola prijatá a spracovaná. "+decodeURIComponent("%0D%0A")+"Ďakujem,"+decodeURIComponent("%0D%0A")+" "+meno;
    }

    $("#sendto").html(data[6]);
    $("#emailsubject").html(subj);
    $("#emailbody").html(textemailu);
	if(jQuery.data( document.body, "psc-locked")){}else{
		$("#addressslovakia-zip").val(data[4]);
	}
    $("#send").attr("href", "mailto:" + data[6] + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(textemailu));

    }
  }
}

function createDocument(preview) {
  jQuery.data( document.body, "psc-locked", "1");
  nastavObec();
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  var type = $('#tpFlag').val();
  // playground requires you to assign document definition to a variable called dd
  var paragraph, localaddress = [], noTP = [], vyhlasenie = [], signature = [], idPhoto = [];
  var signaturedata = signaturePad.toDataURL();
  if (signaturedata.length > 10) {
    $('#signature').val(signaturedata);
  }

  signature2 = [];
  if ($('#signature').val() != '') {
    signature =
            [
              {text: '', style: 'space'},
              {
                text: ['V ', {text: $('#addressforeign-city').val(), style: 'value'}],
                style: 'footer',
              },
              {
                text: ['Dátum: ', {text: '' + dd + '. ' + mm + '. ' + yyyy, style: 'value'}],
                style: 'footer',
              },
              {
                image: $('#signature').val(), width: 120, style: 'signatureStyle'
              },
              {
                text: '                      Podpis                      ',
                style: 'signatureTextStyle'
              }
            ];

    var signature2 = [
      {text: '', style: 'space'},
      {
        text: ['V ', {text: $('#addressforeign-city').val(), style: 'value'}],
        style: 'footer',
      },
      {
        text: ['Dátum: ', {text: '' + dd + '. ' + mm + '. ' + yyyy, style: 'value'}],
        style: 'footer',
      },
      {
        image: $('#signature').val(), width: 150, alignment: 'right'
      },
      {
        text: '                      Podpis                      ',
        style: 'signatureTextStyle'
      }
    ];
  }
  if ($('#camera-input')[0].files.length > 0) {
    idPhoto =
            [
              {
                image: $('#camera-preview').attr('src'),
                pageBreak: 'before',
                style: 'signature'
              }
            ]
  }


  if (type == 'volbaPostouSTrvalymPobytom') {
    paragraph = 'Podľa § 60 ods. 1 zákona č. 180/2014 Z. z. o podmienkach výkonu volebného práva a o zmene a doplnení niektorých zákonov žiadam o voľbu poštou pre voľby do Národnej rady Slovenskej republiky v roku 2016.';
    localaddress = [
      {text: '', style: 'spacesmall'},
      {
        text: 'Adresa trvalého pobytu v Slovenskej republike:',
        style: 'line',
        //style: 'header',
        bold: true
      },
      {
        columns: [
          {text: 'Ulica: ', style: 'line',},
          {text: $('#addressslovakia-street').val().toUpperCase(), style: 'value'},
          {text: ''}
        ]
      },
      {
        columns: [
          {text: 'Číslo domu: ', style: 'line',},
          {text: $('#addressslovakia-streetno').val().toUpperCase(), style: 'value'},
          {text: ''}
        ]
      },
      {
        columns: [
          {text: 'Obec: ', style: 'line',},
          {text: getObec().toUpperCase(), style: 'value'},
          {text: ''}
        ]
      },
      {
        columns: [
          {text: 'PSČ: ', style: 'line',},
          {text: $('#addressslovakia-zip').val(), style: 'value'},
          {text: ''}
        ]
      },
      {text: '', style: 'spacesmall'},
      {
        text: 'Adresa miesta pobytu v cudzine (pre zaslanie hlasovacích lístkov a obálok):',
        style: 'line',
        //style: 'header',
        bold: true
      }
    ];
  } else if (type == 'volbaPostouBezTrvalehoPobytu') {
    paragraph = 'Podľa   § 59 ods. 1   zákona   č. 180/2014 Z. z. o podmienkach výkonu volebného práva a o zmene a doplnení niektorých zákonov žiadam o voľbu poštou pre voľby do Národnej rady Slovenskej republiky v roku 2016 a o zaslanie hlasovacích lístkov a obálok na adresu:';
    noTP = [

      {text: '', style: 'spacesmall'},
      {
        text: 'Prílohy:',
        style: 'header',
        alignment: 'left'
      },
      {
        ul: [
          'čestné vyhlásenie voliča, že nemá trvalý pobyt na území Slovenskej republiky.',
          'fotokópia časti cestovného dokladu Slovenskej republiky s osobnými údajmi voliča alebo fotokópia osvedčenia o štátnom občianstve Slovenskej republiky voliča.',
        ]
      }
    ];
    vyhlasenie = [
      {
        text: $('#basicinfo-name').val() + ' ' + $('#basicinfo-lastname').val() + ' ' + $('#basicinfo-birthno').val(),
        alignment: 'center',
        pageBreak: 'before'
      },
      {
        text: getAddressOneLine('addressforeign'),
        alignment: 'center',
      },

      {text: '', style: 'space'},
      {
        text: 'ČESTNÉ VYHLÁSENIE',
        style: 'header',
        alignment: 'center'
      },
      {text: '', style: 'space'},
      {
        text: 'Na účely voľby poštou do Národnej rady Slovenskej republiky v roku 2016',
        alignment: 'center'
      },
      {text: '', style: 'space'},
      {
        text: 'čestne vyhlasujem,',
        style: 'header',
        alignment: 'center'
      },
      {text: '', style: 'space'},
      {
        text: 'že nemám trvalý pobyt na území Slovenskej republiky.'
      },
      signature2
    ];

  }

  if (type === "volbaPostouSTrvalymPobytom" || type === "volbaPostouBezTrvalehoPobytu") {
    formContent = [
      {
        text: 'Žiadosť',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'o voľbu poštou',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'pre voľby do Národnej rady Slovenskej republiky v roku 2016',
        style: 'header',
        alignment: 'center'
      },
      {text: '', style: 'space'},
      {
        text: $('#adresa').val(),
        style: 'address',
      },
      {text: '', style: 'space'},
      {
        text: [
          paragraph
        ],
      },
      {text: '', style: 'spacesmall'},
      {
        columns: [
          {text: 'Meno: ', style: 'line',},
          {text: $('#basicinfo-name').val().toUpperCase(), style: 'value'},
          {text: ''}
        ]
      },
      {
        columns: [
          {text: 'Priezvisko: ', style: 'line',},
          {text: $('#basicinfo-lastname').val().toUpperCase(), style: 'value'},
          {text: ''}
        ]
      },
      {
        columns: [
          {text: 'Rodné priezvisko: ', style: 'line',},
          {text: $('#basicinfo-maidenlastname').val().toUpperCase(), style: 'value'},
          {text: ''}
        ]
      },
      {
        columns: [
          {text: 'Rodné číslo: ', style: 'line',},
          {text: $('#basicinfo-birthno').val().toUpperCase(), style: 'value'},
          {text: ''}
        ]
      },
      localaddress,
      {
        columns: [
          {text: 'Ulica: ', style: 'line',},
          {text: $('#addressforeign-street').val().toUpperCase(), style: 'value'},
          {text: ''}
        ]
      },
      {
        columns: [
          {text: 'Číslo domu: ', style: 'line',},
          {text: $('#addressforeign-streetno').val().toUpperCase(), style: 'value'},
          {text: ''}
        ]
      },
      {
        columns: [
          {text: 'Obec: ', style: 'line',},
          {text: $('#addressforeign-city').val().toUpperCase(), style: 'value'},
          {text: ''}
        ]
      },
      {
        columns: [
          {text: 'PSČ: ', style: 'line',},
          {text: $('#addressforeign-zip').val(), style: 'value'},
          {text: ''}
        ]
      },
      {
        columns: [
          {text: 'Štát: ', style: 'line',},
          {text: $('#addressforeign-country').val().toUpperCase(), style: 'value'},
          {text: ''}
        ]
      },
      noTP
    ]
  }
  if (type === "ziadostOPreukazPostou") {
    preukazHeader = 'Žiadosť o vydanie hlasovacieho preukazu';
    preukazDelivery = [
      {
        text: 'Hlasovací preukaz žiadam zaslať na adresu:',
        style: 'line',
        alignment: 'left'
      },
      {
        columns: [
          {
            text: ['Meno: ', {text: $('#basicinfo-name').val().toUpperCase(), style: 'value'}],
          },
          {
            text: ['Priezvisko: ', {text: $('#basicinfo-lastname').val().toUpperCase(), style: 'value'}],
          }
        ]
      },
      {
        text: ['Adresa: ', {text: getAddressOneLine('addressforeign').toUpperCase(), style: 'value'}],
        style: 'line'
      }
    ]
  }

  if (type === "ziadostOPreukaPreSplnomocnenca") {
    preukazHeader = 'Žiadosť o vydanie hlasovacieho preukazu a splnomocnenie na jeho prevzatie';
    preukazDelivery = [
      {
        text: 'Na prevzatie hlasovacieho preukazu podľa § 46 ods. 6 zákona  splnomocňujem:',
        style: 'line',
        alignment: 'left'
      },
      {
        columns: [
          {
            text: ['Meno: ', {text: $('#proxy-name').val().toUpperCase(), style: 'value'}],
          },
          {
            text: ['Priezvisko: ', {text: $('#proxy-lastname').val().toUpperCase(), style: 'value'}],
          }
        ]
      },
      {
        text: ['Číslo občianskeho preukazu: ', {text: $('#proxy-idno').val().toUpperCase(), style: 'value'}],
        style: 'line'
      }
    ]
  }

  if (type === "ziadostOPreukazPostou" || type === "ziadostOPreukaPreSplnomocnenca") {
    formContent = [
      {
        text: $('#adresa').val(),
        style: 'address',
      },
      {text: '', style: 'space'},
      {
        text: preukazHeader,
        style: 'header',
        alignment: 'left'
      },
      {text: '', style: 'space'},
      {
        columns: [
          {
            text: ['Meno: ', {text: $('#basicinfo-name').val().toUpperCase(), style: 'value'}],
            style: 'line',
          },
          {
            text: ['Priezvisko: ', {text: $('#basicinfo-lastname').val().toUpperCase(), style: 'value'}],
            style: 'line',
          },
        ]
      },
      {
        columns: [
          {
            text: ['Rodné číslo: ', {text: $('#basicinfo-birthno').val(), style: 'value'}],
            style: 'line',
          },
          {
            text: ['Štátna príslušnosť: ', {text: 'Slovenská republika'.toUpperCase(), style: 'value'}],
            style: 'line',
          },
        ]
      },
      {
        text: ['Adresa trvalého pobytu: ', {text: getAddressOneLine('addressslovakia').toUpperCase(), style: 'value'}],
        style: 'line',
      },
      {text: '', style: 'space'},
      {
        text: 'žiadam',
        style: 'header',
        alignment: 'center'
      },
      {text: '', style: 'space'},
      {
        text: [
          {text: 'podľa § 46 zákona č. 180/2014 Z. z. o podmienkach výkonu volebného práva a o zmene a doplnení niektorých zákonov '},
          {text: 'o vydanie hlasovacieho preukazu', bold: true},
          {text: ' pre voľby do Národnej rady Slovenskej republiky v roku 2016.'},
        ]
      },
      {text: '', style: 'space'},
      preukazDelivery
    ]
  }
  var dd = {
	pageSize: 'A4',
	info: {
		title: 'Žiadosť o účasť vo voľbách',
		author: 'volby.digital',
		subject: 'Žiadosť o účasť vo voľbách',
	},
    content: [
      formContent,
      signature,
      vyhlasenie,
      idPhoto,
    ],
    styles: {
      header: {
        fontSize: 12,
        bold: true,
        alignment: 'justify'
      },
      value: {
        fontSize: 12,
        bold: true,
        margin: [0, 7, 0, 0],
        decoration: 'underline',
        decorationStyle: 'dotted'
      },
      address: {
        fontSize: 12,
        italic: true,
        alignment: 'justify',
        margin: [260, 10, 10, 10],
      },
      line: {
        fontSize: 12,
        margin: [0, 7, 0, 0],
        padding: [0, 0, 0, 0]
      },
      footer: {
        fontSize: 12,
        margin: [0, 0, 0, 0],
        padding: [0, 0, 0, 0]
      },
      space: {
        fontSize: 12,
        margin: [0, 40, 0, 0]
      },
      spacesmall: {
        fontSize: 12,
        margin: [0, 20, 0, 0]
      },
      signatureStyle: {
        margin: [0, -60, 0, 0],
        alignment: 'right'
      },
      signatureTextStyle: {
        decoration: 'overline',
        decorationStyle: 'dotted',
        alignment: 'right',
        margin: [30, 10],
        fontSize: 9
      }
    }
  }

  if(detectIE()){
	  pdfMake.createPdf(dd).download();
  }else{

	  if (preview === true) {
		pdfMake.createPdf(dd).getDataUrl(function (result) {
		  $('#preview').attr('src', result);
		  $('#final').attr('src', result);
		});

	  } else {
		pdfMake.createPdf(dd).open()
	  }
  }
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

$(document).ready(function () {
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

  $('[data-js-download-document]').on('click', function(e){
    e.preventDefault();
    var src = $('#final').attr('src');

	$('#step6but1').addClass('secondary');
	$('#step6but2').removeClass('secondary');

    window.open(src);
  });

  $('#camera-input').change(function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      $('#camera-preview').attr('src', reader.result)
    }
    reader.readAsDataURL($('#camera-input')[0].files[0]);
  });

  if(detectIE()){
	  $("#alertie").show();
	  $(".body-content .section").css("padding","100px 0 0 0");
	  $("#intro").css("padding","100px 0 0 0");
	  $("#final").hide();
	  $("#preview").hide();
  }

  nacitajKraje();
  nastavObec();
});


/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
	//http://stackoverflow.com/questions/19999388/check-if-user-is-using-ie-with-jquery
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // IE 12 (aka Edge) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}
