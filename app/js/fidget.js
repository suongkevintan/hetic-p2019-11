import {Cube} from './models/class.cube.js'
import {InterfaceCube} from './models/class.interface_cube.js'

export class Fidget {
    constructor() {
        this.cube = new Cube()
        this.interface = new InterfaceCube();
        this.interface.DetectPosSlider();
    }
}
