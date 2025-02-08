const mongoose = require('mongoose');

const CoordinatesSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  shelter: { type: mongoose.Schema.Types.ObjectId, ref: 'Shelter' }
}, { timestamps: true });

module.exports = mongoose.model('Coordinates', CoordinatesSchema);