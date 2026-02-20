import { Application, Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";

/**
 * Check if browser storage is available
 * @author MDN Web Docs
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability|Testing for availability}
 */
const storageAvailable = (type) => {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

window.Stimulus = Application.start();

Stimulus.register("layout", class extends Controller {
  static targets = [ "header", "grid", "sampleHeading" ]

  captureHeaderHeight() {
    const headerHeight = this.headerTarget.offsetHeight;
    this.gridTarget.style.setProperty('--header-height', `${headerHeight}px`);
    this.sampleHeadingTargets.forEach((heading) => {
      heading.style.setProperty('--header-height', `${headerHeight}px`);
    });
  }

  connect() {
    this.captureHeaderHeight();
  }

  recalculateHeight() {
    this.captureHeaderHeight();
  }
})

Stimulus.register("audio", class extends Controller {
  static targets = [ "audioSwitch", "audioElement", "timerSwitchLabel" ]

  initialize() {
    if (storageAvailable("localStorage") && !localStorage.getItem("aigs-audio")) {
      localStorage.setItem("aigs-audio", "false");
    }
  }

  audioSwitchTargetConnected(target) {
    if (storageAvailable("localStorage") && localStorage.getItem("aigs-audio")) {
      target.setAttribute('aria-checked', localStorage.getItem("aigs-audio"));
    }
  }

  audioElementTargetConnected(target) {
    if (storageAvailable("localStorage") && localStorage.getItem("aigs-audio")) {
      target.muted = localStorage.getItem("aigs-audio") === "false";
    }
  }

  toggle() {
    const isChecked = this.audioSwitchTarget.getAttribute("aria-checked") === "true";
    this.audioSwitchTarget.setAttribute('aria-checked', !isChecked);
    this.audioElementTarget.muted = this.audioSwitchTarget.getAttribute("aria-checked") === "false";
    if (storageAvailable("localStorage") && localStorage.getItem("aigs-audio")) {
      localStorage.setItem("aigs-audio", !isChecked);
    }
  }
})

/**
 * Timer formatting credit
 * @author JavaScript Development Space
 * @see {@link https://jsdev.space/howto/convert-seconds-js/|Convert Seconds to Time Format in JavaScript}
 */

Stimulus.register("timer", class extends Controller {
  static targets = [ 
    "switchSetting", 
    "switchActive", 
    "display", 
    "audioElement", 
    "announcement", 
    "liveregion" 
  ]

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

  initialize() {
    if (storageAvailable("localStorage") && !localStorage.getItem("aigs-timer")) {
      localStorage.setItem("aigs-timer", "true");
    }
  }

  switchSettingTargetConnected(target) {
    if (storageAvailable("localStorage") && localStorage.getItem("aigs-timer")) {
      target.setAttribute('aria-checked', localStorage.getItem("aigs-timer"));
    }
  }

  connect() {
    this.countdown = new Countdown().setDuration(180);

    this.countdown.onTick = (time) => {
      this.displayTarget.textContent = this.formatMMSS(time);
      this.announcementTarget.textContent = this.formatHumanReadable(time);
    };

    this.countdown.onCompleted = () => {
      this.switchActiveTarget.setAttribute("aria-checked", "false");
      this.liveregionTarget.textContent = "Time's up! Use 'Reveal impostor' button to see the answer.";
    };
  }

  start() {
    this.countdown.start();
    this.audioElementTarget.play();
  }

  pause() {
    this.countdown.pause();
    this.audioElementTarget.pause();
  }

  reset() {
    this.countdown.reset();
    this.audioElementTarget.currentTime = 0;
    this.displayTarget.textContent = this.formatMMSS(180);
    this.announcementTarget.textContent = this.formatHumanReadable(180);
    this.switchActiveTarget.setAttribute("aria-checked", "false");
  }

  toggleActive() {
    const isChecked = this.switchActiveTarget.getAttribute("aria-checked") === "true";
    this.switchActiveTarget.setAttribute('aria-checked', !isChecked);
    isChecked ? this.pause() : this.start();
  }

  toggleSetting() {
    const isChecked = this.switchSettingTarget.getAttribute("aria-checked") === "true";
    this.switchSettingTarget.setAttribute('aria-checked', !isChecked);
    this.pause();
    this.reset();
    if (storageAvailable("localStorage") && localStorage.getItem("aigs-timer")) {
      localStorage.setItem("aigs-timer", !isChecked);
    }
  }
})

Stimulus.register("toolbar", class extends Controller {
  static targets = [ "control" ]
  static values = { index: Number }

  next() {
    const visibleControls = this.controlTargets;
    // console.log("next, visible controls", visibleControls);
    const newIndex = (this.indexValue + 1) % visibleControls.length;
    this.indexValue = newIndex;
    this.focusControl();
  }

  prev() {
    const visibleControls = this.controlTargets;
    // console.log("prev, visible controls", visibleControls);
    const newIndex = ((this.indexValue - 1) + visibleControls.length) % visibleControls.length;
    this.indexValue = newIndex;
    this.focusControl();
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

Stimulus.register("reveal", class extends Controller {
  static targets = [ "heading", "figure", "figcaption" ]
  static values = { fizz: Number, bar: Boolean }

  toggle() {
    this.figureTargets.forEach((figure, index) => {
      if (figure.querySelector("figcaption") === null) {
        const isImpostor = index + 1 === this.fizzValue;
        figure.classList.add(isImpostor && "impostor");
        const figcaptionElement = document.createElement("figcaption");
        let text = "not the impostor";
        if (isImpostor) {
          figcaptionElement.setAttribute("data-reveal-target", "figcaption");
          figcaptionElement.tabIndex = -1;
          text = "Impostor";
        }
        figcaptionElement.textContent = text;
        figure.append(figcaptionElement);
      } else {
        figure.querySelector("figcaption").hidden = this.barValue;
      }
    });

    if (this.barValue === false) {
      this.headingTarget.focus();
    }

    this.barValue = !this.barValue;
  }
})

Stimulus.register("links", class extends Controller {
  navigate(event) {
    window.location.href = event.target.dataset['href'];
  }
})

Stimulus.register("filters", class extends Controller {
  static targets = [ "toggle", "filters", "tracks" ]
  static values = { expanded: Boolean }

  toggle() {
    this.expandedValue = !this.expandedValue;
    this.filtersTarget.hidden = !this.expandedValue;
    if (this.expandedValue === true && this.toggleTarget.hasAttribute('aria-expanded')) {
      this.tracksTarget.focus();
    }
  }

  expandedValueChanged() {
    if (this.toggleTarget.hasAttribute('aria-expanded')) {
      this.toggleTarget.setAttribute('aria-expanded', this.expandedValue);
    }
  }
})
