import { VaccineType } from "./VaccineType";

export type EmployeeType = {
  id?: string;
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  occupation?: string;
  sector?: string;
  cep?: string;
  city?: string;
  state?: string;
  street?: string;
  number?: number;
  district?: string;
  complement?: string;
  vaccines?: VaccineType[];
}