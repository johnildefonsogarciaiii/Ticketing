const Ticket = require('../model/ticketModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');



//getting all tickets
exports.getAllTickets = catchAsync(async (req, res, next) =>{
    const tickets = await Ticket.find(req.query);

    res.status(200).json({
        status: "success",
        result: tickets.length,
        data: {tickets}
    })
});




//get specific ticket
exports.getTicket = catchAsync(async(req, res, next) => {
    const ticket = await Ticket.findById(req.params.id)

    //if ticket ID is not existing, throw error
    if(!ticket) {
        return next(new AppError('Document was not found', 404))
    }

    //if ticket is existing, return data
    res.status(200).json({
        status: 'success',
        data: {ticket}
    })

});


//Creating Ticket
exports.createTicket = catchAsync(async(req, res, next) => {
    const currentDate = new Date()
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    const stringDate = currentDate.toLocaleDateString(undefined, options)
    
    const ticket = await Ticket.create({
        ticketID: req.body.ticketID,
        actions: req.body.actions,
        email: req.body.email,
        concern: req.body.concern,
        status: req.body.status,
        description: req.body.description,
        locationFrom: req.body.locationFrom,
        locationTo: req.body.locationTo,
        dateRequested: stringDate
    })

    res.status(200).json({
        status: "success",
        ticket
    })
});


//Updating tickets
exports.updateTicket = catchAsync(async(req, res, next) => {


    const update = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!update){
        return (new AppError('Ticket was not found', 404))
    }

    res.status(200).json({
        status: "success",
        data: update
    })

});



//Deleting Tickets
exports.deleteTicket = catchAsync(async(req, res, next) => {
    const deleted = await Ticket.findByIdAndDelete(req.params.id)

    if(!deleted){
        return (new AppError("Ticket was not found", 404))
    }

    res.status(200).json({
        status: "success"
    })
});

