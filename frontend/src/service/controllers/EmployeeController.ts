import axios from 'axios';
import { Row } from '../../hooks/useTable';
import { Employee } from '../models/Employee';

const EmployeeController = {

  async create(employee: Employee) {
    try {
      const tokenStorage = localStorage.getItem('token');
      let res: Employee = {};

      if(tokenStorage){
        await axios({
          method: 'POST',
          url: 'http://localhost:3333/employees/create',
          headers: {
            authorization: `Bearer ${tokenStorage.replace(/"/g, '')}`
          },
          data: employee
        }).then(response => {
          res = response.data
        });
        return res;
      }
      return res;
      
    }catch (error) {
      console.log("error Employee Exists");
   }
  },

  async read() {
    try {
      const tokenStorage = localStorage.getItem('token');
      let employees: Row[] = []

      if(tokenStorage){
        await axios({
          method: 'GET',
          url: 'http://localhost:3333/employees/read',
          headers: {
            authorization: `Bearer ${tokenStorage.replace(/"/g, '')}`
          }
        }).then(response => {
          employees = response.data;
        });
        return employees;
      }
      return employees;

    } catch (error) {
      console.log("Could not list.\n" + error);
    }
  },
  
  async update(employee: Employee) {
    try {
      const tokenStorage = localStorage.getItem('token');
      let res: Employee = {}

      if(tokenStorage){
        await axios({
          method: 'PUT',
          url: 'http://localhost:3333/employees/update',
          headers: {
            authorization: `Bearer ${tokenStorage.replace(/"/g, '')}`
          },
          data: employee
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
  
  async delete(elements: Employee[]) {
    try {
      const tokenStorage = localStorage.getItem('token');

      if(tokenStorage){
        await axios({
          method: 'DELETE',
          url: 'http://localhost:3333/employees/delete',
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
      alert("don't was not possible to delete.\n" + error);
    }
  },

  async show(id: string) {
    try {
      const tokenStorage = localStorage.getItem('token');
      let res: Employee = {}

      if(tokenStorage){
        await axios({
          method: 'GET',
          url: `http://localhost:3333/employees/show/${id}`,
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