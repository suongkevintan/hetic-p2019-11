import {CubeThemes} from './cube-assets/cube-themes.js'
import {CubePositions} from './cube-assets/cube-positions.js'
import {CubeAnimation} from './cube-assets/cube-animation.js'
import {Detector} from '../modules/detector.js'

export class Cube {

    setTheme(cubeBase, themeSelected, force) {

        // dont render if no changes
        if (this.activeTheme === themeSelected && force !== true)
            return

        cubeBase.children.forEach((texture, index) => {
            switch (texture.name) {
                case "roll_sphere":
                    //sphere + reflections
                    let cubeCamera = new window.THREEx.CubeCamera(texture);
                    this.scene.add(cubeCamera.object3d);
                    texture.material.envMap = cubeCamera.textureCube;
                    cubeCamera.update(this.renderer, this.scene);
                    break;
                case "gilde":
                    texture.material.color = themeSelected.colorSet.lightColor
                    break;
                case "Cube":
                    texture.material.color = themeSelected.colorSet.cube
                    break;
                    //need a glow
                case "breathe_1":
                    texture.material.color = {
                        r: 255 / 255,
                        g: 255 / 255,
                        b: 255 / 255
                    }
                    break;
                    //typo spoted
                case "cyllindre2":
                case "cylindre1_1":
                case "flip":
                case "spin_1":
                case "spin3":
                case "roll1":
                case "roll3":
                case "rollmiddle":

                case "cylindre3_1":
                case "cylindre4_1":
                case "cylindre_middle_1":

                    texture.material.color = themeSelected.colorSet.mainColor
                    break;

                default:
                    //to remove
                    texture.material.color = {
                        r: 255 / 255,
                        g: 0 / 255,
                        b: 0 / 255
                    }

            }
        })

        //update cube theme
        this.activeTheme = themeSelected
    }

    setPosition(cubeBase, positionSelected, force) {
        // dont render if no changes
        if (this.activePosition === positionSelected && !force)
            return

        const beginPosition = this.activePosition;
        const animation = new CubeAnimation("animatePositionChange", {
            beginPosition: beginPosition,
            positionSelected: positionSelected
        });

        //update cube position
        this.activePosition = positionSelected;
    }

    loadModel() {

        // =======================================================================//
        // .obj loader from threejs with his native method (onProgress, onerror)  //
        // =======================================================================//

        const manager = new THREE.LoadingManager();
        let loaderDisplay = document.querySelector('.value')
        // on progress
        const onProgress = function(xhr) {
            if (xhr.lengthComputable) {
                const percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
                //loaderDisplay.innerHTML = Math.round(percentComplete, 2) + "%"
            }
        };
        // on error callback
        const onError = function(xhr) {};

        //final constructor
        const loader = new THREE.OBJLoader(manager);

        // =======================================================================//
        // dom events for component ofs the cube,  components are model.children  //
        // =======================================================================//
        let model = loader.load('dist/models3D/model.obj', (model) => {

            this.scene.add(model);

            //debug
            window.model = model;

            // model.position.x = 35.379 *1;
            // model.position.y = 18.538 * -1

            //enable library for easy event listener
            const domEvents = new THREEx.DomEvents(this.camera, this.renderer.domElement);

            //bind our components
            model.children.forEach((mesh, index) => {

                domEvents.addEventListener(mesh, 'click', (event) => {

                    //debug
                    console.info(event.target.name, event.target.id, mesh);

                    switch (event.target.id) {
                        case 45:
                            // ===================//
                            // Switch Interruptor //
                            // ==================//
                            mesh.rotation.x += Math.PI;
                            mesh.rotation.z += Math.PI;
                            break;
                        case 41:
                        case 38:
                        case 37:
                        case 39:
                        case 40:
                            // ====================//
                            // Press button bubble //
                            // ===================//
                            mesh.position.y = 5
                            break;
                        case 28:
                            //mesh.rotation.x += Math.PI / 2;
                            mesh.rotateY += Math.PI / 2;
                    }
                }, false);
            });

            //send new model to the Cube Class
            this.group = model;

            this.setTheme(model, this.activeTheme, true)
            this.setPosition(model, this.activePosition, false)

        }, onProgress, onError);
    }

    constructor() {
        window.Detector = new Detector()
        this.enableVibration = window.Detector.vibrate;

        window.Cube = this
        this.themes = new CubeThemes(),
        this.positions = new CubePositions(),
        this.activeTheme = this.themes[0];
        this.activePosition = this.positions[0];


        window.cubeAnimationState = false
        // this container will be injected to the dom with our canvas
        this.container = document.createElement('div');
        document.body.appendChild(this.container);

        // ======================//
        // Init Three.js Canvas //
        // =====================//
        let scene = new THREE.Scene()
        this.scene = scene
        const renderer = window.Detector.webgl
            ? new THREE.WebGLRenderer({
                //antialias : better shape
                antialias: false,
                //transparent background
                alpha: true
            })
            : new THREE.CanvasRenderer();

        if (Detector.isMobile) {
            //alert('mobile')
        }
        this.renderer = renderer
        //set size
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.id = "three";

        //ITS ALIIIIIIIIIVE
        this.container.appendChild(this.renderer.domElement);

        // =======================================================================//
        // Lights and this.camera                                                      //
        // =======================================================================//

        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 0, 1);
        this.scene.add(directionalLight);
        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(-1, 0, -1);
        this.scene.add(directionalLight);
        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 0);
        this.scene.add(directionalLight);

        const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
        //this.scene.add(light);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        this.camera = camera
        this.camera.position.z = 750;
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera = camera;

        //orbit controls for debug
        const controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        // =======================================================================//
        // Let's get stared  (ha!)                                                //
        // =======================================================================//
        this.animate()
        this.loadModel()

        //dom events handlers
        window.addEventListener('resize', () => this.onWindowResize(), false)
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
    }

    render() {
        //we need to work on theses ones
        const color = new THREE.Color(0xffffff);
        this.renderer.render(this.scene, this.camera);
        //  let mesh2 = cubeBase.children.filter((m) => m.id === 36);
        if (this.group) {
            //this.group.rotation.x += 0.06
        }
    }
}
