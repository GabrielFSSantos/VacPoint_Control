import mongoose from "mongoose"

export const Dosage = new mongoose.Schema({
  id: String,
  dosageNumber: Number,
  date: String,
  took: Boolean,
});

export default mongoose.model('Dosage', Dosage);