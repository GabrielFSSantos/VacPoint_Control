import { DosageType } from "./DosageType";

export type EmployeeHasVaccineType = {
  id?: String,
  employeeId?: String,
  vaccineId?: String,
  dosages?: DosageType[],
}