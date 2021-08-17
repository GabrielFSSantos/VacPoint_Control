import { Request, Response } from 'express';

import Employee from '../models/Employee';
import Vaccine from '../models/Vaccine';
import EmployeeHasVaccine from '../models/EmployeeHasVaccine';

import { DosageType } from '../Types/DosageType';
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

      if(vaccines.length > 0) {
        vaccines.forEach(async (vaccine: VaccineType ) => {
        
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
            dosages,
          });
  
        });
      }
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
      const employee = await Employee.findById(req.body._id);

      if (!employee) {
        return res.status(401).json({ error: 'Administrador not Exists' });
      }

      if(req.body._id) {
        delete req.body._id;
      }

      const response = await Employee.findByIdAndUpdate({_id: employee._id}, req.body);

      return res.json(response); 
      
    } catch (error) {
      return res.status(400).json("Could not update.\n" + error);
    }
  },
  
  async delete(req: Request, res: Response) {
    try {

      req.body.forEach(async (employee: VaccineType) => {
        await EmployeeHasVaccine.deleteMany({employeeId: employee._id});
        await Employee.findByIdAndDelete(employee._id);
      });

      return res.send("Excluded"); 
      
    } catch (error) {
      return res.status(400).json("Could not update.\n" + error);
    }
  },

  async show(req: Request, res: Response) {
    try {
      const employee = await Employee.findById(req.params.id);

      if(!employee){
        return res.status(400).send("error Employee Exists");
      }

      return res.json(employee); 

    } catch (error) {
      return res.status(400).json("Could not show.\n" + error);
    }
  },

  async readToVaccines(req: Request, res: Response) {
    try {
      
      const employee = await Employee.findById(req.params.id);

      if(!employee) {
        return res.status(400).send("error Employee Exists");
      }

      const employeesHasVaccines = await EmployeeHasVaccine.find({employeeId: employee._id});

      const vaccines: VaccineType[] = [];
      for(let i=0; i<employeesHasVaccines.length; i++) {
        const vaccine: VaccineType = await Vaccine.findById(employeesHasVaccines[i].vaccineId);
        const dosages = employeesHasVaccines[i].dosages;
        const response = { vaccine, dosages };
        vaccines.push(response);
      }

      // await employeesHasVaccines.forEach(async (element: EmployeeHasVaccineType) => {
      //   const vaccine: VaccineType = await Vaccine.findById(element.vaccineId);
      //   vaccine.dosages = element.dosages;
      //   vaccines.push(vaccine);
      // });

      const response = { employee, vaccines };

      return res.json(response); 

    } catch (error) {
      alert("Could not show.\n" + error);
    }
  },

  async updateToVaccines(req: Request, res: Response) {
    try {
      
      const employee = await Employee.findById(req.body.employee._id);

      if(!employee) {
        return res.status(400).send("error Employee Exists");
      }

      const vaccines: VaccineType[] = [];
      for(let i=0; i<req.body.vaccines.length; i++) {
        const vaccine = req.body.vaccines[i].vaccine;
        const dosages = req.body.vaccines[i].dosages;
        await EmployeeHasVaccine.updateOne({employeeId: employee._id, vaccineId: vaccine._id}, {dosages});
        const response = { vaccine, dosages };
        vaccines.push(response);
      }

      // await req.body.vaccines.forEach(async (element: {vaccine: VaccineType, dosages: DosageType[]}) => {
      //   const vaccine = element.vaccine;
      //   const dosages = element.dosages;
      //   await EmployeeHasVaccine.updateOne({employeeId: employee._id, vaccineId: element.vaccine._id}, {dosages});
      //   const response = { vaccine, dosages };
      //   vaccines.push(response);
      // });

      const response = { employee, vaccines };

      return res.json(response); 

    } catch (error) {
      alert("Could not show.\n" + error);
    }
  }
}

export default EmployeeController;