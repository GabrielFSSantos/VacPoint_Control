import { Post } from '../models/Post';

const RequestController = {
  
  async create(request: Request) {
    try {
      

    }catch (error) {
      alert("error Request Exists");
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
          Image: "teste",
          link: "teste"
        }
      ]
      
    } catch (error) {
      alert("Could not list.\n" + error);
    }
  },
  
  async update(request: Request) {
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
  }
}

export default RequestController;