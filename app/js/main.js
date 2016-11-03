import {DomManipulator} from './models/class.dommanipulator.js'
import {Cube} from './models/class.cube.js'

window.$ = new DomManipulator();

Detector.isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
window.cube = new Cube()
