import * as THREE from 'three';
import portraitImage from '../resources/images/portrait.jpeg';
import moonImage from '../resources/images/moon.jpg';
// import moonNormal from '../resources/images/moonNormal.png';
import sunImage from '../resources/images/sun.jpg';
import sunNormal from '../resources/images/sunNormal.jpg';
import colorScheme from '../resources/JSON/globalVars/colorScheme.json';

const moonTexture = new THREE.TextureLoader().load(moonImage);
// const moonNormalTexture = new THREE.TextureLoader().load(moonNormal);
const sunTexture = new THREE.TextureLoader().load(sunImage);
const sunNormalTexture = new THREE.TextureLoader().load(sunNormal);
const portraitTexture = new THREE.TextureLoader().load(portraitImage);

export const baseColors = {
  star: 'white',
  sun: 'palegoldenrod',
  moon: '#A0A0A0',
  satellite: colorScheme.backgroundColor,
  satelliteEdges: colorScheme.highlightColor,
  spaceShip: colorScheme.backgroundColor,
  spaceShipEdges: colorScheme.highlightColor,
  spaceShipEngine: colorScheme.warningColor,
  avatar: 'white',
  wire: colorScheme.textColor,
};

export const materials = {
  star: new THREE.MeshBasicMaterial({
    color: baseColors.star,
    name: 'star',
  }),
  moon: new THREE.MeshStandardMaterial({
    map: moonTexture,
    // normalMap: moonNormalTexture,
    color: baseColors.moon,
    name: 'moon',
  }),
  satellite: new THREE.MeshStandardMaterial({
    color: baseColors.satellite,
    name: 'satellite',
  }),
  satelliteEdges: new THREE.LineBasicMaterial({
    color: baseColors.satelliteEdges,
    name: 'satelliteEdges',
  }),
  spaceShip: new THREE.MeshStandardMaterial({
    color: baseColors.spaceShip,
    name: 'spaceShip',
  }),
  spaceShipEdges: new THREE.LineBasicMaterial({
    color: baseColors.spaceShipEdges,
    name: 'spaceShipEdges',
  }),
  spaceShipEngine: new THREE.MeshBasicMaterial({
    color: baseColors.spaceShipEngine,
    wireframe: true,
    name: 'spaceShipEngine',
  }),
  sun: new THREE.MeshBasicMaterial({
    map: sunTexture,
    normalMap: sunNormalTexture,
    color: baseColors.sun,
    name: 'sun',
  }),
  avatar: new THREE.MeshStandardMaterial({
    map: portraitTexture,
    color: baseColors.avatar,
    name: 'avatar',
  }),
  wire: new THREE.MeshBasicMaterial({
    color: baseColors.wire,
    wireframe: true,
    name: 'wire',
  }),
};
