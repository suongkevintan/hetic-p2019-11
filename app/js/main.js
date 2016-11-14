// ===================================//
// ! take json data and display them  //
// ==================================//

Loader.loadData('data/data.json', function(data) {
    data = JSON.parse(data);
    const s = data;

    function launch() {

        const story = MyApp.templates.story(s);

        document.querySelector('#story').innerHTML = (story);

        document.querySelector("#container_story").addEventListener('mousewheel', (e) => {

            document.querySelector("#container_story").scrollLeft -= (e.deltaX * 20);
            document.querySelector("#container_story").scrollRight -= (e.deltaX * 20);
            document.querySelector("#container_story").scrollTop = 0;
        });


    }

    launch();
});
