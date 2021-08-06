import { Vaccine } from './Vaccine';

export type Employee = {
  id: string;
  name: string;
  cpf: string;
  occupation: string;
  sector: string;
  Vaccines: Vaccine[];
}