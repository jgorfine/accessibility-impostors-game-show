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
  static targets = [ "header", "grid", "suspectHeading" ]

  captureHeaderHeight() {
    const headerHeight = this.headerTarget.offsetHeight;
    this.gridTarget.style.setProperty('--header-height', `${headerHeight}px`);
    this.suspectHeadingTargets.forEach((heading) => {
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
  static targets = [ 
    "audioSwitch", 
    "audioVolumeDown",
    "audioVolumeUp", 
    "audioPlayer", 
    "timerArea",
    "timerActiveSwitchLabel",
    "liveRegion" 
  ]
  static values = { volume: Number }

  initialize() {
    if (storageAvailable("localStorage")) {
      if (!localStorage.getItem("aigs-audio")) {
        localStorage.setItem("aigs-audio", "false");
      }
      if (!localStorage.getItem("aigs-volume")) {
        localStorage.setItem("aigs-volume", this.volumeValue);
      }
    }
  }

  audioSwitchTargetConnected(target) {
    if (storageAvailable("localStorage") && localStorage.getItem("aigs-audio")) {
      target.setAttribute('aria-checked', localStorage.getItem("aigs-audio"));
      this.timerActiveSwitchLabelTarget.textContent = localStorage.getItem("aigs-audio") === "true" ? "Timer (with music)" : "Timer (without music)";
    }
  }

  audioPlayerTargetConnected(target) {
    if (storageAvailable("localStorage")) {
      if (localStorage.getItem("aigs-audio")) {
        target.muted = localStorage.getItem("aigs-audio") === "false";
      }
      if (localStorage.getItem("aigs-volume")) {
        target.volume = localStorage.getItem("aigs-volume");
        this.volumeValue = localStorage.getItem("aigs-volume");
      }
    }
  }

  toggle() {
    const isChecked = this.audioSwitchTarget.getAttribute("aria-checked") === "true";
    this.audioSwitchTarget.setAttribute('aria-checked', !isChecked);
    this.audioPlayerTarget.muted = this.audioSwitchTarget.getAttribute("aria-checked") === "false";
    this.timerActiveSwitchLabelTarget.textContent = !isChecked ? "Timer (with music)" : "Timer (without music)";
    if (!isChecked) {
      this.timerAreaTarget.focus();
    }
    if (storageAvailable("localStorage") && localStorage.getItem("aigs-audio")) {
      localStorage.setItem("aigs-audio", !isChecked);
    }
  }

  turnVolumeDown() {
    if (this.volumeValue > 0) {
      const newVolume = (this.volumeValue - 0.1).toFixed(1);
      this.volumeValue = newVolume;
      if (storageAvailable("localStorage") && localStorage.getItem("aigs-volume")) {
        localStorage.setItem("aigs-volume", newVolume);
      }
      this.liveRegionTarget.textContent = `Music volume is ${(newVolume * 100).toFixed(0)}%`
    }
  }

  turnVolumeUp() {
    if (this.volumeValue < 1) {
      const newVolume = (this.volumeValue + 0.1).toFixed(1);
      this.volumeValue = newVolume;
      if (storageAvailable("localStorage") && localStorage.getItem("aigs-volume")) {
        localStorage.setItem("aigs-volume", newVolume);
      }
      this.liveRegionTarget.textContent = `Music volume is ${(newVolume * 100).toFixed(0)}%`
    }
  }

  volumeValueChanged(currentValue, previousValue) {
    this.audioPlayerTarget.volume = currentValue;
  }
})

/**
 * Timer formatting credit
 * @author JavaScript Development Space
 * @see {@link https://jsdev.space/howto/convert-seconds-js/|Convert Seconds to Time Format in JavaScript}
 */

Stimulus.register("timer", class extends Controller {
  static targets = [ 
    "timerSettingSwitch", 
    "timerActiveSwitch", 
    "audioPlayer",
    "timerArea",
    "timerDisplay",  
    "timerAnnouncement", 
    "liveRegion" 
  ]
  static values = { 
    limit: { type: Number, default: 180 } 
  }

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
      localStorage.setItem("aigs-timer", "false");
    }
  }

  timerSettingSwitchTargetConnected(target) {
    if (storageAvailable("localStorage") && localStorage.getItem("aigs-timer")) {
      target.setAttribute('aria-checked', localStorage.getItem("aigs-timer"));
    }
  }

  // timerAreaTargetConnected(target) {
  //   if (storageAvailable("localStorage") && localStorage.getItem("aigs-timer")) {
  //     target.hidden = localStorage.getItem("aigs-timer") === "false";
  //   }
  // }

  connect() {
    this.countdown = new Countdown().setDuration(this.limitValue);

    this.countdown.onTick = (time) => {
      this.timerDisplayTarget.textContent = this.formatMMSS(time);
      this.timerAnnouncementTarget.textContent = this.formatHumanReadable(time);
    };

    this.countdown.onCompleted = () => {
      this.audioPlayerTarget.pause();
      this.audioPlayerTarget.currentTime = 0;
      this.timerActiveSwitchTarget.setAttribute("aria-checked", "false");
      this.liveRegionTarget.textContent = "Time's up! Use 'Reveal impostor' button to see the answer.";
    };
  }

  start() {
    this.countdown.start();
    this.audioPlayerTarget.play();
  }

  pause() {
    this.countdown.pause();
    this.audioPlayerTarget.pause();
  }

  reset() {
    this.countdown.reset();
    this.audioPlayerTarget.currentTime = 0;
    this.timerDisplayTarget.textContent = this.formatMMSS(this.limitValue);
    this.timerAnnouncementTarget.textContent = this.formatHumanReadable(this.limitValue);
    this.timerActiveSwitchTarget.setAttribute("aria-checked", "false");
  }

  toggleActive() {
    const isChecked = this.timerActiveSwitchTarget.getAttribute("aria-checked") === "true";
    this.timerActiveSwitchTarget.setAttribute('aria-checked', !isChecked);
    isChecked ? this.pause() : this.start();
  }

  toggleSetting() {
    const isChecked = this.timerSettingSwitchTarget.getAttribute("aria-checked") === "true";
    this.timerSettingSwitchTarget.setAttribute('aria-checked', !isChecked);
    this.pause();
    this.reset();
    if (!isChecked) {
      this.timerAreaTarget.focus();
    }
    if (storageAvailable("localStorage") && localStorage.getItem("aigs-timer")) {
      localStorage.setItem("aigs-timer", !isChecked);
    }
  }
})

