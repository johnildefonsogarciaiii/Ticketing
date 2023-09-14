import axios from 'axios';

const API = axios.create({baseURL: 'http://127.0.0.1:5000'});

export const getAllTicket = () => API.get('/ticket');

export const getTicket = (id) => API.get(`/ticket/:${id}`);

export const createTicket = (ticket, config) => API.post('/ticket', {email: ticket.email, contact: ticket.contact, concern: ticket.concern, locationFrom: ticket.locationFrom, locationTo: ticket.locationTo, description: ticket.description, status: ticket.status}, config);

export const cancelTicket = (id, config) => API.patch(`/ticket/:${id}`, {status: "cancelled", dateComplete: Date.now()}, config)


//For Admin only
export const processTicket = (id, config) => API.patch(`/ticket/:${id}`, {status: "processed", dateProcessed: Date.now()}, config);

export const completeTicket = (id, config) => API.patch(`/ticket/:${id}`, {status: "completed", dateCompleted: Date.now()}, config);

export const deleteTicket = (id, config) => API.patch(`/ticket/:${id}`, {status: "cancelled", dateComplete: Date.now()}, config);

