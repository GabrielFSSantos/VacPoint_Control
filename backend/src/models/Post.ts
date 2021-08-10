import mongoose from "mongoose"

const Post = new mongoose.Schema({
  id: String,
  title: String,
  subtitle: String,
  date: String,
  image: String,
  link: String,
});

export default mongoose.model('Post', Post);