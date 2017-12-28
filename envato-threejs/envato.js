/* global THREE */
const THREE = require("three");
const OrbitControls = require("three-orbit-controls")(THREE);

var sceneWidth;
var sceneHeight;
var camera;
var scene;
var renderer;
var dom;
var hero;
var sun;
var ground;
var orbitControl;

init();
function init() {
    // set up the scene
    createScene();

    // call game loop
    update();
}

function createScene() {
    // dimensions of viewport
    sceneWidth = window.innerWidth;
    sceneHeight = window.innerHeight;

    scene = new THREE.Scene(); // 3d Scene
    camera = new THREE.PerspectiveCamera(
        60, // fov
        sceneWidth / sceneHeight, // aspect ratio
        0.1, // frustum near plane
        1000 // frustum far plane
    ); // There's also an orthographic camera for RTS shenanigans

    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true }); // Backdrop is transparent
    // post-init config of renderer object
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // cf. BasicShadowMap
    renderer.setSize(sceneWidth, sceneHeight); // I guess this is can be made dynamic?
    
    // Dom
    dom = document.getElementById('TutContainer');
    // Dom manipulation
    dom.appendChild(renderer.domElement);

    // Hero
    var heroGeometry = new THREE.BoxGeometry(1, 1, 1);
    var heroMaterial = new THREE.MeshStandardMaterial({ color: 0x883333 });
    hero = new THREE.Mesh(heroGeometry, heroMaterial);
    hero.castShadow = true;
    hero.receiveShadow = false;
    hero.position.y = 2;
    scene.add(hero);

    // World
    var planeGeometry = new THREE.PlaneGeometry(5, 5, 4, 4);
    var planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    ground = new THREE.Mesh(planeGeometry, planeMaterial);
    ground.receiveShadow = true;
    ground.castShadow = false; // Interesting!
    ground.rotation.x = -Math.PI/2;
    scene.add(ground);
    
    // Camera position
    camera.position.z = 5;
    camera.position.y = 1;

    // Global directional light ~= Sun
    sun = new THREE.DirectionalLight(0xffffff, 0.8);
    sun.position.set(0,4,1);
    sun.castShadow = true; // not sure how this logic works
    scene.add(sun);
    // Shadow Properties for sun
    sun.shadow.mapSize.width = 256;
    sun.shadow.mapSize.height = 256;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;

    // Orbit controls (lets us rotate around in scene?)
    // NOTE! This requires the use of npm install three-orbit-controls
    orbitControl = new OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', render);
    //orbitControl.enableDamping = true;
    //orbitControl.dampingFactor = 0.8;
    orbitControl.enableZoom = false;

    //var helper = new THREE.CameraHelper(sun.shadow.camera);
    //scene.add(helper); // enable to see the light cone

    window.addEventListener('resize', onWindowResize, false); // resize callback
}

function update() {
    // animate
    hero.rotation.x += 0.01;
    hero.rotation.y += 0.01;
    render();
    requestAnimationFrame(update);
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    // resize & align
    sceneWidth = window.innerWidth;
    sceneHeight = window.innerHeight;    
    renderer.setSize(sceneWidth, sceneHeight);
    camera.aspect = sceneWidth/sceneHeight;
    camera.updateProjectionMatrix();
}