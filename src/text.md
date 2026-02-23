---
index: "1"
impostor: "2"
timer:
  seconds: "180"
  display: "03:00"
  announcement: "3 minutes"
og: 
  image:
    height: "630"
    width: "1200"
    url: "/round1@2x.png"  
eleventyComputed:
  name: "Round #{{ index }}"
  title: "{{ name }} / {{ site.name }}"
  h1: "{{ name }}: Text"
tags: game  
layout: "game.njk"
date: 2026-02-16T23:00:00Z
---

{% suspect "1", "Text", false %}
  {% textblock %}
{% endsuspect %}

{% suspect "2", "Text", true %}
  {% textblock %}
{% endsuspect %}

{% suspect "3", "Text", false %}
  {% textblock %}
{% endsuspect %}
