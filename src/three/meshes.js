import * as THREE from 'three';
import geometries from './geometries';
import { materials } from './materials';

export default ({
  star: () => new THREE.Mesh(geometries.star(), materials.star),
  moon: new THREE.Mesh(geometries.moon, materials.moon),
  satellite: new THREE.Mesh(geometries.satellite, materials.satellite),
  spaceShip: new THREE.Mesh(geometries.spaceShip, materials.spaceShip),
  spaceShipEngine: new THREE.Mesh(geometries.spaceShipEngine, materials.spaceShipEngine),
  sun: new THREE.Mesh(geometries.sun, materials.sun),
  avatarBox: new THREE.Mesh(geometries.avatar, materials.avatar),
  smallBox: new THREE.Mesh(geometries.smallBox, materials.wire),
  planetSphere: new THREE.Mesh(geometries.planetSphere, materials.wire),
  planetRing: new THREE.Mesh(geometries.planetRing, materials.wire),
  wireTorus: new THREE.Mesh(geometries.torus, materials.wire),
  wireD4: new THREE.Mesh(geometries.d4, materials.wire),
  wireD6: new THREE.Mesh(geometries.d6, materials.wire),
  wireD8: new THREE.Mesh(geometries.d8, materials.wire),
  wireD12: new THREE.Mesh(geometries.d12, materials.wire),
  wireD20: new THREE.Mesh(geometries.d20, materials.wire),
  wireCylinder: new THREE.Mesh(geometries.cylinder, materials.wire),
  wireKnot: new THREE.Mesh(geometries.knot, materials.wire),
  wireCone: new THREE.Mesh(geometries.cone, materials.wire),
  wireCoil: new THREE.Mesh(geometries.coil, materials.wire),
});
