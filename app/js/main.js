// ===================================//
// ! take json data and display them  //
// ==================================//

Loader.loadData('data/data.json', function(data) {
  data = JSON.parse(data);
  const s1 = data.story1;
  console.log(s1.title);

  function launch() {

    const story1 = MyApp.templates.story1(s1);

    document.querySelector('#story1').innerHTML = (story1);
  }

  launch();
});
