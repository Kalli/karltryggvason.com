---
layout: blank
title: Discogsgrapher - vizualising the artist-label networks of Discogs.com
thumb: /img/thumbs/discogsgrapher.png
pubstatus: true
frontpage: false
overview: Discogsgrapher - Explore the artist/label networks of the drum and bass and dubstep genres
description: Discogsgrapher - Explore the artist/label networks of the drum and bass and dubstep genres
script: |
    <script src="components/d3/d3.min.js" ></script>
    <script src="/js/jquery.js"></script>
    <script src="/bootstrap/js/bootstrap.js"></script>
    <script src="components/tipsy/src/javascripts/jquery.tipsy.js" ></script>
    <script src="components/modernizr/modernizr.js" ></script>
    <script src="components/bootstrap-slider/bootstrap-slider.js" ></script>
    <script src="graph.js"></script>
css: |
    <link href="components/tipsy/src/stylesheets/tipsy.css" rel="stylesheet" type="text/css" />
    <link href="https://karltryggvason.com/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="https://karltryggvason.com/bootstrap/css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
    <link href="style.css" rel="stylesheet" type="text/css" />
    <link href="/css/style.css" rel="stylesheet" type="text/css" />
meta: |
    <meta property="og:title" content="Discogsgrapher - vizualising the artist-label networks of Discogs.com" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="Explore the artist/label networks of the drum and bass and dubstep genres" />
    <meta property="og:image" content="https://www.karltryggvason.com/img/thumbs/discogsgrapher.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
---

<div class="container-fluid tabbable hero-unit">
    <div class="row-fluid">
        <div class="span12" style="padding:10px;">  
            <h1>Discogsgrapher</h1>
            <h3>Vizualising Discogs.com artist label networks</h3>
            <p>
                Discogsgrapher vizualises artist/label connections using information from <a href="http://www.discogs.com">Discogs.com</a>. Browse the different genres below to see the networks for different periods of that genre. Two artists are considered connected if they have released music on the same label. The number of releases an artist has is reflected in the size of his/hers node. Nodes with the same colour belong to the same community.
            </p>
            <p>
                Made by <a href="http://www.karltryggvason.com">Karl Tryggvason</a>. See this <a href="http://blog.karltryggvason.com/post/66600807317/discogsgrapher-vizualising-the-artist-label-networks">blogpost</a> for more information or look at the code on <a href="http://www.github.com/kalli/discogsgrapher">Github</a>.
                Hit me up on <a href="http://www.twitter.com/karltryggvason">@karltryggvason</a> if you have any questions.
            </p>
        </div>          
    </div>
    <div class="row-fluid" style="height:800px;">
    <ul class="nav nav-tabs">
      <li class="active"><a href="#dnb" data-toggle="tab">Drum &amp; Bass / Jungle</a></li>
      <li><a href="#dubstep" data-toggle="tab">Dubstep</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane active" id="dnb">
            <div class="row-fluid">
                <div class="span4">
                    <div class="slider" >
                        <p>Hover over a node to see the artist name, click a node for information about its connections. Use the slider to select a period.</p>
                        <div class="span12">
                            <b class="span3 pull-left">1993</b>
                            <input id="dnbslider" type="text" class="span8" data-slider-min="1993" data-slider-max="1998"  data-slider-handle="round" data-slider-step="1" data-slider-value="[1993,1993]" data-slider-orientation="horizontal" data-slider-tooltip="show" />
                            <b class="span3 pull-right">1998</b>
                        </div>
                        <p style="padding:5px;">Now viewing:
                        <span id="dnbheading">dnb/jungle artists who released more than 2 tracks in 1993</span></p>
                    </div> 
                    <div style="padding:10px;" id="dnbinfo">&nbsp;</div>         
                </div>         
                <div class="span8" id="dnbchart">&nbsp;</div> 
            </div>              
        </div>
        <div class="tab-pane" id="dubstep">
            <div class="row-fluid">
                <div class="span4">
                    <div class="slider" >
                        <p>Hover over a node to see the artist name, click a node for information about its connections. Use the slider to select a period.</p>
                        <div class="span12">
                            <b class="span3 pull-left">2004</b>
                            <input id="dubslider" type="text" class="span8" data-slider-min="2004" data-slider-max="2009" data-slider-handle="round" data-slider-step="1" data-slider-value="[2004,2004]" data-slider-orientation="horizontal" data-slider-tooltip="show" ></input>
                            <b class="span3 pull-right">2009</b>
                        </div>
                        <p style="padding:5px;">Now viewing:
                        <span id="dubheading">dubstep artists who released more than 2 tracks in 2004</span></p>
                    </div> 
                    <div style="padding:10px;" id="dubinfo">&nbsp;</div>         
                </div>         
                <div class="span8" id="dubchart">&nbsp;</div> 
            </div>              
        </div>
    </div>
    </div>
</div>

