import { Application, Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";

window.Stimulus = Application.start();

/**
 * Timer formatting credit
 * @author JavaScript Development Space
 * @see {@link https://jsdev.space/howto/convert-seconds-js/|Convert Seconds to Time Format in JavaScript}
 */

Stimulus.register("timer", class extends Controller {
  static targets = [ "switch", "display", "announcement", "liveregion" ]
  static values = { active: Boolean }

  formatMMSS(time) {
    if (isNaN(time) || time < 0) return "00:00";

    let secondTime = Math.floor(time);
    let minuteTime = Math.floor(secondTime / 60);

    secondTime %= 60;
    minuteTime %= 60;

    return (
      `${minuteTime.toString().padStart(2, "0")}:` +
      `${secondTime.toString().padStart(2, "0")}`
    );
  }

  formatHumanReadable(time) {
    if (isNaN(time) || time < 0) return "00 minutes, 00 seconds";

    let secondTime = Math.floor(time);
    let minuteTime = Math.floor(secondTime / 60);

    secondTime %= 60;
    minuteTime %= 60;

    return (
      `${minuteTime.toString()} minutes, ${secondTime.toString().padStart(2, "0")} seconds`
    );
  }

  connect() {
    this.countdown = new Countdown().setDuration(180);

    this.countdown.onTick = (time) => {
      this.displayTarget.textContent = this.formatMMSS(time);
      this.announcementTarget.textContent = this.formatHumanReadable(time);
    };

    this.countdown.onCompleted = () => {
      this.switchTarget.setAttribute("aria-checked", "false");
      this.liveregionTarget.textContent = "Time's up! Use 'Reveal impostor' button to see the answer.";
    };
  }

  start() {
    this.countdown.start();
  }

  pause() {
    this.countdown.pause();
  }

  reset() {
    this.countdown.reset();
  }

  toggle() {
    const isChecked = this.switchTarget.getAttribute('aria-checked') === 'true';
    !isChecked ? this.start() : this.pause();
    this.switchTarget.setAttribute('aria-checked', !isChecked);
  }
})

Stimulus.register("toolbar", class extends Controller {
  static targets = [ "control" ]
  static values = { index: Number }

  next() {
    const visibleControls = this.controlTargets;
    console.log("next, visible controls", visibleControls);
    const newIndex = (this.indexValue + 1) % visibleControls.length;
    this.indexValue = newIndex;
    this.focusControl();
  }

  prev() {
    const visibleControls = this.controlTargets;
    console.log("prev, visible controls", visibleControls);
    const newIndex = ((this.indexValue - 1) + visibleControls.length) % visibleControls.length;
    this.indexValue = newIndex;
    this.focusControl();
  }

  toggle(event) {
    const switchElement = event.target.closest("[role='switch']");
    const isChecked = switchElement.getAttribute('aria-checked') === 'true';
    switchElement.setAttribute('aria-checked', !isChecked);
  }

  focusControl() {
    this.controlTargets[this.indexValue].focus();
  }

  updateTabIndices() {
    this.controlTargets.forEach((element, index) => {
      element.tabIndex = index === this.indexValue ? "0" : "-1";
    })
  }

  indexValueChanged() {
    this.updateTabIndices();
  }
})

Stimulus.register("game", class extends Controller {
  static targets = [ "foo", "name", "figure", "figcaption" ]
  static values = { fizz: Number, bar: Boolean }

  toggle() {
    this.figureTargets.forEach((figure, index) => {
      if (figure.querySelector("figcaption") === null) {
        const isImpostor = index + 1 === this.fizzValue;
        figure.classList.add(isImpostor && "impostor");
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.setAttribute("data-game-target", "figcaption");
        figcaptionElement.classList.add(!isImpostor && "sr-only");
        const innerElement = document.createElement("span");
        innerElement.textContent = isImpostor ? "Impostor" : "[] is not the impostor";
        figcaptionElement.append(innerElement);
        figure.prepend(figcaptionElement);
      } else {
        figure.querySelector("figcaption").hidden = this.barValue;
      }
    });

    this.barValue = !this.barValue;
  }
})

Stimulus.register("filters", class extends Controller {
  static targets = [ "toggle", "filters", "tracks" ]
  static values = { expanded: Boolean }

  toggle() {
    this.expandedValue = !this.expandedValue;
    this.filtersTarget.hidden = !this.expandedValue;
    if (this.expandedValue === true && this.toggleTarget.hasAttribute('aria-expanded')) {
      console.log(this.tracksTarget);
      this.tracksTarget.focus();
    }
  }

  expandedValueChanged() {
    if (this.toggleTarget.hasAttribute('aria-expanded')) {
      this.toggleTarget.setAttribute('aria-expanded', this.expandedValue);
    }
  }
})
