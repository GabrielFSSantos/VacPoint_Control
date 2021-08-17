import { useEffect, useState } from 'react';
import { TableColumn } from 'react-data-table-component/dist/DataTable/types';
import EmployeeController from '../service/controllers/EmployeeController';
import VaccineController from '../service/controllers/VaccineController';
import PostController from '../service/controllers/PostController';

type TableProps = {
  type: string;
  search: string;
}

export type Row = { 
  _id: string;
  name?: string;

  cpf?: string;
  occupation?: string;
  sector?: string;

  description?: string;
  quantDosage?: number;

  date?: string;
  title?: string;
  subtitle?: string;
  link?: string;
}

export function useTable({type, search}: TableProps) {
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    if(type === 'employees') {
      setColumns([
        { selector: row => 'name', name: 'Nome', sortable: true, format: row => {return row.name.toString()}, maxWidth: "22rem"},
        { selector: row => 'cpf', name: 'CPF', sortable: true, format: row => {return row.cpf.toString()}, maxWidth: "22rem"},
        { selector: row => 'occupation', name: 'Função', sortable: true, format: row => {return row.occupation.toString()}, maxWidth: "22rem"},
        { selector: row => 'sector', name: 'Setor', sortable: true, format: row => {return row.sector.toString()}, maxWidth: "22rem"}
      ]);
      EmployeeController.read().then((employees) => { if(employees){
        if(search.trim() === '') {
          setRows(employees);
        }
        else {
          setRows(employees.filter((employee) => {
            if(employee.name){
              return employee.name.includes(search);
            }
            else return false;
          }));
        }
      }});
    } 
    else if(type === 'vaccines') {
      setColumns([
        { selector: row => 'name', name: 'Nome', sortable: true, format: row => {return row.name.toString()}, maxWidth: "25rem"},
        { selector: row => 'quantDosage', name: 'Quantidade de dosagem', sortable: true, format: row => {return row.quantDosage.toString()}, maxWidth: "25rem"},
        { selector: row => 'description', name: 'Descrição', sortable: true, format: row => {return row.description.toString()}, maxWidth: "25rem"}
      ]);
      
      VaccineController.read().then((vaccines) => { if(vaccines){
        if(search.trim() === '') {
          setRows(vaccines);
        }
        else {
          setRows(vaccines.filter((vaccine) => {
            if(vaccine.name){
              return vaccine.name.includes(search);
            }
            else return false;
          }));
        }
      }});
    }
    else if(type === 'posts') {
      setColumns([
        { selector: row => 'date', name: 'Data', sortable: true, format: row => {return row.date.toString()}, maxWidth: "10rem"},
        { selector: row => 'title', name: 'Título', sortable: true, format: row => {return row.title.toString()}, maxWidth: "20rem"},
        { selector: row => 'subtitle', name: 'Subtítulo', sortable: true, format: row => {return row.subtitle.toString()}, maxWidth: "24rem"},
        { selector: row => 'link', name: 'Link', sortable: true, format: row => {return row.link.toString()}, maxWidth: "24rem"}
      ]);
      
      PostController.read().then((posts) => { if(posts){
        if(search.trim() === '') {
          setRows(posts);
        }
        else {
          setRows(posts.filter((post) => {
            if(post.title){
              return post.title.includes(search);
            }
            else return false;
          }));
        }
      }});
    }
  }, [type, search]);

  return {columns, rows};
}