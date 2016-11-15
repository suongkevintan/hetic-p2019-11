import {DomManipulator} from './models/class.dommanipulator.js'
import {Fidget} from './fidget.js'

window.$ = new DomManipulator();
window.Fidget = new Fidget();


function MsgConsole() {
    if (!window.console) {
        return;
    }
    var i = 0;
    if (!i) {
        setTimeout(function() {
            console.log("%cWelcome to fidget Cube Experience", "font: 2em sans-serif; color: red; ");
            console.log("%cHello, and welcome to the console. The fidget cube was made in Cinema4D and all interaction was made with Threejs [https://github.com/mrdoob/three.js/]", "font: 1.5 sans-serif; color: black;");
            console.log("%cEnjoy the experience and  if you like it you can go check the code on our Github [https://github.com/FrostOne/hetic-p2019-11].", "font: 1.25 sans-serif; color: black;");
            console.log("%c[If you want to show message like that go check https://github.com/stml/welcomejs]", "font: 1 sans-serif; color: grey;");
        }, 1);
        i = 1;
    }
}
//MsgConsole();
