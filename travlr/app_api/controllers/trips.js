const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // register model
const Model = mongoose.model('trips');

//GET: /trips - lists all the trips
//Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // return all records
        .exec();

        // uncomment line to show query results
        //console.log(q);
    if(!q) {
        //database returned no data
        return res
                .status(404)
                .json(err);
    } else {
        // return resulting trip list
        return res
                .status(200)
                .json(q);
    }
};

//GET: /trips - lists a single trip
//Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode }) // return single record
        .exec();

        // uncomment line to show query results
        //console.log(q);
    if(!q) {
        //database returned no data
        return res
                .status(404)
                .json(err);
    } else {
        // return resulting trip list
        return res
                .status(200)
                .json(q);
    }
};

const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description

    });

    const q = await newTrip.save();
        if (!q) {
            //database returned no data
            return res  
                .status(400)
                .json(err)

        } else { // return trip
            return res
                .status(201)
                .json(q)
        }

        // uncomment the following line to show results operation on the console
        //console.log(q);
};

// PUT: /trips/:tripCode - Updates an existing Trip
// Regardless of outcome, response must include HTML status code
// and a JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
  // Uncomment for debugging
  console.log(req.params);
  console.log(req.body);

  try {
    const q = await Model.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true } // return the updated document
    ).exec();

    if (!q) {
      // Database returned no data
      return res.status(400).json({ message: "Trip not found or update failed." });
    } else {
      // Return resulting updated trip
      return res.status(201).json(q);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err });
  }

  // Uncomment the following line to show results of operation on the console
  // console.log(q);
};

// DELETE: /trips/:tripId - Deletes a trip by Mongo _id
const tripsDeleteTrip = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const deletedTrip = await Model.findByIdAndDelete(tripId).exec();

    if (!deletedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Successfully deleted
    return res.status(204).json(null);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};