---
name: "Round #3"
impostor: "4"
eleventyComputed:
  title: "{{ name }} / {{ site.name }}"
  h1: "{{ name }}: Icon Buttons"
tags: 'game'
libraries: 'floatingui'
layout: "game.njk"
---

{% sample "1", "Icon Button", false %}
  <button class="game-icon-button" aria-label="Save" type="button">
    <svg aria-hidden="true" focusable="false" viewBox="0 -960 960 960">
      <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM565-275q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
    </svg>
  </button>
{% endsample %}

{% sample "2", "Icon Button", false, "tooltip" %}
  <button
    data-tooltip-target="button" 
    data-action="mouseenter->tooltip#show mouseleave->tooltip#hide focus->tooltip#show blur->tooltip#hide"
    class="game-icon-button small" 
    aria-labelledby="redo-tooltip" 
    type="button" 
  >
    <svg aria-hidden="true" focusable="false" viewBox="0 -960 960 960">
      <path d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z"/>
    </svg>
    <span class="sr-only">Redo</span>
  </button>
  <div data-tooltip-target="tooltip" id="redo-tooltip" role="tooltip">
    <span>Redo</span>
    <span class="arrow" data-tooltip-target="arrow"></span>
  </div>
{% endsample %}

{% sample "3", "Icon Button", false, "tooltip" %}
  <button 
    data-tooltip-target="button" 
    data-action="mouseenter->tooltip#show mouseleave->tooltip#hide focus->tooltip#show blur->tooltip#hide"
    class="game-icon-button"
    aria-labelledby="save-tooltip"
    type="button" 
  >
    <svg aria-hidden="true" focusable="false" viewBox="0 -960 960 960">
      <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM565-275q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
    </svg>
  </button>
  <div data-tooltip-target="tooltip" id="save-tooltip" role="tooltip">
    <span>Save</span>
    <span class="arrow" data-tooltip-target="arrow"></span>
  </div>
{% endsample %}

{% sample "4", "Icon Button", true, "tooltip" %}
  <button 
    data-tooltip-target="button" 
    data-action="mouseenter->tooltip#show mouseleave->tooltip#hide focus->tooltip#show blur->tooltip#hide"
    class="game-icon-button"
    type="button" 
  >
    <svg aria-hidden="true" focusable="false" viewBox="0 -960 960 960">
      <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/>
    </svg>
  </button>
  <div data-tooltip-target="tooltip" id="undo-tooltip" role="tooltip">
    <span>Undo</span>
    <span class="arrow" data-tooltip-target="arrow"></span>
  </div>
{% endsample %}

{% sample "5", "Icon Button", false %}
  <button class="game-icon-button small" type="button">
    <svg aria-label="Undo" role="img" aria-hidden="false" focusable="false" viewBox="0 -960 960 960">
      <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/>
    </svg>
  </button>
{% endsample %}

{% sample "6", "Icon Button", false %}
  <button class="game-icon-button" aria-label="Redo" type="button">
    <svg aria-hidden="true" focusable="false" viewBox="0 -960 960 960">
      <path d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z"/>
    </svg>
  </button>
{% endsample %}
