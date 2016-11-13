/** ======================================================================= *
 * @desc jQuery $ alternative in native js                                 *
 * @param node selector | :string                                          *
 * @return HTMLnodeElement                                                 *
 * ======================================================================= *
 **/

// class DomManipulator {
//     constructor() {}
//     id(id) {
//         return document.getElementById(id)
//     }
//     el(el) {
//         return document.querySelector(el)
//     }
//     class (el) {
//         return document.getElementsByClassName(elClass)
//     }
//     tag(el) {
//         return document.getElementsByTagName(tag)
//     }
//     all(el) {
//         return document.querySelectorAll(el)
//     }
// }
// let $ = new DomManipulator();
//
// //canvas options
// const windowHalfX = window.innerWidth / 2;
// const windowHalfY = window.innerHeight / 2;
// let mouseX = 0,
//     mouseY = 0;
//
// // =======================================================================//
// // ! scope issue for now i keep these in the window object                //
// // =======================================================================//
//
// var container;
// var camera,
//     scene,
//     renderer,
//     object;
//
// class Cube {
//     switchInteruptor(pos) {}
//
//     setTheme(cubeBase, themeSelected) {
//         cubeBase.children.forEach((texture, index) => {
//
//             switch (texture.id) {
//                 case 28:
//                     //sphere + reflections
//                     let cubeCamera = new window.THREEx.CubeCamera(texture);
//                     this.scene.add(cubeCamera.object3d);
//                     texture.material.envMap = cubeCamera.textureCube;
//                     cubeCamera.update(this.renderer, this.scene);
//                     break;
//                 case 30:
//                     texture.material.color = themeSelected.colorSet.lightColor
//                     break;
//                 case 42:
//                     texture.material.color = themeSelected.colorSet.cube
//                     break;
//                 case 19:
//                 case 22:
//                 case 25:
//                 case 29:
//                 case 31:
//                 case 32:
//                 case 35:
//                 case 36:
//                 case 37:
//                 case 38:
//                 case 39:
//                 case 40:
//                 case 41:
//                     texture.material.color = themeSelected.colorSet.mainColor
//                     break;
//
//                 default:
//                     //to remove
//                     texture.material.color = themeSelected.colorSet.cube
//
//             }
//         })
//     }
//
//     loadModel() {
//
//         // =======================================================================//
//         // .obj loader from threejs with his native method (onProgress, onerror)  //
//         // =======================================================================//
//
//         let manager = new THREE.LoadingManager();
//
//         // on progress
//         manager.onProgress = (item, loaded, total) => console.log(item, loaded, total);
//         const onProgress = function(xhr) {
//             if (xhr.lengthComputable) {
//                 var percentComplete = xhr.loaded / xhr.total * 100;
//                 console.log(Math.round(percentComplete, 2) + '% downloaded');
//             }
//         };
//
//         // on error
//         const onError = function(xhr) {};
//
//         //final constructor
//         const loader = new THREE.OBJLoader(manager);
//
//         // =======================================================================//
//         // dom events for component ofs the cube,  components are model.children  //
//         // =======================================================================//
//         let model = loader.load('dist/models3D/model.obj', (model) => {
//
//             //insert loaded model
//             model.position.y = 0;
//             scene.add(model);
//             this.setTheme(model, this.activeTheme)
//
//             //debug
//             window.model = model;
//
//             //enable library for easy event listener
//             let domEvents = new THREEx.DomEvents(camera, renderer.domElement);
//
//             //bind our components
//             model.children.forEach((mesh, index) => {
//
//                 domEvents.addEventListener(mesh, 'click', (event) => {
//
//                     //debug
//                     console.info(event.target.name, event.target.id, event.target);
//
//                     switch (event.target.id) {
//                         case 32:
//                             // ===================//
//                             // Switch Interruptor //
//                             // ==================//
//                             let x_pos = mesh.position.x || 0
//
//                             if (x_pos === 0)
//                                 mesh.position.x = 39.5
//                             else
//                                 mesh.position.x = 0
//
//                             mesh.rotateY(Math.PI);
//                             break;
//                         default:
//
//                     }
//                 }, false);
//             });
//
//             //send new model to the Cube Class
//             this.group = model;
//
//         }, onProgress, onError);
//     }
//
//     constructor() {
//         this.themes = [
//             {
//                 name: "retro",
//                 colorSet: {
//                     cube: {
//                         r: 127 / 255,
//                         g: 131 / 255,
//                         b: 139 / 255
//                     },
//                     mainColor: {
//                         r: 41 / 255,
//                         g: 41 / 255,
//                         b: 40 / 255
//                     },
//                     lightColor: {
//                         r: 56 / 255,
//                         g: 56 / 255,
//                         b: 56 / 255
//                     }
//                 }
//             }, {
//                 name: "dice",
//                 colorSet: {
//                     cube: {
//                         r: 246 / 255,
//                         g: 249 / 255,
//                         b: 251 / 255
//                     },
//                     mainColor: {
//                         r: 41 / 255,
//                         g: 41 / 255,
//                         b: 40 / 255
//                     },
//                     lightColor: {
//                         r: 56 / 255,
//                         g: 56 / 255,
//                         b: 56 / 255
//                     }
//                 }
//             }, {
//                 name: "aqua",
//                 colorSet: {
//                     cube: {
//                         r: 246 / 255,
//                         g: 249 / 255,
//                         b: 251 / 255
//                     },
//                     mainColor: {
//                         r: 65 / 255,
//                         g: 184 / 255,
//                         b: 226 / 255
//                     },
//                     lightColor: {
//                         r: 56 / 255,
//                         g: 56 / 255,
//                         b: 56 / 255
//                     }
//                 }
//             }, {
//                 name: "berry",
//                 colorSet: {
//                     cube: {
//                         r: 246 / 255,
//                         g: 249 / 255,
//                         b: 251 / 255
//                     },
//                     mainColor: {
//                         r: 232 / 255,
//                         g: 166 / 255,
//                         b: 65 / 255
//                     },
//                     lightColor: {
//                         r: 56 / 255,
//                         g: 56 / 255,
//                         b: 56 / 255
//                     }
//                 }
//             }, {
//                 name: "sunset",
//                 colorSet: {
//                     cube: {
//                         r: 246 / 255,
//                         g: 249 / 255,
//                         b: 251 / 255
//                     },
//                     mainColor: {
//                         r: 232 / 255,
//                         g: 30 / 255,
//                         b: 158 / 255
//                     },
//                     lightColor: {
//                         r: 56 / 255,
//                         g: 56 / 255,
//                         b: 56 / 255
//                     }
//                 }
//             }, {
//                 name: "fresh",
//                 colorSet: {
//                     cube: {
//                         r: 246 / 255,
//                         g: 249 / 255,
//                         b: 251 / 255
//                     },
//                     mainColor: {
//                         r: 187 / 255,
//                         g: 234 / 255,
//                         b: 110 / 255
//                     },
//                     lightColor: {
//                         r: 56 / 255,
//                         g: 56 / 255,
//                         b: 56 / 255
//                     }
//                 }
//             }, {
//                 name: "graphite",
//                 colorSet: {
//                     cube: {
//                         r: 45 / 255,
//                         g: 55 / 255,
//                         b: 64 / 255
//                     },
//                     mainColor: {
//                         r: 0 / 255,
//                         g: 0 / 255,
//                         b: 0 / 255
//                     },
//                     lightColor: {
//                         r: 41 / 255,
//                         g: 41 / 255,
//                         b: 40 / 255
//                     }
//                 }
//             }, {
//                 name: "midnight",
//                 colorSet: {
//                     cube: {
//                         r: 16 / 255,
//                         g: 20 / 255,
//                         b: 24 / 255
//                     },
//                     mainColor: {
//                         r: 41 / 255,
//                         g: 41 / 255,
//                         b: 40 / 255
//                     },
//                     lightColor: {
//                         r: 41 / 255,
//                         g: 41 / 255,
//                         b: 40 / 255
//                     }
//                 }
//             }, {
//                 name: "kickstarter edition",
//                 colorSet: {
//                     cube: {
//                         r: 16 / 255,
//                         g: 20 / 255,
//                         b: 24 / 255
//                     },
//                     mainColor: {
//                         r: 187 / 255,
//                         g: 234 / 255,
//                         b: 110 / 255
//                     },
//                     lightColor: {
//                         r: 41 / 255,
//                         g: 41 / 255,
//                         b: 40 / 255
//                     }
//                 }
//             }
//         ]
//         this.activeTheme = this.themes[0];
//
//
//
//
//         // this container will be injected to the dom with our canvas
//         container = document.createElement('div');
//         document.body.appendChild(container);
//
//         // ======================//
//         // Init Three.js Canvas //
//         // =====================//
//         scene = new THREE.Scene();
//         this.scene = scene;
//
//         renderer = new THREE.WebGLRenderer({
//             //antialias : better shape
//             antialias: true,
//             //transparent background
//             alpha: true
//         });
//         this.renderer = renderer
//         //set size
//         renderer.setPixelRatio(window.devicePixelRatio);
//         renderer.setSize(window.innerWidth, window.innerHeight);
//
//         //ITS ALIIIIIIIIIVE
//         container.appendChild(renderer.domElement);
//
//         //dom events handlers
//         window.addEventListener('resize', this.onWindowResize, false)
//         //document.addEventListener('mousemove', this.onDocumentMouseMove, false);
//
//         // =======================================================================//
//         // Lights and camera                                                      //
//         // =======================================================================//
//
//         var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//         directionalLight.position.set(0, 0, 1);
//         scene.add(directionalLight);
//         var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//         directionalLight.position.set(-1, 0, -1);
//         scene.add(directionalLight);
//         var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//         directionalLight.position.set(1, 1, 0);
//         scene.add(directionalLight);
//
//         var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
//         //scene.add(light);
//
//         camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
//         camera.position.z = 350;
//         camera.position.x = -300;
//         this.camera = camera;
//
//         //orbit controls for debug
//         let controls = new THREE.OrbitControls(camera, renderer.domElement);
//
//         // =======================================================================//
//         // Let's get stared  (ha!)                                                //
//         // =======================================================================//
//         this.animate()
//         this.loadModel();
//         console.debug(this);
//     }
//
//     onWindowResize() {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//     }
//
//     onDocumentMouseMove(event) {
//         mouseX = (event.clientX - windowHalfX) / 2;
//         mouseY = (event.clientY - windowHalfY) / 2;
//     }
//
//     animate() {
//         //fiou dat bind && canvas animation
//         window.requestAnimationFrame(this.animate.bind(this));
//         this.render();
//     }
//
//     render() {
//         //we need to work on theses ones
//         const color = new THREE.Color(0xffffff);
//         //scene.background = new THREE.Color(0x55556d);
//
//         renderer.render(scene, camera);
//     }
// }
// //yay
// let cube = new Cube()

// ===================================//
// ! take json data and display them  //
// ==================================//

Loader.loadData('data/data.json', function(data) {
  data = JSON.parse(data);
  const s1 = data.story1;
  console.log(s1.title);

  function launch() {

    const story1 = MyApp.templates.story1(s1);

    $('#story1').html(story1);
    // console.log($('#test'));
    // console.log(document.querySelector('#test'));
  }

  launch();
});
