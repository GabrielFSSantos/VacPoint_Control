import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import EmployeeController from '../../service/controllers/EmployeeController';
import { VaccineToDosage, EmployeeToVaccines } from '../../service/models/EmployeeToVaccines';

import { Employee } from '../../service/models/Employee';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

import './styles.scss';
import { Modal } from '../../components/Modal';

type EmployeeParams = {
  id: string;
}

export function ViewVaccineToEmployee() {
  const history = useHistory();
  const params = useParams<EmployeeParams>();

  const [employee, setEmployee] = useState<Employee>({});
  const [vaccineToDosage, setVaccineToDosage] = useState<VaccineToDosage[]>([]);
  const [alertEdited, setAlertEdited] = useState(false);

  useEffect(() => {
    if(params.id){
      EmployeeController.readToVaccines(params.id).then((dados) => {
        if (dados) {
          setEmployee(dados.employee || {});
          setVaccineToDosage(dados.vaccines || []);
        }
        else{
          history.push('/employees');
        }
      });
    }
  },[params, history]);
  
  function handleToDate(dosageId: string, date: Date) {
    let vaccineToDosageAux = vaccineToDosage;
    vaccineToDosageAux.forEach(element => {
      element.dosages?.forEach(dosage => {
        if(dosage._id === dosageId){
          dosage.date = date.toLocaleDateString();
          setVaccineToDosage(vaccineToDosageAux);
          return
        }
      });
    });
  }

  function handleToToggle(dosageId: string, took: boolean) {
    let vaccineToDosageAux = vaccineToDosage;
    vaccineToDosageAux.forEach(element => {
      element.dosages?.forEach(dosage => {
        if(dosage._id === dosageId){
          dosage.took = took;
          setVaccineToDosage(vaccineToDosageAux);
          return
        }
      });
    });
  }

  function handleToSave() {
    const request: EmployeeToVaccines = {
      employee,
      vaccines: vaccineToDosage
    }

    EmployeeController.updateToVaccines(request).then(() => {
      setAlertEdited(true);
    });
  }

  return(
    <div id="view-vaccine-employee">
      <Header title={`Vacinas do funcionário ${employee.name}`}/>
      
      <main>
        <div className="board">
          {vaccineToDosage.map(element => { return (
            <div key={element.vaccine?._id} className="rowVaccine">
              <Card vaccine title={element.vaccine?.name}/>
              {element.dosages ? element.dosages.map(dosage => { return (
                <Card 
                  dosage 
                  key={dosage._id} 
                  dosageInfos={dosage} 
                  handleToDate={handleToDate} 
                  handleToToggle={handleToToggle}
                />
              )}): false}
            </div>
          )})}
        </div>
        <Button onClick={handleToSave}>Salvar Alterações</Button>
      </main>
    
      {alertEdited ? 
        <Modal 
          alert 
          title="Vacinas editadas com sucesso!"
          handleToCancel={() => {
            setAlertEdited(false);
            history.push('/employees');
          }}
        >
          {`Vacinas do funcionário ${employee.name} editadas com sucesso!!!`}
        </Modal> 
      : false}
    </div>
  );
}