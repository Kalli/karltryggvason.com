---
layout: post
title: Aurora Forecast
frontpage: false
thumb: /img/thumbs/aurorabot.png
overview: Twitterbot reporting the Icelandic Met Office northern lights forecast.
---

The [Icelandic Meteorological Office](http://en.vedur.is) publishes an [aurora borealis activity forecast](http://en.vedur.is/weather/forecasts/aurora) on their website. I made [@AuroraIceland](https://twitter.com/AuroraIceland), a little Twitterbot that scrapes the activity rating and cloud cover forecast from the forecast page and tweets the result three times a day.

You can find the code on [Github](https://github.com/Kalli/twitter-bots/) and see the northern lights in Iceland (maybe)!

<div class="center">
<a class="twitter-timeline" href="https://twitter.com/AuroraIceland" data-widget-id="386952700711030784">Tweets by @AuroraIceland</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
</div>


