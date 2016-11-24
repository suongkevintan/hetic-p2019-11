import {DomManipulator} from './class.dommanipulator.js';
// replace some Jquery function with vanilla Javascript
let $ = new DomManipulator();
export class AnimationInterface {
    constructor() {
        //menu animation
        let menu__button = $.el('.menu__button');
        menu__button.addEventListener('click', () => {
            // document.body.classList.toggle('block_scroll');
            menu__button.querySelector('.menu__button-lineFirst').classList.toggle('active')
            menu__button.querySelector('.menu__button-lineSecond').classList.toggle('active')
            $.el('.revealMenu').classList.toggle('active')
        });

        //menu item hover
        let links = $.all('.revealMenu__list--link');
        [].forEach.call(links, (elem) => {
            elem.addEventListener('mouseenter', function(e) {
                let sourcePicture = elem.getAttribute('data-src');
                $.el(".revealMenu__imageContainer--picture").setAttribute("src", sourcePicture);
            });
        });

        // menu show page
        const home = $.el('.home');
        const story = $.el('.story_page');
        const credit = $.el('.credit');
        const cube = $.el('.cube');

        home.addEventListener('click', () => {
            $.el('.revealMenu').classList.toggle('active')
            menu__button.querySelector('.menu__button-lineFirst').classList.toggle('active')
            menu__button.querySelector('.menu__button-lineSecond').classList.toggle('active')
            $.el('#container_page--home').classList.remove('hide_home');
            $.el('#container_page--story').classList.add('hide_story');
            $.el('#container_page--contact').classList.add('hide_contact');
        });
        
        cube.addEventListener('click', () => {
            $.el('.revealMenu').classList.toggle('active')
            menu__button.querySelector('.menu__button-lineFirst').classList.toggle('active')
            menu__button.querySelector('.menu__button-lineSecond').classList.toggle('active')
        });

        story.addEventListener('click', () => {
            $.el('.revealMenu').classList.toggle('active')
            menu__button.querySelector('.menu__button-lineFirst').classList.toggle('active')
            menu__button.querySelector('.menu__button-lineSecond').classList.toggle('active')
            $.el('#container_page--story').classList.remove('hide_story');
            $.el('#container_page--home').classList.add('hide_home');
            $.el('#container_page--contact').classList.add('hide_contact');
        });

        credit.addEventListener('click', () => {
            $.el('.revealMenu').classList.toggle('active')
            menu__button.querySelector('.menu__button-lineFirst').classList.toggle('active')
            menu__button.querySelector('.menu__button-lineSecond').classList.toggle('active')
            $.el('#container_page--contact').classList.remove('hide_contact');
            $.el('#container_page--home').classList.add('hide_home');
            $.el('#container_page--story').classList.add('hide_story');
        });

    }
}
