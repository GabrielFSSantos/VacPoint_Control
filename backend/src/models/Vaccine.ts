import mongoose from "mongoose"
import Dosage from "./Dosage";

const Vaccine = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  quantDosage: Number,
});

export default mongoose.model('Vaccine', Vaccine);