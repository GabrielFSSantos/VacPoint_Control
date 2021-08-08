import { Dosage } from "./Dosage";

export type Vaccine = {
  id?: string;
  name?: string;
  description?: string;
  quantDosage?: number;
  dosages?: Dosage[];
}