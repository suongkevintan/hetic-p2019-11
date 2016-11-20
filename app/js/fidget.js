import {Cube} from './models/class.cube.js'
import {interfaceBuilder} from './models/class.interface-builder.js'

export class Fidget {
    constructor() {
        this.cube = new Cube()
        this.interfaceBuilder = new interfaceBuilder(window.Detector.isMobile)
        this.renderThemes(window.Detector.isMobile);
    }

    renderThemes(isMobile) {
        isMobile = Detector.isMobile;
        if (isMobile)
            return false;
        const showLabel = (window.Detector.isMobile)
            ? "showLabel"
            : ""
        const domNode = this.cube.themes.map((theme, index) => {
            let domString = '';
            let colorObj = (JSON.parse(JSON.stringify(theme.colorSet.mainColor)));
            Object.keys(colorObj).forEach(function(rgb) {
                colorObj[rgb] = colorObj[rgb] * 255;
            });
            const color = `rgb( ${colorObj.r}, ${colorObj.g}, ${colorObj.b}  )`;
            domString += (`<li>
                                <a href="#" class="cubeUi__themes--item " data-index="${index}">
                                    <div class="round" style="background:${color}"></div><span class="${showLabel}">${theme.name}</span>
                                </a>
                          </li>`)

            return domString;
        })

        $.el('.cubeUi__themes--list').innerHTML += domNode.join('');
        const items = $.class ('cubeUi__themes--item');

        [].forEach.call(items, (themeBtn) => {
            themeBtn.addEventListener('click', (e) => {
                //ui change
                e.preventDefault()
                let active = document.querySelector('.cubeUi__themes--item.active')
                if (active)
                    active.classList.remove('active')
                themeBtn.classList.add('active')

                //call cube method
                const index = themeBtn.getAttribute('data-index');
                const cube = this.cube;
                cube.setTheme(cube.group, cube.themes[index]);
            })
        })

    }

}
