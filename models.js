import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    10,
    539 / 539,
    0.1,
    1000
);
camera.position.z = 50;

const scene = new THREE.Scene();
let model;
let mixer;
const loader = new GLTFLoader();
loader.load('/models/machine.glb',
    function (gltf) {
        model = gltf.scene;
        scene.add(model);
        model.position.z = 0
        mixer = new THREE.AnimationMixer(model);
        modelMove();
    },
    function (xhr) {},
    function (error) {}
);
let renderers = []

let frames = document.querySelectorAll('.container3D_small')
frames.forEach(element => {
    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(539, 539);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.transform = 'translate(0px, -539px)';
    renderer.domElement.classList.add("chulardo")
    element.appendChild(renderer.domElement); // Append the new child to the current element
    renderers.push(renderer)
});



// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
topLight.position.set(500, 500, 500);
scene.add(topLight);






const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderers.forEach(renderer =>{
        renderer.render(scene, camera);
        if(mixer) mixer.update(0.02);
    })
    //if(model) model.rotation.y += 0.05
};
reRender3D();

let arrPositionModel = [
    {
        id: 'unselected',
        opacity: 1.0,
        position: {x: 0, y: 0, z: 0},
        rotation: { x: 0.5, y: -0.5, z: 0 }
    },
    {
        id: 'selected',
        opacity: 1.0,
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0.5, y: -0.5, z: 0}
    }
    
];

// Select the element you want to monitor
const modelCards = document.querySelectorAll('.model-card');
let state = 0

modelCards.forEach(element => {
    // Add event listeners for mouseenter and mouseleave
    element.addEventListener('mouseenter', () => {
        state = 1
        modelMove()
    });

    element.addEventListener('mouseleave', () => {
        state = 0
        modelMove()
    });
});



const modelMove = () => {
    let new_coordinates = arrPositionModel[state];
    console.log(new_coordinates)
    //move model
    gsap.to(model.position, {
        x: new_coordinates.position.x,
        y: new_coordinates.position.y,
        z: new_coordinates.position.z,
        duration: 1,
        ease: "power1.out"
    });
    gsap.to(model.rotation, {
        x: new_coordinates.rotation.x,
        y: new_coordinates.rotation.y,
        z: new_coordinates.rotation.z,
        duration: 1,
        ease: "power1.out"
    })
    for (let index = 0; index < model.children[0].children.length; index++) {
        const mesh = model.children[0].children[index];
        mesh.material.transparent = true
        gsap.to(mesh.material, {
            opacity: new_coordinates.opacity,
            duration: 1,
            ease: "power1.out"
        })
    }        
}

