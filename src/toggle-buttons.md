---
count: "4"
impostor: "1"
eleventyComputed:
  title: "Round #{{ count }} / {{ site.name }}"
  h1: "Round #{{ count }}: Toggle Buttons"
tags: game
layout: "game.njk"
date: 2026-02-16T23:03:00Z
---

{% sample "1", "Toggle Button", true %}
  {% filters "Wednesday February 25", true %}
{% endsample %}

{% sample "2", "Toggle Button", false %}
  {% filters "Tuesday, February 24" %}
{% endsample %}

{% sample "3", "Toggle Button", false %}
  {% filters "Tuesday February 24" %}
{% endsample %}

{% sample "4", "Toggle Button", false %}
  {% filters "Wednesday February 25" %}
{% endsample %}