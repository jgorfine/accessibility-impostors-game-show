---
count: "0"
impostor: "1"
timer:
  seconds: "180"
  display: "03:00"
  announcement: "3 minutes"
eleventyComputed:
  name: "Example Round"
  title: "{{ name }} / {{ site.name }}"
  h1: "{{ name }}: Images"
tags: game  
layout: "game.njk"
eleventyExcludeFromCollections: ["game"]
date: 2026-02-16T22:30:00Z
---

{% suspect "1", "Image", true %}
  <div>
    <img src="https://placehold.co/400x550.png" />
  </div>
{% endsuspect %}

{% suspect "2", "Image", false %}
  <div>
    <img src="https://placehold.co/400x550.png" alt="" />
  </div>
{% endsuspect %}