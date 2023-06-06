import api from "./axios";

const baseUrl = 'http://localhost:8000/api';

export const getAuth = async (params: {}) => {
  let res = await api.get(`${baseUrl}/auth/user`)
  return res.data;
}


export const getCategories = async () => {
  let res = await api.get(`${baseUrl}/categories`)
  return res.data;
}

export const getSources = async (params: {}) => {
  let res = await api.get(`${baseUrl}/sources`, {params})
  return res.data;
}

export const getFilteredArticles = async (params: {}) => {
  let res = await api.get(`${baseUrl}/articles/filter`, {params})
  return res.data;
}

export const getFeedArticles = async () => {
  let res = await api.get(`${baseUrl}/articles/`);
  return res.data;
}

export const getFeedConfig = async () => {
  let res = await api.get(`${baseUrl}/user/feed-config`);
  return res.data;
}

export const setFeedConfig = async (data: {}) => {
  let res = await api.post(`${baseUrl}/user/feed-config`, {data});
  return res.data;
}

export const signUp = async (name: string, email: string, password: string) => {
  let res = await api.post(`${baseUrl}/register`, {name, email, password});
  return res.data;
}

export const signIn = async (email: string, password: string ) => {
  let res = await api.post(`${baseUrl}/login`, {email, password});
  if (res.data.token) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
}

export const signOut = () => {
  localStorage.removeItem('user');
}

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user')!);
}
