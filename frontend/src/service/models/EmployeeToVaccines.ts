import { Dosage } from "./Dosage"
import { Employee } from "./Employee"
import { Vaccine } from "./Vaccine"

export type VaccineToDosage = {
  vaccine?: Vaccine;
  dosages?: Dosage[];
}

export type EmployeeToVaccines = {
  employee?: Employee;
  vaccines?: VaccineToDosage[];
}