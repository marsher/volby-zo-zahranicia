
var validateBirthNumber = function(value, messages) {
	// rules according to https://sk.wikipedia.org/wiki/Rodn%C3%A9_%C4%8D%C3%ADslo
	// considering that people born in 2000 and later are not allowed to vote yet
	if (value.substr(0,2) < 54) {
		yii.validation.regularExpression(value, messages, {
			"pattern":/^\d{2}[0156]\d{3}\/\d{3}$/,
			"message":"Rodné číslo pred rokom 1954 musí mať 9 číslic vo formáte XXXXXX/XXX. Tretia číslica musí byť 0,1,5 alebo 6."
		});
	} else {
		yii.validation.regularExpression(value, messages, {
			"pattern":/^\d{2}[0156]\d{3}\/\d{4}$/,
			"message":"Rodné číslo musí mať 10 číslic vo formáte XXXXXX/XXXX. Tretia číslica musí byť 0, 1, 5 alebo 6."
		});
		if (messages.length == 0) {
			var rc = value.substr(0,6).concat(value.substr(7,11));
			if (rc % 11 != 0) {
				yii.validation.addMessage(messages, "Rodné číslo by malo byť deliteľné 11. Nemáte v ňom preklep?", value);
			}
		}
	}
};

var validatePSC = function(value, messages) {
	if( value.length != 5 ) yii.validation.addMessage(messages, "Vaše domáce PSČ by malo byť dlhé 5 číslic.", value);
	else yii.validation.regularExpression(value, messages, {
			"pattern":/^\d{5}$/,
			"message":"Vaše domáce PSČ by malo obsahovať iba čísla."
		});
}

