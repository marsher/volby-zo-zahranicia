function getChoice(btn,data){
	$(btn).addClass('chosen');


}

function nemamTP(){
	$('#address-slovakia').hide();
	$('#preview-button').attr('onclick','createDocument(true,"noTP")');
	$('#download-button').attr('onclick','createDocument(false,"noTP")');
	$('#sign-button').attr('onclick','createDocument(true,"noTP")');
	$('#cityaddress').val("Ministerstvo vnútra Slovenskej republiky\n odbor volieb, referenda a politických strán\nDrieňová 22\n826 86  Bratislava 29\nSLOVAK REPUBLIC\n");
}

function mamTP(){
	$('#address-slovakia').show();
	$('#preview-button').attr('onclick','createDocument(true,"TP")');
	$('#download-button').attr('onclick','createDocument(false,"TP")');
	$('#sign-button').attr('onclick','createDocument(true,"TP")');
}


function createDocument(preview,type,signature){
// playground requires you to assign document definition to a variable called dd
var paragraph,localaddress = [],noTP =[],vyhlasenie=[];
if(type == 'TP'){
	paragraph = 'Podľa   § 60 ods. 1   zákona   č. 180/2014 Z. z. o podmienkach výkonu volebného práva a o zmene a doplnení niektorých zákonov žiadam o voľbu poštou pre voľby do Národnej rady Slovenskej republiky v roku 2016.';
	localaddress = [
		{ 
			text: 'Adresa trvalého pobytu v Slovenskej republike:',
			style: 'line',
			//style: 'header', 
		    bold: true
		},
		{ 
			text: 'Ulica: ' + $('#addressslovakia-street').val(),
			style: 'line',
			//style: 'header', 
		//	bold: false 
		},
		{ 
			text: 'Číslo domu: ' + $('#addressslovakia-streetno').val(),
			style: 'line',
			//style: 'header', 
		//	bold: false 
		},
		{ 
			text: 'Obec: ' + $('#addressslovakia-city').val(),
			style: 'line',
			//style: 'header', 
		//	bold: false 
		},
		{ 
			text: 'PSČ: ' + $('#addressslovakia-zip').val(),
			style: 'line',
			//style: 'header', 
		//	bold: false 
		},
		{ 
			text: 'Adresa miesta pobytu v cudzine (pre zaslanie hlasovacích lístkov a obálok):',
			style: 'line',
			//style: 'header', 
		    bold: true
		}]

}else if(type == 'noTP'){
	paragraph = 'Podľa   § 59 ods. 1   zákona   č. 180/2014 Z. z. o podmienkach výkonu volebného práva a o zmene a doplnení niektorých zákonov žiadam o voľbu poštou pre voľby do Národnej rady Slovenskej republiky v roku 2016 a o zaslanie hlasovacích lístkov a obálok na adresu:';
	noTP = [
			{
				text:'Prílohy:',
				style: 'header',
				alignment: 'left'
			},
			{ul: [
				'čestné vyhlásenie voliča, že nemá trvalý pobyt na území Slovenskej republiky.',
				'fotokópia časti cestovného dokladu Slovenskej republiky s osobnými údajmi voliča alebo fotokópia osvedčenia o štátnom občianstve Slovenskej republiky voliča.',
			]}
			/*{
				text:'čestné vyhlásenie voliča, že nemá trvalý pobyt na území Slovenskej republiky.',
				style: 'line',
				alignment: 'left'
			},
			{
				text:'fotokópia časti cestovného dokladu Slovenskej republiky s osobnými údajmi voliča alebo fotokópia osvedčenia o štátnom občianstve Slovenskej republiky voliča.',
				style: 'line',
				alignment: 'left'
			}*/
	];
	vyhlasenie = [
					{
						text:'tu bude vyhlasenie',
					}

	];

}

var dd = {
	content: [
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
		{ 
			text: $('#cityaddress').val(),
			alignment: 'right',
			style: 'address', 
		//	bold: false 
		},
		{ 
			text: [
				paragraph
				],
			//style: 'header', 
		//	bold: false 
		},
		{ 
			text: 'Meno: ' + $('#basicinfo-name').val(),
			style: 'line',
			//style: 'header', 
		//	bold: false 
		},
		{ 
			text: 'Priezvisko: ' + $('#basicinfo-lastname').val(),
			style: 'line',
			//style: 'header', 
		//	bold: false 
		},
		{ 
			text: 'Rodné priezvisko: ' + $('#basicinfo-virginlastname').val(),
			style: 'line',
			//style: 'header', 
		//	bold: false 
		},
		{ 
			text: 'Rodné číslo: ' + $('#basicinfo-birthno').val(),
			style: 'line',
			//style: 'header', 
		//	bold: false 
		},
		localaddress,
		{ 
			text: 'Ulica: ' + $('#addressforeign-street').val(),
			style: 'line',
			//style: 'header', 
		//	bold: false 
		},
		{ 
			text: 'Číslo domu: ' + $('#addressforeign-streetno').val(),
			style: 'line',
			//style: 'header', 
		//	bold: false 
		},
		{ 
			text: 'Obec: ' + $('#addressforeign-city').val(),
			style: 'line',
			//style: 'header', 
		//	bold: false 
		},
		{ 
			text: 'PSČ: ' + $('#addressforeign-zip').val(),
			style: 'line',
			//style: 'header', 
		//	bold: false 
		},
		{ 
			text: 'Štát: ' + $('#addressforeign-country').val(),
			style: 'line',
			//style: 'header', 
		//	bold: false 
		},
		noTP,
		{ 
			text: 'V ' + $('#addressforeign-city').val(),
			style: 'footer',
			//style: 'header', 
		//	bold: false 
		},
		{ 
			text: 'Dátum:',
			style: 'footer',
			//style: 'header', 
		//	bold: false 
		},
		vyhlasenie
	],
	styles: {
		header: {
			fontSize: 12,
			bold: true,
			alignment: 'justify'
		},
		address: {
			fontSize: 9,
			//bold: true,
			italic: true,
			alignment: 'justify',
			margin: [10,10,10,10],
		},
		line: {
            fontSize: 11,
            margin:[10,10,10,10]
        },
        footer:{
            fontSize: 12,
            margin:[0,20,0,10]
        }
    }
}
if(preview === true){
	pdfMake.createPdf(dd).getDataUrl(function(result){
		$('#preview').attr('src',result);
	});

} else
pdfMake.createPdf(dd).open()

}

var canvas = document.querySelector("canvas");
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
resizeCanvas();

$(document).ready(function(){
	var canvas = document.querySelector("canvas");
	var signaturePad = new SignaturePad(canvas);

	$('#clear-button').on("click", function (event) {
    signaturePad.clear();
});

$('#save-button').on("click", function (event) {
    	$('#signature').val(signaturePad.toDataURL());
    })
});




