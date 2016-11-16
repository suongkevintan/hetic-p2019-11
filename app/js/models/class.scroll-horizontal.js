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

        domNode.scrollLeft -= (delta * 30);

        // Percentage scroll to change sliders
        let scrollPercent = 100 * document.querySelector('#container_story').scrollLeft / (document.documentElement.clientWidth - document.querySelector('.story').clientWidth);
        scrollPercent = Math.round(-scrollPercent);

        const slider1 = document.querySelector('.slider1');
        const slider2 = document.querySelector('.slider2');
        const slider3 = document.querySelector('.slider3');
        const slider4 = document.querySelector('.slider4');

        switch (true) {
            case scrollPercent >= 0 && scrollPercent < 32:
                slider1.classList.remove('hide_slider');
                slider2.classList.add('hide_slider');
                break;
            case scrollPercent > 32 && scrollPercent < 64:
                slider1.classList.add('hide_slider');
                slider2.classList.remove('hide_slider');
                slider3.classList.add('hide_slider');
                break;
            case scrollPercent > 64 && scrollPercent < 95:
                slider2.classList.add('hide_slider');
                slider3.classList.remove('hide_slider');
                slider4.classList.add('hide_slider');
                break;
            case scrollPercent > 95:
                slider3.classList.add('hide_slider');
                slider4.classList.remove('hide_slider');
                break;
        }
    }
}
