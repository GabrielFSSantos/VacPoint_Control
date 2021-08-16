import { DosageType } from "./DosageType";

export type VaccineType = {
  _id?: string;
  name?: string;
  description?: string;
  quantDosage?: number;
  dosages?: DosageType[];
}