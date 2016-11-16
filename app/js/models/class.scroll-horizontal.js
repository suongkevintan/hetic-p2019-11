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
    }
}
