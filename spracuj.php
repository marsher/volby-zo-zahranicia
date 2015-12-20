<?php
/**

TENTO SÚBOR NIE JE NA SERVERI A POUŽÍVA SA IBA NA SPRACOVANIE DB EMAILOV OBCÍ

*/

require_once('c:\webserver\vhost\AsyncWeb\gitAW\AsyncWeb\src\AsyncWeb\Text\Texts.php');
require_once('c:\webserver\vhost\AsyncWeb\gitAW\AsyncWeb\src\AsyncWeb\Text\Validate.php');
use AsyncWeb\Text\Texts;
use AsyncWeb\Text\Validate;


$aForcedEmails = array('starostka@karlovaves.sk','radnica@mestosnv.sk','kravany@kravany.com');//bude priradeny iba jediny pre obec
$aDisabledEmails = array('daniel.juracek@bosaca.eu','obec.bartosovce@wi-net.sk','oubenice@gaya.sk','betlanovce@stonline.sk','oub.kostol@apo.sk','dusan.zeliznak@gmail.com','obecboliarov@netkosice.sk','oubajtava@mail.t-com.sk','babindol@babindol.sk','peter.nemecek@obecbab.sk');
$aPreferableEmailParts = array( 'sluzbyobcanom','podatelna','obec', 'ocu', 'ou', 'obu', 'urad', 'mu','msu','mesto','sekretariat','kancelaria','obecnyurad','miestnyurad','mestskyyurad','info','referent','NAZOVOBCE@NAZOVOBCE.SK','@NAZOVOBCE.SK','NAZOVOBCE','NAZOVOBCE@','primator','primatorka','starosta','starostka','kancelariaprimatora','prednosta','prednostka'); 

$chybneemaily = "";
file_put_contents("corrections.csv",file_get_contents("http://volby.digital/corrections.csv"));

$overene = array();
if (($handle = fopen("corrections.csv", "r")) !== FALSE) {
	$i = 0;
	while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {$i++;
		if($data[0]){
			$overene[trim($data[0])] = trim($data[1]);
		}else{
			$tocheck[$data[1]] = $data[1];
			//echo "Potvrdeny email nema overovatela: ".$data[1]."\n";
		}
	}
}
$checkout = "";
file_put_contents("needschecking.txt",implode("\n",$tocheck));

$bounce = array();
if (($handle = fopen("hard-bounce2.csv", "r")) !== FALSE) {
	$i = 0;
	while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {$i++;
		if($i == 1) continue;
		$bounce[trim($data[0])] = trim($data[0]);
	}
}

