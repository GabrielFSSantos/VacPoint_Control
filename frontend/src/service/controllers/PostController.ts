import axios from 'axios';
import { Row } from '../../hooks/useTable';
import { Post } from '../models/Post';

const PostController = {
  
  async create(post: Post) {
    try {
      const tokenStorage = localStorage.getItem('token');
      let res: Post = {};

      if(tokenStorage){
        await axios({
          method: 'POST',
          url: 'http://localhost:3333/posts/create',
          headers: {
            authorization: `Bearer ${tokenStorage.replace(/"/g, '')}`
          },
          data: post
        }).then(response => {
          res = response.data
        });
        return res;
      }
      return res;

    }catch (error) {
      console.log("error Post Exists");
   }
  },

  async read() {
    try {
      const tokenStorage = localStorage.getItem('token');
      let posts: Row[] = []

      if(tokenStorage){
        await axios({
          method: 'GET',
          url: 'http://localhost:3333/posts/read',
        }).then(response => {
          posts = response.data;
        });
        return posts;
      }
      return posts;

    } catch (error) {
      console.log("Could not list.\n" + error);
    }
  },
  
  async update(post: Post) {
    try {
      const tokenStorage = localStorage.getItem('token');
      let res: Post = {}

      if(tokenStorage){
        await axios({
          method: 'PUT',
          url: 'http://localhost:3333/posts/update',
          headers: {
            authorization: `Bearer ${tokenStorage.replace(/"/g, '')}`
          },
          data: post
        }).then(response => {
          res = response.data;
        });
        return res;
      }
      return res;
      
    } catch (error) {
      console.log("Could not update.\n" + error);
    }
  },
  
  async delete(elements: Post[]) {
    try {
      const tokenStorage = localStorage.getItem('token');

      if(tokenStorage){
        await axios({
          method: 'DELETE',
          url: 'http://localhost:3333/posts/delete',
          headers: {
            authorization: `Bearer ${tokenStorage.replace(/"/g, '')}`
          },
          data: elements
        }).then(response => {
          return true;
        });
      }
      return false;

    } catch (error) {
      console.log("don't was not possible to delete.\n" + error);
    }
  },

  async show(id: string) {
    try {
      const tokenStorage = localStorage.getItem('token');
      let res: Post = {}

      if(tokenStorage){
        await axios({
          method: 'GET',
          url: `http://localhost:3333/posts/show/${id}`,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${tokenStorage.replace(/"/g, '')}`
          },
        }).then(response => {
          res = response.data;
        });
        return res;
      }
      return res;

    } catch (error) {
      console.log("Could not show.\n" + error);
    }
  }
}

export default PostController;