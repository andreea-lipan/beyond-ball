import axios from 'axios';

const API_URL = '/api/answers';

export const submitAnswer = (answer) => {
  return axios.post(`${API_URL}/submit`, answer);
};

export const downloadAnswers = (quizId) => {
  return axios.get(`${API_URL}/export/${quizId}`, {
    responseType: 'blob', // very important for downloading files
  });
};
