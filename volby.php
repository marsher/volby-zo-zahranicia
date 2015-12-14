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
	if(fputcsv($out, array($_REQUEST["u"],$_REQUEST["email"]))){
		$thx = "1";
	}else{
		$thx = "2";
	}
	fclose($out);
}

?><!DOCTYPE html>
<html lang="sk">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"> 
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<title>Potvrdenie emailu</title>
	    <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">
		<script src="//code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
        <script async type="text/javascript" src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">
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
				<p>Prosím, nastavte si Váš email, na ktorý chcete prijímať žiadosti pre voľbu poštou a žiadosti o hlasovací preukaz.</p>
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
							<input type="submit" class="btn btn-primary" value="Nastaviť">
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	</body>
</html>