Stimulus.register("reveal", class extends Controller {
  static targets = [ "revealSwitch", "heading", "figure", "figcaption" ]
  static values = { suspect: Number }

  toggle() {
    const isChecked = this.revealSwitchTarget.getAttribute("aria-checked") === "true";
    this.revealSwitchTarget.setAttribute('aria-checked', !isChecked);

    this.figureTargets.forEach((figure, index) => {
      if (figure.querySelector("figcaption") === null) {
        const isImpostor = index + 1 === this.suspectValue;
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
        figure.querySelector("figcaption").hidden = this.revealSwitchTarget.getAttribute("aria-checked") === "false";
      }
    });

    if (!isChecked) {
      this.headingTarget.focus();
    }
  }
})

const Direction = Object.freeze({
    NEXT: "NEXT",
    PREV: "PREVIOUS",
});

Stimulus.register("toolbar", class extends Controller {
  static targets = [ "control" ]
  static values = { index: Number }

  reorderFromIndex(array, startIndex, direction = Direction.NEXT) {
    let start = array.slice(startIndex);
    const end = array.slice(0, startIndex);
    if (direction === Direction.PREV) {
      start = start.toReversed();
    }
    return start.concat(end);
  };

  controlTargetConnected(target) {
    if (window.getComputedStyle(target).display === "none") {
      target.tabIndex = "-1";
      if (window.getComputedStyle(target.nextElementSibling).display !== "none") {
        target.nextElementSibling.tabIndex = "0";
        this.indexValue = this.controlTargets.indexOf(target.nextElementSibling);
      }
    }
  }

  next() {
    const allControls = this.controlTargets;
    let newIndex = (this.indexValue + 1) % allControls.length;
    const potentialNextControl = this.controlTargets[newIndex];
    if (window.getComputedStyle(potentialNextControl).display === "none") {
      const allNextControls = this.reorderFromIndex(this.controlTargets, newIndex);
      const nextControl = allNextControls.find((element) => window.getComputedStyle(element).display !== "none");
      newIndex = this.controlTargets.indexOf(nextControl);
    }
    this.indexValue = newIndex;
    this.focusControl();
  }

  prev() {
    const allControls = this.controlTargets;
    let newIndex = ((this.indexValue - 1) + allControls.length) % allControls.length;
    const potentialNextControl = this.controlTargets[newIndex];
    if (window.getComputedStyle(potentialNextControl).display === "none") {
      const allPreviousControls = this.reorderFromIndex(this.controlTargets, newIndex, Direction.PREV);
      const nextControl = allPreviousControls.find((element) => window.getComputedStyle(element).display !== "none")
      newIndex = this.controlTargets.indexOf(nextControl);
    }
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
