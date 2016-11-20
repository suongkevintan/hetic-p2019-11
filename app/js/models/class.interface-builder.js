import {loadData} from '../modules/handlebars-loader.js'
import {InterfaceCube} from './class.interface_cube.js'

export class interfaceBuilder {
    constructor(isMobile) {
        isMobile = Detector.isMobile;
        if (isMobile === null) {
            this.loadSlider();
        }

    }

    loadSlider() {
        let data = new loadData('data/slider.json', () => {
            data = JSON.parse(data.responseText);
            // throw data in the file home/story/contact in the folder templates
            const slider = MyApp.templates.slider(data);

            //DESKTOP SLIDER
            this.container = document.createElement('div');
            this.container.className = "cubeUI";
            this.container.innerHTML = slider;
            document.body.appendChild(this.container);
            //BIND DOM
            Fidget.interface = new InterfaceCube();

        });

    }

}