$i = 0;
//$out["Mimo SR"]["Mimo SR"]["mvsr"] = "['Ministerstvo vnútra Slovenskej republiky','odbor volieb, referenda a politických strán','Drieňová','22','826 86','Bratislava 29','volby@minv.sk','','','','Ministerstvo vnútra Slovenskej republiky']";
$out = array();
$best = array();
$bsetn = array();
$okresc = array();
$name2okresakraj = array();
$potvrdenych = 0;
$csv = "";
if (($handle = fopen("../obce_13_12_2015 V2.txt", "r")) !== FALSE) {
	
	while (($data = fgetcsv($handle, 1000, "\t")) !== FALSE) {$i++;
		if($i==1){
			foreach($data as $k=>$v){
				$n2k[$v] = $k;	
			}
		}else{
			$name = Texts::clear($data[$n2k["obec"]]);
			$potvrdeny = "";
			$emaily = explode(";",$data[$n2k["email"]]);
			foreach($emaily as $k=>$email){
				$emaily[$k] = $email = trim($email);
				if(isset($bounce[$email])){unset($emaily[$k]); continue;}
				if(!$email) {unset($emaily[$k]); continue;}
				$csv.='"'.$email.'","'.str_replace('"','""',$data[$n2k["obec"]]).'"'."\n";
				
				if(isset($overene[$email])){
					$potvrdeny = $overene[$email];
				}
			}
			$data[$n2k["email"]] = implode(";",$emaily);
			
			if(!$potvrdeny){
			
				$e = get_relevant_emails( $data[$n2k["email"]], $name );
				if($e){
					$emails = explode(";",$e);
					foreach($emails as $em){
						if(!Validate::check("email",$em)){
							$chybneemaily .= $em."\n";
						}
					}
				}
			}else{
				$e = $potvrdeny;
				$potvrdenych ++;
			}
			//if( $e ) echo $name,":\t",$e,'<br>';//for debug
			
			$out[$data[$n2k["kraj"]]][$data[$n2k["okres"]]][$name] = "['".$data[$n2k["urad"]]."','','".$data[$n2k["ulica"]]."','".$data[$n2k["cislo"]]."','".$data[$n2k["psc"]]."','".$data[$n2k["posta"]]."','".$e."','".$data[$n2k["predvolba"]]."','".$data[$n2k["telefon"]]."','".$data[$n2k["mobil"]]."','".$data[$n2k["obec"]]."','".($potvrdeny?1:0)."']";
			
			$data[$n2k["pocetobyvatelov"]] = str_replace(" ","",$data[$n2k["pocetobyvatelov"]]);
			
			if(!isset($bestn[$data[$n2k["kraj"]]][$data[$n2k["okres"]]]) || $bestn[$data[$n2k["kraj"]]][$data[$n2k["okres"]]] < $data[$n2k["pocetobyvatelov"]]){
				$best[$data[$n2k["kraj"]]][$data[$n2k["okres"]]] = $name;
				$bestn[$data[$n2k["kraj"]]][$data[$n2k["okres"]]] = $data[$n2k["pocetobyvatelov"]];
			}
			@$okresc[$data[$n2k["kraj"]]][$data[$n2k["okres"]]] += $data[$n2k["pocetobyvatelov"]];
			@$krajc[$data[$n2k["kraj"]]] += $data[$n2k["pocetobyvatelov"]];
			if(strpos($name,"bratislava")===0){
				$name2okresakraj["bratislava"][$data[$n2k["okres"]]][$data[$n2k["kraj"]]] = $data[$n2k["pocetobyvatelov"]];
			}
			if(strpos($name,"kosice")===0){
				$name2okresakraj["kosice"][$data[$n2k["okres"]]][$data[$n2k["kraj"]]] = $data[$n2k["pocetobyvatelov"]];
			}
			$name2okresakraj[$name][$data[$n2k["okres"]]][$data[$n2k["kraj"]]] = $data[$n2k["pocetobyvatelov"]];
			
		}
	}
}
echo "spolu mame $potvrdenych potvrdenych emailov\n";
function okres2okresname($name){
	$name = str_replace("-"," ",$name);
	if($name=="Nové Mesto n.Váhom") return "Nové Mesto nad Váhom";
	if($name=="Bratislava 214") return "Bratislava 2";
	if($name=="Bratislava 36") return "Bratislava 3";
	if($name=="Bratislava 42") return "Bratislava 4";
	if($name=="Bratislava 48") return "Bratislava 4";
	if($name=="Bratislava 49") return "Bratislava 4";
	if($name=="Bratislava 59") return "Bratislava 5";
	if($name=="Bratislava I") return "Bratislava";
	if($name=="Bratislava II") return "Bratislava 2";
	if($name=="Bratislava III") return "Bratislava 3";
	if($name=="Bratislava IV") return "Bratislava 4";
	if($name=="Bratislava V") return "Bratislava 5";
	if($name == "Košice okolie") return $name;
	if(strpos($name,"Košice") === 0) return "Košice";

	return $name;
}
$pscdata = array();
if (($handle = fopen("OBCE.txt", "r")) !== FALSE) {
	$i = 0;
	while (($data = fgetcsv($handle, 1000, "\t")) !== FALSE) {$i++;
		if($i==1) continue;
		$psc = str_replace(" ","",$data[3]);
		$name = Texts::clear($data[0]);
		$okres = okres2okresname($data[2]);
		$kraj = false;
		$obyvatelov = 0;
		if(isset($name2okresakraj[$name][$okres])){
			$kraj = key($name2okresakraj[$name][$okres]);
			$obyvatelov = reset($name2okresakraj[$name][$okres]);
		}

		if($psc == "05983" || $psc == "05981" || $psc == "05960" || $psc == "05951" || $psc == "05983" || $psc == "05331" || $psc == "05985" || $psc == "05954" || $psc == "05941" || $psc == "05984"){
			// mestske casti mesta vysoke tatry
			$okres = "Poprad";
			$name = "vysoke-tatry";
			$kraj = "Prešovský";
			$obyvatelov = 1;
		}
				
		/*
		if($psc == "96663"){
			var_dump($psc);
			var_dump($name);
			var_dump($okres);
			var_dump($kraj);
			var_dump($name2okresakraj[$name]);
			exit;
		}/**/
		
		if($psc && $name && $okres && $kraj){
			
			@$pscdata[$psc][$name][$okres][$kraj] = $obyvatelov;
		}else{
			
			$name = Texts::clear($data[4]);
			if($name == "hodrusa-hamre-1") $name = "hodrusa-hamre";
			if($name == "horna-lehota-pri-brezne") $name = "horna-lehota";
			$okres = okres2okresname($data[2]);

			$kraj = false;
			$obyvatelov = 0;
			if(isset($name2okresakraj[$name][$okres])){
				$kraj = key($name2okresakraj[$name][$okres]);
				$obyvatelov = reset($name2okresakraj[$name][$okres]);
			}
			/*
			if($psc == "05983"){
				var_dump($psc);
				var_dump($name);
				var_dump($okres);
				var_dump($kraj);
				var_dump($name2okresakraj[$name]);
				exit;
			}/**/

			if($psc && $name && $okres && $kraj){
				
				@$pscdata[$psc][$name][$okres][$kraj] = $obyvatelov;
			}
		}
	}
}
if (($handle = fopen("ULICE.txt", "r")) !== FALSE) {
	$i = 0;
	while (($data = fgetcsv($handle, 1000, "\t")) !== FALSE) {$i++;
		if($i==1) continue;
		$psc = str_replace(" ","",$data[2]);
		$name = Texts::clear($data[6]);
		$okres =false;
		$kraj = false;
		$obyvatelov = 0;
		
		if(isset($name2okresakraj[$name])){
			$okres = okres2okresname(key($name2okresakraj[$name]));
			$kraj = key($name2okresakraj[$name][$okres]);
			$obyvatelov = reset($name2okresakraj[$name][$okres]);
		}
		/*
		
		if($psc == "84107"){
			var_dump($psc);
			var_dump($name);
			var_dump($okres);
			var_dump($kraj);
			var_dump($name2okresakraj[$name]);
			exit;
		}/**/
		
		if($psc && $name && $okres && $kraj){
			@$pscdata[$psc][$name][$okres][$kraj] = $obyvatelov;
		}else{
			/*
			$name = Texts::clear($data[6]);
			$okres =false;
			$kraj = false;
			$obyvatelov = 0;
			
			if(isset($name2okresakraj[$name])){
				$okres = key($name2okresakraj[$name]);
				$kraj = key($name2okresakraj[$name][$okres]);
				$obyvatelov = reset($name2okresakraj[$name][$okres]);
			}/**/
			
		}
		// psc[psc][clearobec]
	}
}


