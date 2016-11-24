'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Fidget = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classCube = require('./models/class.cube.js');

var _classInterfaceBuilder = require('./models/class.interface-builder.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fidget = exports.Fidget = function () {
    function Fidget() {
        _classCallCheck(this, Fidget);

        //webGL time ! bring me the cube
        this.cube = new _classCube.Cube();
        //build me a dope interface depending on user device
        this.interfaceBuilder = new _classInterfaceBuilder.interfaceBuilder(window.Detector.isMobile);
        //render themes if desktop
        this.renderThemes(window.Detector.isMobile);
    }

    _createClass(Fidget, [{
        key: 'renderThemes',
        value: function renderThemes(isMobile) {
            var _this = this;

            //render themes if desktop
            isMobile = Detector.isMobile;
            if (isMobile) return false;

            //class opacity utilitary
            var showLabel = window.Detector.isMobile ? "showLabel" : "";

            //dom i will return
            var domNode = this.cube.themes.map(function (theme, index) {

                //dom for one theme
                var domString = '';

                //convert three.js color to css format
                var colorObj = JSON.parse(JSON.stringify(theme.colorSet.mainColor));
                Object.keys(colorObj).forEach(function (rgb) {
                    colorObj[rgb] = colorObj[rgb] * 255;
                });
                var color = 'rgb( ' + colorObj.r + ', ' + colorObj.g + ', ' + colorObj.b + '  )';

                //go
                domString += '<li>\n                                <a href="#" class="cubeUi__themes--item " data-index="' + index + '">\n                                    <div class="round" style="background:' + color + '"></div><span class="' + showLabel + '">' + theme.name + '</span>\n                                </a>\n                          </li>';

                return domString;
            });

            $.el('.cubeUi__themes--list').innerHTML += domNode.join('');
            var items = $.class('cubeUi__themes--item');

            [].forEach.call(items, function (themeBtn) {
                themeBtn.addEventListener('click', function (e) {
                    //ui change
                    e.preventDefault();
                    var active = document.querySelector('.cubeUi__themes--item.active');
                    if (active) active.classList.remove('active');
                    themeBtn.classList.add('active');

                    //call cube method
                    var index = themeBtn.getAttribute('data-index');
                    var cube = _this.cube;
                    cube.setTheme(cube.group, cube.themes[index]);
                });
            });
        }
    }]);

    return Fidget;
}();
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//ajax for handlebars
var loadData = exports.loadData = function loadData(json, cb) {
    _classCallCheck(this, loadData);

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', json, true);
    xobj.onreadystatechange = function () {

        if (xobj.readyState == 4 && xobj.status == "200") {
            if (cb) cb(xobj.responseText);
        }
    };
    xobj.send(null);
    return xobj;
};
'use strict';

var _loaderData = require('./loader-data.js');

var _classScrollHorizontal = require('./models/class.scroll-horizontal.js');

var _classAnimation = require('./models/class.animation.js');

var _classLoader = require('./models/class.loader.js');

var _classParticule = require('./models/class.particule.js');

var _classRedirect = require('./models/class.redirect.js');

var _classDommanipulator = require('./models/class.dommanipulator.js');

var _fidget = require('./fidget.js');

// replace some Jquery function with vanilla Javascript
var $ = new _classDommanipulator.DomManipulator();
window.$ = $;

//loader manager
var loader = new _classLoader.appLoader();
window.loader = loader;

// dom event handler for menu
var animation = new _classAnimation.AnimationInterface();

//if index launch handlebars to create a one page
if ($.el('.index-detect')) {
    (function () {
        loader.changeState("detect home");

        //yay
        var particule = new _classParticule.Particule();

        // ===================================//
        // ! take json data and display them  //
        // ==================================//
        loader.changeState = 'load data json';
        var data = new _loaderData.loadData('dist/data/data.json', function () {

            // Load data from data.json
            data = data.responseText;
            // Parse data
            data = JSON.parse(data);

            // throw data in the file home/story/contact in the folder templates
            var home = MyApp.templates.home(data);
            var story = MyApp.templates.story(data);
            var contact = MyApp.templates.contact(data);

            // Insert information in DOM
            $.el('#container_page--home').innerHTML = home;
            $.el('#container_page--story').innerHTML = story;
            $.el('#container_page--contact').innerHTML = contact;
        }, function () {
            loader.__proto___.changeState("rendering cool pages");
        });

        //when dom from handlebars is inserted bind scroll on story pages
        document.addEventListener('DOMNodeInserted', function () {

            // detect if its desktop or tablet to enable scroll only on desktop
            if (document.body.clientWidth > 1024) {
                (function () {
                    switch (true) {
                        case $.el('#container_story') == null:
                            // if #container_story is not yet loaded
                            break;
                        case $.el('#container_story') != null:
                            //hack vertical scroll to horizontal scroll
                            var containerInvertScroll = $.el("#container_story");
                            //Webkit
                            containerInvertScroll.addEventListener('mousewheel', function () {
                                return new _classScrollHorizontal.scrollHorizontal(window.event, containerInvertScroll);
                            });
                            //Gecko
                            containerInvertScroll.addEventListener('DOMMouseScroll', function (event) {
                                return new _classScrollHorizontal.scrollHorizontal(event, containerInvertScroll);
                            });
                            break;
                    }
                })();
            }
        });
        //if i was on story or credit, dont bring to home when i reload
        if (window.location.hash.length > 1) new _classRedirect.Redirect(window.location.hash);
        //end loading of page
        loader.__proto__.changeState('end');
    })();
}
//i'm on the cube page
else {
        loader.changeState("detect cube");
        window.Fidget = new _fidget.Fidget();
    }

//you came to the wrong neighborhood
function MsgConsole() {
    if (!window.console) {
        return;
    }
    var i = 0;
    if (!i) {
        setTimeout(function () {
            console.log("%cWelcome to fidget Cube Experience", "font: 2em sans-serif; color: red; ");
            console.log("%cHello, and welcome to the console. The fidget cube was made in Cinema4D and all interaction was made with Threejs [https://github.com/mrdoob/three.js/]", "font: 1.5 sans-serif; color: black;");
            console.log("%cEnjoy the experience and  if you like it you can go check the code on our Github [https://github.com/FrostOne/hetic-p2019-11].", "font: 1.25 sans-serif; color: black;");
            console.log("%c[If you want to show message like that go check https://github.com/stml/welcomejs]", "font: 1 sans-serif; color: grey;");
        }, 1);
        i = 1;
    }
}
MsgConsole();
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnimationInterface = undefined;

