export class InterfaceCube {
    constructor() {
        this.DetectPosSlider();
    }

    DetectPosSlider() {
        var Slider,
            j,
            lastTime,
            len,
            slider,
            vendor,
            vendors,
            bind = function(fn, me) {
                return function() {
                    return fn.apply(me, arguments);
                };
            };

        Slider = (function() {
            Slider.prototype.raf = null;

            Slider.prototype.mdown = false;

            Slider.prototype.mPos = {
                x: 0,
                y: 0
            };

            Slider.prototype.elementPosition = {
                x: 0,
                y: 0
            };

            Slider.prototype.radius = 146;

            Slider.prototype.knobRadius = 15;

            Slider.prototype.maxDiff = 150;

            Slider.prototype.constraint = 360;

            Slider.prototype.target = 0;

            Slider.prototype.centerX = 0;

            Slider.prototype.centerY = 0;

            Slider.prototype.$circle = null;

            Slider.prototype.$knob = null;

            Slider.prototype.$progress = null;

            Slider.prototype.x = 0;

            Slider.prototype.y = 0;

            function Slider($context) {
                var circleOffset;
                this.$context = $context;
                this.onMouseMove = bind(this.onMouseMove, this);
                this.onMouseUp = bind(this.onMouseUp, this);
                this.onMouseDown = bind(this.onMouseDown, this);
                this.updateSlider = bind(this.updateSlider, this);
                this.$circle = this.$context.querySelector(".circle");
                this.$innerCircle = this.$context.querySelector(".inner-circle");
                this.$knob = this.$context.querySelector(".knob");
                this.$progress = this.$context.querySelector(".progress");
                this.ctx = this.$progress.getContext("2d");

                circleOffset = this.$circle.getBoundingClientRect();
                this.elementPosition = {
                    x: circleOffset.left,
                    y: circleOffset.top
                };
                window.getComputedStyle(this.$progress)

                this.centerX = window.getComputedStyle(this.$progress).width / 2;
                this.centerY = window.getComputedStyle(this.$progress).height / 2;
                this.canvasSize = this.centerX * 2;
                this.addEventListeners();
                this.updateSlider();
                return;
            }

            Slider.prototype.addEventListeners = function() {
                this.$context.addEventListener("mousedown", this.onMouseDown);
                this.$context.addEventListener("mousemove", this.onMouseMove);
                document.body.addEventListener("mouseup", this.onMouseUp);
            };

            Slider.prototype.updateSlider = function() {
                this.raf = requestAnimationFrame(this.updateSlider);
                this.setPosition();
                this.drawArc();
            };

            Slider.prototype.setPosition = function() {
                this.x = Math.round(this.radius * Math.sin(this.target * Math.PI / 180)) + this.radius - this.knobRadius + 0;
                this.y = Math.round(this.radius * -Math.cos(this.target * Math.PI / 180)) + this.radius - this.knobRadius + 0;

                this.$knob.style.left = this.x;
                this.$knob.style.top = this.y;
            };

            Slider.prototype.drawArc = function() {
                this.$progress.width = this.canvasSize;
                this.$progress.height = this.canvasSize;
                this.ctx.save();
                this.ctx.translate(this.centerX, this.centerY - this.radius);
                this.ctx.rotate(-90 * Math.PI / 180);
                this.ctx.strokeStyle = "rgba(0,0,0,0)";
                this.ctx.beginPath();
                this.ctx.lineWidth = 8;
                this.ctx.arc(0 - this.radius - 1, 0, this.radius - 1, 0, this.target * Math.PI / 180, false);
                this.ctx.stroke();
                this.ctx.restore();
            };

            Slider.prototype.setMousePosition = function(event) {
                let atan,
                    diff,
                    target,
                    val;
                this.mPos = {
                    x: event.pageX - this.elementPosition.x,
                    y: event.pageY - this.elementPosition.y
                };
                atan = Math.atan2(this.mPos.x - this.radius, this.mPos.y - this.radius);
                target = -atan / (Math.PI / 180) + 180;
                diff = Math.abs(target - this.target);
                if (diff < this.maxDiff && target < this.constraint) {
                    this.target = target;
                    // val = {
                    //     type: "sliderchange",
                    //     value: this.target
                    // };
                    // this.$context.trigger(val);
                    if (window.CustomEvent) {
                        var getPercentage = new CustomEvent('sliderchange', {
                            detail: {
                                value: this.target
                            }
                        });
                    } else {
                        var getPercentage = document.createEvent('CustomEvent');
                        getPercentage.initCustomEvent('sliderchange', true, true, {value: this.target});
                    }

                    this.$context.dispatchEvent(getPercentage);
                }
            };

            Slider.prototype.getBackground = function() {
                let dividerEvery,
                    i,
                    img,
                    j,
                    ref,
                    steps;
                steps = 60;
                dividerEvery = 15;
                this.$progress.height = this.canvasSize;
                this.$progress.width = this.canvasSize;
                this.ctx.save();
                this.ctx.translate(this.centerX, this.centerY);
                for (i = j = 0, ref = steps; j <= ref; i = j += 1) {
                    this.ctx.beginPath();
                    this.ctx.rotate(Math.PI * 2 / steps);
                    if (i % dividerEvery === dividerEvery - 1) {
                        this.ctx.lineWidth = 2;
                        this.ctx.moveTo(160, 0);
                        this.ctx.lineTo(136, 0);
                        this.ctx.strokeStyle = "#04465C";
                    } else {
                        this.ctx.lineWidth = 1;
                        this.ctx.lineTo(155, 0);
                        this.ctx.lineTo(135, 0);
                        this.ctx.strokeStyle = "#02394A";
                    }
                    this.ctx.stroke();
                }
                this.ctx.restore();
                img = this.$progress.get(0).toDataURL();
                this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
                return img;
            };

            Slider.prototype.onMouseDown = function(event) {
                this.mdown = true;
            };

            Slider.prototype.onMouseUp = function(event) {
                this.mdown = false;
            };

            Slider.prototype.onMouseMove = function(event) {
                if (this.mdown) {
                    this.setMousePosition(event);
                }
            };

            return Slider;

        })();

        this.$slider = document.querySelector(".radial-slider");

        this.$value = document.querySelector(".value");

        slider = new Slider(this.$slider);

        // Note
        /*
        * Number little diamond = 482
        * Number of circle selector = 6
        */

        let stick = 0;
        const allStick = $.all('#stick_circle g');
         let ballsState = $.id("Selector");
        this.$slider.addEventListener("sliderchange", (function(_this) {

            return function(event) {
                _this.$value.innerHTML = Math.round(event.detail.value);
                let degree = Math.ceil(event.detail.value);

                let pourcentageAngle = (degree / 360) * 100;
                let exactPosition = Math.ceil((allStick.length * pourcentageAngle) / 100);
                let pourcentageAngleBefore = (stick / 360) * 100;
                let exactPositionBefore = Math.floor((allStick.length * pourcentageAngleBefore) / 100);

                let before = document.querySelector('.before')
                let after = document.querySelector('.after')
                let select = document.querySelector('.select')

                if (before)
                    before.className.baseVal = "";
                if (after)
                    after.className.baseVal = "";
                if (select)
                    select.className.baseVal = "";

                if (exactPosition > exactPositionBefore) {
                    allStick[exactPosition - 1].classList.add('select');

                    let youngerBrother = exactPosition - 2;
                    let olderBrother = exactPosition;
                    if (allStick[youngerBrother]) {
                        allStick[youngerBrother].classList.add('before');
                    }
                    if (allStick[olderBrother]) {
                        allStick[olderBrother].classList.add('after');
                    }
                }

                // Color Selector
                switch (true) {
                    case(degree <= 45):
                        ballsState.querySelector('g:first-child').classList.add('select');
                        ballsState.querySelector('g:nth-child(2)').classList.remove('select');
                        Cube.setPosition(Cube.group, Cube.positions[0]);
                        break;
                    case(degree > 45 && degree <= 135):
                        ballsState.querySelector('g:first-child').classList.remove('select');
                        ballsState.querySelector('g:nth-child(2)').classList.add('select');
                        ballsState.querySelector('g:nth-child(3)').classList.remove('select');
                        Cube.setPosition(Cube.group, Cube.positions[1]);
                        break;
                    case(degree > 135 && degree <= 180):
                        ballsState.querySelector('g:nth-child(2)').classList.remove('select');
                        ballsState.querySelector('g:nth-child(3)').classList.add('select');
                        ballsState.querySelector('g:nth-child(4)').classList.remove('select');
                        Cube.setPosition(Cube.group, Cube.positions[2]);
                        break;
                    case(degree > 180 && degree <= 225):
                        ballsState.querySelector('g:nth-child(3)').classList.remove('select');
                        ballsState.querySelector('g:nth-child(4)').classList.add('select');
                        ballsState.querySelector('g:nth-child(5)').classList.remove('select');
                        Cube.setPosition(Cube.group, Cube.positions[3]);
                        break;
                    case(degree > 225 && degree <= 315):
                        ballsState.querySelector('g:nth-child(4)').classList.remove('select');
                        ballsState.querySelector('g:nth-child(5)').classList.add('select');
                        ballsState.querySelector('g:nth-child(6)').classList.remove('select');
                        Cube.setPosition(Cube.group, Cube.positions[4]);
                        break;
                    case(degree > 315 && degree < 357):
                        document.querySelector('#Selector g:nth-child(5)').classList.remove('select');
                        document.querySelector('#Selector g:nth-child(6)').classList.add('select');
                        Cube.setPosition(Cube.group, Cube.positions[5]);
                        break;
                    case(degree > 358):
                        ballsState.querySelector('g:first-child').classList.add('select');
                        ballsState.querySelector('g:nth-child(6)').classList.remove('select');
                        Cube.setPosition(Cube.group, Cube.positions[6]);
                        break;
                }
                stick = degree;

            };
        })(this));

        lastTime = 0;

        vendors = ['ms', 'moz', 'webkit', 'o'];

        this.cancelAnimationFrame || (this.cancelAnimationFrame = this.cancelRequestAnimationFrame);

        if (!this.requestAnimationFrame) {
            for (j = 0, len = vendors.length; j < len; j++) {
                vendor = vendors[j];
                this.requestAnimationFrame || (this.requestAnimationFrame = this[vendor + 'RequestAnimationFrame']);
                this.cancelAnimationFrame = this.cancelRequestAnimationFrame || (this.cancelRequestAnimationFrame = this[vendor + 'CancelRequestAnimationFrame']);
            }
        }

        if (!this.requestAnimationFrame) {

            this.requestAnimationFrame = function(callback, element) {
                var currTime,
                    id,
                    timeToCall;
                currTime = new Date().getTime();
                timeToCall = Math.max(0, 16 - (currTime - lastTime));
                id = this.setTimeout((function() {
                    return callback(currTime + timeToCall);
                }), timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!this.cancelAnimationFrame) {
            this.cancelAnimationFrame = this.cancelRequestAnimationFrame = function(id) {
                return clearTimeout(id);
            };
        }

    }

}
