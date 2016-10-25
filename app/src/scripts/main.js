class DomManipulator {
    constructor() {}
    id(id) {
        return document.getElementById(id)
    }
    el(el) {
        return document.querySelector(el)
    }
    class (el) {
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
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
let mouseX = 0,
    mouseY = 0;
var container;

var camera,
    scene,
    renderer,
    object;

class Cube {

      bindClick() {


      }

    constructor() {
        const self = this;

        container = document.createElement('div');
        document.body.appendChild(container);

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.z = 650;

        // scene

        scene = new THREE.Scene();

        var directionalLight = new THREE.DirectionalLight(0xff0000, 0.5);
        directionalLight.position.set(0, 0, 1);
        scene.add(directionalLight);

        var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        scene.add(light);

        // texture

        var manager = new THREE.LoadingManager();
        manager.onProgress = function(item, loaded, total) {

            console.log(item, loaded, total);

        };

        var texture = new THREE.Texture();

        var onProgress = function(xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };

        var onError = function(xhr) {};

        // model

        var loader = new THREE.OBJLoader(manager);
        var object = loader.load('dist/src/models3D/model.obj', function(object) {

            object.position.y = 0;
            object.rotation.x = 1.25;

            scene.add(object);
            let domEvents = new THREEx.DomEvents(camera, renderer.domElement);
            object.children.forEach(function(elem, index) {
                domEvents.addEventListener(elem, 'click', function(event) {
                    console.log(event.target.name);
                }, false);
            });
            return object;
        }, onProgress, onError)
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        document.addEventListener('mousemove', this.onDocumentMouseMove, false);

        window.addEventListener('resize', this.onWindowResize, false);
        console.log(this.object);
        this.bindClick();
        this.animate()
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
        //fiou
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();

    }

    render() {
        var color = new THREE.Color(0xffffff);
        scene.background = new THREE.Color(0x55556d);
        renderer.render(scene, camera);
    }
}

var cube = new Cube()
