import { Dosage } from "./Dosage";

export type Vaccine = {
  id?: string;
  name?: string;
  quantDosage?: number;
  dosage?: Dosage[];
}