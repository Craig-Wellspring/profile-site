import axios from 'axios';
import { firebaseConfig } from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getTechData = async () => {
  const tech = await axios.get(`${dbURL}/techList/.json`);
  return Object.entries(tech.data);
};

const updateTechData = async (array) => {
  await axios.patch(`${dbURL}/techList/.json`, { [array[0]]: array[1] });
  return getTechData();
};

export { getTechData, updateTechData };
