import { Administrator } from '../models/Administrator';

const AdministratorController = {

  async login(admin: Administrator) {
    try {
      
      return true;

    } catch (error) {
      alert("Could not login.\n" + error);
    }
  },

  async logout() {
    try {
      
      return true;
    } catch (error) {
      alert("Could not logout.\n" + error);
    }
  }
}

export default AdministratorController;