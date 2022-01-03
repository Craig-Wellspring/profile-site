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
import moonNormal from './resources/images/NormalMap.png';
import Initialize from './Initialize';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { firebaseConfig } from './api/apiKeys';

firebase.initializeApp(firebaseConfig);

// INITIALIZE SCENE
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// BACKGROUND
const spaceTexture = new THREE.TextureLoader().load(bgImage);
scene.background = spaceTexture;

// LIGHTING
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// AVATAR
const portraitTexture = new THREE.TextureLoader().load(portraitImage);
const portraitBox = new THREE.Mesh(
  new THREE.BoxGeometry(7, 7, 7),
  new THREE.MeshBasicMaterial({ map: portraitTexture }),
);
scene.add(portraitBox);
portraitBox.position.x = 0;
portraitBox.position.y = 0;
portraitBox.position.z = -14;
// portraitBox.lookAt(0, 0, 0);

// CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = (t * -0.02) + 1;
  camera.position.x = t * -0.01;
  camera.position.y = t * -0.01;

  portraitBox.rotation.y = t * 0.005;
  portraitBox.rotation.z = t * 0.005;
};
document.body.onscroll = moveCamera;

const controls = new OrbitControls(camera, renderer.domElement);

// TORUS
const addTorus = () => {
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshStandardMaterial({ color: 'gray', wireframe: true, wireframeLinewidth: 2 });
  const torus = new THREE.Mesh(geometry, material);

  scene.add(torus);
  torus.position.z = 5;
  torus.position.x = 20;

  return torus;
};
const torus = addTorus();

// STARS
function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(250).fill().forEach(addStar);

// MOON
const moonTexture = new THREE.TextureLoader().load(moonImage);
const normalTexture = new THREE.TextureLoader().load(moonNormal);
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture }),
);
scene.add(moon);
moon.position.z = 60;
moon.position.x = -12;

// ANIMATION LOOP
const animate = () => {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.001;
  moon.rotation.y += 0.0015;
  moon.rotation.z += 0.001;

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
