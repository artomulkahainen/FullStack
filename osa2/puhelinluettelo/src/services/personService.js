import axios from 'axios';
const baseurl = '/api/persons';

const getAll = () => {
  const request = axios.get(baseurl);
  return request.then((res) => res.data);
};

const add = (newObject) => {
  const request = axios.post(baseurl, newObject);
  return request.then((res) => res.data);
};

const update = (updatedPerson, personId) => {
  return axios.put(baseurl + '/' + personId, updatedPerson);
};

const deleteObject = (object) => {
  return axios.delete(baseurl + '/' + object.id);
};

export default { getAll, add, update, deleteObject };
