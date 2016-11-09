export class InterfaceCube {
     DetectPosSlider() {
        var Slider, j, lastTime, len, slider, vendor, vendors,
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
                this.$circle = this.$context.find(".circle");
                this.$innerCircle = this.$context.find(".inner-circle");
                this.$knob = this.$context.find(".knob");
                this.$progress = this.$context.find(".progress");
                this.ctx = this.$progress.get(0).getContext("2d");
                circleOffset = this.$circle.offset();
                this.elementPosition = {
                    x: circleOffset.left,
                    y: circleOffset.top
                };
                this.centerX = this.$progress.width() / 2;
                this.centerY = this.$progress.height() / 2;
                this.canvasSize = this.$progress.width();
                this.addEventListeners();
                this.updateSlider();
                return;
            }

            Slider.prototype.addEventListeners = function() {
                this.$context.on("mousedown", this.onMouseDown);
                this.$context.on("mousemove", this.onMouseMove);
                $("body").on("mouseup", this.onMouseUp);
            };

            Slider.prototype.updateSlider = function() {
                this.raf = requestAnimationFrame(this.updateSlider);
                this.setPosition();
                this.drawArc();
            };

            Slider.prototype.setPosition = function() {
                this.x = Math.round(this.radius * Math.sin(this.target * Math.PI / 180)) + this.radius - this.knobRadius + 4;
                this.y = Math.round(this.radius * -Math.cos(this.target * Math.PI / 180)) + this.radius - this.knobRadius + 4;
                this.$knob.css({
                    left: this.x,
                    top: this.y
                });
            };

            Slider.prototype.drawArc = function() {
                this.$progress.get(0).width = this.canvasSize;
                this.$progress.get(0).height = this.canvasSize;
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
                var atan, diff, target, val;
                this.mPos = {
                    x: event.pageX - this.elementPosition.x,
                    y: event.pageY - this.elementPosition.y
                };
                atan = Math.atan2(this.mPos.x - this.radius, this.mPos.y - this.radius);
                target = -atan / (Math.PI / 180) + 180;
                diff = Math.abs(target - this.target);
                if (diff < this.maxDiff && target < this.constraint) {
                    this.target = target;
                    val = {
                        type: "sliderchange",
                        value: this.target
                    };
                    this.$context.trigger(val);
                }
            };

            Slider.prototype.getBackground = function() {
                var dividerEvery, i, img, j, ref, steps;
                steps = 60;
                dividerEvery = 15;
                this.$progress.get(0).height = this.canvasSize;
                this.$progress.get(0).width = this.canvasSize;
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

        this.$slider = $(".radial-slider");

        this.$value = $(".value");

        slider = new Slider(this.$slider);

        // Note
        /*
        * Number stick = 241
        * Number little diamond = 482
        * Number of circle selector = 6
        */

        window.stick = 0;
        window.sticksColored = 0;

        this.$slider.on("sliderchange", (function(_this) {


            return function(event) {
                _this.$value.html(Math.round(event.value));
                let degree = Math.ceil(event.value);

                let pourcentageAngle = (degree / 360) * 100;
                let exactPosition = Math.ceil((241 * pourcentageAngle) / 100);
                let pourcentageAngleBefore = (window.stick / 360) * 100;
                let exactPositionBefore = Math.floor((241 * pourcentageAngleBefore) / 100);

                const allStick = document.querySelectorAll('#stick_circle g');

                if (exactPosition > exactPositionBefore ) {
                  for(let i = exactPositionBefore; i < exactPosition;i++) {
                    let y = i - 1;
                    allStick[i].classList.add('select');
                    console.log(exactPosition, 'j\'avance');
                  }
                }

                if (exactPositionBefore > exactPosition ) {
                  for(let i = window.sticksColored; i > exactPosition;i--) {
                    let y = i - 1;
                    allStick[i].classList.remove('select');
                    console.log(exactPositionBefore, 'je recule');
                  }
                }

                // Color Selector
                switch (true) {
                  case (degree < 45):
                    $('#Selector g:first-child').addClass('select');
                    $('#Selector g:nth-child(2)').removeClass('select');
                    break;
                  case (degree >= 45 && degree <= 135):
                    $('#Selector g:first-child').removeClass('select');
                    $('#Selector g:nth-child(2)').addClass('select');
                    $('#Selector g:nth-child(3)').removeClass('select');
                    break;
                  case (degree >= 135 && degree <= 180):
                    $('#Selector g:nth-child(2)').removeClass('select');
                    $('#Selector g:nth-child(3)').addClass('select');
                    $('#Selector g:nth-child(4)').removeClass('select');
                    break;
                  case (degree >= 180 && degree <= 225):
                    $('#Selector g:nth-child(3)').removeClass('select');
                    $('#Selector g:nth-child(4)').addClass('select');
                    $('#Selector g:nth-child(5)').removeClass('select');
                    break;
                  case (degree >= 225 && degree <= 315):
                    $('#Selector g:nth-child(4)').removeClass('select');
                    $('#Selector g:nth-child(5)').addClass('select');
                    $('#Selector g:nth-child(6)').removeClass('select');
                    break;
                  case (degree >= 315 && degree < 357):
                    $('#Selector g:nth-child(5)').removeClass('select');
                    $('#Selector g:nth-child(6)').addClass('select');
                    break;
                  case (degree > 358):
                    $('#Selector g:first-child').addClass('select');
                    $('#Selector g:nth-child(6)').removeClass('select');
                    break;
                }
                  window.sticksColored = document.querySelectorAll('#stick_circle g.select').length;
                  console.log(window.sticksColored);
                  window.stick = degree;
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
                var currTime, id, timeToCall;
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
