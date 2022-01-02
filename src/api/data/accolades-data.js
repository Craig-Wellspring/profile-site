import axios from 'axios';
import { firebaseConfig } from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getAccolades = async () => {
  const response = await axios.get(`${dbURL}/accolades/.json`);
  return response.data ? Object.values(response.data) : [];
};

const getAccolade = async (firebaseKey) => {
  const response = await axios.get(`${dbURL}/accolades/${firebaseKey}.json`);
  return response.data;
};

const createAccolade = async (accData) => {
  const response = await axios.post(`${dbURL}/accolades.json`, accData);
  const updateKey = { firebaseKey: response.data.name };
  await axios.patch(`${dbURL}/accolades/${response.data.name}.json`, updateKey);
  return getAccolades();
};

const updateAccolade = async (accObj) => {
  await axios.patch(`${dbURL}/accolades/${accObj.firebaseKey}.json`, accObj);
  return getAccolades();
};

const deleteAccolade = async (firebaseKey) => {
  await axios.delete(`${dbURL}/accolades/${firebaseKey}.json`);
  return getAccolades();
};

export {
  createAccolade,
  getAccolades,
  getAccolade,
  updateAccolade,
  deleteAccolade,
};
