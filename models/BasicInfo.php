<?php

namespace app\models;

use Yii;
use yii\base\Model;

/**
 * LoginForm is the model behind the login form.
 */
class BasicInfo extends Model
{
    public $name;
    public $lastname;
    public $virginLastname;
    public $birthNo;

    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            // username and password are both required
            [['name', 'lastname', 'birthNo'], 'required'],
            // rememberMe must be a boolean value
        ];
    }
}
