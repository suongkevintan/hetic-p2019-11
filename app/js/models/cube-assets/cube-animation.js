export class CubeAnimation {
    constructor(method, args) {
        this.args = args

        if (method === "animatePositionChange") {
            this.id = String.fromCharCode(Math.floor(Math.random() * 11)) + Math.floor(Math.random() * 1000000)
            //custom method call via parameters
            if (!cubeAnimationState && method === "animatePositionChange")
                window.cubeAnimationState = this;
            else
                return console.debug('cannot overide animation')

        }

        if (this.args.type === "interaction") {
            this.args.mesh[method] = this;
            this.args.mesh.isAnimating = true;
            return this[method]
        }
        this.calls = 0;

        this[method]()
        console.info(this.id + ' init animation');
        this.end = false;
    }

    animateSwitcher() {
        let mesh = this;
        // ===================//
        // Switch Interruptor //
        // ==================//
        navigator.vibrate([30, 50, 125]);

        mesh.rotation.x += Math.PI;
        mesh.rotation.z += Math.PI;

        mesh.position.x = (mesh.position.x === 10)
            ? 0
            : 10;
    }

    animateSpin() {
        let mesh = this;
        let animation = mesh.animation
        this.mesh = mesh;

        // ====================//
        // Press button bubble //
        // ===================//
        this.animationFrame = window.requestAnimationFrame(() => this.animation());

        return mesh.animateSpin.renderSpin(mesh.rotation.z)
    }

    renderSpin(angle) {
        let target = this.args.mesh.rotation
        let target2 = this.args.mesh2.rotation
        const newAngle = angle + (Math.PI / 48);
        if (newAngle <= Math.PI * 2) {
            target.z = newAngle;
            target2.z = newAngle;
        } else {
            target.z = 0;
            target2.z = 0;
            this.args.mesh.stop = false;
            this.args.mesh.isAnimating = false;

            let animation = this.args.mesh.animationFrame;
            animation = window.cancelAnimationFrame(animation);
        }

    }

    animateButtonsPush() {
        let mesh = this;
        let animation = mesh.animation
        this.mesh = mesh;

        // ====================//
        // Press button bubble //
        // ===================//
        this.animationFrame = window.requestAnimationFrame(() => this.animation());

        return mesh.animateButtonsPush.renderButtonsPush(mesh.position.y)
    }

    renderButtonsPush(pos) {
        let target = this.args.mesh.position
        const newPos = pos + 0.2;
        if (newPos <= 5.2 && this.args.mesh.stop !== true) {
            target.y = newPos;
        } else if (parseInt(target.y) === 5 && this.args.mesh.stop !== true) {
            this.args.mesh.stop = true;
        } else if (this.args.mesh.stop && target.y >= 0.3) {
            target.y -= 0.4;
        } else {
            target.y = 0;
            this.args.mesh.stop = false;
            this.args.mesh.isAnimating = false;

            let animation = this.args.mesh.animationFrame;
            animation = window.cancelAnimationFrame(animation);
        }

    }
    animatePositionChange() {
        //    this.state = this.args.beginPosition;
        this.state = {
            name: this.args.beginPosition.name,
            rotation: {
                x: Cube.group.rotation.x,
                y: Cube.group.rotation.y,
                z: Cube.group.rotation.z
            }
        }
        //catch in variables to stop it later
        this.animation = window.requestAnimationFrame(this.animatePositionChange.bind(this));

        window.animation = this.animation;
        return this.renderPosition()
    }

    renderPosition(move) {

        if (this.end) {
            console.debug(this.id + " delete aniamtion", this.calls);
            let animation = this.animation;
            window.cancelAnimationFrame(animation);
            document.getElementsByClassName('cubeUi__face--name')[0].innerHTML = this.args.positionSelected.name;
            return window.cubeAnimationState = false;
        } else {

            //    let b = this.args.beginPosition;
            let c = Cube.group;
            const t = this.args.positionSelected;
            let s = this.state

            // console.debug("begin ", b)
            // console.debug("target ", t)

            for (let key in t) {
                if (t.hasOwnProperty(key)) {
                    for (let prop in t[key]) {

                        if (t[key].hasOwnProperty(prop)) {
                            if (t[key][prop] === s[key][prop]) {} else if (t[key][prop] > s[key][prop]) {
                                if (key === 'rotation') {

                                    c[key][prop] += 0.1
                                    s[key][prop] += 0.1
                                }
                                this.end = false;
                            } else if (t[key][prop] < s[key][prop]) {

                                if (key === 'rotation') {

                                    c[key][prop] -= 0.1
                                    s[key][prop] -= 0.1
                                }
                                this.end = false;
                            }
                            if (key === 'rotation')
                                s[key][prop] = parseFloat(parseFloat(s[key][prop]).toFixed(1))
                        }
                    }
                }
            }

            //console.log(s);
            if ((t.rotation.x === s.rotation.x && t.rotation.y === s.rotation.y && t.rotation.z === s.rotation.z)) {
                this.end = true

            } else {
                // still rendering position
                this.calls++;
                if (this.calls > 14) {
                    if (s.rotation.x === 3 && s.rotation.y === 0.1)
                        console.infos("stop animation to fix");
                    this.end = true;
                }
            }
        }

    }
}
