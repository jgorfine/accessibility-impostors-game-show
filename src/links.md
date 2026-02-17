---
count: "2"
impostor: "3"
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
  <div data-controller="links">
    <div 
      data-action="click->links#navigate keydown.enter->links#navigate"
      data-href="https://www.deque.com/axe-con/schedule/" 
      class="game-link style--1" 
      role="link"
      tabindex="0"
    >
      2026 Agenda
    </div>
  </div>
{% endsample %}

{% sample "4", "Link", false %}
  <div data-controller="links">
    <div 
      data-action="click->links#navigate" 
      data-href="https://www.deque.com/axe-con/about"
      class="game-link style--2" 
      role="link"
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