import Vaccine from '../models/Vaccine';
import { VaccineType } from '../Types/VaccineType';

const VaccineController = {

  async create(vaccine: VaccineType) {
    try {
      
      
    }catch (error) {
      alert("error Vaccine Exists");
   }
  },

  async read() {
    try {
      
      return [
        {
          id: "teste",
          name: "teste",
          description: "teste",
          quantDosage: 1,
        }
      ]

    } catch (error) {
      alert("Could not list.\n" + error);
    }
  },
  
  async update(vaccine: VaccineType) {
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
        description: "teste",
        quantDosage: 1,
      }

    } catch (error) {
      alert("Could not show.\n" + error);
    }
  },

  async readToEmployee(id: string) {
    try {

      return {
        name: "teste",
        vaccines: [
          {
            id: "vaccine1",
            name: "vaccine1",
            description: "vaccine1",
            quantDosage: 2,
            dosages: [
              {
                id: "teste",
                dosageNumber: 1,
                date: "12/12/12",
                took: false,
              },
              {
                id: "teste",
                dosageNumber: 2,
                date: "12/12/12",
                took: false,
              }
            ],
          },
          {
            id: "vaccine2",
            name: "vaccine2",
            description: "vaccine2",
            quantDosage: 2,
            dosages: [
              {
                id: "teste",
                dosageNumber: 1,
                date: "12/12/12",
                took: false,
              },
              {
                id: "teste",
                dosageNumber: 2,
                date: "12/12/12",
                took: false,
              }
            ],
          },
        ]
      }

    } catch (error) {
      alert("Could not show.\n" + error);
    }
  }
}

export default VaccineController;