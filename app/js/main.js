import {loadData} from './loader-data.js'
import {scrollHorizontal} from './models/class.scroll-horizontal.js'
import {AnimationInterface} from './models/class.animation.js'
import {appLoader} from './models/class.loader.js'
import {Particule} from './models/class.particule.js'
import {Redirect} from './models/class.redirect.js'
import {DomManipulator} from './models/class.dommanipulator.js'
import {Fidget} from './fidget.js'


const $ = new DomManipulator();
window.$ = $;

// replace some Jquery function with vanilla Javascript
let loader = new appLoader();
window.loader = loader;
// All animation site
let animation = new AnimationInterface();

if ($.el('.index-detect')) {
  loader.changeState("detect home")



    let particule = new Particule();
    // All animation site
    // ===================================//
    // ! take json data and display them  //
    // ==================================//
    loader.changeState = 'load data json'
    let data = new loadData('dist/data/data.json', () => {
      loader.changeState("rendering cool pages")

        // Load data from data.json
        data = data.responseText;
        // Parse data
        data = JSON.parse(data);
        // throw data in the file home/story/contact in the folder templates
        const home = MyApp.templates.home(data);
        const story = MyApp.templates.story(data);
        const contact = MyApp.templates.contact(data);
        // Insert information in DOM
        $.el('#container_page--home').innerHTML = (home);
        $.el('#container_page--story').innerHTML = (story);
        $.el('#container_page--contact').innerHTML = (contact);

        loader.changeState("rendering cool pages")


    } );

    document.addEventListener('DOMNodeInserted', () => {

        // detect if its desktop or tablet to enable scroll only on desktop
        if (document.body.clientWidth > 1024) {
            switch (true) {
                case $.el('#container_story') == null:
                    // if #container_story is not yet loaded
                    break;
                case $.el('#container_story') != null:
                    //hack vertical scroll to horizontal scroll
                    let containerInvertScroll = $.el("#container_story");
                    //Webkit
                    containerInvertScroll.addEventListener('mousewheel', () => new scrollHorizontal(window.event, containerInvertScroll));
                    //Gecko
                    containerInvertScroll.addEventListener('DOMMouseScroll', (event) => new scrollHorizontal(event, containerInvertScroll));
                    break;
            }
        }

    });

    if (window.location.hash.length > 1)
        new Redirect(window.location.hash);

         loader.__proto__.changeState('template home inserted')
         loader.__proto__.changeState('end')

} else {
    loader.changeState("detect cube");
    window.Fidget = new Fidget();
}

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
MsgConsole();
