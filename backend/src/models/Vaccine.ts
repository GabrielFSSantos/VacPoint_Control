import mongoose from "mongoose"

const Vaccine = new mongoose.Schema({
  name: String,
  description: String,
  quantDosage: Number,
});

export default mongoose.model('Vaccine', Vaccine);