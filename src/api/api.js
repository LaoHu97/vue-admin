
import axios from 'axios';

let base = process.env.API_ROOT;

export const logo = params => { return axios.post(`${base}/api/logo`, params).then(res => res.data); };

export const getUserListPage = params => { return axios.get(`${base}/api/getUserListPage`, { params: params }); };

export const formmodel = params => { return axios.post(`${base}/api/formmodel`, params).then(res => res.data); };

export const romveList = params => { return axios.post(`${base}/api/romveList`, params).then(res => res.data); };

export const getNewmovies = params => { return axios.get(`${base}/api/getNewmovies`, { params: params }); };

export const getMoviesMessage = params => { return axios.get(`${base}/api/getMoviesMessage`, { params: params }); };

export const addImages = params => { return axios.post(`${base}/api/addImages`, params).then(res => res.data); };

export const statusTopImages = params => { return axios.post(`${base}/api/statusTopImages`, params).then(res => res.data); };

export const updateResources = params => { return axios.post(`${base}/api/updateResources`, params).then(res => res.data); };

export const submitForm1 = params => { return axios.post(`${base}/api/submitForm1`, params).then(res => res.data); };

export const getRestrictedListPage = params => { return axios.get(`${base}/api/getRestrictedListPage`, { params: params }); };

export const romveRestrictedList = params => { return axios.post(`${base}/api/romveRestrictedList`, params).then(res => res.data); };
