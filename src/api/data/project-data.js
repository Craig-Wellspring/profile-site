import axios from 'axios';
import { firebaseConfig } from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getProjects = async () => {
  const response = await axios.get(`${dbURL}/projects/.json`);
  return response.data ? Object.values(response.data) : [];
};

const getProject = async (firebaseKey) => {
  const response = await axios.get(`${dbURL}/projects/${firebaseKey}.json`);
  return response.data;
};

const createProject = async (projectData) => {
  const response = await axios.post(`${dbURL}/projects.json`, projectData);
  const updateKey = { firebaseKey: response.data.name };
  await axios.patch(`${dbURL}/projects/${response.data.name}.json`, updateKey);
  return getProjects();
};

const updateProject = async (projectObj) => {
  await axios.patch(
    `${dbURL}/projects/${projectObj.firebaseKey}.json`,
    projectObj,
  );
  return getProject(projectObj.firebaseKey);
};

const deleteProject = async (firebaseKey) => {
  await axios.delete(`${dbURL}/projects/${firebaseKey}.json`);
  return getProjects();
};

export {
  createProject, getProjects, getProject, updateProject, deleteProject,
};
