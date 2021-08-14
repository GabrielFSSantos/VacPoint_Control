import { Request, Response } from 'express';

import Employee from '../models/Employee';
import Vaccine from '../models/Vaccine';
import EmployeeHasVaccine from '../models/EmployeeHasVaccine';
import Dosage from '../models/Dosage';

import { DosageType } from '../Types/DosageType';
import { EmployeeType } from '../Types/EmployeeType';
import { VaccineType } from '../Types/VaccineType';

const EmployeeController = {

  async create(req: Request, res: Response) {
    try {
      const employeeVerify = await Employee.findOne({
        cpf: req.body.cpf
      });

      if (employeeVerify) {
        return res.status(401).json({ error: 'error Employee Exists' });
      }

      const employee = await Employee.create(req.body);

      const vaccines = await Vaccine.find({});
      vaccines.array.forEach(async (vaccine: VaccineType ) => {
        
        let dosages: DosageType[] = [];
        if(vaccine.quantDosage){
          for(let i=0; i<vaccine.quantDosage; i++){
            dosages.concat(await Dosage.create({
              dosageNumber: i,
              date: Date.now().toLocaleString(),
              took: false,
            }));
          }
        }

        await EmployeeHasVaccine.create({
          employeeId: employee.id,
          vaccineId: vaccine.id,
          dosages,
        });

      });

      return res.json(employee);
      
    }catch (error) {
      return res.status(400).json("error Employee Exists");
    }
  },

  async read(req: Request, res: Response) {
    try {
      const employees = await Employee.find({});

      if(!employees){
        return res.status(400).send("Could not list");
      }
      
      return res.json(employees);

    } catch (error) {
      return res.status(400).json("Could not list.\n" + error);
    }
  },
  
  async update(req: Request, res: Response) {
    try {
      const employee = await Employee.findOne({
        cpf: req.body.cpf
      });

      if (!employee) {
        return res.status(401).json({ error: 'Administrador not Exists' });
      }

      const response = await Employee.updateOne({id: employee.id}, req.body);

      return res.json(response); 
      
    } catch (error) {
      return res.status(400).json("Could not update.\n" + error);
    }
  },
  
  async delete(req: Request, res: Response) {
    try {
      
      req.body.array.forEach(async (employee: EmployeeType) => {
        await Employee.deleteOne({id: employee.id});
      });

      return res.send("Excluded"); 
      
    } catch (error) {
      return res.status(400).json("Could not update.\n" + error);
    }
  },

  async show(req: Request, res: Response) {
    try {

      let employee: EmployeeType = {};
      switch (req.body.search) {
        case 'id':
          employee = await Employee.findById(req.body.code);
          break;
        case 'cpf':
          employee = await Employee.findOne({cpf: req.body.code});
          break;
      }

      if(!employee.id){
        return res.status(400).send("error Employee Exists");
      }

      return res.json(employee); 

    } catch (error) {
      return res.status(400).json("Could not show.\n" + error);
    }
  }
}

export default EmployeeController;