---
layout: blank
title: Hallgrímskirkjumælir - KarlTryggvason.com
thumb: /img/thumbs/hallgrimskirkjur.png
pubstatus: true
frontpage: true
permalink: /hallgrimskirkja
overview: Hallgrímskirkjur are the only way Icelanders make sense of big numbers.
description: Hallgrímskirkjumælir - Hallgrímskirkjur eru besti mælikvarði okkar Íslendinga á stóra hluti.
script: |
    <script src="/js/jquery.js"></script>
    <script src="/bootstrap/js/bootstrap.js"></script>
    <script src="/hallgrimskirkja/js/fabric.min.js"></script>
    <script src="/hallgrimskirkja/js/underscore-min.js"></script>
    <script src="/hallgrimskirkja/js/math.js"></script>
    <script src="/hallgrimskirkja/js/kuler-most-popular.js"></script>
    <script src="/hallgrimskirkja/js/color.js"></script>
    <script src="/hallgrimskirkja/js/main.js"></script>
css: |
    <link href="/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="/bootstrap/css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
    <link href="/css/style.css" rel="stylesheet" type="text/css" />
    <style>
      .foo {
         float: left !important;
      }
      .btn{
        margin-left: 0 !important;
        padding: 0;
      }
    </style>
meta: |
    <meta property="og:type" content="website"/>
    <meta property="og:image" content="/hallgrimskirkja/hallgrimskirkjur.png"/>
    <meta property="og:description" content="Hallgrímskirkjur eru besti mælikvarði okkar Íslendinga á stóra hluti."/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=no">
    <meta name="description" content="og:description" content="Hallgrímskirkjur eru besti mælikvarði okkar Íslendinga á stóra hluti">
    <link rel="shortcut icon" href="/favicon.ico">
---

<div class="hero-unit">
    <h2>Hallgrímskirkjumælir</h2>
    <p>
        Hallgrímskirkjur eru besti mælikvarði okkar Íslendinga á stóra hluti. Hér að neðan getur þú breytt óáþreifanlegum mælieiningum á borð við metra og mannfjölda í auðskiljanlegar Hallgrímskirkjur.                
    </p>
    <p>
        Sláðu bara inn tölu, veldu hvað þú vilt mæla og sjáðu hvað það þýðir í Hallgrímskirkjum.
    </p>
    <div class="row-fluid">
        <form class="form-inline">
            <input class="span4 input-small foo" type="text" id="val" placeholder="Sláðu inn tölu" />
            <select class="span4 foo" id="type">
                <option >Hvað viltu mæla?</option>
                <option value="HEIGHT">Hæð / Vegalengd (í metrum)</option>
                <option value="VOLUME">Rúmmál (í rúmmetrum)</option>
                <option value="CAPACITY">Mannfjölda</option>
                <option value="COST">Kostnað (í krónum)</option>
            </select>
            <button id="go" class="span4 btn nopadding" type="button">Upp, upp, mín sál!</button>
        </form>
    </div>
    <div class="row-fluid">
        <h3 id="description"></h3>
    </div>
    <div id="canvasholder">  
        <canvas width="100%" height="100%" id="c"></canvas>
    </div>
    <p>Heimildir og viðmiðanir:</p>
    <ul>
        <li>Hallgrímskirkja er <a href="http://www.visindavefur.is/svar.php?id=7304">74,5 m á hæð</a></li>
        <li>Hún rúmar <a href="http://www.mbl.is/greinasafn/grein/1172409/?item_num=22&amp;dags=2007-10-28">24.230 rúmmetra</a></li>
        <li>Hún tekur <a href="http://tru.is/svor/2005/10/hvada_kirkja_tekur_flesta_i_saeti">750 manns í sæti</a></li>
        <li>Það kostar <a href="http://www.rikisendurskodun.is/fileadmin/media/skyrslur/Yfirlit_um_arsreikninga_sokna_2011.pdf">79.824.307 krónur á ári að reka sóknina</a></li>
        <li><a href="http://cdn.flaticon.com/png/256/1800.png">Hallgrímskirkju grafík</a> frá <a href="http://www.freepik.com">Freepik</a> - CC BY 3.0</li>
    </ul>
</div><!--/hero-->
