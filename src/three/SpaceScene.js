import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SelectiveBloom from './SelectiveBloom';
import bgImage from '../resources/images/background.png';
import { baseColors, materials } from './materials';
import objects from './objects';
import positions from './positions';
import generateStars from './generateStars';

export default function SpaceScene() {
  useEffect(() => {
    // SCENE AND RENDERER
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGL1Renderer({ canvas: document.querySelector('#bg') });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // HELPERS
    // const gridHelper = new THREE.GridHelper(500, 500);
    // scene.add(gridHelper);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // BACKGROUND
    const backgroundImg = new THREE.TextureLoader().load(bgImage);
    const blackoutBG = () => { scene.background = null; };
    const spaceBG = () => { scene.background = backgroundImg; };

    // MATERIAL HANDLING
    const blackoutMat = (targetMat) => { targetMat.color.set(0x000000); };
    const recolorMat = (targetMat) => { targetMat.color.set(baseColors[targetMat.name]); };

    // OBJECT HANDLING
    const spawnObj = (obj) => {
      const newObj = obj.mesh;
      scene.add(newObj);
      newObj.position.set(obj.pos.x, obj.pos.y, obj.pos.z);
      return newObj;
    };
    const rotateObj = (obj, rate = 0.005) => {
      const target = obj;
      target.rotation.x += rate;
      target.rotation.y += rate;
      target.rotation.z += rate;
    };

    // SPAWN OBJECTS
    // Avatar
    const avatar = window.location.pathname.includes('projects')
      ? spawnObj(objects.smallBox)
      : spawnObj(objects.avatarBox);

    // Sun, Moon, Stars
    generateStars(scene, 300, 350);
    const sun = spawnObj(objects.sun);
    const moon = spawnObj(objects.moon);

    // Satellite
    const satOrbit = spawnObj({ mesh: new THREE.Object3D(), pos: positions.moon });
    const satellite = objects.satellite.mesh;
    satellite.position.x += 2;
    satellite.rotation.x = -90;
    satOrbit.rotation.x -= 0.3;
    satOrbit.rotation.y -= 0.5;
    satOrbit.add(satellite);

    // Spaceship
    spawnObj(objects.spaceShip);

    // Wire Objects
    const sphere = spawnObj(objects.planetSphere);
    const ring = spawnObj(objects.planetRing);
    ring.rotation.x = -10;
    const wireObjects = [
      objects.coil,
      objects.d4,
      objects.d6,
      objects.d8,
      objects.d12,
      objects.d20,
      objects.cylinder,
      objects.knot,
      objects.cone,
      objects.torus,
    ];
    const rotatingObjects = wireObjects.map(spawnObj);

    // ANIMATION
    const animateObjects = () => {
      // Celestial Objects
      moon.rotation.y += 0.0008;
      satOrbit.rotation.y += 0.01;
      sun.rotation.y += 0.0005;

      // Wire Objects
      rotateObj(sphere, 0.003);
      ring.rotation.z += 0.005;
      rotatingObjects.forEach((obj) => rotateObj(obj));
    };

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    );
    const moveCamera = () => {
      const t = document.body.getBoundingClientRect().top;

      camera.position.z = t * -0.02 + 1;
      camera.position.x = t * -0.02;
      camera.position.y = t * -0.01;

      avatar.rotation.y = t * 0.004;
      avatar.rotation.z = t * 0.004;
    };
    document.body.onscroll = moveCamera;
    const controls = new OrbitControls(camera, renderer.domElement);

    // SHADER
    const brightBloomTargets = ['sun', 'star'];
    const softBloomTargets = ['wire'];
    const noBloomTargets = ['avatar', 'moon', 'satellite'];
    const sb = new SelectiveBloom(scene, camera, renderer);
    const runShader = () => {
      // 1st Pass: Bright Bloom
      // gridHelper.material.color.set(0x000000);
      blackoutBG();
      softBloomTargets.forEach((obj) => blackoutMat(materials[obj]));
      noBloomTargets.forEach((obj) => blackoutMat(materials[obj]));
      sb.bloom1.render();

      // 2nd Pass: Soft Bloom
      brightBloomTargets.forEach((obj) => blackoutMat(materials[obj]));
      softBloomTargets.forEach((obj) => recolorMat(materials[obj]));
      sb.bloom2.render();

      // Final Pass: No Bloom
      // gridHelper.material.color.set(0xffffff);
      brightBloomTargets.forEach((obj) => recolorMat(materials[obj]));
      noBloomTargets.forEach((obj) => recolorMat(materials[obj]));
      spaceBG();
      sb.final.render();
    };

    // WINDOW RESIZE HANDLING
    window.onresize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      // sb.bloom1.setSize(
      //   width * window.devicePixelRatio,
      //   height * window.devicePixelRatio,
      // );
      // sb.bloom2.setSize(
      //   width * window.devicePixelRatio,
      //   height * window.devicePixelRatio,
      // );
      sb.final.setSize(
        width * window.devicePixelRatio,
        height * window.devicePixelRatio,
      );
    };

    // RENDER LOOP
    const renderLoop = () => {
      requestAnimationFrame(renderLoop);
      animateObjects();
      runShader();
      // renderer.render(scene, camera);
      controls.update();
    };
    renderLoop();
  }, []);
  return <></>;
}
