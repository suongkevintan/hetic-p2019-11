import {loadData} from '../modules/handlebars-loader.js'

export class interfaceBuilder {
    constructor() {}

    loadSlider() {
        let data = new loadData('data/slider.json', () => {
            // Load data from data.json
            data = data.responseText;
            // Parse data
            data = JSON.parse(data);
            // throw data in the file home/story/contact in the folder templates
            const home = MyApp.templates.test(data);

            console.log(data);

        });

    }

}
