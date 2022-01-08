import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SelectiveBloom from './SelectiveBloom';
import bgImage from '../resources/images/background.png';
import colorScheme from '../JSON/globalVars/colorScheme.json';
import meshes from './meshes';
import materials from './materials';
import objects from './objects';

export default function SpaceScene() {
  useEffect(() => {
    // HELPERS
    // const gridHelper = new THREE.GridHelper(500, 500);
    // scene.add(gridHelper);

    // SCENE
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGL1Renderer({
      canvas: document.querySelector('#bg'),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // BACKGROUND
    const backgroundImg = new THREE.TextureLoader().load(bgImage);
    const blackoutBG = () => { scene.background = null; };
    const spaceBG = () => { scene.background = backgroundImg; };

    // MATERIAL HANDLING
    const blackoutMat = (mat) => { mat.color.set(0x000000); };
    const recolorMat = (mat, color) => { mat.color.set(color); };

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

    // AVATAR
    const avatar = window.location.pathname.includes('projects')
      ? spawnObj(objects.smallBox)
      : spawnObj(objects.avatarBox);

    // STARS
    const addStar = () => {
      const { star } = meshes;
      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(350));
      star.position.set(x, y, z);
      scene.add(star);
    };
    Array(400).fill().forEach(addStar);

    // CELESTIAL OBJECTS
    const moon = spawnObj(objects.moon);
    const satellite = moon.add(objects.satellite.mesh);
    // console.warn(satellite);
    const sun = spawnObj(objects.sun);

    // WIRE OBJECTS
    const sphere = spawnObj(objects.planetSphere);
    const ring = spawnObj(objects.planetRing);
    ring.rotation.x = -10;
    const wireObjects = [
      objects.torus,
      objects.d4,
      objects.d6,
      objects.d8,
      objects.d12,
      objects.d20,
      objects.cylinder,
      objects.knot,
      objects.cone,
      objects.coil,
    ];
    const rotatingObjects = wireObjects.map(spawnObj);

    // ANIMATION
    const animateObjects = () => {
      // Celestial Objects
      moon.rotation.y += 0.0008;
      satellite.rotation.y += 0.001;
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
    const sb = new SelectiveBloom(scene, camera, renderer);
    const runShader = () => {
      // Bright Bloom - Target: Sun, Stars
      blackoutBG();
      blackoutMat(materials.moon);
      blackoutMat(materials.satellite);
      blackoutMat(materials.wire);
      blackoutMat(materials.avatar);
      sb.bloom1.render();

      // Soft Bloom - Target: Wire Objects
      blackoutMat(materials.sun);
      blackoutMat(materials.star);
      recolorMat(materials.wire, colorScheme.textColor);
      sb.bloom2.render();

      // No Bloom - Target: All
      spaceBG();
      recolorMat(materials.star, 'white');
      recolorMat(materials.sun, 'yellow');
      recolorMat(materials.moon, 'gray');
      recolorMat(materials.satellite, 'gray');
      recolorMat(materials.avatar, 'white');
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
      controls.update();
      // renderer.render(scene, camera);
    };
    renderLoop();
  }, []);
  return <></>;
}
