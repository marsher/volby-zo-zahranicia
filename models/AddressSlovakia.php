<?php

namespace app\models;

use Yii;
use yii\base\Model;

/**
 * LoginForm is the model behind the login form.
 */
class AddressSlovakia extends Model
{
    public $street;
    public $streetNo;
    public $city;
    public $zip;

    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            // username and password are both required
            [['street', 'streetNo', 'city', 'zip'], 'required'],
            // rememberMe must be a boolean value
        ];
    }
}
