import axios from 'axios';
import { Row } from '../../hooks/useTable';
import { Employee } from '../models/Employee';

const EmployeeController = {

  async create(employee: Employee) {
    try {
      
      const tokenStorage = localStorage.getItem('token');
      let response: Employee =  {};

      await axios({
        method: 'post',
        url: 'http://localhost:3333/employees/create',
        headers: {
          authorization: `Bearer ${tokenStorage}`
        },  
        data: employee
        
      }).then(res => { response = res.data; });

      if(!response._id){
        console.log("error Employee Exists.");
        return false;
      }

      return true;
      
    }catch (error) {
      console.log("error Employee Exists");
   }
  },

  async read() {
    try {

      const tokenStorage = localStorage.getItem('token');
      let response: Row[] =  [];

      await axios({
        method: 'get',
        url: 'http://localhost:3333/employees/read',
        headers: {
          authorization: `Bearer ${tokenStorage}`
        }, 
      }).then(res => { response = res.data; });

      return response;

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
  
  async delete(elements: Employee[]) {
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
  },

  async readToEmployee(id: string) {
    try {

      return {
        name: "teste",
        vaccines: [
          {
            _id: "vaccine1",
            name: "vaccine1",
            description: "vaccine1",
            quantDosage: 2,
            dosages: [
              {
                _id: "teste",
                dosageNumber: 1,
                date: "12/12/12",
                took: false,
              },
              {
                _id: "teste",
                dosageNumber: 2,
                date: "12/12/12",
                took: false,
              }
            ],
          },
          {
            _id: "vaccine2",
            name: "vaccine2",
            description: "vaccine2",
            quantDosage: 2,
            dosages: [
              {
                _id: "teste",
                dosageNumber: 1,
                date: "12/12/12",
                took: false,
              },
              {
                _id: "teste",
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
  },

  async updateToVaccines(id: string) {
    try {

      return {
        name: "teste",
        vaccines: [
          {
            _id: "vaccine1",
            name: "vaccine1",
            description: "vaccine1",
            quantDosage: 2,
            dosages: [
              {
                _id: "teste",
                dosageNumber: 1,
                date: "12/12/12",
                took: false,
              },
              {
                _id: "teste",
                dosageNumber: 2,
                date: "12/12/12",
                took: false,
              }
            ],
          },
          {
            _id: "vaccine2",
            name: "vaccine2",
            description: "vaccine2",
            quantDosage: 2,
            dosages: [
              {
                _id: "teste",
                dosageNumber: 1,
                date: "12/12/12",
                took: false,
              },
              {
                _id: "teste",
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

export default EmployeeController;