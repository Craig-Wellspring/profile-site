import * as THREE from 'three';
import portraitImage from '../resources/images/portrait.jpeg';
import moonImage from '../resources/images/moon.jpg';
import moonNormal from '../resources/images/moonNormal.png';
import sunImage from '../resources/images/sun.jpg';
import sunNormal from '../resources/images/sunNormal.jpg';
import colorScheme from '../JSON/globalVars/colorScheme.json';

const moonTexture = new THREE.TextureLoader().load(moonImage);
const moonNormalTexture = new THREE.TextureLoader().load(moonNormal);
const sunTexture = new THREE.TextureLoader().load(sunImage);
const sunNormalTexture = new THREE.TextureLoader().load(sunNormal);
const portraitTexture = new THREE.TextureLoader().load(portraitImage);

export default ({
  star: new THREE.MeshBasicMaterial({ color: 0xffffff }),
  moon: new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormalTexture,
    color: 'gray',
  }),
  satellite: new THREE.MeshStandardMaterial({ color: 'gray' }),
  sun: new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: sunNormalTexture,
    color: 'yellow',
  }),
  avatar: new THREE.MeshBasicMaterial({ map: portraitTexture, color: 'white' }),
  wire: new THREE.MeshBasicMaterial({
    color: colorScheme.textColor,
    wireframe: true,
  }),
});
