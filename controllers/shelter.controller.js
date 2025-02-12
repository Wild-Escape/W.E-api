const Shelter = require("../models/Shelter.model")

module.exports.create = async (req, res, next) =>{
    // check if req.currentUserid is getting properly 
    console.log("This is the current user-->", req.currentUserId)

    const shelter = new Shelter ({
        name : req.body.name,
        description: req.body.description,
        location: req.body.location,
        pricePerNight: req.body.pricePerNight,
        capacity: req.body.capacity,
        amenities: req.body.amenities,
        images: req.body.imageUrl,
        //owner: req.body.owner
        owner: req.currentUserid, 
    })
    
    try {
        const newShelter = await shelter.save();
        res.status(201).json(newShelter);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}