import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Header } from '../../components/Header';
import { LabelAndChange } from '../../components/LabelAndChange';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';

import { Vaccine } from '../../service/models/Vaccine';
import VaccineController from '../../service/controllers/VaccineController';
import cam from '../../assets/cam.png';

import './styles.scss'

type VaccineParams = {
  id: string;
}

export function RegisterAndEditVaccine() {
  const history = useHistory();
  const params = useParams<VaccineParams>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantDosage, setQuantDosage] = useState(0);
  
  const [alertFullFields, setAlertFullFields] = useState(false);
  const [alertRegistered, setAlertRegistered] = useState(false);
  const [alertEdited, setAlertEdited] = useState(false);

  useEffect(() => {
    if(params.id){
      VaccineController.show(params.id, 'vaccineId').then((dados) => {
        if (dados) {
          setName(dados.name);
          setQuantDosage(dados.quantDosage);
          setDescription(dados.description);
        }
        else{
          history.push('/vaccines');
        }
      });
    }
  },[params, history]);

  function handleChangeVaccine(){
    
    if(name !== '' && quantDosage !== 0 && description !== '') {
        
      const vaccine: Vaccine = {
        name,
        quantDosage,
        description,
      }

      if(params.id) {
        VaccineController.update(vaccine).then(() => {
          setAlertEdited(true);
        });
      }
      else {
        VaccineController.create(vaccine).then(() => {
          setAlertRegistered(true);
        });
      }
    }
    else{
      setAlertFullFields(true);
    }
  } 

  return(
    <div id="register-and-edit-vaccine" >
      <Header title={params.id ? "Editar Vacina" : "Nova Vacina"}/>
      
      <main>
        <div className="board">
          <form>
            <div className="Infos">
              <div>
                <LabelAndChange
                  input 
                  name="Nome"
                  type="text" 
                  onChange={event => setName(event.target.value)}
                  placeholder="Digite o nome da vacina..."
                  value={name !== '' ? name : undefined}
                />
              </div>

              <div>
                <LabelAndChange
                  input 
                  name="Quantidade de doses"
                  type="text" 
                  onChange={event => setQuantDosage(parseFloat(event.target.value) || 0)}
                  placeholder="Digite o endereço da imagem da vacina..."
                  value={quantDosage !== 0 ? quantDosage : undefined}
                />
              </div>
            </div>

            <div className="Description">
              <LabelAndChange
                textarea 
                name="Descrição"
                type="text" 
                onChange={event => setDescription(event.target.value)}
                placeholder="Digite o endereço da imagem da vacina..."
                value={description !== '' ? description : undefined}
              />
            </div>
          </form>
        </div>
        <Button onClick={handleChangeVaccine}>{params.id ? "Salvar Alterações" : "Cadastrar Vacina"}</Button>
      </main>

      {alertFullFields ? 
        <Modal 
          alert 
          title="Alerta ao cadastrar vacina" 
          handleToCancel={() => {setAlertFullFields(false)}}
        >
          Preencha todos os campos!
        </Modal> 
      : false}

      {alertRegistered ? 
        <Modal 
          alert 
          title="Vacina Cadastrada"
          handleToCancel={() => {
            setAlertRegistered(false); 
            history.push('/vaccines');
          }}
        >
          {`Vacina ${name} cadastrada com sucesso!`}
        </Modal> 
      : false}

      {alertEdited ? 
        <Modal 
          alert 
          title="Vacina Editada"
          handleToCancel={() => {
            setAlertEdited(false);
            history.push('/vaccines');
          }}
        >
          {`Vacina ${name} editada com sucesso!!!`}
        </Modal> 
      : false}
    </div>
  );
}
