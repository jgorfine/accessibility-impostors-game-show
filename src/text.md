---
name: "Round #1"
impostor: "2"
eleventyComputed:
  title: "{{ name }} / {{ site.name }}"
  h1: "{{ name }}: Text"
tags: game  
layout: "game.njk"
page_css: "css/text-color.css"
date: 2026-02-16T23:00:00Z
---

{% sample "1", "Text Block", false %}
  {% textblock %}
{% endsample %}

{% sample "2", "Text Block", true %}
  {% textblock %}
{% endsample %}

{% sample "3", "Text Block", false %}
  {% textblock %}
{% endsample %}
