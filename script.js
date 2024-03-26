import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
let mouseX = 0;
let mouseY = 0;

const teste = document.querySelector(".home");

teste.addEventListener("mousemove", (event) => {
  console.log("Passou");

  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

// Configurando o renderizador com transparência
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Define alpha como true para permitir transparência
renderer.setSize(window.innerWidth, window.innerHeight);
teste.appendChild(renderer.domElement);

const loader = new GLTFLoader(); // Usando GLTFLoader diretamente

let astronautModel; // Variável para armazenar o modelo do Porsche

loader.load(
  "./img/little_astronaut.glb",
  function (gltf) {
    astronautModel = gltf.scene; // Armazena o modelo carregado na variável
    scene.add(astronautModel);

    astronautModel.position.set(0, -1.7, 0);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

camera.position.z = 5;

// Adiciona uma luz direcional à cena
const directionalLight = new THREE.DirectionalLight(0xc986e0, 5);

function animate() {
  requestAnimationFrame(animate);

  if (astronautModel) {
    astronautModel.rotation.y += 0.008; // Rotaciona em torno do eixo y
  }

  directionalLight.position.x = mouseX;
  directionalLight.position.y = mouseY;
  scene.add(directionalLight);

  renderer.render(scene, camera);
}

animate();
