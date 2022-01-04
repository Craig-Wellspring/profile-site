import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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

// THREE CONFIG
const material = new THREE.MeshBasicMaterial({ color: colorScheme.textColor, wireframe: true });
const rotationRate = 0.005;

// INITIALIZE SCENE
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer({ canvas: document.querySelector('#bg') });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// BACKGROUND
scene.background = new THREE.TextureLoader().load(bgImage);

// LIGHTING
// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(ambientLight);

// HELPERS
// const gridHelper = new THREE.GridHelper(500, 500);
// scene.add(gridHelper);

// AVATAR
const addAvatar = () => {
  const portraitTexture = new THREE.TextureLoader().load(portraitImage);
  const portraitBox = new THREE.Mesh(
    new THREE.BoxGeometry(7, 7, 7),
    new THREE.MeshBasicMaterial({ map: portraitTexture }),
  );
  scene.add(portraitBox);
  portraitBox.position.x = 0;
  portraitBox.position.y = 0;
  portraitBox.position.z = -14;
  return portraitBox;
};
const avatar = addAvatar();

// CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = (t * -0.02) + 1;
  camera.position.x = t * -0.02;
  camera.position.y = t * -0.01;

  avatar.rotation.y = t * 0.005;
  avatar.rotation.z = t * 0.005;
};
document.body.onscroll = moveCamera;
const controls = new OrbitControls(camera, renderer.domElement);

// STARS
function addStar() {
  const star = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
  );
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(350));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(1800).fill().forEach(addStar);

// MOON
const addMoon = () => {
  const moonTexture = new THREE.TextureLoader().load(moonImage);
  const normalTexture = new THREE.TextureLoader().load(moonNormal);
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshBasicMaterial({ map: moonTexture, normalMap: normalTexture }),
  );
  scene.add(moon);
  moon.position.x = 140;
  moon.position.y = 68;
  moon.position.z = 110;
  return moon;
};
const moon = addMoon();

// SUN
const addSun = () => {
  const sunTexture = new THREE.TextureLoader().load(sunImage);
  const normalTexture = new THREE.TextureLoader().load(sunNormal);
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(10, 32, 32),
    new THREE.MeshBasicMaterial({ map: sunTexture, normalMap: normalTexture }),
  );
  scene.add(sun);
  sun.position.x = 120;
  sun.position.y = 40;
  sun.position.z = -100;
  return sun;
};
addSun();

// WIRE PLANET
const addSphere = () => {
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 5, 5), material);
  scene.add(sphere);
  sphere.position.x = -35;
  sphere.position.y = 8;
  sphere.position.z = -30;
  return sphere;
};
const addRing = () => {
  const ring = new THREE.Mesh(new THREE.RingGeometry(5, 8, 10, 3), material);
  scene.add(ring);
  ring.position.x = -35;
  ring.position.y = 8;
  ring.position.z = -30;
  ring.rotation.x = 100;
  return ring;
};
const sphere = addSphere();
const ring = addRing();

// WIRE TORUS
const addTorus = () => {
  const torus = new THREE.Mesh(new THREE.TorusGeometry(7, 2, 4, 10), material);
  scene.add(torus);
  torus.position.x = 40;
  torus.position.y = -13;
  torus.position.z = -45;
  return torus;
};
const torus = addTorus();

// WIRE D4
const addD4 = () => {
  const d4 = new THREE.Mesh(new THREE.TetrahedronGeometry(5, 0), material);
  scene.add(d4);
  d4.position.x = -10;
  d4.position.y = 3;
  d4.position.z = 9;
  return d4;
};
const d4 = addD4();

// WIRE D6
const addD6 = () => {
  const d6 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), material);
  scene.add(d6);
  d6.position.x = 35;
  d6.position.y = 17;
  d6.position.z = 1;
  return d6;
};
const d6 = addD6();

// WIRE D8
const addD8 = () => {
  const d8 = new THREE.Mesh(new THREE.OctahedronGeometry(5, 0), material);
  scene.add(d8);
  d8.position.x = 15;
  d8.position.y = 10;
  d8.position.z = 65;
  return d8;
};
const d8 = addD8();

// WIRE D12
const addD12 = () => {
  const d12 = new THREE.Mesh(new THREE.DodecahedronGeometry(5, 0), material);
  scene.add(d12);
  d12.position.x = 90;
  d12.position.y = 10;
  d12.position.z = 40;
  return d12;
};
const d12 = addD12();

// WIRE D20
const addD20 = () => {
  const d20 = new THREE.Mesh(new THREE.IcosahedronGeometry(5, 0), material);
  scene.add(d20);
  d20.position.x = 35;
  d20.position.y = 65;
  d20.position.z = 100;
  return d20;
};
const d20 = addD20();

// WIRE KNOT
const addKnot = () => {
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(5, 1.2, 32, 8), material);
  scene.add(knot);
  knot.position.x = 60;
  knot.position.y = 20;
  knot.position.z = 157;
  return knot;
};
const knot = addKnot();

// ANIMATION LOOP
const rotateObj = (obj, rate = rotationRate) => {
  const target = obj;
  target.rotation.x += rate;
  target.rotation.y += rate;
  target.rotation.z += rate;
};

const animate = () => {
  requestAnimationFrame(animate);

  rotateObj(torus);
  rotateObj(sphere, 0.003);
  ring.rotation.z += 0.005;
  rotateObj(d4);
  rotateObj(d6);
  rotateObj(d8);
  rotateObj(d12);
  rotateObj(d20);
  rotateObj(knot);
  rotateObj(moon, 0.001);

  controls.update();
  renderer.render(scene, camera);
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
