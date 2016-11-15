// ===================================//
// ! take json data and display them  //
// ==================================//

Loader.loadData('data/data.json', function(data) {
    data = JSON.parse(data);
    const s = data;

    function launch() {

        const story = MyApp.templates.story(s);

        document.querySelector('#story').innerHTML = (story);

    }

    launch();
});
