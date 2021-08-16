import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Header } from '../../components/Header';
import { PageCRUD } from '../../components/PageCRUD';
import { Row } from '../../hooks/useTable';
import { Modal } from '../../components/Modal';

import VaccineController from '../../service/controllers/VaccineController';

export function ReadAndExcludeVaccine() {
  const history = useHistory();
  const [rowsSelected, setRowsSelected] = useState<Row[]>([]);

  const [justOneVaccine, setJustOneVaccine] = useState(false);
  const [selectOneVaccine, setSelectOneVaccine] = useState(false);
  const [selectMoreVaccine, setSelectMoreVaccine] = useState(false);
  const [confirmExcludedVaccine, setConfirmExcludedVaccine] = useState(false);
  const [excludedVaccine, setExcludedVaccine] = useState(false);

  async function handleToNewVaccine() {
    history.push('/new/vaccine');
  }
  
  async function handleToEditVaccine() {
    if(rowsSelected.length > 1){
      setJustOneVaccine(true);
      return
    }
    if(rowsSelected.length < 1){
      setSelectOneVaccine(true);
      return
    }
    history.push(`/edit/vaccine/${rowsSelected[0]._id}`);
  }

  async function handleToRemoveVaccine() {
    if(rowsSelected.length < 1){
      setSelectMoreVaccine(true);
      return
    }
    setConfirmExcludedVaccine(true);
  }

  return(
    <div>
      <Header title="Vacinas"/>

      <PageCRUD 
        title="vaccines"
        handleToNew={handleToNewVaccine}
        handleToEdit={handleToEditVaccine}
        handleToRemove={handleToRemoveVaccine}
        setRowsSelected={setRowsSelected}
      />

      {justOneVaccine ? 
        <Modal 
          alert 
          title="Alerta ao editar vacina" 
          handleToCancel={() => {setJustOneVaccine(false)}}
        >
          Não é possível editar mais de uma vacina por vez.
        </Modal> 
      : false}

      {selectOneVaccine ? 
        <Modal 
          alert 
          title="Alerta ao editar vacina" 
          handleToCancel={() => {setSelectOneVaccine(false)}}
        >
          Selecione uma vacina para editar.
        </Modal> 
      : false}

      {selectMoreVaccine ? 
        <Modal 
          alert 
          title="Alerta ao excluir vacina" 
          handleToCancel={() => {setSelectMoreVaccine(false)}}
        >
          Selecione uma ou mais vacinas para excluir.
        </Modal> 
      : false}

      {confirmExcludedVaccine ? 
        <Modal 
          confirm 
          title="Alerta ao excluir vacina" 
          handleToCancel={() => {setConfirmExcludedVaccine(false)}}
          handleToConfirm={() => {
            setConfirmExcludedVaccine(false);
            VaccineController.delete(rowsSelected).then(() => {
              setExcludedVaccine(true);
            });
          }}
        >
          Atenção, todos os funcionários perderão essa(s) vacina(s). {`Deseja excluir a(s) vacina(s) ${rowsSelected.map(e => ' '+e.name)} ?`}
        </Modal> 
      : false}

      {excludedVaccine ? 
        <Modal 
          alert 
          title="Alerta ao excluir vacina" 
          handleToCancel={() => {
            window.location.reload();
            setExcludedVaccine(false)
          }}
        >
          vacina(s) excluída(s) com sucesso!
        </Modal> 
      : false}
    </div>
  );
}