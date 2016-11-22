export class Redirect {
    constructor($hash)
    {
        $hash = $hash.replace("#", '')
        $.el('.revealMenu').classList.toggle('active')
        menu__button.querySelector('.menu__button-lineFirst').classList.toggle('active')
        menu__button.querySelector('.menu__button-lineSecond').classList.toggle('active')
        
        switch ($hash) {
            case "story":
                document.querySelector('#container_page--home').classList.add('hide_home');
                document.querySelector('#container_page--story').classList.remove('hide_story');
                document.querySelector('#container_page--contact').classList.add('hide_contact');
                break;
            case "credit":
                document.querySelector('#container_page--home').classList.add('hide_home');
                document.querySelector('#container_page--story').classList.add('hide_story');
                document.querySelector('#container_page--contact').classList.remove('hide_contact');
                break;
        }
    }
}
