import axios from 'axios';
import { firebaseConfig } from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getEvents = async () => {
  const response = await axios.get(`${dbURL}/timelineEvents/.json`);
  return response.data ? Object.values(response.data) : [];
};

const getEvent = async (firebaseKey) => {
  const response = await axios.get(
    `${dbURL}/timelineEvents/${firebaseKey}.json`,
  );
  return response.data;
};

const createEvent = async (eventData) => {
  const response = await axios.post(`${dbURL}/timelineEvents.json`, eventData);
  const updateKey = { firebaseKey: response.data.name };
  await axios.patch(
    `${dbURL}/timelineEvents/${response.data.name}.json`,
    updateKey,
  );
  return getEvents();
};

const updateEvent = async (eventObj) => {
  await axios.patch(
    `${dbURL}/timelineEvents/${eventObj.firebaseKey}.json`,
    eventObj,
  );
  return getEvents();
};

const deleteEvent = async (firebaseKey) => {
  await axios.delete(`${dbURL}/timelineEvents/${firebaseKey}.json`);
  return getEvents();
};

export {
  createEvent, getEvents, getEvent, updateEvent, deleteEvent,
};
