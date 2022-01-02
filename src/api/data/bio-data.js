import axios from 'axios';
import { firebaseConfig } from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;
const bioKey = '-MpAF2iPNwEY1w5_jPxH';

const getBioData = async () => {
  const bio = await axios.get(`${dbURL}/info/${bioKey}.json`);
  return bio.data.bio;
};

const updateBioData = async (obj) => {
  const newBio = await axios.patch(`${dbURL}/info/${bioKey}.json`, obj);
  return newBio.data.bio;
};

export { getBioData, updateBioData };
