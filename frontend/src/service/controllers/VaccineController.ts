import { Vaccine } from '../models/Vaccine';

const VaccineController = {

  async create(vaccine: Vaccine) {
    try {
      
      
    }catch (error) {
      alert("error Vaccine Exists");
   }
  },

  async read() {
    try {
      
      return [
        {
          _id: "teste",
          name: "teste",
          description: "teste",
          quantDosage: 1,
        }
      ]

    } catch (error) {
      alert("Could not list.\n" + error);
    }
  },
  
  async update(vaccine: Vaccine) {
    try {
      
      
    } catch (error) {
      alert("Could not update.\n" + error);
    }
  },
  
  async delete(elements: Vaccine[]) {
    try {
      

    } catch (error) {
      alert("don't was not possible to delete.\n" + error);
    }
  },

  async show(code: string, search: string) {
    try {

      return {
        _id: "teste",
        name: "teste",
        description: "teste",
        quantDosage: 1,
      }

    } catch (error) {
      alert("Could not show.\n" + error);
    }
  }
}

export default VaccineController;