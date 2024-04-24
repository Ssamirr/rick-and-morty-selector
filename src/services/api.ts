import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});

export const searchCharacters = async (name: string) => {
  try {
    const response = await api.get(`character/?name=${name}`);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
