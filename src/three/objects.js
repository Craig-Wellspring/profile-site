import meshes from './meshes';
import positions from './positions';

export default ({
  moon: {
    mesh: meshes.moon,
    pos: positions.moon,
  },
  satellite: {
    mesh: meshes.satellite,
    pos: positions.satellite,
  },
  sun: {
    mesh: meshes.sun,
    pos: positions.sun,
  },
  smallBox: {
    mesh: meshes.smallBox,
    pos: positions.avatar,
  },
  avatarBox: {
    mesh: meshes.avatarBox,
    pos: positions.avatar,
  },
  planetSphere: {
    mesh: meshes.planetSphere,
    pos: positions.planet,
  },
  planetRing: {
    mesh: meshes.planetRing,
    pos: positions.planet,
  },
  torus: {
    mesh: meshes.wireTorus,
    pos: positions.torus,
  },
  d4: {
    mesh: meshes.wireD4,
    pos: positions.d4,
  },
  d6: {
    mesh: meshes.wireD6,
    pos: positions.d6,
  },
  d8: {
    mesh: meshes.wireD8,
    pos: positions.d8,
  },
  d12: {
    mesh: meshes.wireD12,
    pos: positions.d12,
  },
  d20: {
    mesh: meshes.wireD20,
    pos: positions.d20,
  },
  cylinder: {
    mesh: meshes.wireCylinder,
    pos: positions.cylinder,
  },
  knot: {
    mesh: meshes.wireKnot,
    pos: positions.knot,
  },
  cone: {
    mesh: meshes.wireCone,
    pos: positions.cone,
  },
  coil: {
    mesh: meshes.wireCoil,
    pos: positions.coil,
  },
});
