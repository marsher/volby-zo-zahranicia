<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;


/* @var $this yii\web\View */

$this->title = 'Volby zo zahranicia';
?>
<div class="site-index">

    <div class="jumbotron">
        <h1>Vytvorte si ziadost!</h1>

        <p class="lead">pre volbu zo zahranicia alebo volebny preukaz</p>
        <p class="lead">DISCLAIMER: TEXTY + VZHLAD SU DOCASNE. Komentare su vitane, zatial sa sustredim na UX(nie UI) a funkcnost</p>

        <p><a class="btn btn-lg btn-success" href="#preukaz-zahranicie" role="button">Zacni</a></p>
    </div>

    <iframe class="preview-pane" width="100%" height="650" frameborder="0" src=""></iframe>

    <div class="body-content">

<div class="row section" id="preukaz-zahranicie">
        <div class="col-lg-12">
            <p><a class="btn btn-lg btn-success" href="#ziadost-TP" role="button" onclick="getChoice(this)">Chcem volebny preukaz</a></p>
            <p><a class="btn btn-lg btn-success" href="#zahranicie" role="button" onclick="getChoice(this)">Chcem volit zo zahranicia</a></p>
          
        </div>
      </div>
      

      <div class="row section" id="zahranicie">
        <div class="col-lg-12">
            <p><a class="btn btn-lg btn-success" href="#mamTP" role="button" onclick="mamTP()">Mam trvaly pobyt na slovensku</a></p>
            <p><a class="btn btn-lg btn-success" href="#ziadost" role="button" onclick="nemamTP()">Nemam trvaly pobyt na slovensku</a></p>         
          
        </div>
      </div>

      <div class="row section" id="mamTP">
        <div class="col-lg-12">
            <form role="form">
                <div class="form-group">
                    <label for="kraj">Kraj</label>
                    <select class="form-control">
                        <option value="volvo">a</option>
                        <option value="saab">b</option>
                        <option value="mercedes">c</option>
                        <option value="audi">d</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="okres">Okres</label>
                    <select class="form-control">
                        <option value="volvo">a</option>
                        <option value="saab">b</option>
                        <option value="mercedes">c</option>
                        <option value="audi">d</option>
                    </select>
                </div>
                 <div class="form-group">
                    <label for="obec">Obec</label>
                    <select class="form-control">
                        <option value="volvo">a</option>
                        <option value="saab">b</option>
                        <option value="mercedes">c</option>
                        <option value="audi">d</option>
                    </select>
                </div>
                <input style="display:none;" type="text" id="cityaddress" value="Ministerstvo vnútra Slovenskej republiky\n 
odbor volieb, referenda a politických strán\n
Drieňová 22\n
826 86  Bratislava 29\n
SLOVAK REPUBLIC\n
"> 
                <p><a class="btn btn-lg btn-success" href="#ziadost" role="button">Dalej</a></p>         

            </form>        
          
        </div>
      </div>
      <div class="row section" id="ziadost">
        <div class="col-lg-12">
            <?php $form = ActiveForm::begin([
                'id' => 'basic-info',
                'options' => ['class' => 'form-horizontal'],
            ]) ?>
            
            <?= $form->field($basicInfo, 'name') ?>
            <?= $form->field($basicInfo, 'lastname') ?>
            <?= $form->field($basicInfo, 'virginLastname') ?>
            <?= $form->field($basicInfo, 'birthNo') ?>

            <?php ActiveForm::end() ?>
            
            
            <?php $form = ActiveForm::begin([
                'id' => 'address-slovakia',
                'options' => ['class' => 'form-horizontal'],
            ]) ?>
            <hr>
            <h3>Adresa TP</h3>
            <?= $form->field($addressSlovakia, 'street') ?>
            <?= $form->field($addressSlovakia, 'streetNo') ?>
            <?= $form->field($addressSlovakia, 'city') ?>
            <?= $form->field($addressSlovakia, 'zip') ?>

            <?php ActiveForm::end() ?>
            <hr>
            
            <?php $form = ActiveForm::begin([
                'id' => 'address-foreign',
                'options' => ['class' => 'form-horizontal'],
            ]) ?>
            <h3>Adresa miesta pobytu v cudzine (pre zaslanie hlasovacích lístkov a obálok):</h3>
            
            <?= $form->field($addressForeign, 'street') ?>
            <?= $form->field($addressForeign, 'streetNo') ?>
            <?= $form->field($addressForeign, 'city') ?>
            <?= $form->field($addressForeign, 'zip') ?>
            <?= $form->field($addressForeign, 'country') ?>

            <?php ActiveForm::end() ?>

            <p><a class="btn btn-lg btn-success" href="#pdf" id='preview-button' role="button" onclick="createDocument(true,'TP')">Vytvor preview</a></p>         
         
        </div>
      </div>
        <div class="row section" id="pdf">
        <div class="col-lg-12">
        <iframe id="preview" width=100% height= 500px>
        </iframe>  
        <p><a class="btn btn-lg btn-success" href="#pdf" id='download-button' role="button" onclick="createDocument(false,'TP')">Download</a></p>         
        <p><a class="btn btn-lg btn-success" href="#sign" role="button">podpis</a></p>         
       
       
        <div class="row section" id="sign">
            <div class="col-lg-12">
                        <div class="signature-pad">
                            <canvas style="border: 3px solid #f4f4f4;"></canvas>
        
                            <input style="display:none" id="signature" type="text">
                        </div>
                    <div class-"signature-controls">
                        <button id="clear-button" class="btn btn-default">Vycist</button>
                        <button id="save-button" class="btn btn-default" data-dismiss="modal" onclick="">Uloz</button>
                    </div>
            </div>
        
        </div>
      </div>

    </div>
</div>
