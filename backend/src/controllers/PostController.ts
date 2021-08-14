import { Request, Response } from 'express';

import Post from '../models/Post';
import { PostType } from '../Types/PostType';

const PostController = {
  
  async create(req: Request, res: Response) {
    try {

      const post = await Post.create(req.body);

      return res.status(200).json(post);

    }catch (error) {
      return res.status(400).json("error Post Exists");
   }
  },

  async read(req: Request, res: Response) {
    try {

      const posts = await Post.find({});

      return res.status(200).json(posts);
      
    } catch (error) {
      return res.status(400).json("Could not list.\n" + error);
    }
  },
  
  async update(req: Request, res: Response) {
    try {

      const post = await Post.findById(req.body.id);
      const response = await Post.updateOne({id: post.id}, req.body);

      return res.status(200).json(response);
      
    } catch (error) {
      return res.status(400).json("Could not update.\n" + error);
    }
  },
  
  async delete(req: Request, res: Response) {
    try {
      
      const post = await Post.findById(req.body.id);
      const response = await Post.deleteOne({id: post.id});

      return res.status(200).json(response);

    } catch (error) {
      alert("don't was not possible to delete.\n" + error);
    }
  },

  async show(req: Request, res: Response) {
    try {

      const post = await Post.findById(req.body.id);

      return res.status(200).json(post);

    } catch (error) {
      return res.status(400).json("Could not show.\n" + error);
    }
  }
}

export default PostController;