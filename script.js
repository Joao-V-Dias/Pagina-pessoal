import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const home = document.querySelector(".home");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

// Configurando o renderizador
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
home.appendChild(renderer.domElement);

const loader = new GLTFLoader();

let planetModel;

loader.load(
  "./img/stylized_planet.glb",
  function (gltf) {
    planetModel = gltf.scene; // Armazena o modelo carregado na variável
    scene.add(planetModel);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

camera.position.z = 5;

document.addEventListener("mousemove", function (event) {
  const rotationX = (event.pageY / window.innerHeight) * Math.PI * 0.05;
  const rotationY = (event.pageX / window.innerWidth) * Math.PI * 0.05;

  planetModel.rotation.x = rotationX;
  planetModel.rotation.y = rotationY;
});

function animate() {
  requestAnimationFrame(animate);

  const time = performance.now() * 0.00008;
  const radius = 2.5;
  const cameraX = Math.sin(time) * radius;
  console.log(cameraX)
  const cameraZ = Math.cos(time) * radius;
  camera.position.set(cameraX, 0, cameraZ);

  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

animate();
