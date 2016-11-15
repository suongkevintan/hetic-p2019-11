// ===================================//
// ! take json data and display them  //
// ==================================//

import {loadData} from './loader-data.js'

let data = new loadData('data/data.json', () => {
    data = data.responseText;
    data = JSON.parse(data);
    const story = MyApp.templates.story(data);
    document.querySelector('#story').innerHTML = (story);
    launch();
});


function launch() {

    var menu__button = document.querySelector('.menu__button');
    menu__button.addEventListener('click', () => {
        menu__button.querySelector('.menu__button-lineFirst').classList.toggle('active')
        menu__button.querySelector('.menu__button-lineSecond').classList.toggle('active')
        document.querySelector('.revealMenu').classList.toggle('active')
        document.querySelector('.overlayScreen').classList.toggle('active')
        console.log("prout");

    })

    var links = document.querySelectorAll('.revealMenu__list--link');
    [].forEach.call(links, (elem) => {
        elem.addEventListener('mouseenter', function(e) {
            var sourcePicture = elem.getAttribute('data-src');
            document.querySelector(".revealMenu__imageContainer--picture").setAttribute("src", sourcePicture);
        });
    });

    // ('mousewheel', (e) => {
    //     document.querySelector("#container_story").scrollLeft -= (e.deltaX * 20);
    //     document.querySelector("#container_story").scrollRight -= (e.deltaX * 20);
    //     document.querySelector("#container_story").scrollTop = 0;
    // });
    // using on
    document.querySelector("#container_story").addEventListener('mousewheel', function(event){
    let orgEvent = event || window.event
    let args = [].slice.call( arguments, 1 )
    let delta = 0
    let returnValue = true
    let deltaX = 0
    let deltaY = 0;
    event = (orgEvent);
    //event.type  = "mousewheel";

    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;

    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }

    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

    // Add event and delta to the front of the arguments
    console.log(orgEvent)
    args.unshift(event, delta, deltaX, deltaY);
    event.preventDefault();

         document.querySelector("#container_story").scrollLeft -= (delta * 30);

        console.log(event.deltaX, event.deltaY, event.deltaFactor);

    });
    document.querySelector("#container_story").addEventListener('DOMMouseScroll', function(event){
    let orgEvent = event || window.event
    let args = [].slice.call( arguments, 1 )
    let delta = 0
    let returnValue = true
    let deltaX = 0
    let deltaY = 0;
    event = (orgEvent);
    //event.type  = "mousewheel";

    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;

    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }

    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

    // Add event and delta to the front of the arguments
    console.log(orgEvent)
    args.unshift(event, delta, deltaX, deltaY);
    event.preventDefault();

         document.querySelector("#container_story").scrollLeft -= (delta * 30);

        console.log(event.deltaX, event.deltaY, event.deltaFactor);

    });

}

// launch();