// spracovanie kosic
$ke = array();
if($dom = @DomDocument::loadHtmlFile("kosice-psc-na-mestsku-cast.htm")){
	$xpath=new DomXpath($dom);
	$i = 0;
	foreach($xpath->query("//table[@id='maintable']/tr") as $row){$i++;
		if($i == 1) continue;
		$cast = $xpath->query("td[2]",$row)->item(0)->nodeValue;
		$name = Texts::clear("kosice-".$cast);
		$psc = str_replace(" ","",$xpath->query("td[3]",$row)->item(0)->nodeValue);

		if(isset($name2okresakraj[$name])){
			$okres = key($name2okresakraj[$name]);
			$kraj = key($name2okresakraj[$name][$okres]);
			$obyvatelov = reset($name2okresakraj[$name][$okres]);
			
			@$pscdata[$psc][$name][$okres][$kraj] = $obyvatelov;
		}
		//$ke[$psc][$cast] = 
	}
}else{
	echo "!NEMAM UDAJE O KOSICIACH\n";
}

file_put_contents("04012.txt",print_r($pscdata["04012"],true));
file_put_contents("04022.txt",print_r($pscdata["04022"],true));
file_put_contents("04023.txt",print_r($pscdata["04023"],true));

foreach($pscdata as $psc=>$arr1){
	$maxobyv = 0;
	$vybrobec= null;
	$vybrokres= null;
	$vybrkraj= null;
	
	foreach($arr1 as $obec=>$arr2){
		foreach($arr2 as $okres => $arr3){
			foreach($arr3 as $kraj=>$obyvatelov){
				if($obyvatelov > $maxobyv){
					$maxobyv = $obyvatelov;
									
					$vybrobec= $obec;
					$vybrokres= $okres;
					$vybrkraj= $kraj;
				}
			}
		}
	}
	if($vybrobec){
		unset($pscdata[$psc]);
		$pscdata[$psc][$vybrobec][$vybrokres][$vybrkraj] = $maxobyv;
	}
}
// kontrola ci mame vsetky psc
$nemame=array();
if (($handle = fopen("OBCE.txt", "r")) !== FALSE) {
	$i = 0;
	while (($data = fgetcsv($handle, 1000, "\t")) !== FALSE) {$i++;
		if($i==1) continue;
		$psc = str_replace(" ","",$data[3]);
		
		if(!isset($pscdata[$psc])){
			if($data[3]){
				$nemame[$data[4]] = $data[3];
			}
		}
	}
}


