// ===================================//
// ! take json data and display them  //
// ==================================//

import {loadData} from './loader-data.js'
import {scrollHorizontal} from './models/class.scroll-horizontal.js'
import {DomManipulator} from './models/class.dommanipulator.js'

// import {Fidget} from './fidget.js'
//
// window.$ = new DomManipulator();
// window.Fidget = new Fidget();

let $ = new DomManipulator();

let data = new loadData('data/data.json', () => {
    data = data.responseText;
    data = JSON.parse(data);
    const story = MyApp.templates.story(data);
    $.el('#story').innerHTML = (story);
    launchStoryMode();
});

function launchStoryMode() {


    //menu animtion
    let menu__button = $.el('.menu__button');
    menu__button.addEventListener('click', () => {
        menu__button.querySelector('.menu__button-lineFirst').classList.toggle('active')
        menu__button.querySelector('.menu__button-lineSecond').classList.toggle('active')
        $.el('.revealMenu').classList.toggle('active')
        $.el('.overlayScreen').classList.toggle('active')
    })

    //menu item hover
    let links = $.all('.revealMenu__list--link');
    [].forEach.call(links, (elem) => {
        elem.addEventListener('mouseenter', function(e) {
            let sourcePicture = elem.getAttribute('data-src');
            $.el(".revealMenu__imageContainer--picture").setAttribute("src", sourcePicture);
        });
    });

    //hack vertical scroll to horizontal scroll

    let containerInvertScroll = $.el("#container_story");
    //Webkit
    containerInvertScroll.addEventListener('mousewheel', () => new scrollHorizontal(window.event, containerInvertScroll))
    //Gecko
    containerInvertScroll.addEventListener('DOMMouseScroll', () => new scrollHorizontal(window.event, containerInvertScroll))

}
