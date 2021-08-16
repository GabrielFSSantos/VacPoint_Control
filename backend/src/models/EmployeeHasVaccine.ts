import mongoose from "mongoose"

const Dosage = new mongoose.Schema({
  dosageNumber: Number,
  date: String,
  took: Boolean
});

const EmployeeHasVaccine = new mongoose.Schema({
  employeeId: String,
  vaccineId: String,
  dosages: [Dosage],
});

export default mongoose.model('EmployeeHasVaccine', EmployeeHasVaccine);