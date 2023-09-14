import axios from 'axios';


const API = axios.create({baseURL: 'http://127.0.0.1:5000'})

export const login = (email, password) => API.post('/user/login', {email, password});

export const signup = (name, email, password) => API.post('/user/signup', {name, email, password});

export const getCurrentUser = (config) => API.get('/user/me', config);

export const updateCurrentUser = (newData, config) => API.patch('/user/update-current-user', {name: newData.name, department: newData.department, designation: newData.designation}, config);

export const changeRoles = (role, config) => API.patch('/user/update-current-user', {role}, config);

export const getAllUsers = () => API.get('/user/')