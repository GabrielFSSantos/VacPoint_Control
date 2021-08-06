import { Administrator } from '../models/Administrator';

const AdministratorController = {

  async login(admin: Administrator) {
    try {
      

    } catch (error) {
      alert("Could not login.\n" + error);
    }
  },

  async logout() {
    try {
      

    } catch (error) {
      alert("Could not logout.\n" + error);
    }
  }
}

export default AdministratorController;