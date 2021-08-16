import { Administrator } from '../models/Administrator';
import axios from 'axios';

const AdministratorController = {

  async login(admin: Administrator) {
    try {
      let response: Administrator =  {};

      await axios({
        method: 'POST',
        url: 'http://localhost:3333/administrators/login',
        headers: {}, 
        data: admin
        
      }).then(res => { response = res.data; });

      if(!response.token){
        console.log("Could not login.");
        return false;
      }

      localStorage.setItem('token', JSON.stringify(response.token));
      return true;
    } catch (error) {
      console.log("Could not login.\n" + error);
    }
  },

  async logout() {
    try {
      const tokenStorage = localStorage.getItem('token');

      if(tokenStorage){
        localStorage.removeItem('token');

        await axios({
          method: 'post',
          url: 'http://localhost:3333/administrators/logout',
          headers: {
            authorization: `Bearer ${tokenStorage.replace(/"/g, '')}`
          }, 
        });
        return true;
      }
      return false;
    } catch (error) {
      console.log("Could not logout.\n" + error);
    }
  }
}

export default AdministratorController;