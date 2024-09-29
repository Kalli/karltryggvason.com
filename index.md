---
layout: default
title: Karl Tryggvason - Troublemaker / Problem Solver
---

<div class="hero-unit" markdown="1">

Hey there! My name is Karl Tryggvason, I'm  a software developer, runner, dj and music enthusiast. I'm born and bred in Iceland, but currently reside in Oslo, Norway. Below you can find some things I've worked on and thought about.

</div>


{% for page in site.posts %}
{% if page.layout != "podcast" and page.pubstatus != "unpublished" and page.frontpage == true %}
{% cycle 'add rows': '<div class="row-fluid">', '', '' %}
    <div class="span4 project">
        <a href="{{ page.url }}" title="{{ page.title }}">
        <div class="info">
            <p><b>{{page.title}}</b><br><br>
            {{ page.overview }}</p>
        </div>
        <img src="{{ page.thumb }}" alt="{{ page.title }}" class="img-circle thumb">
        </a>
        <div class="mobile-info well well-small hidden-desktop">
            <a href="{{ page.url }}" title="{{ page.title }}">
                <p>{{ page.overview }}</p>
            </a>
        </div>
    </div>
{% cycle 'close rows': '', '', '</div>' %}

{% endif %}
{% endfor %}
{% cycle 'close rows': '', '</div>', '</div>' %}
