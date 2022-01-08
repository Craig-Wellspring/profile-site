import * as THREE from 'three';

export default ({
  star: new THREE.SphereGeometry(0.07, 24, 24),
  moon: new THREE.SphereGeometry(1.5, 32, 32),
  satellite: new THREE.SphereGeometry(0.2, 8, 8),
  sun: new THREE.SphereGeometry(10, 32, 32),
  avatar: new THREE.BoxGeometry(7, 7, 7),
  smallBox: new THREE.BoxGeometry(3, 3, 3),
  planetSphere: new THREE.SphereGeometry(3.5, 6, 6),
  planetRing: new THREE.RingGeometry(5.5, 9, 10, 3),
  torus: new THREE.TorusGeometry(7, 2, 4, 10),
  d4: new THREE.TetrahedronGeometry(5, 0),
  d6: new THREE.BoxGeometry(5, 5, 5),
  d8: new THREE.OctahedronGeometry(5, 0),
  d12: new THREE.DodecahedronGeometry(5, 0),
  d20: new THREE.IcosahedronGeometry(5, 0),
  cylinder: new THREE.CylinderGeometry(5, 5, 8, 6, 1),
  knot: new THREE.TorusKnotGeometry(6.5, 1.1, 30, 5),
  cone: new THREE.ConeGeometry(5, 8, 8, 1),
  coil: new THREE.TorusKnotGeometry(2.5, 0.6, 25, 5, 2, 1),
});
