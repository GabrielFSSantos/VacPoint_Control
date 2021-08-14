import mongoose from "mongoose"
import { Dosage } from "./Dosage";

const EmployeeHasVaccine = new mongoose.Schema({
  id: String,
  employeeId: String,
  vaccineId: String,
  dosages: [Dosage],
});

export default mongoose.model('EmployeeHasVaccine', EmployeeHasVaccine);