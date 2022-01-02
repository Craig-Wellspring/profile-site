import axios from 'axios';
import { firebaseConfig } from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getHobAccs = async () => {
  const response = await axios.get(`${dbURL}/hobaccs/.json`);
  return response.data ? Object.values(response.data) : [];
};

const getHobAcc = async (firebaseKey) => {
  const response = await axios.get(`${dbURL}/hobaccs/${firebaseKey}.json`);
  return response.data;
};

const createHobAcc = async (hobaccData) => {
  const response = await axios.post(`${dbURL}/hobaccs.json`, hobaccData);
  const updateKey = { firebaseKey: response.data.name };
  await axios.patch(`${dbURL}/hobaccs/${response.data.name}.json`, updateKey);
  return getHobAccs();
};

const updateHobAcc = async (hobaccObj) => {
  await axios.patch(
    `${dbURL}/hobaccs/${hobaccObj.firebaseKey}.json`,
    hobaccObj,
  );
  return getHobAccs();
};

const deleteHobAcc = async (firebaseKey) => {
  await axios.delete(`${dbURL}/hobaccs/${firebaseKey}.json`);
  return getHobAccs();
};

export {
  createHobAcc, getHobAccs, getHobAcc, updateHobAcc, deleteHobAcc,
};
