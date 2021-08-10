import Employee from '../models/Employee';
import { EmployeeType } from '../Types/EmployeeType';

const EmployeeController = {

  async create(employee: EmployeeType) {
    try {
      
      
    }catch (error) {
      alert("error Employee Exists");
   }
  },

  async read() {
    try {

      return [
        {
          id: "teste",
          name: "teste",
          cpf: "teste",
          email: "teste",
          phone: "teste",
          occupation: "teste",
          sector: "teste",
          cep: "teste",
          city: "teste",
          state: "teste",
          street: "teste",
          number: 0,
          district: "teste",
          complement: "teste"
        }
      ]

    } catch (error) {
      alert("Could not list.\n" + error);
    }
  },
  
  async update(employee: EmployeeType) {
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
      
      return {
        id: "teste",
        name: "teste",
        cpf: "teste",
        email: "teste",
        phone: "teste",
        occupation: "teste",
        sector: "teste",
        cep: "teste",
        city: "teste",
        state: "teste",
        street: "teste",
        number: 0,
        district: "teste",
        complement: "teste"
      }

    } catch (error) {
      alert("Could not show.\n" + error);
    }
  }
}

export default EmployeeController;