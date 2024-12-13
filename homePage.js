import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 50;

//canvas
let canvas = document.getElementById("textCanvas")
const ctx = canvas.getContext('2d');

// Set the canvas size to fill the screen
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`;

// Adjust the canvas resolution for the device pixel ratio
const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;

// Scale the drawing context to compensate for the increased resolution
ctx.scale(dpr, dpr);

// Set the font and style
ctx.font = "20px JetBrains Mono";
ctx.fillStyle = "white";


const scene = new THREE.Scene();
let model;
let logo = document.getElementById("logoAnimated")
let mixer;
const loader = new GLTFLoader();
loader.load('/models/machine.glb',
    function (gltf) {
        model = gltf.scene;
        scene.add(model);
        model.position.z = 0
        mixer = new THREE.AnimationMixer(model);
        //mixer.clipAction(gltf.animations[0]).play();
        modelMove();
    },
    function (xhr) {},
    function (error) {}
);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
topLight.position.set(500, 500, 500);
scene.add(topLight);






const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.02);
    //if(model) model.rotation.y += 0.05
};
reRender3D();

let textToDisplay = [
    {
        id: 'logo',
        position: {x: 10, y: 10},
        dimension: {w: 100, h: 100},
        text:""
    },
    {
        id: 'aboutRema',
        position: {x: canvas.width*0.3, y: canvas.height*0.15},
        dimension: {w: 500, h: 50},
        text:"ReMa is a groundbreaking company dedicated to revolutionizing manufacturing and waste management.\Our flagship product is a state-of-the-art 3D printing machine capable of melting and reusing any material an infinite number of times.\With a mission to eliminate waste and empower creativity, ReMa bridges cutting-edge technology with environmental responsibility.\Designed for industries and individuals alike, our printer redefines sustainability by transforming discarded materials into valuable resources.\At ReMa, we believe in a future where nothing goes to waste, and innovation drives a cleaner, greener world."
    },
    {
        id: "aboutMachine",
        position: { x: canvas.width*0.3, y: canvas.height*0.1},
        dimension: {w: 500, h: 100},
        text:"The ReMa 3D Printer is a revolutionary device that transforms manufacturing and recycling. This advanced machine can melt and reuse any material an unlimited number of times, turning waste into endless opportunities. With its versatile design and eco-friendly functionality, the printer caters to industries, creators, and innovators, enabling them to produce sustainable products without compromising quality. Compact, efficient, and easy to use, the ReMa 3D Printer represents the future of circular technology, making waste a thing of the past."
    },
    {
        id: "machineDetail1",
        position: { x: canvas.width*0.05, y: canvas.height*0.3},
        dimension: {w: 500, h: 100},
        text:"For complex materials or composites, the machine uses a plasma arc decomposition to break them down into basic molecular components. These components could then be restructured into reusable forms."
    },
    {
        id: "machineDetail2",
        position: { x: canvas.width*0.05, y: canvas.height*0.3},
        dimension: {w: 500, h: 100},
        text:"For materials that cannot be melted with heat alone, the machine deploys a universal solvent system that chemically dissolves the material into a liquid state. This process is followed by evaporation of the solvent, leaving the pure material behind."
    },
    {
        id: "machineDetail3",
        position: { x: canvas.width*0.35, y: canvas.height*0.1},
        dimension: {w: 500, h: 100},
        text:"Then, all the materials stored are re-assembled into the printing chamber. Our great sorting technology allows the machine to switch between materials for seamless printing of a huge array of possible devices or structures"
    },
    {
        id: "machineDetail4",
        position: { x: canvas.width*0.3, y: canvas.height*0.1},
        dimension: {w: 500, h: 100},
        text:"All the processes required to manage our machines can be reviewed and controlled from the built-in terminal. This display can show all sorts of information, from remaining time left of the print to the amount of material of each type left in the machine's storage"
    },
    {
        id: "end",
        position: { x: 0.8, y: -1 },
        dimension: {w: 100, h: 100},
        text:""
    },
]

let arrPositionModel = [
    {
        id: 'logo',
        opacity: 0.0,
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0},
        logo:{x:0,y:50,width:50,opacity:1}
    },
    {
        id: 'aboutRema',
        opacity: 0.0,
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0},
        logo:{x:-50,y:50,width:40,opacity:1}
    },
    {
        id: "aboutMachine",
        opacity: 1.0,
        position: { x: -2, y: -2, z: 5 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
        logo:{x:0,y:0,width:50,opacity:0}
    },
    {
        id: "machineDetail1",
        opacity: 1.0,
        position: { x: 0, y: -2, z: 30 },
        rotation: { x: 0.5, y: 1, z: 0 },
        logo:{x:-70,y:50,width:30,opacity:0}
    },
    {
        id: "machineDetail2",
        opacity: 1.0,
        position: { x: 2, y: 0, z: 30 },
        rotation: { x: 0.5, y: 1, z: 0 },
        logo:{x:-70,y:50,width:30,opacity:0}
    },
    {
        id: "machineDetail3",
        opacity: 1.0,
        position: { x: -1.5, y: -1, z: 30},
        rotation: { x: 0.3, y: -1, z: 0 },
        logo:{x:-70,y:50,width:30,opacity:0}
    },
    {
        id: "machineDetail4",
        opacity: 1.0,
        position: { x: -3.4, y: -0.5, z: 40},
        rotation: { x: 0.3, y: -1, z: 0 },
        logo:{x:-70,y:50,width:30,opacity:0}
    },
    {
        id: "end",
        opacity: 0.0,
        position: { x: 0.8, y: -1, z: 0 },
        rotation: { x: 0.3, y: -0.5, z: 0 },
        logo:{x:-70,y:50,width:30,opacity:0}
    },
];


function textSquare(x, y, w, h, text) {
    const lineHeight = 20; // Adjust based on font size
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';

    // Ensure `ctx` is defined
    if (!ctx) {
        console.error("Canvas context (ctx) is not defined.");
        return;
    }

    // Split text into lines that fit within the width
    for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = ctx.measureText(testLine).width;

        if (testWidth > w) {
            if (currentLine) {
                lines.push(currentLine); // Finalize the current line
            }
            currentLine = word; // Start a new line with the current word
        } else {
            currentLine = testLine; // Append the word to the current line
        }
    }

    // Push the last line
    if (currentLine) {
        lines.push(currentLine);
    }
    console.log(lines)
    // Render all lines without height limitation
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, y + i * lineHeight);
    }
}

const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        let text_coords = textToDisplay[position_active]
        //print textSquare
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        textSquare(text_coords.position.x,text_coords.position.y,text_coords.dimension.w,text_coords.dimension.h,text_coords.text)
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
        gsap.to(logo, {
            transform: `translate(${new_coordinates.logo.x}%, ${new_coordinates.logo.y}%)`,
            width: `${new_coordinates.logo.width}%`,
            opacity:new_coordinates.logo.opacity,
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
}
window.addEventListener('scroll', () => {
    if (model) {
        modelMove();
    }
})
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})