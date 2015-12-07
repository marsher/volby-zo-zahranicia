<?php

namespace app\models;

use Yii;
use yii\base\Model;

/**
 * LoginForm is the model behind the login form.
 */
class Proxy extends Model
{
    public $name;
    public $lastname;
    public $idNo;

    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            // username and password are both required
            [['name', 'lastname', 'idNo'], 'required'],
            // rememberMe must be a boolean value
        ];
    }
}
