const express = require('express');
const ticketController = require('./../controller/ticketController');
const authController = require('../controller/authController');



const router = express.Router();



router
.route('/')
.get(ticketController.getAllTickets)
.post(authController.protect, ticketController.createTicket)


router
.route('/:id')
.get(ticketController.getTicket)
.patch(authController.protect, authController.restrictTo('admin'), ticketController.updateTicket)
.delete(authController.protect, authController.restrictTo('admin'), ticketController.deleteTicket)


router
.route('/userTicket/:id')
.patch(authController.protect, ticketController.updateTicket)


module.exports = router;