import axios from 'axios';

const API = axios.create({baseURL: 'http://127.0.0.1:5000'});

export const getAllTicket = () => API.get('/ticket');

export const getTicket = (id) => API.get(`/ticket/${id}`);

export const createTicket = (formData, config) => API.post('/ticket', formData, config);

export const cancelTicket = (id, config) => API.patch(`/ticket/userTicket/${id}`, {status: "cancelled", dateComplete: Date.now()}, config)


//For Admin only
export const processTicket = (id, data, config) => API.patch(`/ticket/${id}`, data , config);

export const completeTicket = (id, config) => API.patch(`/ticket/${id}`, {status: "completed", dateCompleted: Date.now()}, config);

export const deleteTicket = (id, config) => API.patch(`/ticket/${id}`, {status: "cancelled", dateComplete: Date.now()}, config);




