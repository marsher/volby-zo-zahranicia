<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;

/**
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class JspdfAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
    ];
    public $js = [
        'js/jspdf/jspdf.js',
        'js/jspdf/libs/FileSaver.js/FileSaver.js',
        'js/jspdf/libs/Blob.js/Blob.js',
        'js/jspdf/libs/Blob.js/BlobBuilder.js',
        'js/jspdf/libs/Deflate/deflate.js',
        'js/jspdf/libs/Deflate/adler32cs.js',
        'js/jspdf/jspdf.plugin.addimage.js',
        'js/jspdf/jspdf.plugin.from_html.js',
        'js/jspdf/jspdf.plugin.sillysvgrenderer.js',
        'js/jspdf/jspdf.plugin.split_text_to_size.js',
        'js/jspdf/jspdf.plugin.standard_fonts_metrics.js',
        
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
    ];
}
