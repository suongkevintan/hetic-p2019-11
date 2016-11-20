import {loadData} from './loader-data.js'
import {scrollHorizontal} from './models/class.scroll-horizontal.js'
import {AnimationInterface} from './models/class.animation.js'
import {Particule} from './models/class.particule.js'
import {DomManipulator} from './models/class.dommanipulator.js'

// import {Fidget} from './fidget.js'
//
// window.$ = new DomManipulator();
// window.Fidget = new Fidget();

// replace some Jquery function with vanilla Javascript
let $ = new DomManipulator();
// Particule js
let particule = new Particule();
// All animation site
let animation = new AnimationInterface();

// ===================================//
// ! take json data and display them  //
// ==================================//

let data = new loadData('data/data.json', () => {
    // Load data from data.json
    data = data.responseText;
    // Parse data
    data = JSON.parse(data);
    // throw data in the file home/story/contact in the folder templates
    const home    = MyApp.templates.home(data);
    const story   = MyApp.templates.story(data);
    const contact = MyApp.templates.contact(data);
    // Insert information in DOM
    $.el('#container_page--home').innerHTML = (home);
    $.el('#container_page--story').innerHTML = (story);
    $.el('#container_page--contact').innerHTML = (contact);
});

document.addEventListener('DOMNodeInserted', function() {
  switch (true) {
    case $.el('#container_story') == null:
      // if #container_story is not yet loaded
      break;
  case $.el('#container_story') != null:
      //hack vertical scroll to horizontal scroll
      let containerInvertScroll = $.el("#container_story");
      //Webkit
      containerInvertScroll.addEventListener('mousewheel', () => new scrollHorizontal(window.event, containerInvertScroll))
      //Gecko
      containerInvertScroll.addEventListener('DOMMouseScroll', (event) => new scrollHorizontal(event, containerInvertScroll))
      // containerInvertScroll.addEventListener('wheel', () => new scrollHorizontal(window.event, containerInvertScroll))
      break;
  }
});
