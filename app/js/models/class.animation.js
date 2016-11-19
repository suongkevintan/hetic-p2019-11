import {DomManipulator} from './class.dommanipulator.js';
// replace some Jquery function with vanilla Javascript
let $ = new DomManipulator();

export class AnimationInterface {
  constructor() {
    //menu animation
    let menu__button = $.el('.menu__button');
    menu__button.addEventListener('click', () => {
        menu__button.querySelector('.menu__button-lineFirst').classList.toggle('active')
        menu__button.querySelector('.menu__button-lineSecond').classList.toggle('active')
        $.el('.revealMenu').classList.toggle('active')
        $.el('.overlayScreen').classList.toggle('active')
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
    const story = $.el('.story');
    const credit = $.el('.credit');

    home.addEventListener('click', () => {
      $.el('#home').classList.remove('hide_home');
      $.el('#story').classList.add('hide_story');
      $.el('#contact').classList.add('hide_contact');
    });

    story.addEventListener('click', () => {
      $.el('#story').classList.remove('hide_story');
      $.el('#home').classList.add('hide_home');
      $.el('#contact').classList.add('hide_contact');
    });

    credit.addEventListener('click', () => {
      $.el('#contact').classList.remove('hide_contact');
      $.el('#home').classList.add('hide_home');
      $.el('#story').classList.add('hide_story');
    });

  }
}
