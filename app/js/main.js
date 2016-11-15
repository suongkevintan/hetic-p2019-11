// ===================================//
// ! take json data and display them  //
// ==================================//

Loader.loadData('data/data.json', function(data) {
    data = JSON.parse(data);
    const s = data;

    function launch() {

        const story = MyApp.templates.story(s);

        document.querySelector('#story').innerHTML = (story);

        var menu__button = document.querySelector('.menu__button');
menu__button.addEventListener('click',() =>{
  menu__button.querySelector('.menu__button-lineFirst').classList.toggle('active')
  menu__button.querySelector('.menu__button-lineSecond').classList.toggle('active')
  document.querySelector('.revealMenu').classList.toggle('active')
  document.querySelector('.overlayScreen').classList.toggle('active')
  console.log("prout");

})

var links = document.querySelectorAll('.revealMenu__list--link');
[].forEach.call(links, (elem)=>{
  elem.addEventListener('mouseenter', function(e) {
    var sourcePicture = elem.getAttribute('data-src');
    document.querySelector(".revealMenu__imageContainer--picture").setAttribute("src",sourcePicture);
  });
});

    }

    launch();
});
