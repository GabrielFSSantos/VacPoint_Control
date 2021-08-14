import Post from '../models/Post';
import { PostType } from '../Types/PostType';

const PostController = {
  
  async create(post: PostType) {
    try {
      

    }catch (error) {
      alert("error Post Exists");
   }
  },

  async read() {
    try {
      
      return [
        {
          id: "teste",
          title: "teste",
          subtitle: "teste",
          date: "teste",
          image: "teste",
          link: "teste"
        }
      ]
      
    } catch (error) {
      alert("Could not list.\n" + error);
    }
  },
  
  async update(post: PostType) {
    try {
      
      
    } catch (error) {
      alert("Could not update.\n" + error);
    }
  },
  
  async delete(elements: {id: string}[]) {
    try {
      

    } catch (error) {
      alert("don't was not possible to delete.\n" + error);
    }
  },

  async show(code: string) {
    try {
      
      return {
        id: "teste",
        title: "teste",
        subtitle: "teste",
        date: "teste",
        image: "teste",
        link: "teste"
      }

    } catch (error) {
      alert("Could not show.\n" + error);
    }
  }
}

export default PostController;