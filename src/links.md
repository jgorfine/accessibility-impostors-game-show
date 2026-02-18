---
count: "2"
impostor: "4"
eleventyComputed:
  title: "Round #{{ count }} / {{ site.name }}"
  h1: "Round #{{ count }}: Links"
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
  <a class="game-link style--1" href="https://www.deque.com/axe-con/schedule/" rel="nofollow">2026 Agenda</a>
{% endsample %}

{% sample "4", "Link", false %}
  <div data-controller="links">
    <div 
      data-action="click->links#navigate" 
      data-href="https://www.deque.com/axe-con/about"
      class="game-link style--2" 
      tabindex="0"
    >
      About
    </div>
  </div>
{% endsample %}

{% sample "5", "Link", false %}
  <a class="game-link style--2" href="https://www.deque.com/axe-con/support/" rel="nofollow">Support</a>
{% endsample %}

{% sample "6", "Link", false %}
  <a class="game-link style--1" href="https://www.deque.com/axe-con/about" rel="nofollow">About</a>
{% endsample %}