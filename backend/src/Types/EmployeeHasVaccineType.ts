import { DosageType } from "./DosageType";

export type EmployeeHasVaccineType = {
  _id?: String,
  employeeId?: String,
  vaccineId?: String,
  dosages?: DosageType[],
}