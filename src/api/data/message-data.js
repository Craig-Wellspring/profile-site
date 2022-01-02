import axios from 'axios';
import { firebaseConfig } from '../apiKeys';
import { userIsAdmin } from '../auth';

const dbURL = firebaseConfig.databaseURL;

const getMessages = async (uid) => {
  let response;
  if (uid) {
    response = await axios.get(
      `${dbURL}/messages/.json?orderBy="uid"&equalTo="${uid}"`,
    );
  } else {
    response = await axios.get(`${dbURL}/messages/.json`);
  }
  return response.data ? Object.values(response.data) : [];
};

const getMessage = async (firebaseKey) => {
  const response = await axios.get(`${dbURL}/messages/${firebaseKey}.json`);
  return response.data;
};

const createMessage = async (messageData) => {
  const response = await axios.post(`${dbURL}/messages.json`, messageData);
  const updateKey = { firebaseKey: response.data.name };
  await axios.patch(`${dbURL}/messages/${response.data.name}.json`, updateKey);
  return getMessages();
};

const updateMessage = async (messageObj) => {
  await axios.patch(
    `${dbURL}/messages/${messageObj.firebaseKey}.json`,
    messageObj,
  );
  return userIsAdmin() ? getMessages() : getMessages(messageObj.uid);
};

const deleteMessage = async (messageObj) => {
  await axios.delete(`${dbURL}/messages/${messageObj.firebaseKey}.json`);
  return userIsAdmin() ? getMessages() : getMessages(messageObj.uid);
};

export {
  createMessage, getMessages, getMessage, updateMessage, deleteMessage,
};