if (($handle = fopen("ULICE.txt", "r")) !== FALSE) {
	$i = 0;
	while (($data = fgetcsv($handle, 1000, "\t")) !== FALSE) {$i++;
		if($i==1) continue;
		$psc = str_replace(" ","",$data[2]);
		
		if(!isset($pscdata[$psc])){
			if($data[2]){
				$nemame[$data[4]] = $data[2];
			}
		}
	}
}


$pscout = 'election.psc={';

ksort($pscdata);
foreach($pscdata as $psc=>$arr1){
	foreach($arr1 as $obec=>$arr2){
		foreach($arr2 as $okres=>$arr3){
			foreach($arr3 as $kraj => $obyv){
				$pscout.="'".$psc."':['".$obec."','".$okres."','".$kraj."'],\n";
			}
		}
	}
}
$pscout = rtrim($pscout,",");
$pscout.="};";


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


	
var_dump(file_put_contents("nemame.txt",print_r($nemame,true)));
//var_dump(file_put_contents("psc.txt",print_r($pscdata,true)));
//var_dump(file_put_contents("pscout.txt",print_r($pscout,true)));
		
file_put_contents("chybneemaily.txt",$chybneemaily);
file_put_contents("emaily.txt",$csv);

//var_dump(file_put_contents("out01.html",print_r($out,true)));
//var_dump(file_put_contents("out02.html",$ret));


$ret = ';(function() {


	"use strict";

	// if exists inside of an another file, don\'t overwrite
	window.election = window.election || {};

	// "o" variable saves characters so the file is not as huge as with the regular keys
	// "election" exports array in a variable so it\'s accessible inside of another files

'.$ret."\n\n\n".$pscout."\n\n".'})();';

var_dump(file_put_contents("cities.js",$ret));

