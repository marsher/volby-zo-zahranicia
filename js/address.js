var App = window.election;

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
	if(!iOSversion()){
		options.select2({width:"100%"});
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
	if(!iOSversion()){
		options.select2({width:"100%"});
	}
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
	if(!iOSversion()){
		options.select2({width:"100%"});
	}
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


    if(App.request_form == 'volbaPostouBezTrvalehoPobytu'){
  	  $("#adresa").val("Ministerstvo vnútra Slovenskej republiky\nodbor volieb, referenda a politických strán\nDrieňová 22\n826 86  Bratislava 29\nSLOVAK REPUBLIC");
      $("#sendto").html("volby@minv.sk");
	  $("#phone").html("");
	  $("#phonetext").hide();
    }else{
      $("#adresa").val(adresa);
	  $("#sendto").html(data[6]);
	  if(data[8] != ""){
		  $("#phone").html(data[7] + " / " + data[8]);
		  $("#phonetext").show();
	  }else{
		  $("#phone").html("");
		  $("#phonetext").hide();
	  }
    }
	if($("#sendto").html().indexOf("@") == -1){
		$("#sendemail").hide();
		$("#noemail").show();
	}else{
		$("#sendemail").show();
		$("#noemail").hide();
	}
	
    
	var subj = "Ziadost";
    var textemailu = "";
	var meno = $('#basicinfo-name').val()+" "+$('#basicinfo-lastname').val();
    if(App.request_form == 'volbaPostouSTrvalymPobytom'){
      var subj = "Žiadosť o voľbu poštou pre voľby do NRSR";
      var textemailu = "Dobrý deň, "+decodeURIComponent("%0D%0A%0D%0A")+"podľa § 60 ods. 1 zákona č. 180/2014 Z. z. o podmienkach výkonu volebného práva a o zmene a doplnení niektorých zákonov žiadam o voľbu poštou pre voľby do Národnej rady Slovenskej republiky v roku 2016. Zároveň Vás chcem poprosiť o potvrdenie e-mailom že žiadosť bola prijatá a spracovaná. "+decodeURIComponent("%0D%0A%0D%0A")+"V prílohe zasielam podpísanú žiadosť. "+decodeURIComponent("%0D%0A%0D%0A")+"Ďakujem,"+decodeURIComponent("%0D%0A%0D%0A")+" "+meno;
    }else if(App.request_form == 'volbaPostouBezTrvalehoPobytu'){
      var subj = "Žiadosť o voľbu poštou pre voľby do NRSR";
      var textemailu = "Dobrý deň, "+decodeURIComponent("%0D%0A%0D%0A")+"podľa   § 59 ods. 1   zákona   č. 180/2014 Z. z. o podmienkach výkonu volebného práva a o zmene a doplnení niektorých zákonov žiadam o voľbu poštou pre voľby do Národnej rady Slovenskej republiky v roku 2016 a o zaslanie hlasovacích lístkov a obálok na adresu uvedenú v žiadosti. Zároveň Vás chcem poprosiť o potvrdenie e-mailom že žiadosť bola prijatá a spracovaná. "+decodeURIComponent("%0D%0A%0D%0A")+"V prílohe zasielam podpísanú žiadosť. "+decodeURIComponent("%0D%0A%0D%0A")+"Ďakujem,"+decodeURIComponent("%0D%0A%0D%0A")+" "+meno;
    }else if(App.request_form == "ziadostOPreukazPostou"){
      var subj = "Žiadosť o hlasovací preukaz";
      var textemailu = "Dobrý deň, "+decodeURIComponent("%0D%0A%0D%0A")+"podľa § 46 zákona č. 180/2014 Z. z. o podmienkach výkonu volebného práva a o zmene a doplnení niektorých zákonov žiadam o vydanie hlasovacieho preukazu pre voľby do Národnej rady Slovenskej republiky v roku 2016. Hlasovací preukaz si želám odoslať na adresu uvedenú v žiadosti. Zároveň Vás chcem poprosiť o potvrdenie e-mailom že žiadosť bola prijatá a spracovaná. "+decodeURIComponent("%0D%0A%0D%0A")+"V prílohe zasielam podpísanú žiadosť. "+decodeURIComponent("%0D%0A%0D%0A")+"Ďakujem,"+decodeURIComponent("%0D%0A%0D%0A")+" "+meno;
    }else if(App.request_form =="ziadostOPreukaPreSplnomocnenca"){
      var subj = "Žiadosť o hlasovací preukaz";
      var textemailu = "Dobrý deň, "+decodeURIComponent("%0D%0A%0D%0A")+"podľa § 46 zákona č. 180/2014 Z. z. o podmienkach výkonu volebného práva a o zmene a doplnení niektorých zákonov žiadam o vydanie hlasovacieho preukazu pre voľby do Národnej rady Slovenskej republiky v roku 2016. Hlasovací preukaz za mňa preberie splnomocnenec. Zároveň Vás chcem poprosiť o potvrdenie e-mailom že žiadosť bola prijatá a spracovaná. "+decodeURIComponent("%0D%0A%0D%0A")+"V prílohe zasielam podpísanú žiadosť. "+decodeURIComponent("%0D%0A%0D%0A")+"Ďakujem,"+decodeURIComponent("%0D%0A%0D%0A")+" "+meno;
    }

    $("#emailsubject").html(subj);
    $("#emailbody").html(textemailu);
	if(jQuery.data( document.body, "psc-locked")){}else{
		$("#addressslovakia-zip").val(data[4]);
	}
    $("#send").attr("href", "mailto:" + $("#sendto").html() + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(textemailu));

    }
  }
}