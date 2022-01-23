import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SelectiveBloom from './SelectiveBloom';
import bgImage from '../resources/images/background.png';
import { baseColors, materials } from './materials';
import geometries from './geometries';
import objects from './objects';
import positions from './positions';
import generateStars from './generateStars';

export default function SpaceScene() {
  useEffect(() => {
    // SCENE AND RENDERER
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGL1Renderer({
      canvas: document.querySelector('#bg'),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // HELPERS
    // const gridHelper = new THREE.GridHelper(500, 500);
    // scene.add(gridHelper);

    // LIGHTING
    const sunlight = new THREE.PointLight(0xffffff, 1.2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const avatarLight = new THREE.PointLight(0xffffff, 0.59);
    avatarLight.position.set(3, 0.8, 2.5);
    scene.add(avatarLight);

    // BACKGROUND
    const backgroundImg = new THREE.TextureLoader().load(bgImage);
    const blackoutBG = () => {
      scene.background = null;
    };
    const spaceBG = () => {
      scene.background = backgroundImg;
    };

    // MATERIAL HANDLING
    const blackoutMat = (targetMat) => {
      targetMat.color.set(0x000000);
    };
    const recolorMat = (targetMat) => {
      targetMat.color.set(baseColors[targetMat.name]);
    };

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
    const degToRad = (deg) => deg * (Math.PI / 180.0);

    // SPAWN OBJECTS
    // Avatar
    const avatar = window.location.pathname.includes('projects')
      ? spawnObj(objects.smallBox)
      : spawnObj(objects.avatarBox);

    // Wire Objects
    const planet = spawnObj(objects.planetSphere);
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

    // Sun, Moon, Stars
    generateStars(scene, 300, 350);
    const sun = spawnObj(objects.sun);
    sun.add(sunlight);
    const moon = spawnObj(objects.moon);

    // Satellite
    const satOrbit = spawnObj({
      mesh: new THREE.Object3D(),
      pos: positions.moon,
    });
    const satellite = objects.satellite.mesh;
    satellite.position.x += 2;
    satellite.rotation.x = -90;
    satOrbit.rotation.x -= 0.3;
    satOrbit.rotation.y -= 0.5;
    satOrbit.add(satellite);
    const satelliteEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometries.satellite),
      materials.satelliteEdges,
    );
    satellite.add(satelliteEdges);

    // Spaceship
    const spaceShip = spawnObj(objects.spaceShip);
    spaceShip.rotateX(degToRad(105));
    const spaceShipEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometries.spaceShip),
      materials.spaceShipEdges,
    );
    spaceShip.add(spaceShipEdges);
    const spaceShipEngine = spawnObj(objects.spaceShipEngine);
    spaceShip.attach(spaceShipEngine);
    rotatingObjects.push(spaceShipEngine);
    const shipAnchor = spawnObj({
      mesh: new THREE.Object3D(),
      pos: positions.spaceShip,
    });
    shipAnchor.attach(spaceShip);

    // Space Ship Path
    const pathPoints = 40; // Lower numbers = fewer turns
    const pathSegments = 10000; // Lower numbers = faster movement

    let shipPosIndex = 0;
    const randomPoints = [];
    Array(pathPoints).fill().map(() => randomPoints.push(
      new THREE.Vector3(
        Math.random() * 300 - 100,
        Math.random() * 150 - 25,
        Math.random() * 300 - 100,
      ),
    ));
    const spline = new THREE.CatmullRomCurve3(randomPoints, true, 'chordal');

    // ANIMATION
    const animateObjects = () => {
      // Space Ship
      shipPosIndex += 1;
      if (shipPosIndex > pathSegments) shipPosIndex = 0;
      const shipPos = spline.getPoint(shipPosIndex / pathSegments);
      shipAnchor.position.set(shipPos.x, shipPos.y, shipPos.z);
      const shipRot = spline.getTangent(shipPosIndex / pathSegments);
      shipAnchor.rotation.set(shipRot.x, shipRot.y, shipRot.z);

      shipAnchor.lookAt(spline.getPoint((shipPosIndex + 1) / pathSegments));
      spaceShip.rotation.z += 0.1;

      // Celestial Objects
      moon.rotation.y += 0.0008;
      satOrbit.rotation.y += 0.01;
      sun.rotation.y += 0.0005;

      // Wire Objects
      rotateObj(planet, 0.003);
      ring.rotation.z += 0.005;
      rotatingObjects.forEach((obj) => rotateObj(obj));
    };

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      75, // Field of View
      window.innerWidth / window.innerHeight, // Size
      1, // Near Clip
      1000, // Far Clip
    );
    const moveCamera = () => {
      const scrollDistance = document.body.getBoundingClientRect().top;

      camera.position.z = scrollDistance * -0.02 + 1;
      camera.position.x = scrollDistance * -0.02;
      camera.position.y = scrollDistance * -0.01;

      avatar.rotation.y = scrollDistance * 0.004;
      avatar.rotation.z = scrollDistance * 0.004;
    };
    document.body.onscroll = moveCamera;
    const controls = new OrbitControls(camera, renderer.domElement);

    // SHADER
    const sb = new SelectiveBloom(scene, camera, renderer);
    const brightBloomTargets = ['sun', 'star', 'spaceShipEngine'];
    const softBloomTargets = ['wire', 'spaceShipEdges', 'satelliteEdges'];
    const noBloomTargets = ['avatar', 'moon', 'satellite', 'spaceShip'];
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

    // UPDATE LOOP
    const update = () => {
      requestAnimationFrame(update);

      animateObjects();
      runShader(); // renderer.render(scene, camera);
      controls.update();
    };
    update();
  }, []);
  return <></>;
}
