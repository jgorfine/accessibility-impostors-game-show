import CleanCSS from "clean-css";
import { minify } from "terser";

export default function (eleventyConfig) {
  eleventyConfig.addShortcode("textblock", function() {
    return `<div class="game-text-block">
<p class="game-text-block__title">What does the Axe-con name mean?</p>
<p class="game-text-block__blurb">The name Axe comes from a well-known Deque open-source project called Axe-core. It’s been downloaded hundreds of millions of times, making it the de facto standard in automated accessibility testing rules. It’s baked into every instance of the Chrome browser extension around the world and used widely by top businesses and organizations to help determine if web apps are accessible. The community response and support behind the project are the inspiration for all Deque efforts, including this conference.</p>
<p class="game-text-block__blurb">We also like to think that Axe is synonymous with accessible experiences.</p>
</div>`;
  });

  eleventyConfig.addShortcode("filters", function(count, date, isImpostor, tracksPlaceholder, playlistsPlaceholder) {
    return `<div data-controller="filters" data-filters-expanded-value="false" class="game-filters">
<div class="game-filters__header">
<div class="game-filters__date">${date}</div>
<button data-filters-target="toggle" data-action="filters#toggle" class="game-filters__button" ${isImpostor ? '' : `aria-expanded="false"`} type="button">Filter Tracks</button>
</div>
<div data-filters-target="filters" class="game-filters__body" role="group" hidden>
<div class="game-filters__field">
<label for="sample-${count}__tracks">Tracks</label>
<div>
<select data-filters-target="tracks" id="sample-${count}__tracks" readonly>
<option>${tracksPlaceholder ? tracksPlaceholder : '-- Select an option --'}</option>
</select>
</div>
</div>
<div class="game-filters__field">
<label for="sample-${count}__playlists">Playlists</label>
<div>
<select id="sample-${count}__playlists" readonly>
<option>${playlistsPlaceholder ? playlistsPlaceholder : '-- Select an option --'}</option>
</select>
</div>
</div>
</div>
</div>`;
  });

  eleventyConfig.addPairedShortcode("sample", function(content, count, type, isImpostor, controller) {
    return `<section id="sample-${count}" class="sample" aria-labelledby="sample-${count}__heading" role="region">
<h2 data-layout-target="sampleHeading" ${isImpostor ? "data-reveal-target='heading'" : ""} id="sample-${count}__heading" class="sample__heading" tabindex="-1">${type} #${count}</h2>
<div class="sample__content">
<figure data-reveal-target="figure">
<div class="figtray" ${controller ? `data-controller="${controller}"` : ''}>${content}</figtray>
</figure>
</div>
</section>`;
  });

  eleventyConfig.addPassthroughCopy("**/*.svg", {
    mode: "html-relative"
  });

  eleventyConfig.addPassthroughCopy("**/*.mp3", {
    mode: "html-relative"
  });
  
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("jsmin", async function(code) {
		try {
			const minified = await minify(code);
			return minified.code;
		} catch (err) {
			console.error("Terser error: ", err);
			return code;
		}
	});

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    }
  }
}