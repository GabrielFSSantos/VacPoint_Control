import { Employee } from '../models/Employee';

const EmployeeController = {

  async create(employee: Employee) {
    try {
      
      
    }catch (error) {
      alert("error Employee Exists");
   }
  },

  async read() {
    try {
      

    } catch (error) {
      alert("Could not list.\n" + error);
    }
  },
  
  async update(employee: Employee) {
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

  async show(code: string, search: string) {
    try {
      

    } catch (error) {
      alert("Could not show.\n" + error);
    }
  }
}

export default EmployeeController;