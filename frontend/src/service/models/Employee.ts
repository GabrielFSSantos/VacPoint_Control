import { Vaccine } from "./Vaccine";

export type Employee = {
  _id?: string;
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
  vaccines?: Vaccine[];
}