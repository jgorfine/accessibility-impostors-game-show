---
count: "1"
impostor: "2"
timer:
  seconds: "180"
  display: "3:00"
  announcement: "3 minutes"
eleventyComputed:
  name: "Round #{{ count }}"
  title: "{{ name }} / {{ site.name }}"
  h1: "{{ name }}: Text"
tags: game  
layout: "game.njk"
page_css: "css/text-color.css"
date: 2026-02-16T23:00:00Z
---

{% suspect "1", "Text Block", false %}
  {% textblock %}
{% endsuspect %}

{% suspect "2", "Text Block", true %}
  {% textblock %}
{% endsuspect %}

{% suspect "3", "Text Block", false %}
  {% textblock %}
{% endsuspect %}
