import axios from 'axios';
import baseURL from './baseURL';

export const getCategories = async () => {
    axios.get(baseURL + `api/category`);
};

export const getFlashcards = async () => {
    axios.get(baseURL + `api/flashcards`);
};

export const getLevels = async () => {
    axios.get(baseURL + `api/levels`);
};
