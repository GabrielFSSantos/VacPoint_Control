import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Header } from '../../components/Header';
import { PageCRUD } from '../../components/PageCRUD';
import { Row } from '../../hooks/useTable';
import { Modal } from '../../components/Modal';

import EmployeeController from '../../service/controllers/EmployeeController';

export function ReadAndExcludeEmployee() {
  const history = useHistory();
  const [rowsSelected, setRowsSelected] = useState<Row[]>([]);

  const [justOneEmployee, setJustOneEmployee] = useState(false);
  const [selectOneEmployee, setSelectOneEmployee] = useState(false);
  const [selectMoreEmployee, setSelectMoreEmployee] = useState(false);
  const [confirmExcludedEmployee, setConfirmExcludedEmployee] = useState(false);
  const [excludedEmployee, setExcludedEmployee] = useState(false);
  const [vaccinesEmployee, setVaccinesEmployee] = useState(false);

  async function handleToNewEmployee() {
    history.push('/new/employee');
  }
  
  async function handleToEditEmployee() {
    if(rowsSelected.length > 1){
      setJustOneEmployee(true);
      return
    }
    if(rowsSelected.length < 1){
      setSelectOneEmployee(true);
      return
    }
    history.push(`/edit/employee/${rowsSelected[0]._id}`);
  }

  async function handleToRemoveEmployee() {
    if(rowsSelected.length < 1){
      setSelectMoreEmployee(true);
      return
    }
    setConfirmExcludedEmployee(true);
  }

  async function handleToVaccine() {
    if(rowsSelected.length > 1){
      setJustOneEmployee(true);
      return
    }
    if(rowsSelected.length < 1){
      setSelectOneEmployee(true);
      return
    }
    history.push(`/vaccine/employee/${rowsSelected[0]._id}`);
  }

  return(
    <div>
      <Header title="Funcionários"/>

      <PageCRUD 
        title="employees"
        handleToNew={handleToNewEmployee}
        handleToEdit={handleToEditEmployee}
        handleToRemove={handleToRemoveEmployee}
        setRowsSelected={setRowsSelected}
        handleToVaccine={handleToVaccine}
      />

      {justOneEmployee ? 
        <Modal 
          alert 
          title="Alerta ao editar funcionário" 
          handleToCancel={() => {setJustOneEmployee(false)}}
        >
          Não é possível editar ou ver vacinas de mais de um funcionário por vez.
        </Modal> 
      : false}

      {selectOneEmployee ? 
        <Modal 
          alert 
          title="Alerta ao editar funcionário" 
          handleToCancel={() => {setSelectOneEmployee(false)}}
        >
          Selecione um funcionário para editar ou ver suas vacinas.
        </Modal> 
      : false}

      {selectMoreEmployee ? 
        <Modal 
          alert 
          title="Alerta ao excluir funcionário" 
          handleToCancel={() => {setSelectMoreEmployee(false)}}
        >
          Selecione um ou mais funcionários para excluir.
        </Modal> 
      : false}

      {confirmExcludedEmployee ? 
        <Modal 
          confirm 
          title="Alerta ao excluir funcionário" 
          handleToCancel={() => {setConfirmExcludedEmployee(false)}}
          handleToConfirm={() => {
            setConfirmExcludedEmployee(false);
            EmployeeController.delete(rowsSelected).then(() => {
              setExcludedEmployee(true);
            });
          }}
        >
          {`Deseja excluir o(s) funcionário(s) ${rowsSelected.map(e => ' '+e.name)} ?`}
        </Modal> 
      : false}

      {excludedEmployee ? 
        <Modal 
          alert 
          title="Alerta ao excluir funcionário" 
          handleToCancel={() => {
            window.location.reload();
            setExcludedEmployee(false)
          }}
        >
          funcionário(s) excluído(s) com sucesso!
        </Modal> 
      : false}
    </div>
  );
}