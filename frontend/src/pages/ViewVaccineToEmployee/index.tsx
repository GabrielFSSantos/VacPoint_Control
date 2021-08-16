import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

import { Vaccine } from '../../service/models/Vaccine';
import VaccineController from '../../service/controllers/VaccineController';

import './styles.scss';
import EmployeeController from '../../service/controllers/EmployeeController';


type EmployeeParams = {
  id: string;
}

export function ViewVaccineToEmployee() {
  const history = useHistory();
  const params = useParams<EmployeeParams>();

  const [name, setName] = useState('');
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);


  useEffect(() => {
    if(params.id){
      EmployeeController.readToEmployee(params.id).then((dados) => {
        if (dados) {
          setName(dados.name);
          setVaccines(dados.vaccines);
        }
        else{
          history.push('/employees');
        }
      });
    }
  },[params, history]);
  
  function handleToDate(dosageId: string, date: Date | [Date | null, Date | null] | null) {
    console.log(dosageId);
    console.log(date?.toLocaleString());
  }

  function handleToToggle(dosageId: string, event: React.ChangeEvent<HTMLInputElement>) {
    console.log(dosageId);
    console.log(event.target.checked);
  }

  function handleToSave() {
    
  }

  return(
    <div id="view-vaccine-employee">
      <Header title={`Vacinas do funcionário ${name}`}/>
      
      <main>
        <div className="board">
          {vaccines.map(vaccine => { return (
            <div className="rowVaccine">
              <Card vaccine title={vaccine.name}/>
              {vaccine.dosages ? vaccine.dosages.map(dosage => { return (
                <Card dosage dosageInfos={dosage} handleToDate={handleToDate} handleToToggle={handleToToggle}/>
              )}): false}
            </div>
          )})}
        </div>
        <Button onClick={handleToSave}>Salvar Alterações</Button>
      </main>
    </div>
  );
}