jQuery(document).ready(function () {
	var ua = navigator.userAgent;

	var pathname = window.location.pathname;
	var test = pathname.indexOf('/test/');
	if( test > -1 ){
		$( '<p class="footer text-center">Váš prehliadač je: '+ua+'</p>' ).insertAfter( "#github" );
		if(detectIE()){
			$( '<p class="footer text-center">Používate Internet explorer</p>' ).insertAfter( "#github" );
		}
		if(isAndroid()){
			$( '<p class="footer text-center">Používate Android</p>' ).insertAfter( "#github" );
		}
		var ver = iOSversion();
		if(ver){
			$( '<p class="footer text-center">Používate iOS '+ver+'</p>' ).insertAfter( "#github" );
		}
	} else {
		if( ua.indexOf('Android') > -1 && ua.indexOf('Chrome') == -1 ){
			$( '<p><span class="digitalRed text-biggest">Pozor! Máte nepodporovaný prehliadač a nemusí Vám všetko správne fungovať. Použite prosím Google Chrome.'
				+'</span></p>' ).insertAfter( ".text-justify.text-bigger.paragraph-2" );
		}
	}

	var application = new RequestGeneratorApp();

	$(window).hashchange(application.run.bind(application));
	$(window).hashchange();

	jQuery('#basic-info').yiiActiveForm([{
		"id": "basicinfo-name",
		"name": "name",
		"container": ".field-basicinfo-name",
		"input": "#basicinfo-name",
		"validate": function (attribute, value, messages, deferred, $form) {
			yii.validation.required(value, messages, {
				"message": "Pre vytvorenie žiadosti je potrebné zadať Vaše krstné meno."
			});
		}
	}, {
		"id": "basicinfo-lastname",
		"name": "lastname",
		"container": ".field-basicinfo-lastname",
		"input": "#basicinfo-lastname",
		"validate": function (attribute, value, messages, deferred, $form) {
			yii.validation.required(value, messages, {
				"message": "Pre vytvorenie žiadosti je potrebné zadať Vaše priezvisko."
			});
		}
	}, {
		"id": "basicinfo-birthno",
		"name": "birthNo",
		"container": ".field-basicinfo-birthno",
		"input": "#basicinfo-birthno",
		"validate": function (attribute, value, messages, deferred, $form) {
			yii.validation.required(value, messages, {
				"message": "Pre vytvorenie žiadosti je potrebné zadať Vaše rodné číslo."
			});
			validateBirthNumber(value, messages);
		}
	}], []);
	jQuery('#proxy').yiiActiveForm([{
		"id": "proxy-name",
		"name": "name",
		"container": ".field-proxy-name",
		"input": "#proxy-name",
		"validate": function (attribute, value, messages, deferred, $form) {
			yii.validation.required(value, messages, {
				"message": "Pre vytvorenie žiadosti je potrebné zadať krstné meno splnomocnenca."
			});
		}
	}, {
		"id": "proxy-lastname",
		"name": "lastname",
		"container": ".field-proxy-lastname",
		"input": "#proxy-lastname",
		"validate": function (attribute, value, messages, deferred, $form) {
			yii.validation.required(value, messages, {
				"message": "Pre vytvorenie žiadosti je potrebné zadať priezvisko splnomocnenca."
			});
		}
	}, {
		"id": "proxy-idno",
		"name": "idNo",
		"container": ".field-proxy-idno",
		"input": "#proxy-idno",
		"validate": function (attribute, value, messages, deferred, $form) {
			yii.validation.required(value, messages, {
				"message": "Pre vytvorenie žiadosti je potrebné zadať číslo občianskeho preukazu splnomocnenca."
			});
		}
	}], []);
	jQuery('#address-slovakia').yiiActiveForm([{
		"id": "addressslovakia-street",
		"name": "street",
		"container": ".field-addressslovakia-street",
		"input": "#addressslovakia-street",
		"validate": function (attribute, value, messages, deferred, $form) {
			yii.validation.required(value, messages, {
				"message": "Ulica Vášho trvalého pobytu nemôže byť nevyplnená."
			});
		}
	}, {
		"id": "addressslovakia-streetno",
		"name": "streetNo",
		"container": ".field-addressslovakia-streetno",
		"input": "#addressslovakia-streetno",
		"validate": function (attribute, value, messages, deferred, $form) {
			yii.validation.required(value, messages, {
				"message": "Číslo domu Vášho trvalého pobytu nemôže byť nevyplnené."
			});
		}
	}, {
		"id": "addressslovakia-city",
		"name": "city",
		"container": ".field-addressslovakia-city",
		"input": "#addressslovakia-city",
		"validate": function (attribute, value, messages, deferred, $form) {
			yii.validation.required(value, messages, {
				"message": "Mesto Vášho trvalého pobytu nemôže byť nevyplnené."
			});
		}
	}, {
		"id": "addressslovakia-zip",
		"name": "zip",
		"container": ".field-addressslovakia-zip",
		"input": "#addressslovakia-zip",
		"validate": function (attribute, value, messages, deferred, $form) {
			yii.validation.required(value, messages, {
				"message": "Poštové smerovacie číslo Vášho trvalého pobytu nemôže byť nevyplnené."
			});
			validatePSC(value, messages);
		}
	}], []);
	jQuery('#address-foreign').yiiActiveForm([{
		"id": "addressforeign-street",
		"name": "street",
		"container": ".field-addressforeign-street",
		"input": "#addressforeign-street",
		"validate": function (attribute, value, messages, deferred, $form) {
			yii.validation.required(value, messages, {
				"message": "Ulica adresy kde chcete odoslať žiadosť nemôže byť nevyplnená."
			});
		}
	}, {
		"id": "addressforeign-streetno",
		"name": "streetNo",
		"container": ".field-addressforeign-streetno",
		"input": "#addressforeign-streetno",
		"validate": function (attribute, value, messages, deferred, $form) {
			yii.validation.required(value, messages, {
				"message": "Číslo domu adresy kde chcete odoslať žiadosť nemôže byť nevyplnené."
			});
		}
	}, {
		"id": "addressforeign-city",
		"name": "city",
		"container": ".field-addressforeign-city",
		"input": "#addressforeign-city",
		"validate": function (attribute, value, messages, deferred, $form) {
			yii.validation.required(value, messages, {
				"message": "Mesto adresy kde chcete odoslať žiadosť nemôže byť nevyplnené."
			});
		}
	}, {
		"id": "addressforeign-zip",
		"name": "zip",
		"container": ".field-addressforeign-zip",
		"input": "#addressforeign-zip",
		"validate": function (attribute, value, messages, deferred, $form) {
			yii.validation.required(value, messages, {
				"message": "Poštové smerovacie číslo adresy kde chcete odoslať žiadosť nemôže byť nevyplnené."
			});
		}
	}, {
		"id": "addressforeign-country",
		"name": "country",
		"container": ".field-addressforeign-country",
		"input": "#addressforeign-country",
		"validate": function (attribute, value, messages, deferred, $form) {
			yii.validation.required(value, messages, {
				"message": "Štát adresy kde chcete odoslať žiadosť nemôže byť nevyplnený."
			});
		}
	}], []);
});
