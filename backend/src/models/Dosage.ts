import mongoose from "mongoose"

const Dosage = new mongoose.Schema({
  id: String,
  dosageNumber: Number,
  date: String,
  took: Boolean,
});

export default mongoose.model('Dosage', Dosage);