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

      const post = await Post.findById(req.body._id);

      if (!post) {
        return res.status(401).json({ error: 'Post not found.' });
      }

      if(req.body._id) {
        delete req.body._id;
      }

      const response = await Post.findByIdAndUpdate({_id: post._id}, req.body);

      return res.status(200).json(response);
      
    } catch (error) {
      return res.status(400).json("Could not update.\n" + error);
    }
  },
  
  async delete(req: Request, res: Response) {
    try {

      req.body.forEach(async (post: PostType) => {
        await Post.findByIdAndDelete(post._id);
      });
      
      return res.send("Excluded");

    } catch (error) {
      alert("don't was not possible to delete.\n" + error);
    }
  },

  async show(req: Request, res: Response) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(401).json({ error: 'Post not found.' });
      }

      return res.status(200).json(post);

    } catch (error) {
      return res.status(400).json("Could not show.\n" + error);
    }
  }
}

export default PostController;