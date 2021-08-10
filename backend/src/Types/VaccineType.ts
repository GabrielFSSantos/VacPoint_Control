import { DosageType } from "./DosageType";

export type VaccineType = {
  id?: string;
  name?: string;
  description?: string;
  quantDosage?: number;
  dosages?: DosageType[];
}