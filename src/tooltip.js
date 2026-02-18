import { Application, Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";
import { computePosition, arrow, flip, offset } from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.7.4/+esm';

window.Stimulus = Application.start()

Stimulus.register("tooltip", class extends Controller {
  static targets = [ "button", "tooltip", "arrow" ]

  position() {
    computePosition(this.buttonTarget, this.tooltipTarget, {
      placement: 'top',
      middleware: [offset(4), flip(), arrow({element: this.arrowTarget})],
    }).then(({x, y, placement, middlewareData}) => {
      Object.assign(this.tooltipTarget.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
      const {x: arrowX, y: arrowY} = middlewareData.arrow;

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placement.split('-')[0]];
 
      Object.assign(this.arrowTarget.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide]: '-4px',
      });
    });
  }

  show() {
    this.tooltipTarget.style.display = 'block';
    this.position();
  }
 
  hide() {
    this.tooltipTarget.style.display = '';
  }
})
