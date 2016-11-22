import {DomManipulator} from './class.dommanipulator.js';
// replace some Jquery function with vanilla Javascript
let $ = new DomManipulator();

/*
jQuery mousewheel handler re-written in vanilla js
https://css-tricks.com/examples/HorzScrolling/jquery.mousewheel.js
*/

export class scrollHorizontal {
    constructor(event, domNode) {
        event.preventDefault();

        let orgEvent = event || window.event
        let delta = 0
        let returnValue = true
        let deltaX = 0
        let deltaY = 0;

        event = orgEvent;

        // Old school scrollwheel delta
        if (orgEvent.wheelDelta) {
            delta = orgEvent.wheelDelta / 120;
        }
        if (orgEvent.detail) {
            delta = -orgEvent.detail / 3;
        }

        // New school multidimensional scroll (touchpads) deltas
        deltaY = delta;

        // Gecko
        if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = -1 * delta;
        }

        // Webkit
        if (orgEvent.wheelDeltaY !== undefined) {
            deltaY = orgEvent.wheelDeltaY / 120;
        }
        if (orgEvent.wheelDeltaX !== undefined) {
            deltaX = -1 * orgEvent.wheelDeltaX / 120;
        }

        domNode.scrollLeft -= (delta * 10);

        // Percentage scroll to change sliders
        let scrollPercent = 100 * $.el('#container_story').scrollLeft / (document.documentElement.clientWidth - $.el('.story').clientWidth);
        scrollPercent = Math.round(-scrollPercent);

        const slider1 = $.el('.slider1');
        const slider2 = $.el('.slider2');
        const slider3 = $.el('.slider3');
        const slider4 = $.el('.slider4');

        switch (true) {
            case scrollPercent >= 0 && scrollPercent < 35:
                slider1.classList.add('fadeIn');
                slider2.classList.add('fadeOut');
                window.setTimeout(function() {
                    slider1.classList.remove('hide_slider');
                    slider2.classList.add('hide_slider');
                    window.setTimeout(function() {
                        slider1.classList.remove('fadeOut');
                    }, 100);
                }, 400);
                break;
            case scrollPercent > 35 && scrollPercent < 73:
                slider1.classList.add('fadeOut');
                slider2.classList.add('fadeIn');
                window.setTimeout(function() {
                    slider1.classList.add('hide_slider');
                    slider2.classList.remove('hide_slider');
                    window.setTimeout(function() {
                        slider2.classList.remove('fadeOut');
                    }, 100);
                }, 400);
                slider3.classList.add('hide_slider');
                break;
            case scrollPercent > 73 && scrollPercent < 105:
                slider3.classList.add('fadeIn');
                slider2.classList.add('fadeOut');
                window.setTimeout(function() {
                    slider3.classList.remove('hide_slider');
                    slider2.classList.add('hide_slider');
                    window.setTimeout(function() {
                        slider3.classList.remove('fadeOut');
                    }, 100);
                }, 400);
                slider4.classList.add('hide_slider');
                break;
            case scrollPercent > 105:
                slider3.classList.add('fadeOut');
                slider4.classList.add('fadeIn');
                window.setTimeout(function() {
                    slider3.classList.add('hide_slider');
                    slider4.classList.remove('hide_slider');
                    window.setTimeout(function() {
                        slider4.classList.remove('fadeOut');
                    }, 100);
                }, 400);
                break;
        }
    }
}
