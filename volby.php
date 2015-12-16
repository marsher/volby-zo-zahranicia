<?php
$obec = "";
if (($handle = fopen("emaily.txt", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
		if($_REQUEST["u"] == $data[0]){
			$obec = $data[1];
			break;
		}
    }
    fclose($handle);
}
$thx = false;
if(isset($_REQUEST["email"])){
	$out = fopen('corrections.csv', 'a+');
	if(fputcsv($out, array($_REQUEST["u"],$_REQUEST["email"],date("c"),$_SERVER["REMOTE_ADDR"]))){
		$thx = "1";
	}else{
		$thx = "2";
	}
	fclose($out);
}

?><!DOCTYPE html>
<html lang="sk">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<title>Potvrdenie emailu</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
		<script src="//code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
		<style>
			body{margin:1em;}
		</style>
	</head>
	<body>
	<div class="container">
		<div class="panel panel-primary">
			<div class="panel-heading">
				<h1>Aplikácia pre potvrdenie správnosti emailu Vašej obce</h1>
			</div>
			<div class="panel-body">
				<?php if(!$obec){echo '<div class="alert alert-danger">Nenašli sme Vašu obec</div>';}?>
				<p>Prosím, potvrďte správnosť oficiálneho emailu, na ktorý budete prijímať žiadosti pre voľbu poštou a žiadosti o hlasovací preukaz. Ak je emailová adresa chybná, opravte ju prosím.</p>
				<?php
				if($thx == "1"){echo '<div class="alert alert-success">Úspešne ste nastavili email pre obec: <b>'.$obec.'</b></div>';}else
				if($thx == "2"){echo '<div class="alert alert-danger">Nepodarilo sa uložiť informáciu. Prosím kontaktujte nás.</div>';}else
				if($obec){echo '<div class="alert alert-info">Nastavujete email pre obec: <b>'.$obec.'</b></div>';}?>
				<form class="form-horizontal" method="post" action="volby.php">
					<div class="form-group">
						<label for="inputEmail3" class="col-sm-2 control-label">Email</label>
						<div class="col-sm-10">
							<input type="hidden" name="u" value="<?php echo htmlspecialchars($_REQUEST["u"]);?>">
							<input type="email" name="email" class="form-control" id="inputEmail3" value="<?php echo htmlspecialchars($_REQUEST["u"]);?>" placeholder="Email pre voľby">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-offset-2 col-sm-10">
							<input type="submit" class="btn btn-primary" value="Potvrdiť emailovú adresu">
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	</body>
</html>
