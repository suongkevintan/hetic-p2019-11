/** ======================================================================= *
 * @desc jQuery $ alternative in native js                                 *
 * @param node selector | :string                                          *
 * @return HTMLnodeElement                                                 *
 * ======================================================================= *
 **/

class DomManipulator {
    constructor() {}
    id(id) {
        return document.getElementById(id)
    }
    el(el) {
        return document.querySelector(el)
    }
    class(el) {
        return document.getElementsByClassName(elClass)
    }
    tag(el) {
        return document.getElementsByTagName(tag)
    }
    all(el) {
        return document.querySelectorAll(el)
    }
}
let $ = new DomManipulator();


//canvas options
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
let mouseX = 0,
    mouseY = 0;

// =======================================================================//
// ! scope issue for now i keep these in the window object                //
// =======================================================================//

var container;
var camera,
    scene,
    renderer,
    object;

class Cube {


    switchInteruptor(pos) {


    }


    loadModel() {

        // =======================================================================//
        // .obj loader from threejs with his native method (onProgress, onerror)  //
        // =======================================================================//

        let manager = new THREE.LoadingManager();

        // on progress
        manager.onProgress = (item, loaded, total) => console.log(item, loaded, total);
        const onProgress = function(xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
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
            model.position.y = 0;
            scene.add(model);

            //debug
            window.model = model;

            //enable library for easy event listener
            let domEvents = new THREEx.DomEvents(camera, renderer.domElement);

            //bind our components
            model.children.forEach(function(mesh, index) {
                domEvents.addEventListener(mesh, 'click', (event) => {

                    //debug
                    console.info(event.target.name, event.target.id);

                    switch (event.target.id) {
                        case 26:
                            // ===================//
                            // Switch Interruptor //
                            // ==================//
                            let x_pos = mesh.position.x || 0

                            if (x_pos === 0)
                                mesh.position.x = 39.5
                            else
                                mesh.position.x = 0

                            mesh.rotateY(Math.PI);
                            break;
                        default:

                    }
                }, false);
            });


            //send new model to the Cube Class
            this.group = model;

        }, onProgress, onError);


    }



    constructor() {

        // this container will be injected to the dom with our canvas
        container = document.createElement('div');
        document.body.appendChild(container);


        // ======================//
        // Init Three.js Canvas //
        // =====================//
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({
            //antialias : better shape
            antialias: true,
            //transparent background
            alpha: true,
        });
        //set size
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        //ITS ALIIIIIIIIIVE
        container.appendChild(renderer.domElement);

        //dom events handlers
        window.addEventListener('resize', this.onWindowResize, false)
        //document.addEventListener('mousemove', this.onDocumentMouseMove, false);



        // =======================================================================//
        // Lights and camera                                                      //
        // =======================================================================//

        var directionalLight = new THREE.DirectionalLight(0xff0000, 0.5);
        directionalLight.position.set(0, 0, 1);
        scene.add(directionalLight);

        var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        scene.add(light);

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.z = 1650;
        camera.position.x = -300;

        //orbit controls for debug
        let controls = new THREE.OrbitControls(camera, renderer.domElement);

        // =======================================================================//
        // Let's get stared  (ha!)                                                //
        // =======================================================================//
        this.animate()
        this.loadModel();
        console.debug(this);
    }

    onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 2;
        mouseY = (event.clientY - windowHalfY) / 2;
    }

    animate() {
        //fiou dat bind && canvas animation
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
    }

    render() {
        //we need to work on theses ones
        var color = new THREE.Color(0xffffff);
        scene.background = new THREE.Color(0x55556d);

        renderer.render(scene, camera);
    }
}
  // console.log('yolo');
//yay
let cube = new Cube()
