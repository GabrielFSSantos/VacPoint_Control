import { Request, Response } from 'express';

import Vaccine from '../models/Vaccine';
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
      const employees = await Employee.find({});
      
      if(employees) {
        await employees.forEach(async (employee: EmployeeType) => {
          let dosages: DosageType[] = [];

          if(vaccine.quantDosage){
            for(let i=0; i<vaccine.quantDosage; i++){
              const dosage: DosageType = {
                dosageNumber: i+1,
                date: new Date(Date.now()).toLocaleDateString(),
                took: false,
              };
              dosages.push(dosage);
            }
          }

          await EmployeeHasVaccine.create({
            employeeId: employee._id,
            vaccineId: vaccine._id,
            dosages: dosages
          });
        });
      }
      
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

      if(req.body.quantDosage !== vaccine.quantDosage) {
        const employees = await Employee.find({});
      
        if(employees) {

          await EmployeeHasVaccine.deleteMany({vaccineId: vaccine._id});
          await employees.forEach(async (employee: EmployeeType) => {
            let dosages: DosageType[] = [];

            for(let i=0; i<req.body.quantDosage; i++){
              const dosage: DosageType = {
                dosageNumber: i+1,
                date: new Date(Date.now()).toLocaleDateString(),
                took: false,
              };
              
              dosages.push(dosage);
            }

            await EmployeeHasVaccine.create({
              employeeId: employee._id,
              vaccineId: vaccine._id,
              dosages: dosages
            });
          });
        }
      }

      const response = await Vaccine.findByIdAndUpdate({_id: vaccine._id}, req.body);

      return res.json(response); 
      
    } catch (error) {
      alert("Could not update.\n" + error);
    }
  },
  
  async delete(req: Request, res: Response) {
    try {

      req.body.forEach(async (vaccine: VaccineType) => {
        await EmployeeHasVaccine.deleteMany({vaccineId: vaccine._id});
        await Vaccine.findByIdAndDelete(vaccine._id);
      });

      return res.send("Excluded");

    } catch (error) {
      alert("don't was not possible to delete.\n" + error);
    }
  },

  async show(req: Request, res: Response) {
    try {

      const vaccine = await Vaccine.findById(req.body._id);

      if(!vaccine){
        return res.status(400).send("error Vaccine Exists");
      }

      return res.json(vaccine); 

    } catch (error) {
      alert("Could not show.\n" + error);
    }
  }
}

export default VaccineController;