<?php

/* @var $this yii\web\View */

$this->title = 'My Yii Application';
?>
<div class="site-index">

    <div class="jumbotron">
        <h1>Congratulations!</h1>

        <p class="lead">You have successfully created your Yii-powered application.</p>

        <p><a class="btn btn-lg btn-success" href="#preukaz-zahranicie" role="button">Zacni</a></p>
    </div>

    <div class="body-content">

<div class="row section" id="preukaz-zahranicie">
        <div class="col-lg-12">
            <p><a class="btn btn-lg btn-success" href="#ziadost-TP" role="button">Chcem volebny preukaz</a></p>
            <p><a class="btn btn-lg btn-success" href="#zahranicie" role="button">Chcem volit zo zahranicia</a></p>
          
        </div>
      </div>
      

      <div class="row section" id="zahranicie">
        <div class="col-lg-12">
            <p><a class="btn btn-lg btn-success" href="#mamTP" role="button">Mam trvaly pobyt na slovensku</a></p>
            <p><a class="btn btn-lg btn-success" href="#ziadost-noTP" role="button">Nemam trvaly pobyt na slovensku</a></p>         
          
        </div>
      </div>

      <div class="row section" id="mamTP">
        <div class="col-lg-12">
            <form role="form">
                <div class="form-group">
                    <label for="kraj">Kraj</label>
                    <select class="form-control">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="okres">Okres</label>
                    <select class="form-control">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                 <div class="form-group">
                    <label for="obec">Obec</label>
                    <select class="form-control">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <p><a class="btn btn-lg btn-success" href="#ziadost-TP" role="button">Dalej</a></p>         

            </form>        
          
        </div>
      </div>

    </div>
</div>
