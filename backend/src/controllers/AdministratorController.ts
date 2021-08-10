import Administrator from '../models/Administrator';
import { AdministratorType } from '../Types/AdministratorType';

const AdministratorController = {

  async login(admin: AdministratorType) {
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