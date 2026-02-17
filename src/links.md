---
name: "Round #2"
impostor: "3"
eleventyComputed:
  title: "{{ name }} / {{ site.name }}"
  h1: "{{ name }}: Links"
tags: game
layout: "game.njk"
date: 2026-02-16T23:01:00Z
---

{% sample "1", "Link", false %}
  <a class="game-link style--1" href="https://www.deque.com/axe-con/presenters" rel="nofollow">Presenters</a>
{% endsample %}

{% sample "2", "Link", false %}
  <a class="game-link style--2" href="https://www.deque.com/axe-con/" rel="nofollow">Home</a>
{% endsample %}

{% sample "3", "Link", true %}
  <div class="game-link style--1" role="link">2026 Agenda</div>
{% endsample %}

{% sample "4", "Link", false %}
  <a class="game-link style--2" href="https://www.deque.com/axe-con/about" rel="nofollow">About</a>
{% endsample %}
