import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SelectiveBloom from './animation/SelectiveBloom';
import bgImage from './resources/images/background.png';
import portraitImage from './resources/images/portrait.jpeg';
import moonImage from './resources/images/moon.jpg';
import moonNormal from './resources/images/moonNormal.png';
import sunImage from './resources/images/sun.jpg';
import sunNormal from './resources/images/sunNormal.jpg';
import Initialize from './Initialize';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import colorScheme from './JSON/globalVars/colorScheme.json';

import 'bootstrap/dist/css/bootstrap.min.css';
import { firebaseConfig } from './api/apiKeys';

firebase.initializeApp(firebaseConfig);

// HELPERS
// const gridHelper = new THREE.GridHelper(500, 500);
// scene.add(gridHelper);

// SCENE
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer({ canvas: document.querySelector('#bg') });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// LIGHTING
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// BACKGROUND
const backgroundImg = new THREE.TextureLoader().load(bgImage);
const blackoutBG = () => { scene.background = null; };
const spaceBG = () => { scene.background = backgroundImg; };

// MATERIALS
const wireMaterial = new THREE.MeshBasicMaterial({ color: colorScheme.textColor, wireframe: true });
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const blackoutMat = (mat) => { mat.color.set(0x000000); };
const recolorMat = (mat, color) => { mat.color.set(color); };

// OBJECTS
const spawnObj = (mesh, pos) => {
  const newObj = mesh;
  scene.add(newObj);
  newObj.position.set(pos.x, pos.y, pos.z);
  return newObj;
};
const rotationRate = 0.005;
const wireObjects = [];
const rotateObj = (obj, rate = rotationRate) => {
  const target = obj;
  target.rotation.x += rate;
  target.rotation.y += rate;
  target.rotation.z += rate;
};

// STARS
const addStar = () => {
  const star = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 24), starMaterial);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(350));
  star.position.set(x, y, z);
  scene.add(star);
};
Array(400).fill().forEach(addStar);

// MOON
const moonTexture = new THREE.TextureLoader().load(moonImage);
const moonNormalTexture = new THREE.TextureLoader().load(moonNormal);
const moonMesh = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: moonNormalTexture, color: 'gray' }),
);
const moon = spawnObj(moonMesh, { x: 140, y: 67.25, z: 110 });

// SUN
const sunTexture = new THREE.TextureLoader().load(sunImage);
const sunNormalTexture = new THREE.TextureLoader().load(sunNormal);
const sunMesh = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({ map: sunTexture, normalMap: sunNormalTexture, color: 'yellow' }),
);
const sun = spawnObj(sunMesh, { x: 120, y: 40, z: -100 });

// AVATAR
const portraitTexture = new THREE.TextureLoader().load(portraitImage);
const portraitBox = new THREE.Mesh(
  new THREE.BoxGeometry(7, 7, 7),
  new THREE.MeshBasicMaterial({ map: portraitTexture, color: 'white' }),
);
const avatar = spawnObj(portraitBox, { x: 0, y: 0, z: -14 });

// WIRE PLANET
const sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(3.5, 6, 6), wireMaterial);
const sphere = spawnObj(sphereMesh, { x: -26, y: 7, z: -25 });
const ringMesh = new THREE.Mesh(new THREE.RingGeometry(5.5, 9, 10, 3), wireMaterial);
const ring = spawnObj(ringMesh, { x: -26, y: 7, z: -25 });
ring.rotation.x = -10;

// WIRE TORUS
const torus = new THREE.Mesh(new THREE.TorusGeometry(7, 2, 4, 10), wireMaterial);
wireObjects.push(spawnObj(torus, { x: 40, y: -13, z: -45 }));

// WIRE D4
const d4 = new THREE.Mesh(new THREE.TetrahedronGeometry(5, 0), wireMaterial);
wireObjects.push(spawnObj(d4, { x: -10, y: 3, z: 9 }));

// WIRE D6
const d6 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), wireMaterial);
wireObjects.push(spawnObj(d6, { x: 35, y: 17, z: 1 }));

// WIRE D8
const d8 = new THREE.Mesh(new THREE.OctahedronGeometry(5, 0), wireMaterial);
wireObjects.push(spawnObj(d8, { x: 15, y: 10, z: 65 }));

// WIRE D12
const d12 = new THREE.Mesh(new THREE.DodecahedronGeometry(5, 0), wireMaterial);
wireObjects.push(spawnObj(d12, { x: 90, y: 10, z: 40 }));

// WIRE D20
const d20 = new THREE.Mesh(new THREE.IcosahedronGeometry(5, 0), wireMaterial);
wireObjects.push(spawnObj(d20, { x: 35, y: 65, z: 100 }));

// WIRE CYLINDER
const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 8, 6, 1), wireMaterial);
wireObjects.push(spawnObj(cylinder, { x: 105, y: 80, z: 50 }));

// WIRE KNOT
const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(5.5, 1.1, 30, 5), wireMaterial);
wireObjects.push(spawnObj(knot, { x: 60, y: 20, z: 157 }));

// WIRE CONE
const cone = new THREE.Mesh(new THREE.ConeGeometry(5, 8, 8, 1), wireMaterial);
wireObjects.push(spawnObj(cone, { x: 105, y: 70, z: 145 }));

// WIRE COIL
const coil = new THREE.Mesh(new THREE.TorusKnotGeometry(2.5, 0.6, 25, 5, 2, 1), wireMaterial);
wireObjects.push(spawnObj(coil, { x: 146, y: 63, z: 123 }));

// CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = (t * -0.02) + 1;
  camera.position.x = t * -0.02;
  camera.position.y = t * -0.01;

  avatar.rotation.y = t * 0.004;
  avatar.rotation.z = t * 0.004;
};
document.body.onscroll = moveCamera;
const controls = new OrbitControls(camera, renderer.domElement);
const sb = new SelectiveBloom(scene, camera, renderer);

// ANIMATION LOOP
const animate = () => {
  requestAnimationFrame(animate);

  // Rotation
  moon.rotation.y += 0.0008;
  sun.rotation.y += 0.0005;
  rotateObj(sphere, 0.003);
  ring.rotation.z += 0.005;
  wireObjects.forEach((obj) => rotateObj(obj));

  // Bright Bloom - Target: Sun, Stars
  blackoutBG();
  blackoutMat(moon.material);
  blackoutMat(wireMaterial);
  blackoutMat(avatar.material);
  sb.bloom1.render();

  // Soft Bloom - Target: Wire Objects
  blackoutMat(sun.material);
  blackoutMat(starMaterial);
  recolorMat(wireMaterial, colorScheme.textColor);
  sb.bloom2.render();

  // No Bloom - Target: All
  spaceBG();
  recolorMat(starMaterial, 'white');
  recolorMat(sun.material, 'yellow');
  recolorMat(moon.material, 'gray');
  recolorMat(avatar.material, 'white');
  sb.final.render();

  // Update
  controls.update();
  // renderer.render(scene, camera);
};
animate();

// DOM
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Initialize />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// /DOM ANIMATION
const sliders = document.querySelectorAll('.slide-in');

const appearOptions = {
  threshold: 0,
  rootMargin: '0px 0px -30% 0px',
};

// eslint-disable-next-line no-shadow
const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

sliders.forEach((slider) => {
  appearOnScroll.observe(slider);
});
