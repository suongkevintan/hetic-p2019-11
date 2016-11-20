export class CubeAnimation {
    constructor(method, args) {
        this.args = args
        //custom method call via parameters
        this[method]()

        this.end = false;
    }

    animatePositionChange() {
        this.state = this.args.beginPosition;

        //catch in variables to stop it later
        this.animation = window.requestAnimationFrame(this.animatePositionChange.bind(this));
        window.animation = this.animation;

        return this.renderPosition()
    }

    renderPosition(move) {

        if (this.end) {
            console.log("delete aniamtion");
            let animation = this.animation;
            window.cancelAnimationFrame(animation);
            return document.getElementsByClassName('cubeUi__face--name')[0].innerHTML = positionSelected.name

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
                                    console.log('r+');
                                    c[key][prop] += 0.1
                                    s[key][prop] += 0.1
                                } else if (key === 'position') {
                                    console.log('p+');
                                    c[key][prop] += 1;
                                    s[key][prop] += 1
                                }

                                this.end = false;
                            } else if (t[key][prop] < s[key][prop]) {
                                //  console.log(key + "|" + prop + "--");

                                if (key === 'rotation') {
                                    console.log('r-');
                                    c[key][prop] -= 0.1
                                    s[key][prop] -= 0.1
                                } else if (key === 'position') {
                                    console.log('p-');
                                    c[key][prop] -= 1;
                                    s[key][prop] -= 1
                                }

                                this.end = false;
                            }
                            if (key === 'rotation')
                                s[key][prop] = parseFloat(parseFloat(s[key][prop]).toFixed(1))
                        }
                    }
                }
            }

            console.log(s);
            if ((t.rotation.x === s.rotation.x && t.rotation.y === s.rotation.y && t.rotation.z === s.rotation.z)
            // && (t.position.x === s.position.x && t.position.y === s.position.y && t.position.z === s.position.z)
            ) {
                this.end = true

                console.log(s);
                console.log(t);
            } else {
                // still rendering position
            }
        }

    }
}