var _classDommanipulator = require('./class.dommanipulator.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// replace some Jquery function with vanilla Javascript
var $ = new _classDommanipulator.DomManipulator();

var AnimationInterface = exports.AnimationInterface = function AnimationInterface() {
    _classCallCheck(this, AnimationInterface);

    //menu animation
    var menu__button = $.el('.menu__button');
    menu__button.addEventListener('click', function () {
        // document.body.classList.toggle('block_scroll');
        menu__button.querySelector('.menu__button-lineFirst').classList.toggle('active');
        menu__button.querySelector('.menu__button-lineSecond').classList.toggle('active');
        $.el('.revealMenu').classList.toggle('active');
    });

    //menu item hover
    var links = $.all('.revealMenu__list--link');
    [].forEach.call(links, function (elem) {
        elem.addEventListener('mouseenter', function (e) {
            var sourcePicture = elem.getAttribute('data-src');
            $.el(".revealMenu__imageContainer--picture").setAttribute("src", sourcePicture);
        });
    });

    // menu show page
    var home = $.el('.home');
    var story = $.el('.story_page');
    var credit = $.el('.credit');
    var cube = $.el('.cube');

    home.addEventListener('click', function () {
        $.el('.revealMenu').classList.toggle('active');
        menu__button.querySelector('.menu__button-lineFirst').classList.toggle('active');
        menu__button.querySelector('.menu__button-lineSecond').classList.toggle('active');
        $.el('#container_page--home').classList.remove('hide_home');
        $.el('#container_page--story').classList.add('hide_story');
        $.el('#container_page--contact').classList.add('hide_contact');
    });

    cube.addEventListener('click', function () {
        $.el('.revealMenu').classList.toggle('active');
        menu__button.querySelector('.menu__button-lineFirst').classList.toggle('active');
        menu__button.querySelector('.menu__button-lineSecond').classList.toggle('active');
    });

    story.addEventListener('click', function () {
        $.el('.revealMenu').classList.toggle('active');
        menu__button.querySelector('.menu__button-lineFirst').classList.toggle('active');
        menu__button.querySelector('.menu__button-lineSecond').classList.toggle('active');
        $.el('#container_page--story').classList.remove('hide_story');
        $.el('#container_page--home').classList.add('hide_home');
        $.el('#container_page--contact').classList.add('hide_contact');
    });

    credit.addEventListener('click', function () {
        $.el('.revealMenu').classList.toggle('active');
        menu__button.querySelector('.menu__button-lineFirst').classList.toggle('active');
        menu__button.querySelector('.menu__button-lineSecond').classList.toggle('active');
        $.el('#container_page--contact').classList.remove('hide_contact');
        $.el('#container_page--home').classList.add('hide_home');
        $.el('#container_page--story').classList.add('hide_story');
    });
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Cube = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cubeThemes = require('./cube-assets/cube-themes.js');

var _cubePositions = require('./cube-assets/cube-positions.js');

var _cubeAnimation = require('./cube-assets/cube-animation.js');

var _cubeInteraction = require('./cube-assets/cube-interaction.js');

var _detector = require('../modules/detector.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cube = exports.Cube = function () {
    _createClass(Cube, [{
        key: 'setTheme',
        value: function setTheme(cubeBase, themeSelected, force) {
            var _this = this;

            // dont render if no changes
            if (this.activeTheme === themeSelected && force !== true) return;

            cubeBase.children.forEach(function (texture, index) {
                switch (texture.name) {
                    case "roll_sphere":
                        //sphere + reflections
                        var cubeCamera = new window.THREEx.CubeCamera(texture);
                        _this.scene.add(cubeCamera.object3d);
                        texture.material.envMap = cubeCamera.textureCube;
                        cubeCamera.update(_this.renderer, _this.scene);
                        break;
                    case "glide1 extru_glide extru_glide1":
                        texture.material.color = themeSelected.colorSet.lightColor;
                        break;
                    case "extru_cube Cube1":
                    case "extru_cube Neutre breathe":

                        texture.material.color = themeSelected.colorSet.cube;
                        break;
                    //need a glow

                    //SWICTHER
                    case "pivot_breathe Pivot flip":
                    //SPIN
                    case "spin spin2":
                    case "spin spin3":
                    //JOYSTCK
                    case "glide1 base_glade":
                    case "glide1 extru_glide glide":
                    //ENGRENAGES
                    case "roll roll1":
                    case "roll rollmiddle":
                    case "roll roll3":
                    //SMALL BUTTONS
                    case "click cylindre1":
                    case "click cyllindre2":
                    case "click cylindre3":
                    case "click cylindre4":
                    case "click cylindre_middle":
                        texture.material.color = themeSelected.colorSet.mainColor;
                        break;

                    default:
                        texture.material.color = themeSelected.colorSet.cube;

                }
            });
            document.querySelector('.menu__buttonBuy.unselectable').setAttribute('href', "https://www.antsylabs.com/products/fidget-cube?variant=" + themeSelected.buy_code);
            //update cube theme
            this.activeTheme = themeSelected;
        }
    }, {
        key: 'setPosition',
        value: function setPosition(cubeBase, positionSelected, force) {
            // dont render if no changes
            if (this.activePosition === positionSelected && !force) return;

            var beginPosition = this.activePosition;
            var animation = new _cubeAnimation.CubeAnimation("animatePositionChange", {
                beginPosition: beginPosition,
                positionSelected: positionSelected
            });

            //update cube position
            this.activePosition = positionSelected;
        }
    }, {
        key: 'loadModel',
        value: function loadModel() {
            var _this2 = this;

            // =======================================================================//
            // .obj loader from threejs with his native method (onProgress, onerror)  //
            // =======================================================================//

            var manager = new THREE.LoadingManager();
            var loaderDisplay = document.querySelector('.value');
            // on progress
            var onProgress = function onProgress(xhr) {
                if (xhr.lengthComputable) {
                    var percentComplete = xhr.loaded / xhr.total * 100;
                    //console.log(Math.round(percentComplete, 2) + '% downloaded');
                    //loaderDisplay.innerHTML = Math.round(percentComplete, 2) + "%"
                }
            };
            var onLoad = function onLoad(xhr) {};
            // on error callback
            var onError = function onError(xhr) {};

            //final constructor
            var loaderCube = new THREE.OBJLoader(manager);

            // =======================================================================//
            // dom events for component ofs the cube,  components are model.children  //
            // =======================================================================//
            var model = loaderCube.load('dist/models3D/model.obj', function (model) {

                _this2.scene.add(model);

                //debug
                window.model = model;
                loader.changeState("end");

                //enable library for easy event listener
                var domEvents = new THREEx.DomEvents(_this2.camera, _this2.renderer.domElement);

                //bind our components
                model.children.forEach(function (mesh, index) {
                    switch (mesh.name) {
                        case "pivot_breathe Pivot flip":
                            mesh.animation = new _cubeAnimation.CubeAnimation("animateSwitcher", {
                                mesh: mesh,
                                type: "interaction"
                            });
                            break;
                        case "click cylindre1":
                        case "click cyllindre2":
                        case "click cylindre3":
                        case "click cylindre4":
                        case "click cylindre_middle":
                            mesh.animation = new _cubeAnimation.CubeAnimation("animateButtonsPush", {
                                mesh: mesh,
                                type: "interaction"
                            });
                            break;
                        case "spin spin2":
                        case "spin spin3":
                            mesh.animation = new _cubeAnimation.CubeAnimation("animateSpin", {
                                mesh: mesh,
                                mesh2: mesh.name === "spin spin3" ? model.children.filter(function (m) {
                                    return m.name === "spin spin2";
                                })[0] : model.children.filter(function (m) {
                                    return m.name === "spin spin3";
                                })[0],
                                type: "interaction"
                            });
                            break;
                    }

                    //  domEvents.addEventListener(mesh, 'touchstart', new CubeInteraction(event), false);
                    domEvents.addEventListener(mesh, 'touchstart', function (event) {
                        switch (event.target.name) {
                            case "click cylindre1":
                            case "click cyllindre2":
                            case "click cylindre3":
                            case "click cylindre4":
                            case "click cylindre_middle":
                                navigator.vibrate([10, 30, 90]);
                                break;
                        }
                        if (mesh.animation) mesh.animation();

                        //  console.info(event.target.name, event.target.id, mesh);
                        console.info(event.target);
                    }, false);
                });
                if (window.Detector.isMobile) model.position.y = 0;

                //send new model to the Cube Class
                _this2.group = model;
                _this2.setTheme(model, _this2.activeTheme, true);
                _this2.setPosition(model, _this2.activePosition, false);
            }, onLoad, onProgress, onError);
        }
    }]);

    function Cube() {
        var _this3 = this;

        _classCallCheck(this, Cube);

        window.Detector = new _detector.Detector();
        this.enableVibration = window.Detector.vibrate;

        //themes config
        window.Cube = this;
        this.themes = new _cubeThemes.CubeThemes();
        this.activeTheme = this.themes[0];

        //positions config
        this.positions = new _cubePositions.CubePositions();
        this.activePosition = this.positions[0];
        window.cubeAnimationState = false;

        //three.js set up
        this.renderScene();
        this.setLights();
        this.setCamera();

        //sandbox for three.js
        if (window.Detector.isMobile) {
            var controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        }

        // =======================================================================//
        // Let's get stared  (ha!)                                                //
        // =======================================================================//
        this.animate();
        loader.changeState("loading the cube");
        this.loadModel();
        //dom events handlers
        window.addEventListener('resize', function () {
            return _this3.onWindowResize();
        }, false);
    }

    _createClass(Cube, [{
        key: 'onWindowResize',
        value: function onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }, {
        key: 'animate',
        value: function animate() {
            window.requestAnimationFrame(this.animate.bind(this));
            this.render();
        }
    }, {
        key: 'render',
        value: function render() {
            //we need to work on theses ones
            // const color = new THREE.Color(0xffffff);
            this.renderer.render(this.scene, this.camera);
            if (this.group) {
                //let parent = this.group.children.filter((m) => m.name === "spin spin2")[0].rotation.z += 0.1;
                //let child = this.group.children.filter((m) => m.name === "spin spin3")[0].rotation.z += 0.1;
                //this.group.rotation.x += 0.06
            }
        }
    }, {
        key: 'setLights',
        value: function setLights() {
            // =======================================================================//
            // Lights and this.camera                                                 //
            // =======================================================================//

            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
            directionalLight.position.set(0, 0, 1);
            this.scene.add(directionalLight);
            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
            directionalLight.position.set(-1, 0, -1);
            this.scene.add(directionalLight);
            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
            directionalLight.position.set(1, 1, 0);
            this.scene.add(directionalLight);
            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
            directionalLight.position.set(-1, -1, 0);
            this.scene.add(directionalLight);

            //const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
            //this.scene.add(light);
        }
    }, {
        key: 'setCamera',
        value: function setCamera() {
            var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
            this.camera = camera;
            this.camera.position.z = 750;
            this.camera.position.x = 0;
            this.camera.position.y = 0;
            this.camera = camera;
        }
    }, {
        key: 'renderScene',
        value: function renderScene() {
            // this container will be injected to the dom with our canvas
            this.container = document.createElement('div');
            document.body.appendChild(this.container);

            // ======================//
            // Init Three.js Canvas //
            // =====================//
            var scene = new THREE.Scene();
            this.scene = scene;

            var renderer = window.Detector.webgl ? new THREE.WebGLRenderer({
                //antialias : better shape
                antialias: false,
                //transparent background
                alpha: true
            }) : new THREE.CanvasRenderer();

            this.renderer = renderer;
            //set size
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.domElement.id = "three";

            //ITS ALIIIIIIIIIVE
            this.container.appendChild(this.renderer.domElement);
        }
    }]);

    return Cube;
}();
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** ======================================================================= *
 * @desc jQuery $ alternative in native js                                 *
 * @param node selector | :string                                          *
 * @return HTMLnodeElement                                                 *
 * ======================================================================= *
 **/

var DomManipulator = function () {
    function DomManipulator() {
        _classCallCheck(this, DomManipulator);
    }

    _createClass(DomManipulator, [{
        key: "id",
        value: function id(_id) {
            return document.getElementById(_id);
        }
    }, {
        key: "el",
        value: function el(_el) {
            return document.querySelector(_el);
        }
    }, {
        key: "class",
        value: function _class(elClass) {
            return document.getElementsByClassName(elClass);
        }
    }, {
        key: "tag",
        value: function tag(_tag) {
            return document.getElementsByTagName(_tag);
        }
    }, {
        key: "all",
        value: function all(els) {
            return document.querySelectorAll(els);
        }
    }]);

    return DomManipulator;
}();

exports.DomManipulator = DomManipulator;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.interfaceBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handlebarsLoader = require('../modules/handlebars-loader.js');

var _classInterface_cube = require('./class.interface_cube.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var interfaceBuilder = exports.interfaceBuilder = function () {
    function interfaceBuilder(isMobile) {
        _classCallCheck(this, interfaceBuilder);

        var moreInfoBtn = $.el('.cubeUi__infos--text');
        var moreInfo = $.el('.cubeUi__moreInfo');
        moreInfoBtn.addEventListener('click', function () {
            moreInfo.classList.toggle('active');
            // moreInfo.classList.toggle('hide')
            moreInfo.classList.toggle('animation_hide');
        });

        $.el('.cubeUi__moreInfo--close').addEventListener('click', function () {
            moreInfo.classList.toggle('active');
            // moreInfo.classList.toggle('hide')
            moreInfo.classList.toggle('animation_hide');
        });

        isMobile = Detector.isMobile;
        if (isMobile === null) this.loadSlider();else this.loadSliderMobile();
    }

    _createClass(interfaceBuilder, [{
        key: 'loadSlider',
        value: function loadSlider() {
            var _this = this;

            var data = new _handlebarsLoader.loadData('dist/data/slider.json', function () {

                data = JSON.parse(data.responseText);
                // throw data in the file home/story/contact in the folder templates
                var slider = MyApp.templates.slider(data);

                //DESKTOP SLIDER
                _this.container = document.createElement('div');
                _this.container.className = "cubeUI";
                _this.container.innerHTML = slider;
                document.body.appendChild(_this.container);
                //BIND DOM
                Fidget.interface = new _classInterface_cube.InterfaceCube();
            });
        }
    }, {
        key: 'loadSliderMobile',
        value: function loadSliderMobile() {
            // let data = new loadData(null, () => {
            //

            loader.changeState("building cube interface mobile");

            //DESKTOP SLIDER
            this.container = document.createElement('div');
            this.container.className = "cubeUI--mobile";
            document.body.className = "mobile";
            document.body.appendChild(this.container);
            loader.changeState("loading the cube");

            //     //BIND DOM
            //     Fidget.interface = new InterfaceCube();
            // });

        }
    }]);

    return interfaceBuilder;
}();
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InterfaceCube = exports.InterfaceCube = function () {
    function InterfaceCube() {
        _classCallCheck(this, InterfaceCube);

        this.DetectPosSlider();
        loader.changeState("builded cube interface desktop");
    }

    _createClass(InterfaceCube, [{
        key: "DetectPosSlider",
        value: function DetectPosSlider() {
            var Slider,
                j,
                lastTime,
                len,
                slider,
                vendor,
                vendors,
                bind = function bind(fn, me) {
                return function () {
                    return fn.apply(me, arguments);
                };
            };

            Slider = function () {
                Slider.prototype.raf = null;

                Slider.prototype.mdown = false;

                Slider.prototype.mPos = {
                    x: 0,
                    y: 0
                };

                Slider.prototype.elementPosition = {
                    x: 0,
                    y: 0
                };

                Slider.prototype.radius = 146;

                Slider.prototype.knobRadius = 15;

                Slider.prototype.maxDiff = 150;

                Slider.prototype.constraint = 360;

                Slider.prototype.target = 0;

                Slider.prototype.centerX = 0;

                Slider.prototype.centerY = 0;

                Slider.prototype.$circle = null;

                Slider.prototype.$knob = null;

                Slider.prototype.$progress = null;

                Slider.prototype.x = 0;

                Slider.prototype.y = 0;

                function Slider($context) {
                    var circleOffset;
                    this.$context = $context;
                    this.onMouseMove = bind(this.onMouseMove, this);
                    this.onMouseUp = bind(this.onMouseUp, this);
                    this.onMouseDown = bind(this.onMouseDown, this);
                    this.updateSlider = bind(this.updateSlider, this);
                    this.$circle = this.$context.querySelector(".circle");
                    this.$innerCircle = this.$context.querySelector(".inner-circle");
                    this.$knob = this.$context.querySelector(".knob");
                    this.$progress = this.$context.querySelector(".progress");
                    this.ctx = this.$progress.getContext("2d");

                    circleOffset = this.$circle.getBoundingClientRect();
                    this.elementPosition = {
                        x: circleOffset.left,
                        y: circleOffset.top
                    };
                    window.getComputedStyle(this.$progress);

                    this.centerX = window.getComputedStyle(this.$progress).width / 2;
                    this.centerY = window.getComputedStyle(this.$progress).height / 2;
                    this.canvasSize = this.centerX * 2;
                    this.addEventListeners();
                    this.updateSlider();
                    return;
                }

                Slider.prototype.addEventListeners = function () {
                    this.$context.addEventListener("mousedown", this.onMouseDown);
                    this.$context.addEventListener("mousemove", this.onMouseMove);
                    document.body.addEventListener("mouseup", this.onMouseUp);
                };

                Slider.prototype.updateSlider = function () {
                    this.raf = requestAnimationFrame(this.updateSlider);
                    this.setPosition();
                    this.drawArc();
                };

                Slider.prototype.setPosition = function () {
                    this.x = Math.round(this.radius * Math.sin(this.target * Math.PI / 180)) + this.radius - this.knobRadius + 0;
                    this.y = Math.round(this.radius * -Math.cos(this.target * Math.PI / 180)) + this.radius - this.knobRadius + 0;

                    this.$knob.style.left = this.x;
                    this.$knob.style.top = this.y;
                };

                Slider.prototype.drawArc = function () {
                    this.$progress.width = this.canvasSize;
                    this.$progress.height = this.canvasSize;
                    this.ctx.save();
                    this.ctx.translate(this.centerX, this.centerY - this.radius);
                    this.ctx.rotate(-90 * Math.PI / 180);
                    this.ctx.strokeStyle = "rgba(0,0,0,0)";
                    this.ctx.beginPath();
                    this.ctx.lineWidth = 8;
                    this.ctx.arc(0 - this.radius - 1, 0, this.radius - 1, 0, this.target * Math.PI / 180, false);
                    this.ctx.stroke();
                    this.ctx.restore();
                };

                Slider.prototype.setMousePosition = function (event) {
                    var atan = void 0,
                        diff = void 0,
                        target = void 0,
                        val = void 0;
                    this.mPos = {
                        x: event.pageX - this.elementPosition.x,
                        y: event.pageY - this.elementPosition.y
                    };
                    atan = Math.atan2(this.mPos.x - this.radius, this.mPos.y - this.radius);
                    target = -atan / (Math.PI / 180) + 180;
                    diff = Math.abs(target - this.target);
                    if (diff < this.maxDiff && target < this.constraint) {
                        this.target = target;
                        // val = {
                        //     type: "sliderchange",
                        //     value: this.target
                        // };
                        // this.$context.trigger(val);
                        if (window.CustomEvent) {
                            var getPercentage = new CustomEvent('sliderchange', {
                                detail: {
                                    value: this.target
                                }
                            });
                        } else {
                            var getPercentage = document.createEvent('CustomEvent');
                            getPercentage.initCustomEvent('sliderchange', true, true, { value: this.target });
                        }

                        this.$context.dispatchEvent(getPercentage);
                    }
                };

                Slider.prototype.getBackground = function () {
                    var dividerEvery = void 0,
                        i = void 0,
                        img = void 0,
                        j = void 0,
                        ref = void 0,
                        steps = void 0;
                    steps = 60;
                    dividerEvery = 15;
                    this.$progress.height = this.canvasSize;
                    this.$progress.width = this.canvasSize;
                    this.ctx.save();
                    this.ctx.translate(this.centerX, this.centerY);
                    for (i = j = 0, ref = steps; j <= ref; i = j += 1) {
                        this.ctx.beginPath();
                        this.ctx.rotate(Math.PI * 2 / steps);
                        if (i % dividerEvery === dividerEvery - 1) {
                            this.ctx.lineWidth = 2;
                            this.ctx.moveTo(160, 0);
                            this.ctx.lineTo(136, 0);
                            this.ctx.strokeStyle = "#04465C";
                        } else {
                            this.ctx.lineWidth = 1;
                            this.ctx.lineTo(155, 0);
                            this.ctx.lineTo(135, 0);
                            this.ctx.strokeStyle = "#02394A";
                        }
                        this.ctx.stroke();
                    }
                    this.ctx.restore();
                    img = this.$progress.get(0).toDataURL();
                    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
                    return img;
                };

                Slider.prototype.onMouseDown = function (event) {
                    this.mdown = true;
                };

                Slider.prototype.onMouseUp = function (event) {
                    this.mdown = false;
                };

                Slider.prototype.onMouseMove = function (event) {
                    if (this.mdown) {
                        this.setMousePosition(event);
                    }
                };

                return Slider;
            }();

            this.$slider = document.querySelector(".radial-slider");

            this.$value = document.querySelector(".value");

            slider = new Slider(this.$slider);

            // Note
            /*
            * Number little diamond = 482
            * Number of circle selector = 6
            */

            var stick = 0;
            var allStick = $.all('#stick_circle g');
            var ballsState = $.id("Selector");
            this.$slider.addEventListener("sliderchange", function (_this) {

                return function (event) {
                    _this.$value.innerHTML = Math.round(event.detail.value);
                    var degree = Math.ceil(event.detail.value);

                    var pourcentageAngle = degree / 360 * 100;
                    var exactPosition = Math.ceil(allStick.length * pourcentageAngle / 100);
                    var pourcentageAngleBefore = stick / 360 * 100;
                    var exactPositionBefore = Math.floor(allStick.length * pourcentageAngleBefore / 100);

                    var before = document.querySelector('.before');
                    var after = document.querySelector('.after');
                    var select = document.querySelector('.select');

                    if (before) before.className.baseVal = "";
                    if (after) after.className.baseVal = "";
                    if (select) select.className.baseVal = "";

                    if (exactPosition > exactPositionBefore) {
                        allStick[exactPosition - 1].classList.add('select');

                        var youngerBrother = exactPosition - 2;
                        var olderBrother = exactPosition;
                        if (allStick[youngerBrother]) {
                            allStick[youngerBrother].classList.add('before');
                        }
                        if (allStick[olderBrother]) {
                            allStick[olderBrother].classList.add('after');
                        }
                    }

                    // Color Selector
                    switch (true) {
                        case degree <= 45:
                            ballsState.querySelector('g:first-child').classList.add('select');
                            ballsState.querySelector('g:nth-child(2)').classList.remove('select');
                            Cube.setPosition(Cube.group, Cube.positions[0]);
                            break;
                        case degree > 45 && degree <= 135:
                            ballsState.querySelector('g:first-child').classList.remove('select');
                            ballsState.querySelector('g:nth-child(2)').classList.add('select');
                            ballsState.querySelector('g:nth-child(3)').classList.remove('select');
                            Cube.setPosition(Cube.group, Cube.positions[1]);
                            break;
                        case degree > 135 && degree <= 180:
                            ballsState.querySelector('g:nth-child(2)').classList.remove('select');
                            ballsState.querySelector('g:nth-child(3)').classList.add('select');
                            ballsState.querySelector('g:nth-child(4)').classList.remove('select');
                            Cube.setPosition(Cube.group, Cube.positions[2]);
                            break;
                        case degree > 180 && degree <= 225:
                            ballsState.querySelector('g:nth-child(3)').classList.remove('select');
                            ballsState.querySelector('g:nth-child(4)').classList.add('select');
                            ballsState.querySelector('g:nth-child(5)').classList.remove('select');
                            Cube.setPosition(Cube.group, Cube.positions[3]);
                            break;
                        case degree > 225 && degree <= 315:
                            ballsState.querySelector('g:nth-child(4)').classList.remove('select');
                            ballsState.querySelector('g:nth-child(5)').classList.add('select');
                            ballsState.querySelector('g:nth-child(6)').classList.remove('select');
                            Cube.setPosition(Cube.group, Cube.positions[4]);
                            break;
                        case degree > 315 && degree < 357:
                            document.querySelector('#Selector g:nth-child(5)').classList.remove('select');
                            document.querySelector('#Selector g:nth-child(6)').classList.add('select');
                            Cube.setPosition(Cube.group, Cube.positions[5]);
                            break;
                        case degree > 358:
                            ballsState.querySelector('g:first-child').classList.add('select');
                            ballsState.querySelector('g:nth-child(6)').classList.remove('select');
                            Cube.setPosition(Cube.group, Cube.positions[6]);
                            break;
                    }
                    stick = degree;
                };
            }(this));

            lastTime = 0;

            vendors = ['ms', 'moz', 'webkit', 'o'];

            this.cancelAnimationFrame || (this.cancelAnimationFrame = this.cancelRequestAnimationFrame);

            if (!this.requestAnimationFrame) {
                for (j = 0, len = vendors.length; j < len; j++) {
                    vendor = vendors[j];
                    this.requestAnimationFrame || (this.requestAnimationFrame = this[vendor + 'RequestAnimationFrame']);
                    this.cancelAnimationFrame = this.cancelRequestAnimationFrame || (this.cancelRequestAnimationFrame = this[vendor + 'CancelRequestAnimationFrame']);
                }
            }

            if (!this.requestAnimationFrame) {

                this.requestAnimationFrame = function (callback, element) {
                    var currTime, id, timeToCall;
                    currTime = new Date().getTime();
                    timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    id = this.setTimeout(function () {
                        return callback(currTime + timeToCall);
                    }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            }

            if (!this.cancelAnimationFrame) {
                this.cancelAnimationFrame = this.cancelRequestAnimationFrame = function (id) {
                    return clearTimeout(id);
                };
            }
        }
    }]);

    return InterfaceCube;
}();
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var appLoader = exports.appLoader = function () {
    function appLoader() {
        _classCallCheck(this, appLoader);

        window.loadState = "initJs";
        this.loadState = window.loadState;
        this.container = document.querySelector('.loader');
        this.display = document.querySelector('.loader--state');
        return this;
    }

    _createClass(appLoader, [{
        key: 'changeState',
        value: function changeState(state) {
            window.loadState = state;
            if (state === "end") {
                setTimeout(function () {
                    document.querySelector('.loader').className = "loader hide";
                }, 250);
                state = "Almost there";
            }

            if (this.display) this.display.innerHTML = state + "...";else document.querySelector('.loader--state').innerHTML = state + "...";
        }
    }]);

    return appLoader;
}();
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Configuration of Particles JS
var Particule = exports.Particule = function Particule() {
    _classCallCheck(this, Particule);

    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 50,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#2F9BC2"
            },
            "shape": {
                "type": "edge",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.35,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "top",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true,
        "config_demo": {
            "hide_card": false,
            "background_color": "#b61924",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
        }
    });
};
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Redirect = exports.Redirect = function Redirect($hash) {
    _classCallCheck(this, Redirect);

    $hash = $hash.replace("#", '');
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
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scrollHorizontal = undefined;

var _classDommanipulator = require('./class.dommanipulator.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// replace some Jquery function with vanilla Javascript
var $ = new _classDommanipulator.DomManipulator();

/*
jQuery mousewheel handler re-written in vanilla js
https://css-tricks.com/examples/HorzScrolling/jquery.mousewheel.js
*/

var scrollHorizontal = exports.scrollHorizontal = function scrollHorizontal(event, domNode) {
    _classCallCheck(this, scrollHorizontal);

    event.preventDefault();

    var orgEvent = event || window.event;
    var delta = 0;
    var returnValue = true;
    var deltaX = 0;
    var deltaY = 0;

    event = orgEvent;

    // Old school scrollwheel delta
    if (orgEvent.wheelDelta) {
        delta = orgEvent.wheelDelta / 120;
    }
    if (orgEvent.detail) {
        delta = -orgEvent.detail / 3;
    }

    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;

    // Gecko
    if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
        deltaY = 0;
        deltaX = -1 * delta;
    }

    // Webkit
    if (orgEvent.wheelDeltaY !== undefined) {
        deltaY = orgEvent.wheelDeltaY / 120;
    }
    if (orgEvent.wheelDeltaX !== undefined) {
        deltaX = -1 * orgEvent.wheelDeltaX / 120;
    }

    domNode.scrollLeft -= delta * 10;

    var story_introW = $.el('.story_intro').clientWidth;
    var story_part1W = $.el('.story_part1').clientWidth;
    // calcul the width of the story container multiply by 4 because there is 4 story
    var widthContainerStory = (story_introW + story_part1W) * 4;
    // Percentage scroll to change sliders
    var scrollPercent = 100 * $.el('#container_story').scrollLeft / ($.el('.story').clientWidth - widthContainerStory);
    scrollPercent = Math.round(-scrollPercent);

    var slider1 = $.el('.slider1');
    var slider2 = $.el('.slider2');
    var slider3 = $.el('.slider3');
    var slider4 = $.el('.slider4');

    switch (true) {
        case scrollPercent >= 0 && scrollPercent < 32:
            slider1.classList.remove('hide_slider');
            slider2.classList.add('hide_slider');
            break;
        case scrollPercent > 32 && scrollPercent < 62:
            slider1.classList.add('hide_slider');
            slider2.classList.remove('hide_slider');
            slider3.classList.add('hide_slider');
            break;
        case scrollPercent > 62 && scrollPercent < 92:
            slider2.classList.add('hide_slider');
            slider3.classList.remove('hide_slider');
            slider4.classList.add('hide_slider');
            break;
        case scrollPercent > 92:
            slider3.classList.add('hide_slider');
            slider4.classList.remove('hide_slider');
            break;
    }
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Detector = exports.Detector = function Detector() {
    _classCallCheck(this, Detector);

    var features = {
        isMobile: navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/),
        canvas: !!window.CanvasRenderingContext2D,
        webgl: function () {

            try {

                var canvas = document.createElement('canvas');
                return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
            } catch (e) {

                return false;
            }
        }(),
        workers: !!window.Worker,
        fileapi: window.File && window.FileReader && window.FileList && window.Blob,

        getWebGLErrorMessage: function getWebGLErrorMessage() {

            var element = document.createElement('div');
            element.id = 'webgl-error-message';
            element.style.fontFamily = 'monospace';
            element.style.fontSize = '13px';
            element.style.fontWeight = 'normal';
            element.style.textAlign = 'center';
            element.style.background = '#fff';
            element.style.color = '#000';
            element.style.padding = '1.5em';
            element.style.width = '400px';
            element.style.margin = '5em auto 0';

            if (!this.webgl) {

                element.innerHTML = window.WebGLRenderingContext ? ['Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join('\n') : ['Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join('\n');
            }

            return element;
        },

        addGetWebGLMessage: function addGetWebGLMessage(parameters) {

            var parent, id, element;

            parameters = parameters || {};

            parent = parameters.parent !== undefined ? parameters.parent : document.body;
            id = parameters.id !== undefined ? parameters.id : 'oldie';

            element = Detector.getWebGLErrorMessage();
            element.id = id;

            parent.appendChild(element);
        }

    };

    navigator.vibrate = navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

    if (navigator.vibrate && features.isMobile) features.vibrate = true;else features.vibrate = false;

    return features;
};
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var loadData = exports.loadData = function loadData(json, cb) {
    _classCallCheck(this, loadData);

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', json, true);
    xobj.onreadystatechange = function () {

        if (xobj.readyState == 4 && xobj.status == "200") {
            if (cb) cb(xobj.responseText);
        }
    };
    xobj.send(null);
    return xobj;
};
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CubeAnimation = exports.CubeAnimation = function () {
    function CubeAnimation(method, args) {
        _classCallCheck(this, CubeAnimation);

        this.args = args;

        if (method === "animatePositionChange") {
            this.id = String.fromCharCode(Math.floor(Math.random() * 11)) + Math.floor(Math.random() * 1000000);
            //custom method call via parameters
            if (!cubeAnimationState && method === "animatePositionChange") window.cubeAnimationState = this;else return console.debug('cannot overide animation');
        }

        if (this.args.type === "interaction") {
            this.args.mesh[method] = this;
            this.args.mesh.isAnimating = true;
            return this[method];
        }
        this.calls = 0;

        this[method]();
        // console.info(this.id + ' init animation');
        this.end = false;
    }

    _createClass(CubeAnimation, [{
        key: "animateSwitcher",
        value: function animateSwitcher() {
            var mesh = this;
            // ===================//
            // Switch Interruptor //
            // ==================//
            navigator.vibrate([30, 50, 125]);

            mesh.rotation.x += Math.PI;
            mesh.rotation.z += Math.PI;

            mesh.position.x = mesh.position.x === 10 ? 0 : 10;
        }
    }, {
        key: "animateSpin",
        value: function animateSpin() {
            var _this = this;

            var mesh = this;
            var animation = mesh.animation;
            this.mesh = mesh;

            // ====================//
            // Press button bubble //
            // ===================//
            this.animationFrame = window.requestAnimationFrame(function () {
                return _this.animation();
            });

            return mesh.animateSpin.renderSpin(mesh.rotation.z);
        }
    }, {
        key: "renderSpin",
        value: function renderSpin(angle) {
            var target = this.args.mesh.rotation;
            var target2 = this.args.mesh2.rotation;
            var newAngle = angle + Math.PI / 24;
            if (newAngle <= Math.PI * 2) {
                target.z = newAngle;
                target2.z = newAngle;
                navigator.vibrate(2);
            } else {
                target.z = 0;
                target2.z = 0;
                this.args.mesh.stop = false;
                this.args.mesh.isAnimating = false;

                var animation = this.args.mesh.animationFrame;
                animation = window.cancelAnimationFrame(animation);
            }
        }
    }, {
        key: "animateButtonsPush",
        value: function animateButtonsPush() {
            var _this2 = this;

            var mesh = this;
            var animation = mesh.animation;
            this.mesh = mesh;

            // ====================//
            // Press button bubble //
            // ===================//
            this.animationFrame = window.requestAnimationFrame(function () {
                return _this2.animation();
            });

            return mesh.animateButtonsPush.renderButtonsPush(mesh.position.y);
        }
    }, {
        key: "renderButtonsPush",
        value: function renderButtonsPush(pos) {
            var target = this.args.mesh.position;
            var newPos = pos + 0.2;
            if (newPos <= 5.2 && this.args.mesh.stop !== true) {
                target.y = newPos;
            } else if (parseInt(target.y) === 5 && this.args.mesh.stop !== true) {
                this.args.mesh.stop = true;
            } else if (this.args.mesh.stop && target.y >= 0.3) {
                target.y -= 0.4;
            } else {
                target.y = 0;
                this.args.mesh.stop = false;
                this.args.mesh.isAnimating = false;

                var animation = this.args.mesh.animationFrame;
                animation = window.cancelAnimationFrame(animation);
            }
        }
    }, {
        key: "animatePositionChange",
        value: function animatePositionChange() {
            //    this.state = this.args.beginPosition;
            this.state = {
                name: this.args.beginPosition.name,
                rotation: {
                    x: Cube.group.rotation.x,
                    y: Cube.group.rotation.y,
                    z: Cube.group.rotation.z
                }
            };
            //catch in variables to stop it later
            this.animation = window.requestAnimationFrame(this.animatePositionChange.bind(this));

            window.animation = this.animation;
            return this.renderPosition();
        }

        //short summary : a mess

    }, {
        key: "renderPosition",
        value: function renderPosition(move) {

            if (this.end) {
                //console.debug(this.id + " delete aniamtion", this.calls);
                var animation = this.animation;
                window.cancelAnimationFrame(animation);
                document.getElementsByClassName('cubeUi__face--name')[0].innerHTML = this.args.positionSelected.name;
                return window.cubeAnimationState = false;
            } else {

                //    let b = this.args.beginPosition;
                var c = Cube.group;
                var t = this.args.positionSelected;
                var s = this.state;

                // console.debug("begin ", b)
                // console.debug("target ", t)

                for (var key in t) {
                    if (t.hasOwnProperty(key)) {
                        for (var prop in t[key]) {

                            if (t[key].hasOwnProperty(prop)) {
                                if (t[key][prop] === s[key][prop]) {} else if (t[key][prop] > s[key][prop]) {
                                    if (key === 'rotation') {

                                        c[key][prop] += 0.1;
                                        s[key][prop] += 0.1;
                                    }
                                    this.end = false;
                                } else if (t[key][prop] < s[key][prop]) {

                                    if (key === 'rotation') {

                                        c[key][prop] -= 0.1;
                                        s[key][prop] -= 0.1;
                                    }
                                    this.end = false;
                                }
                                if (key === 'rotation') s[key][prop] = parseFloat(parseFloat(s[key][prop]).toFixed(1));
                            }
                        }
                    }
                }

                //console.log(s);
                if (t.rotation.x === s.rotation.x && t.rotation.y === s.rotation.y && t.rotation.z === s.rotation.z) {
                    this.end = true;
                } else {
                    // still rendering position
                    this.calls++;
                    if (this.calls > 14) {
                        if (s.rotation.x === 3 && s.rotation.y === 0.1) return this.end = true;
                    }
                }
            }
        }
    }]);

    return CubeAnimation;
}();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Rest in Pixels

var CubeInteraction = exports.CubeInteraction = function CubeInteraction(event) {
  //console.log(event);

  _classCallCheck(this, CubeInteraction);
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CubePositions = exports.CubePositions = function CubePositions() {
    _classCallCheck(this, CubePositions);

    this.list = [{
        name: 'roll',
        rotation: {
            x: 0,
            y: 0,
            z: 0
        }
    }, {
        name: 'glide',

        rotation: {
            y: 1.5,
            x: 0,
            z: 0
        }
    }, {
        name: 'flip',

        rotation: {
            y: 0,
            x: 1.5,
            z: 0
        }
    }, {
        name: 'breathe',

        rotation: {
            x: 0,
            y: -1.5,
            z: 0
        }
    }, {
        name: 'click',

        rotation: {
            x: -1.5,
            y: 0,
            z: 0
        }

    }, {
        name: 'spin',

        rotation: {
            x: 3,
            y: 0,
            z: 0
        }
    }, {
        name: 'roll',

        rotation: {
            x: 0,
            y: 0,
            z: 0
        }
    }];

    return this.list;
};
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CubeThemes = exports.CubeThemes = function CubeThemes() {
    _classCallCheck(this, CubeThemes);

    this.list = [{
        name: "retro",
        "buy_code": "30253661068",
        colorSet: {
            cube: {
                r: 127 / 255,
                g: 131 / 255,
                b: 139 / 255
            },
            mainColor: {
                r: 41 / 255,
                g: 41 / 255,
                b: 40 / 255
            },
            lightColor: {
                r: 56 / 255,
                g: 56 / 255,
                b: 56 / 255
            }
        }
    }, {
        name: "dice",
        "buy_code": "26927898438",
        colorSet: {
            cube: {
                r: 246 / 255,
                g: 249 / 255,
                b: 251 / 255
            },
            mainColor: {
                r: 41 / 255,
                g: 41 / 255,
                b: 40 / 255
            },
            lightColor: {
                r: 56 / 255,
                g: 56 / 255,
                b: 56 / 255
            }
        }
    }, {
        name: "aqua",
        "buy_code": "30253660812",
        colorSet: {
            cube: {
                r: 246 / 255,
                g: 249 / 255,
                b: 251 / 255
            },
            mainColor: {
                r: 65 / 255,
                g: 184 / 255,
                b: 226 / 255
            },
            lightColor: {
                r: 56 / 255,
                g: 56 / 255,
                b: 56 / 255
            }
        }
    }, {
        name: "berry",
        "buy_code": "30253660940",
        colorSet: {
            cube: {
                r: 246 / 255,
                g: 249 / 255,
                b: 251 / 255
            },
            mainColor: {
                r: 232 / 255,
                g: 30 / 255,
                b: 158 / 255
            },
            lightColor: {
                r: 56 / 255,
                g: 56 / 255,
                b: 56 / 255
            }
        }

    }, {
        name: "sunset",
        "buy_code": "30253660876",
        colorSet: {
            cube: {
                r: 246 / 255,
                g: 249 / 255,
                b: 251 / 255
            },
            mainColor: {
                r: 232 / 255,
                g: 166 / 255,
                b: 65 / 255
            },
            lightColor: {
                r: 56 / 255,
                g: 56 / 255,
                b: 56 / 255
            }
        }

    }, {
        name: "fresh",
        "buy_code": "30253661004",
        colorSet: {
            cube: {
                r: 246 / 255,
                g: 249 / 255,
                b: 251 / 255
            },
            mainColor: {
                r: 187 / 255,
                g: 234 / 255,
                b: 110 / 255
            },
            lightColor: {
                r: 56 / 255,
                g: 56 / 255,
                b: 56 / 255
            }
        }
    }, {
        name: "graphite",
        "buy_code": "30253660684",
        colorSet: {
            cube: {
                r: 45 / 255,
                g: 55 / 255,
                b: 64 / 255
            },
            mainColor: {
                r: 0 / 255,
                g: 0 / 255,
                b: 0 / 255
            },
            lightColor: {
                r: 41 / 255,
                g: 41 / 255,
                b: 40 / 255
            }
        }
    }, {
        name: "midnight",
        "buy_code": "30253660748",
        colorSet: {
            cube: {
                r: 16 / 255,
                g: 20 / 255,
                b: 24 / 255
            },
            mainColor: {
                r: 41 / 255,
                g: 41 / 255,
                b: 40 / 255
            },
            lightColor: {
                r: 41 / 255,
                g: 41 / 255,
                b: 40 / 255
            }
        }
    }, {
        name: "kickstarter edition",
        "buy_code": "30253661068",
        colorSet: {
            cube: {
                r: 16 / 255,
                g: 20 / 255,
                b: 24 / 255
            },
            mainColor: {
                r: 187 / 255,
                g: 234 / 255,
                b: 110 / 255
            },
            lightColor: {
                r: 41 / 255,
                g: 41 / 255,
                b: 40 / 255
            }
        }
    }];
    return this.list;
};