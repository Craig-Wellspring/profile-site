import * as THREE from 'three';
import meshes from './meshes';

const generateStars = (scene, count, spread) => {
  const addStar = () => {
    const newStar = meshes.star();
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(spread));
    newStar.position.set(x, y, z);
    scene.add(newStar);
  };

  Array(count).fill().forEach(addStar);
};

export default generateStars;