function get_relevant_emails($sEmails, $sObecClearName){
	global $aForcedEmails,$aDisabledEmails,$aPreferableEmailParts;
	$bestEmailsWithDomain = array();
	$bestEmails = array();

	$sEmails = str_replace( array(",","\t",' '), array(";",'',''), $sEmails);
	$aEmails = explode(";",$sEmails);
	$emailsWeight = array();
	foreach($aEmails as $k=>$em){
		$aEmails[$k] = $em = trim($em);
		if(!$em){
			unset($aEmails[$k]);
		}else{
			$emailsWeight[$em] = 0;
		}
	}
	//echo "<bR>BEG:";var_dump($aEmails,$sObecClearName);
	if(count($aEmails) > 1){
		foreach($aForcedEmails as $sForcedEmail){
			if( $pos = array_keys($aEmails, $sForcedEmail) ){
				if(!isset($aEmails[$pos[0]])){
					var_dump($aForcedEmails);
					var_dump($aEmails);
					var_dump($pos);
					exit;
				}
				return $aEmails[$pos[0]];
			}
		}

		foreach( $aEmails as $k => $sEmail ){
			if(!$sEmail) continue;
			if( $pos = array_search($sEmail, $aDisabledEmails) !== false ){
				unset( $aEmails[$k]);continue;
			}
			
			$sObecCClearName = str_replace('-','',$sObecClearName);
			$sEmailForSearch = str_replace(array('.','-'),'',$sEmail);
			$em = explode( '@', trim($sEmailForSearch), 2);
			$emBeforeAt = $em[0];
			$emAfterAt = $em[1];
			if(!$emAfterAt){
				var_dump($em);exit;
			}
			
			$t = false;
			if( $sEmail == $sObecCClearName.'@'.$sObecCClearName.'sk' ){
				$bestEmailsWithDomain[ 'NAZOVOBCE@NAZOVOBCE.SK' ] = $sEmail	;
				$t = array_search('NAZOVOBCE@NAZOVOBCE.SK', $aPreferableEmailParts);
				$emailsWeight[$sEmail] += 1000;
			}
			if( strpos($emAfterAt,$sObecCClearName) !== false){
				$bestEmailsWithDomain[ '@NAZOVOBCE.SK' ] = $sEmail;
				$t = array_search('@NAZOVOBCE.SK', $aPreferableEmailParts);
				$emailsWeight[$sEmail] += 500;
			}
			if( ($t = array_search($emBeforeAt, $aPreferableEmailParts) ) !== false ){
				//podla zoznamu klucovych slov
			}
			if( strpos($sEmail, $sObecCClearName.'@' ) === 0 ){
				$bestEmails[ 'NAZOVOBCE@' ] = $sEmail;
				$t = array_search('NAZOVOBCE@', $aPreferableEmailParts);
				$emailsWeight[$sEmail] += 200;
			}
			if( $emBeforeAt == $sObecCClearName ){
				$bestEmails[ 'NAZOVOBCE' ] = $sEmail;
				$t = array_search('NAZOVOBCE', $aPreferableEmailParts);
				$emailsWeight[$sEmail] += 200;
			}
			
			$i = 500;
			$diff = round($i/(count($aPreferableEmailParts)+10));
			foreach($aPreferableEmailParts as $part){
				if(strpos($emBeforeAt,$part)!== false){

					$emailsWeight[$sEmail] += $i;
				}
				
				$i-=$diff;
			}
			
			if( $t == false ){
				foreach( $aPreferableEmailParts as $k => $aPreferableEmailPart ){
					if( strpos($emBeforeAt, $aPreferableEmailPart ) !== false ){
						$t = array_search($aPreferableEmailPart, $aPreferableEmailParts);
					}
				}
			}
			
			if( $t !== false ){
				if( $emAfterAt == $sObecCClearName.'.sk' or $emAfterAt == 'obec'.$sObecCClearName.'.sk' or $emAfterAt == $sObecCClearName.'obec.sk' or $emAfterAt == $sObecCClearName.'mesto.sk' or $emAfterAt == 'mesto'.$sObecCClearName.'.sk' ){
					$bestEmailsWithDomain[ $t ] = $sEmail;
				}else{
					$bestEmails[ $t ] = $sEmail;
				}
			}
		}
		
		if($emailsWeight){
			arsort($emailsWeight);
			if($v= key($emailsWeight)){
				if( reset($emailsWeight) < 201 ) {
					$v = implode(";", array_keys( $emailsWeight ) );
					echo $sObecClearName,":\t",$v,"<br>\n";
				}
				return $v;
			}
		}
		if( $bestEmailsWithDomain ){
			ksort($bestEmailsWithDomain);
			//var_dump(__LINE__,$bestEmailsWithDomain);
			return reset($bestEmailsWithDomain);
		}
		
		if( $bestEmails ){
			ksort($bestEmails);
			//var_dump(__LINE__,$bestEmails);
			return reset($bestEmails);
		}
	}else{
		return implode(";",$aEmails);
	}
	
	
	$nasobneEmaily = implode(";",$aEmails);
	//if( count( $aEmails ) > 1 ) echo $sObecClearName,":\t",$nasobneEmaily,'<br>';//debug
	return $nasobneEmaily;
}

