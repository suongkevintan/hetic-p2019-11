import {
    loadData
} from '../modules/handlebars-loader.js'
import {
    InterfaceCube
} from './class.interface_cube.js'

export class interfaceBuilder {

    constructor(isMobile) {
        let moreInfoBtn = $.el('.cubeUi__infos--text');
        let moreInfo = $.el('.cubeUi__moreInfo');
        moreInfoBtn.addEventListener('click', () => {
            moreInfo.classList.toggle('active')
            moreInfo.classList.toggle('hide')
        })

        $.el('.cubeUi__moreInfo--close').addEventListener('click', () => {
            moreInfo.classList.toggle('active')
            moreInfo.classList.toggle('hide')
        })

        isMobile = Detector.isMobile;
        if (isMobile === null)
            this.loadSlider();
        else
            this.loadSliderMobile();

    }

    loadSlider() {
        let data = new loadData('dist/data/slider.json', () => {

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
    loadSliderMobile() {
        // let data = new loadData(null, () => {
        //

        loader.changeState("building cube interface mobile");


        //DESKTOP SLIDER
        this.container = document.createElement('div');
        this.container.className = "cubeUI--mobile";
        document.body.className = "mobile";
        document.body.appendChild(this.container);
        loader.changeState("builded cube interface mobile");

        //     //BIND DOM
        //     Fidget.interface = new InterfaceCube();
        // });


    }

}
