import mongoose from "mongoose";
import Vaccine from "./Vaccine";

const Employee = new mongoose.Schema({
  id: String,
  name: String,
  cpf: String,
  email: String,
  phone: String,
  occupation: String,
  sector: String,
  cep: String,
  city: String,
  state: String,
  street: String,
  number: Number,
  district: String,
  complement: String,
  vaccines: [Vaccine],
});

export default mongoose.model('Employee', Employee);