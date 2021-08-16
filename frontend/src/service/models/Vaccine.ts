import { Dosage } from "./Dosage";

export type Vaccine = {
  _id?: string;
  name?: string;
  description?: string;
  quantDosage?: number;
  dosages?: Dosage[];
}