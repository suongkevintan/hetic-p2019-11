import {Cube} from './models/class.cube.js'
import {InterfaceCube} from './models/class.interface_cube.js'

export class Fidget {
    constructor() {
        this.cube = new Cube()

        this.interface = new InterfaceCube();
        this.interface.DetectPosSlider();
        this.renderThemes();
    }

    renderThemes() {

        const domNode = this.cube.themes.map((theme, index) => {
            let domString = '';
            let colorObj = (JSON.parse(JSON.stringify(theme.colorSet.mainColor)));
            Object.keys(colorObj).forEach(function(rgb) {
                colorObj[rgb] = colorObj[rgb] * 255;
            });

            const color = `rgb( ${colorObj.r}, ${colorObj.g}, ${colorObj.b}  )`;
            domString += (`<li>
                                <a href="#" class="cubeUi__themes--item" data-index="${index}">
                                    <div class="round" style="background:${color}"></div>
                                      <span>${theme.name}</span>
                                </a>
                          </li>`)

            return domString;
        })

        $.el('.cubeUi__themes--list').innerHTML += domNode.join('');
        [].forEach.call($.class ('cubeUi__themes--item'), (themeBtn) => {
            themeBtn.addEventListener('click', (e) => {
                e.preventDefault()
                const index = themeBtn.getAttribute('data-index');
                let cube = this.cube;
                cube.setTheme(cube.group, cube.themes[index]);
            })
        })

    }

}
