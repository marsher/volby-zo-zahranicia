<?php
require_once('c:\webserver\vhost\AsyncWeb\gitAW\AsyncWeb\src\AsyncWeb\Text\Texts.php');
use AsyncWeb\Text\Texts;
var_dump(Texts::clear("NRIčouťľéíáťší+"));
$i = 0;
//$out["Mimo SR"]["Mimo SR"]["mvsr"] = "['Ministerstvo vnútra Slovenskej republiky','odbor volieb, referenda a politických strán','Drieňová','22','826 86','Bratislava 29','volby@minv.sk','','','','Ministerstvo vnútra Slovenskej republiky']";
$out = array();
$best = array();
$bsetn = array();
$okresc = array();
if (($handle = fopen("../obce_13_12_2015 V2.txt", "r")) !== FALSE) {
			$topCities = get_top_cities();
			
			while (($data = fgetcsv($handle, 1000, "\t")) !== FALSE) {$i++;
				if($i==1){
					foreach($data as $k=>$v){
						$n2k[$v] = $k;	
					}
				}else{
					$email = $data[$n2k["email"]];
					$email = str_replace(",",";",$email);
					$emaily = explode(";",$email);
					
					if(count($emaily) != 1){
						foreach($emaily as $k=>$em){
							if(!$em){unset($emaily[$k]);}
							$em = trim($em);
							if(strpos($em,"podatelna") !== false){
								$emaily = array($em);break;
							}
							if(strpos($em,"sekretariat") !== false){
								$emaily = array($em);break;
							}
							if(strpos($em,"obecnyurad") !== false){
								$emaily = array($em);break;
							}
							if(strpos($em,"ocu") === 0){
								
								$emaily = array($em);break;
							}
							if(strpos($em,"ou") === 0){
								$emaily = array($em);break;
							}
							if(strpos($em,"obec.") === 0){
								$emaily = array($em);break;
							}
							if(strpos($em,"miestnyurad") === 0){
								$emaily = array($em);break;
							}
							if(strpos($em,"urad@") === 0){
								$emaily = array($em);break;
							}
							if(strpos($em,"mesto@") === 0){
								$emaily = array($em);break;
							}
							if(strpos($em,"msu.") === 0){
								$emaily = array($em);break;
							}
							if(strpos($em,"obu@") === 0){
								$emaily = array($em);break;
							}
							if(strpos($em,"msu@") === 0){
								$emaily = array($em);break;
							}
							if(strpos($em,"info@") !== false){
								$emaily = array($em);break;
							}
							
							if($em == "starostka@karlovaves.sk") continue;
							
							if(strpos($em,"starosta") !== false){
								unset($emaily[$k]);
							}
							if(strpos($em,"hovorca") !== false){
								unset($emaily[$k]);
							}
							if(strpos($em,"starostka") !== false){
								unset($emaily[$k]);
							}
							if(strpos($em,"matrika") !== false){
								unset($emaily[$k]);
							}
							if(strpos($em,"primator") !== false){
								unset($emaily[$k]);
							}
							if(strpos($em,"primatorka") !== false){
								unset($emaily[$k]);
							}
							if(strpos($em,"kancelariaprimatora") !== false){
								unset($emaily[$k]);
							}
							if(strpos($em,"primator") !== false){
								unset($emaily[$k]);
							}
							if(strpos($em,"prednosta") !== false){
								unset($emaily[$k]);
							}
							if(strpos($em,"prednostka") !== false){
								unset($emaily[$k]);
							}
							if($em == "peter.nemecek@obecbab.sk"){
								unset($emaily[$k]);
							}
							if($em == "babindol@babindol.sk"){ // alt obec@babindol.sk
								unset($emaily[$k]);
							}
							if($em == "obec@babina.sk" || $em =="spravca@babina.sk" || $em=="ekonom@babina.sk"){ // alt podatelna@babina.sk
								unset($emaily[$k]);
							}
							if($em == "babinec2010@gmail.com"){ // alt ocu@babinec.info"
								unset($emaily[$k]);
							}
							if($em == "oubajtava@mail.t-com.sk"){ // alt oubajtava@stonline.sk
								unset($emaily[$k]);
							}
							if($em == "nadezda.babiakova@banskastiavnica.sk" || $em=="ivana.ondrejmiskova@banskastiavnica.sk"){ // alt msu@banskastiavnica.sk
								unset($emaily[$k]);
							}
							if($em == "obec.bartosovce@wi-net.sk"){ // alt obec.bartosovce@isomi.sk
								unset($emaily[$k]);
							}
							if($em == "oubenice@gaya.sk"){ // alt benice@benice.sk
								unset($emaily[$k]);
							}
							if($em == "betlanovce@stonline.sk"){ // alt obecbetlanovce@stonline.sk
								unset($emaily[$k]);
							}
							if($em == "oub.kostol@apo.sk"){ // alt oub.kostol@stonline.sk
								unset($emaily[$k]);
							}
							if($em == "oub.kostol@apo.sk"){ // alt oub.kostol@stonline.sk
								unset($emaily[$k]);
							}
							if($em == "terezia.foldvaryova@blatnanaostrove.sk"){ // obec@blatnanaostrove.sk
								unset($emaily[$k]);
							}
							if($em == "laco@svslm.sk"){ // alt obec@bobrovcek.sk
								unset($emaily[$k]);
							}
							if($em == "dusan.zeliznak@gmail.com"){ // alt ZeliP@zoznam.sk
								unset($emaily[$k]);
							}
							if($em == "obecboliarov@netkosice.sk"){ // alt obec@boliarov.sk
								unset($emaily[$k]);
							}
							if($em == "daniel.juracek@bosaca.eu"){ // alt "bosaca@bosaca.eu"
								unset($emaily[$k]);
							}
							
						}
					}
					if(count($emaily) != 1){
						/*var_dump($i);
						var_dump($emaily);
						var_dump($data[$n2k["email"]]);
						//exit;
						/**/
					}
					$e = implode(";",$emaily);
					$name = Texts::clear($data[$n2k["obec"]]);
					$out[$data[$n2k["kraj"]]][$data[$n2k["okres"]]][$name] = "['".$data[$n2k["urad"]]."','','".$data[$n2k["ulica"]]."','".$data[$n2k["cislo"]]."','".$data[$n2k["psc"]]."','".$data[$n2k["posta"]]."','".$e."','".$data[$n2k["predvolba"]]."','".$data[$n2k["telefon"]]."','".$data[$n2k["mobil"]]."','".$data[$n2k["obec"]]."']";
					
					$data[$n2k["pocetobyvatelov"]] = str_replace(" ","",$data[$n2k["pocetobyvatelov"]]);
					
					if(!isset($bestn[$data[$n2k["kraj"]]][$data[$n2k["okres"]]]) || $bestn[$data[$n2k["kraj"]]][$data[$n2k["okres"]]] < $data[$n2k["pocetobyvatelov"]]){
						$best[$data[$n2k["kraj"]]][$data[$n2k["okres"]]] = $name;
						$bestn[$data[$n2k["kraj"]]][$data[$n2k["okres"]]] = $data[$n2k["pocetobyvatelov"]];
					}
					@$okresc[$data[$n2k["kraj"]]][$data[$n2k["okres"]]] += $data[$n2k["pocetobyvatelov"]];
					@$krajc[$data[$n2k["kraj"]]] += $data[$n2k["pocetobyvatelov"]];
				}
			}
		}


