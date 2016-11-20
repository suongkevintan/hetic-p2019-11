export class CubeAnimation {
    constructor(method, args) {
        this.args = args
        this.calls = 0;
        this.id = String.fromCharCode(Math.floor(Math.random() * 11)) + Math.floor(Math.random() * 1000000)
        //custom method call via parameters
        if (!cubeAnimationState)
            window.cubeAnimationState = this;
        else
            return console.debug('cannot overide animation')

        this[method]()
        console.info(this.id + ' init animation');
        this.end = false;
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
                            if (t[key][prop] === s[key][prop]) {
                                //console.log(key + "|" + prop + " is done");
                            } else if (t[key][prop] > s[key][prop]) {
                                //console.log(key + "|" + prop + "++");
                                if (key === 'rotation') {

                                    c[key][prop] += 0.1
                                    s[key][prop] += 0.1
                                } else if (key === 'position') {
                                    c[key][prop] += 1;
                                    s[key][prop] += 1
                                }

                                this.end = false;
                            } else if (t[key][prop] < s[key][prop]) {
                                //  console.log(key + "|" + prop + "--");

                                if (key === 'rotation') {

                                    c[key][prop] -= 0.1
                                    s[key][prop] -= 0.1
                                } else if (key === 'position') {
                                    c[key][prop] -= 1;
                                    s[key][prop] -= 1
                                }

                                this.end = false;
                            }
                            if(key === 'rotation')
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
