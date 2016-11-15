import {CubeThemes} from './cube-assets/cube-themes.js'


export class Cube {

    setTheme(cubeBase, themeSelected) {
        cubeBase.children.forEach((texture, index) => {

            switch (texture.id) {
                case 28:
                    //sphere + reflections
                    let cubeCamera = new window.THREEx.CubeCamera(texture);
                    this.scene.add(cubeCamera.object3d);
                    texture.material.envMap = cubeCamera.textureCube;
                    cubeCamera.update(this.renderer, this.scene);
                    break;
                case 30:
                    texture.material.color = themeSelected.colorSet.lightColor
                    break;
                case 42:
                    texture.material.color = themeSelected.colorSet.cube
                    break;
                    //need a glow
                case 49:
                    texture.material.color = {
                        r: 255 / 255,
                        g: 255 / 255,
                        b: 255 / 255
                    }
                    break;
                case 19:
                case 22:
                case 25:
                case 29:
                case 31:
                case 32:
                case 35:
                case 36:
                case 37:
                case 38:
                case 39:
                case 40:
                case 41:
                    texture.material.color = themeSelected.colorSet.mainColor
                    break;

                default:
                    //to remove
                    texture.material.color = themeSelected.colorSet.cube

            }
        })
    }

    loadModel() {

        // =======================================================================//
        // .obj loader from threejs with his native method (onProgress, onerror)  //
        // =======================================================================//

        let manager = new THREE.LoadingManager();

        // on progress
        //manager.onProgress = (item, loaded, total) => console.log(item, loaded, total);
        const onProgress = function(xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                //console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };

        // on error
        const onError = function(xhr) {};

        //final constructor
        const loader = new THREE.OBJLoader(manager);

        // =======================================================================//
        // dom events for component ofs the cube,  components are model.children  //
        // =======================================================================//
        let model = loader.load('dist/models3D/model.obj', (model) => {

            //insert loaded model
            model.position.y = -90;
            model.position.x =-20;
            this.scene.add(model);
            this.setTheme(model, this.activeTheme)

            //debug
            window.model = model;
            //enable library for easy event listener
            let domEvents = new THREEx.DomEvents(this.camera, this.renderer.domElement);

            //bind our components
            model.children.forEach((mesh, index) => {

                domEvents.addEventListener(mesh, 'click', (event) => {

                    //debug
                    console.info(event.target.name, event.target.id, mesh);

                    switch (event.target.id) {
                        case 32:
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

        }, onProgress, onError);
    }

    constructor() {
        this.themes = new CubeThemes(),
        this.activeTheme = this.themes[0];

        // this container will be injected to the dom with our canvas
        this.container = document.createElement('div');
        document.body.appendChild(this.container);

        // ======================//
        // Init Three.js Canvas //
        // =====================//
        let scene = new THREE.Scene()
        this.scene = scene

        let renderer = Detector.webgl
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

        var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
        //this.scene.add(light);

        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        this.camera = camera
        this.camera.position.z = 500;
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera = camera;

        //orbit controls for debug
        let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        // =======================================================================//
        // Let's get stared  (ha!)                                                //
        // =======================================================================//
        this.animate()
        this.loadModel();

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
        var color = new THREE.Color(0xffffff);
        this.renderer.render(this.scene, this.camera);
        //  let mesh2 = cubeBase.children.filter((m) => m.id === 36);
        if (this.group) {
          //  this.group.children.filter((m) => m.id === 28)[0].rotateY(Math.PI / 20);
          //  this.group.children.filter((m) => m.id === 26)[0].rotateX(Math.PI / 20);
          //  this.group.children.filter((m) => m.id === 23)[0].rotateX(Math.PI / 20);
          //  this.group.children.filter((m) => m.id === 20)[0].rotateX(Math.PI / 20);
        }
    }
}
