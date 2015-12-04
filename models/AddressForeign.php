<?php

namespace app\models;

use Yii;
use yii\base\Model;

/**
 * LoginForm is the model behind the login form.
 */
class AddressForeign extends Model
{
    public $street;
    public $streetNo;
    public $city;
    public $zip;
    public $country;

    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            // username and password are both required
            [['street', 'streetNo', 'city', 'zip', 'country'], 'required'],
            // rememberMe must be a boolean value
        ];
    }
}
