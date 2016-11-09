export class Cube {
    switchInteruptor(pos) {}

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
                        b: 255 / 255,

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



            // =======================================================================//
            // RESET ANCHOR POINT :: WORK IN progress                                 //
            // =======================================================================//

            if (texture.geometry.boundingSphere) {
                //  let mesh2 = cubeBase.children.filter((m) => m.id === 36);

                let objMesh = texture;
                let geom = texture.geometry;
                geom.vertices = [];
                geom.vertices.push(texture.geometry.boundingSphere.center);

                objMesh.centroid = new THREE.Vector3();
                for (let i = 0, l = geom.vertices.length; i < l; i++) {
                    for (let i = 0, l = geom.vertices.length; i < l; i++) {
                        objMesh.centroid.add(geom.vertices[i].clone());
                    }
                    objMesh.centroid.divideScalar(geom.vertices.length);
                    let offset = objMesh.centroid.clone();

                    objMesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-offset.x, -offset.y, -offset.z));

                    objMesh.position.copy(objMesh.centroid);

                }
            }
        })
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
                        case 19 :
                        mesh.rotation.x += Math.PI / 4;
                    }
                }, false);
            });

            //send new model to the Cube Class
            this.group = model;

        }, onProgress, onError);
    }

    constructor() {
        this.container
        this.themes = [
            {
                name: "retro",
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
                name: "sunset",
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
                name: "fresh",
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
            }
        ]
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
        this.camera.position.z = 350;
        this.camera.position.x = -300;
        this.camera = camera;

        //orbit controls for debug
        let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        // =======================================================================//
        // Let's get stared  (ha!)                                                //
        // =======================================================================//
        this.animate()
        this.loadModel();
        console.debug(this);

        //dom events handlers
        window.addEventListener('resize', this.onWindowResize, false)
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        //fiou dat bind && canvas animation
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
    }

    render() {
        //we need to work on theses ones
        var color = new THREE.Color(0xffffff);
        //this.scene.background = new THREE.Color(0x55556d);

        this.renderer.render(this.scene, this.camera);
    }
}
