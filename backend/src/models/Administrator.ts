import mongoose from "mongoose"

const Administrator = new mongoose.Schema({
  id: String,
  email: String,
  password: String,
});

export default mongoose.model('Administrator', Administrator);