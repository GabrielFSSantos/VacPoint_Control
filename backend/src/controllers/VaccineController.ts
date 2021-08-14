import { Request, Response } from 'express';

import Vaccine from '../models/Vaccine';
import Dosage from '../models/Dosage';
import Employee from '../models/Employee';
import EmployeeHasVaccine from '../models/EmployeeHasVaccine';

import { DosageType } from '../Types/DosageType';
import { EmployeeType } from '../Types/EmployeeType';
import { VaccineType } from '../Types/VaccineType';
import { EmployeeHasVaccineType } from '../Types/EmployeeHasVaccineType';

const VaccineController = {

  async create(req: Request, res: Response) {
    try {
      const vaccine = await Vaccine.create(req.body);
      let dosages: DosageType[] = [];
      
      if(vaccine.quantDosage){
        for(let i=0; i<vaccine.quantDosage; i++){
          dosages = [dosages, await Dosage.create({
            dosageNumber: i,
            date: Date.now().toLocaleString(),
            took: false,
          })];
        }
      }

      const employees = await Employee.find({});
      
      employees.array.forEach(async (employee: EmployeeType) => {
        await EmployeeHasVaccine.create({
          employeeId: employee.id,
          vaccineId: vaccine.id,
          dosages,
        })
      });

      return res.json(vaccine); 
      
    }catch (error) {
      return res.status(400).json("error Vaccine Exists");
   }
  },

  async read(req: Request, res: Response) {
    try {
      const vaccines = await Vaccine.find({});

      if(!vaccines){
        return res.status(400).send("Could not list");
      }
      
      return res.json(vaccines);

    } catch (error) {
      return res.status(400).json("Could not list.\n" + error);
    }
  },
  
  async update(req: Request, res: Response) {
    try {

      const vaccine = await Vaccine.findOne({
        id: req.body.id
      });

      if (!vaccine) {
        return res.status(401).json({ error: 'Vaccine not Exists' });
      }

      const response = await Employee.updateOne({id: vaccine.id}, req.body);

      return res.json(response); 
      
    } catch (error) {
      alert("Could not update.\n" + error);
    }
  },
  
  async delete(req: Request, res: Response) {
    try {

      req.body.array.forEach(async (vaccine: VaccineType) => {
        await Vaccine.deleteOne({id: vaccine.id});
      });

      return res.send("Excluded");

    } catch (error) {
      alert("don't was not possible to delete.\n" + error);
    }
  },

  async show(req: Request, res: Response) {
    try {

      const vaccine = await Vaccine.findById(req.body.id);

      if(!vaccine.id){
        return res.status(400).send("error Vaccine Exists");
      }

      return res.json(vaccine); 

    } catch (error) {
      alert("Could not show.\n" + error);
    }
  },

  async readToEmployee(req: Request, res: Response) {
    try {
      
      const employee = await Employee.findById(req.body.id);

      if(!employee.id){
        return res.status(400).send("error Employee Exists");
      }

      const employeesHasVaccines = await EmployeeHasVaccine.find({employeeId: employee.id});

      let vaccines: VaccineType[] = [];
      employeesHasVaccines.array.forEach(async (element: EmployeeHasVaccineType) => {
        const vaccine = await Vaccine.findById(element.vaccineId);
        vaccine.dosages = element.dosages;
        vaccines.concat(vaccine);
      });

      const response = { employee, vaccines };

      return res.json(response); 

    } catch (error) {
      alert("Could not show.\n" + error);
    }
  }
}

export default VaccineController;