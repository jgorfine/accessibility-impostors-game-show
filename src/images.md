---
index: "0"
impostor: "1"
timer:
  seconds: "180"
  display: "03:00"
  announcement: "3 minutes"
eleventyComputed:
  name: "Round #{{ index }}"
  title: "{{ name }} / {{ site.name }}"
  h1: "{{ name }}: Images (Example)"
tags: game  
layout: "game.njk"
eleventyExcludeFromCollections: ["game"]
date: 2026-02-16T22:30:00Z
---

{% suspect "1", "Image", true %}
  <img class="game-image" src="media/rhody.jpg" />
{% endsuspect %}

{% suspect "2", "Image", false %}
  <img class="game-image" src="media/thea.jpg" alt="Thea is a brown and white Seal Bicolor Ragdoll cat. She lies on the back of a navy couch, head tilted, paws peeking out from underneath her fluffy white chest. She looks very demure." />
{% endsuspect %}