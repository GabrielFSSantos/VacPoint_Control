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
  
  async delete(elements: {id: string}[]) {
    try {
      

    } catch (error) {
      alert("don't was not possible to delete.\n" + error);
    }
  }
}

export default VaccineController;