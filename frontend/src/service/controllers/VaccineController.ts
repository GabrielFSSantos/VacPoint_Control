import axios from 'axios';
import { Row } from '../../hooks/useTable';
import { Vaccine } from '../models/Vaccine';

const VaccineController = {

  async create(vaccine: Vaccine) {
    try {
      const tokenStorage = localStorage.getItem('token');
      let res: Vaccine = {};

      if(tokenStorage){
        await axios({
          method: 'POST',
          url: 'http://localhost:3333/vaccines/create',
          headers: {
            authorization: `Bearer ${tokenStorage.replace(/"/g, '')}`
          },
          data: vaccine
        }).then(response => {
          res = response.data
        });
        return res;
      }
      return res;
      
    }catch (error) {
      console.log("error Vaccine Exists");
   }
  },

  async read() {
    try {
      const tokenStorage = localStorage.getItem('token');
      let vaccines: Row[] = []

      if(tokenStorage){
        await axios({
          method: 'GET',
          url: 'http://localhost:3333/vaccines/read',
          headers: {
            authorization: `Bearer ${tokenStorage.replace(/"/g, '')}`
          }
        }).then(response => {
          vaccines = response.data;
        });
        return vaccines;
      }
      return vaccines;

    } catch (error) {
      console.log("Could not list.\n" + error);
    }
  },
  
  async update(vaccine: Vaccine) {
    try {
      const tokenStorage = localStorage.getItem('token');
      let res: Vaccine = {}

      if(tokenStorage){
        await axios({
          method: 'PUT',
          url: 'http://localhost:3333/vaccines/update',
          headers: {
            authorization: `Bearer ${tokenStorage.replace(/"/g, '')}`
          },
          data: vaccine
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
  
  async delete(elements: Vaccine[]) {
    try {
      const tokenStorage = localStorage.getItem('token');

      if(tokenStorage){
        await axios({
          method: 'DELETE',
          url: 'http://localhost:3333/vaccines/delete',
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
      let res: Vaccine = {}

      if(tokenStorage){
        await axios({
          method: 'GET',
          url: `http://localhost:3333/vaccines/show/${id}`,
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

export default VaccineController;