import axios from 'axios';


const API = axios.create({baseURL: 'https://ticketing-api-blond.vercel.app'})

export const login = (email, password) => API.post('/user/login', {email, password});

export const signup = (formData) => API.post('/user/signup', {employeeID: formData.employeeID, name: formData.name, email: formData.email, password: formData.password});

export const getCurrentUser = (config) => API.get('/user/me', config);

export const updateCurrentUser = (newData, config) => API.patch('/user/update-current-user', {department: newData.department, designation: newData.designation, contact: newData.contact}, config);

export const changeRoles = (role, config) => API.patch('/user/update-current-user', role, config);

export const getAllUsers = () => API.get('/user/')
