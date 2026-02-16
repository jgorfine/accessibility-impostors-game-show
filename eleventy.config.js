import CleanCSS from "clean-css";

export default function (eleventyConfig) {
  eleventyConfig.addShortcode("textblock", function() {
    return `<div class="game-text-block">
<p class="game-text-block__title">What does the Axe-con name mean?</p>
<p class="game-text-block__blurb">The name Axe comes from a well-known Deque open-source project called Axe-core. It’s been downloaded hundreds of millions of times, making it the de facto standard in automated accessibility testing rules. It’s baked into every instance of the Chrome browser extension around the world and used widely by top businesses and organizations to help determine if web apps are accessible. The community response and support behind the project are the inspiration for all Deque efforts, including this conference.</p>
<p class="game-text-block__blurb">We also like to think that Axe is synonymous with accessible experiences.</p>
</div>`;
  });

  eleventyConfig.addShortcode("filters", function(date, impostor) {
    return `<div data-controller="filters" data-filters-expanded-value="false" class="game-filters">
<div class="game-filters__header">
<div class="game-filters__date">${date}</div>
<button data-filters-target="toggle" data-action="filters#toggle" class="game-filters__button" ${impostor ? '' : `aria-expanded="false"`} type="button">Filter Tracks</button>
</div>
<div data-filters-target="filters" class="game-filters__body" role="group" hidden>
<div class="game-filters__field">
<label for="sample-1__tracks">Tracks</label>
<div>
<select data-filters-target="tracks" id="sample-1__tracks" readonly>
<option>-- Select an option --</option>
</select>
</div>
</div>
<div class="game-filters__field">
<label for="sample-1__playlists">Playlists</label>
<div>
<select id="sample-1__playlists" readonly>
<option>-- Select an option --</option>
</select>
</div>
</div>
</div>
</div>`;
  });

  eleventyConfig.addPairedShortcode("sample", function(content, count, type, isImpostor, controller) {
    return `<section id="sample-${count}" class="sample" aria-labelledby="sample-${count}__heading" role="region">
<h2 data-game-target="name" id="sample-${count}__heading" class="sample__heading">${type} #${count}</h2>
<div class="sample__content">
<figure data-game-target="figure">
<div class="figtray" ${controller ? `data-controller="${controller}"` : ''}>${content}</figtray>
</figure>
</div>
</section>`;
  });

  eleventyConfig.addPassthroughCopy("**/*.svg", {
    mode: "html-relative"
  });

  eleventyConfig.addPassthroughCopy("src/*.js", {
    mode: "html-relative"
  });
  
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  })

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    }
  }
}