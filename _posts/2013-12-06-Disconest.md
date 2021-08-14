---
layout: post
title: Disconest
frontpage: true
json: true
thumb: /img/disconest.png
overview: Get the bpms, keys and other musical metadata for your records
---

Vinyl sounds better, looks better, feels better and even smells better. But digital does have its benefits, musical metadata is one of them. Having the key, tempo and other data for your records can be useful. [Disconest](http://www.disconest.com) uses the [The Echonest](http://the.echonest.com/) and [Discogs](http://www.discogs.com/developers/) apis to find this information about records and cds registered on Discogs.

Disconest was my hack at the 2013 London [Music Hack Day](http://www.london.musichackday.org/2013/). It was borne out of an itch I had when comparing vinyl dj-ing to its digital counterpart. Of course good djs should to know their records but it can still be good to see at a glance whether this tune was 120 or 125 bpm or if it was in C or D major. 

Ever so often you buy second hand records where dj's solved it in an ingenious fashion but tapping out the bpm's and writing labels doesn't really scale for hundreds or thousands of records.

![How we used to do it](/img/disconest-1.jpg "How we used to do it")

<div class="caption">Old skool bpm label on a 2nd hand record I bought. Useful information but tapping out bpms and writing them on covers really doesn't scale.</div>

With Disconest you just look up your record on Discogs, [get the metadata](http://www.disconest.com/?discogsurl=www.discogs.com/Larry-Heard-Alien/release/5603315) and print out the result:

![How Disconest does it](/img/disconest-2.jpg "How Disconest does it")
<div class="caption">Disconest metadata label.</div>

There's also a [command line version](http://www.github.com/kalli/disconest) that you can use to fetch the same information for your entire [Discogs](http://www.discogs.com/users/export?w=collection) collection. I hope Disconest can be of use to some of the record nerds out there. Shouts to [Jonfri](https://dribbble.com/jonfri) who made the snazzy logo.



