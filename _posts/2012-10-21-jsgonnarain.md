---
layout: post
title: JS Gonna Rain
frontpage: false
thumb: /img/thumbs/jsgonanrain.png
overview: Recreating Steve Reichs seminal work 'It's gonna rain' with the web audio api and javascript.
script: <script type="text/javascript" src="/js/jquery.js" ></script><script type="text/javascript" src="/js/underscore.js"><script type="text/javascript" src="/js/backbone.js"></script><script data-main="/js/jsgonnarain" src="/js/require.js"></script>
css: <link rel="stylesheet" href="/css/tapeloops.css" type="text/css" media="screen" />
description: JS Gonna Rain - Steve Reich's It's Gonna Rain implemented with the web audio api and javascript.
 
---



The [webaudio api](http://www.w3.org/TR/webaudio/) is pretty exciting, it opens up the browser for all sorts of amazing audio manipulations. I'd been looking for a little project to familiarize myself with it and the other day the BBC provided inspiration. [*Recreating the sounds of the BBC Radiophonic Workshop using the Web Audio API*](http://webaudio.prototyping.bbc.co.uk/) shows some of the capabilities of the web audio api by mirroring some of the incredible pioneer work done by [the alchemists of sound](http://www.imdb.com/title/tt0963155/) around 50 years ago.[^1] 

The [tape loop example](http://webaudio.prototyping.bbc.co.uk/tapeloops/) in particular, had me intrigued. Thinking about tapeloops I figured an interesting thing to try out would be to implement Steve Reich's seminal piece [It's gonna Rain](http://www.amazon.com/gp/product/B00122N0CU/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B00122N0CU&linkCode=as2&tag=youtuple-20) with the web audio api and javascript. So I give you: 

<h1 class="center"> JS gonna Rain </h1>
<h4 class="center">Steve Reich's It's Gonna Rain implemented with the web audio api and javascript.</h4>

<p class="center"><small>Press play on both tapedecks and enjoy to the hypnotic effect of the two loops drifting in and out of phase.</small></p>

<div class="mw" id="machine">
    <div id="machine1" class="machine">
      <div class="play off"><!----></div>
      <div class="speed normal"><!----></div>
      <div class="fine-speed"><!----></div>
    </div>
    <div id="machine2" class="machine">
      <div class="play red off"><!----></div>
      <div class="speed red normal"><!----></div>
      <div class="fine-speed red"><!----></div>
    </div>
</div>

<canvas class="center span12" height="200" width="830" id="c1"><!----></canvas>

<canvas class="center span12" height="200" width="830" id="c2"><!----></canvas>

<h2 class="center">It's Gonna Rain</h2>


> It's Gonna Rain is a minimalist musical composition for magnetic tape written by Steve Reich in 1965. It lasts approximately 17 minutes and 50 seconds. \[...\] The source material of It's Gonna Rain consists entirely of a tape recording made in 1964 at San Francisco's Union Square. In the recording, an African American Pentecostal preacher, Brother Walter, rails about the end of the world \[...\] the phrase "It's Gonna Rain" is repeated and eventually looped throughout the first half of the piece.

> For the recording, Reich used two normal Wollensak tape recorders with the same recording, \[...\] due to the imprecise technology in 1965, the two recordings fell out of synch, with one tape gradually falling ahead or behind the other due to minute differences in the machines, the length of the spliced tape loops, and playback speed. Reich decided to exploit what is known as phase shifting, where all possible recursive harmonies are explored before the two loops eventually get back in sync. <small> <a href="http://en.wikipedia.org/wiki/It%27s_Gonna_Rain">It's Gonna Rain on Wikipedia </a></small>

*JS Gonna Rain* emulates Reich's piece on the two skeumorphic loop players above. Press play on both tapedecks and enjoy to the hypnotic effect of the two loops drifting in and out of phase. If you are in a hurry or just want to play around you can mess with the pitch/speed of the by fiddling with the controls on each deck.

The BBC provides code samples and such but they don't specify licences, I hope it's alright to build on their foundations and re-use their spiffy graphics. Pretty much all I did was switch out the sample sources, but I learnt a lot about the Web Audio api and CoffeeScript in the process. For the visualization aspect I wrote my own implementation that borrows heavily from the great [Wavesurfer.js](https://github.com/katspaugh/wavesurfer.js) library. Furthermore I have no rights to the original loop from Reich, but I hope that's alright too...[^2]

## Code, bugs and miscellanea

I put the coffeescript for the player and visualization up as a [Gist](https://gist.github.com/7b6a7f2f0f2fc9c6c041). One notable bug is that changing pitch on the fly will result in an out of sync waveform[^3]. Other than that this was a fun little exercise and has whetted my appetite for further experimentation with the webaudio api. 

[^1]: Their page also uses [CoffeeScript](http://coffeescript.org/),[Underscore.js](http://underscorejs.org/) and [Require.js](http://requirejs.org/). All tools and frameworks that have been getting a lot of praise / hype and I've been meaning to check them out.
[^2]: It's easier to beg forgiveness than ask permission
[^3]: I didn't work out any good way of getting the current playback position of the buffer, if you know how this can be done please let me know!