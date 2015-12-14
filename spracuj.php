<?php
require_once('c:\webserver\vhost\AsyncWeb\gitAW\AsyncWeb\src\AsyncWeb\Text\Texts.php');
use AsyncWeb\Text\Texts;
var_dump(Texts::clear("NRIčouťľéíáťší+"));

$aForcedEmails = array('starostka@karlovaves.sk','radnica@mestosnv.sk','kravany@kravany.com');//bude priradeny iba jediny pre obec
$aDisabledEmails = array('daniel.juracek@bosaca.eu','obec.bartosovce@wi-net.sk','oubenice@gaya.sk','betlanovce@stonline.sk','oub.kostol@apo.sk','dusan.zeliznak@gmail.com','obecboliarov@netkosice.sk','oubajtava@mail.t-com.sk','babindol@babindol.sk','peter.nemecek@obecbab.sk');
$aPreferableEmailParts = array( 'podatelna','obec', 'ocu', 'ou', 'obu', 'urad', 'mu','msu','mesto','sekretariat','kancelaria','obecnyurad','miestnyurad','mestskyyurad','info','referent','NAZOVOBCE@NAZOVOBCE.SK','@NAZOVOBCE.SK','NAZOVOBCE','NAZOVOBCE@','primator','primatorka','starosta','starostka','kancelariaprimatora','prednosta','prednostka'); 

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
					$name = Texts::clear($data[$n2k["obec"]]);
					
					$e = get_relevant_emails( $data[$n2k["email"]], $name );
					//if( $e ) echo $name,":\t",$e,'<br>';//for debug
					
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


function get_relevant_emails($sEmails, $sObecClearName){
	global $aForcedEmails,$aDisabledEmails,$aPreferableEmailParts;
	
	$bestEmailsWithDomain = array();
	$bestEmails = array();

	$sEmails = str_replace( array(",","\t",' '), array(";",'',''), $sEmails);
	$aEmails = explode(";",$sEmails);
	foreach($aEmails as $k=>$em){
		$aEmails[$k] = $em = trim($em);
		if(!$em){
			unset($aEmails[$k]);
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
			}elseif( $emAfterAt == $sObecCClearName.'sk' ){
				$bestEmailsWithDomain[ '@NAZOVOBCE.SK' ] = $sEmail;
				$t = array_search('@NAZOVOBCE.SK', $aPreferableEmailParts);
			}elseif( ($t = array_search($emBeforeAt, $aPreferableEmailParts) ) !== false ){
				//podla zoznamu klucovych slov
			}elseif( strpos($sEmail, $sObecCClearName.'@' ) === 0 ){
				$bestEmails[ 'NAZOVOBCE@' ] = $sEmail;
				$t = array_search('NAZOVOBCE@', $aPreferableEmailParts);
			}elseif( $emBeforeAt == $sObecCClearName ){
				$bestEmails[ 'NAZOVOBCE' ] = $sEmail;
				$t = array_search('NAZOVOBCE', $aPreferableEmailParts);
			}
			//var_dump(__LINE__, $t,$sObecCClearName,$emBeforeAt,$emAfterAt, '======',$emAfterAt,$sObecCClearName.'sk','********');echo '<br>';
			
			
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

