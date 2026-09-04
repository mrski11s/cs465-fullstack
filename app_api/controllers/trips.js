const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');
//GET: /trips -lists all the trips
//regardless of outcome, response must include HTML status code
//and JSON message to the  requesting client
const tripsList = async (req, res) => {
    const q = await Model
        .find({})//no filter, retern all records
        .exec();
    //uncomment to show results of query on the console
    //console.log(q);
    if (!q) {
        //database returned no data
        return res
            .status(404)
            .json(err);
    }
    else {
        //return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};
//GET: /trips/:tripsCode -lists a single trip
//regardless of outcome, response must include HTML status code
//and JSON message to the  requesting client
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode })//no filter, retern single record
        .exec();
    //uncomment to show results of query on the console
    //console.log(q);
    if (!q) {
        //database returned no data
        return res
            .status(404)
            .json(err);
    }
    else {
        //return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};
//Post: /trips -adds new trip
//regardless of outcome, response must include HTML status code
//and JSON message to the  requesting client
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,

        code: req.body.code,
    })
    const q = await newTrip.save();

    if (!q) {
        //database returned no data
        return res
            .status(404)
            .json(err);
    }
    else {
        //return new trip
        return res
            .status(201)
            .json(q);
    }
};
// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);
    const q = await Model
        .findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();
    if (!q) { // Database returned no data
        return res
            .status(400)
            .json(err);

    } else { // Return resulting updated trip
        return res
            .status(201)
            .json(q);
    }
    // Uncomment the following line to show results of operation
    // on the console
     console.log(q);
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    
};