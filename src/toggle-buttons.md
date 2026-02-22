---
count: "4"
impostor: "1"
timer:
  seconds: "120"
  display: "02:00"
  announcement: "2 minutes"
eleventyComputed:
  name: "Round #{{ count }}"
  title: "{{ name }} / {{ site.name }}"
  h1: "{{ name }}: Toggle Buttons"
tags: game
layout: "game.njk"
date: 2026-02-16T23:03:00Z
---

{% suspect "1", "Toggle Button", true %}
  {% filters "1", "Wednesday February 25", true %}
{% endsuspect %}

{% suspect "2", "Toggle Button", false %}
  {% filters "2", "Tuesday, February 24", false, "— Select an option —", "— Select an option —" %}
{% endsuspect %}

{% suspect "3", "Toggle Button", false %}
  {% filters "3", "Tuesday February 24", false, "-- Select track --", "-- Select playlist --" %}
{% endsuspect %}

{% suspect "4", "Toggle Button", false %}
  {% filters "4", "Wed. Feb. 25", false %}
{% endsuspect %}