foreach($okresc as $kraj=>$odata){
	arsort($odata);
	$topokres = array_keys($odata)[0];
	
	foreach($odata as $okres=>$obecdata){
		$topobec = $best[$kraj][$okres];
		$out[$kraj][$okres]["1".$topobec] = $out[$kraj][$okres][$topobec];
		unset($out[$kraj][$okres][$topobec]);	
	}
	$out[$kraj]["1".$topokres] = $out[$kraj][$topokres];
	unset($out[$kraj][$topokres]);
}

arsort($krajc);
$topkraj = array_keys($krajc)[0];
$out["1".$topkraj] = $out[$topkraj];
unset($out[$topkraj]);





$ret = 'election.cities={';
$ik = 0;
ksort($out);
foreach($out as $kraj=>$okdata){$ik ++;
	$io = 0;
	if($ik > 1) $ret.=",\n";
	if(substr($kraj,0,1) == 1) $kraj = substr($kraj,1);
	if($kraj == "Mimo SR"){
		$nazov = $kraj;
	}else{
		$nazov = $kraj." kraj";
	}
	$ret.="'$nazov':{";
	
	ksort($okdata);
	foreach($okdata as $okres=>$obecdata){$io ++;
	
		if($io > 1) $ret.=",\n";
		
		if(substr($okres,0,1) == 1) $okres = substr($okres,1);
		if($kraj == "Mimo SR"){
			$nazov = $kraj;
		}else{
			$nazov = "Okres ".$okres;
		}
		
		$ret.="'$nazov':{";
		$iobce = 0;
		
		ksort($obecdata);
		foreach($obecdata as $clear=>$info){$iobce++;
			if($iobce > 1) $ret.=",\n";
			
			if( !empty( $topCities[$clear] ) ) $bestCities[$kraj][$okres][$clear] = $topCities[$clear];
			
			$ret.="'".$clear."':".$info;
		}
		$ret.="}";
	}
		$ret.="}";
}
	$ret .= '};';


var_dump(file_put_contents("out01.html",print_r($out,true)));
var_dump(file_put_contents("out02.html",$ret));


function get_top_cities(){
	$aTopCities = array();
	
	$aTmpTopCities = file("mesta_pocet_obyvatelov_2011.txt");
	
	foreach( $aTmpTopCities as $sLine ){
		if( $sLine ){
			$aLine = explode( ';', trim($sLine) );
			$aTopCities[Texts::clear($aLine[1]) ] = $aLine[2];
		}
	}
	
	return $aTopCities;
}


//$aPreferableEmails = array( 'podatelna','info','sekretariat','obec','ocu','ou','starosta','starostka'); 
function get_relevant_email($emails){
	global $aPreferableEmails;
	
	$bestEmails = array();
	
	if(count($emails) != 1){
		foreach( $emails as $email ){
			$em = explode( '@', $email, 2);
			
			if( in_array($em[0], $aPreferableEmails) ){
				$bestEmails[ array_search($em[0], $aPreferableEmails) ] = $email;
			}
		}
		
		if( $bestEmails ){
			ksort($bestEmails);
			
			return reset($bestEmails);
		}
	}
	
	return implode(";",$emails);
}

