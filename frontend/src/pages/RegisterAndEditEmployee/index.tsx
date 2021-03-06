import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Header } from '../../components/Header';
import { LabelAndChange } from '../../components/LabelAndChange';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';

import { Employee } from '../../service/models/Employee';
import EmployeeController from '../../service/controllers/EmployeeController';

import './styles.scss'

type EmployeeParams = {
  id: string;
}

export function RegisterAndEditEmployee() {
  const history = useHistory();
  const params = useParams<EmployeeParams>();

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sector, setSector] = useState('');
  const [occupation, setOccupation] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState(0);
  const [district, setDistrict] = useState('');
  const [complement, setComplement] = useState('');
  
  const [alertFullFields, setAlertFullFields] = useState(false);
  const [alertRegistered, setAlertRegistered] = useState(false);
  const [alertEdited, setAlertEdited] = useState(false);

  useEffect(() => {
    if(params.id){
      EmployeeController.show(params.id).then((dados) => {
        if (dados) {
          setName(dados.name || '');
          setCpf(dados.cpf || '');
          setEmail(dados.email || '');
          setPhone(dados.phone || '');
          setOccupation(dados.occupation || '');
          setSector(dados.sector || '');
          setCep(dados.cep || '');
          setCity(dados.city || '');
          setState(dados.state || '');
          setStreet(dados.street || '');
          setNumber(dados.number || 0);
          setDistrict(dados.district || '');
          setComplement(dados.complement || '');
        }
        else{
          history.push('/employees');
        }
      });
    }
  },[params, history]);

  function handleChangeEmployee(){
    
    if(name !== '' && cpf !== '' && email !== '' && 
      phone !== '' && occupation !== '' && sector !== '') {
        
      const employee: Employee = {
        name,
        cpf,
        email,
        phone,
        occupation,
        sector,
        cep,
        city,
        state,
        street,
        number,
        district,
        complement
      }

      if(params.id) {
        employee._id = params.id;
        EmployeeController.update(employee).then(() => {
          setAlertEdited(true);
        });
      }
      else {
        EmployeeController.create(employee).then(() => {
          setAlertRegistered(true);
        });
      }
    }
    else{
      setAlertFullFields(true);
    }
  }

  return(
    <div id="register-and-edit-employee" >
      <Header title={params.id ? "Editar Funcion??rio" : "Novo Funcion??rio"}/>
      
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
                  placeholder="Digite o nome do funcion??rio..."
                  value={name !== '' ? name : undefined}
                />

                <LabelAndChange
                  input 
                  name="E-mail"
                  type="text" 
                  onChange={event => setEmail(event.target.value)}
                  placeholder="Digite o email do funcion??rio..."
                  value={email !== '' ? email : undefined}
                />
              </div>

              <div>
                <LabelAndChange
                  input 
                  name="CPF"
                  type="text" 
                  onChange={event => setCpf(event.target.value)}
                  placeholder="Digite o CPF do funcion??rio..."
                  value={cpf !== '' ? cpf : undefined}
                />

                <LabelAndChange
                  input 
                  name="Telefone"
                  type="text" 
                  onChange={event => setPhone(event.target.value)}
                  placeholder="Digite o telefone do funcion??rio..."
                  value={phone !== '' ? phone : undefined}
                />
              </div>

              <div>
                <LabelAndChange
                  select
                  name="Setor"
                  onChange={event => setSector(event.target.value)}
                >
                  <option value="" disabled hidden selected>Selecione o setor do funcion??rio...</option>
                  <option value="administration">Administra????o</option>
                  <option value="kitchen">Cozinha</option>
                  <option value="nursing">Enfermagem</option>
                  <option value="drugstore">Farm??cia</option>
                  <option value="laboratory">Laborat??rio</option>
                  <option value="cleaning">Limpeza</option>
                  <option value="clothingProcessing">Processamento de Roupas</option>
                  <option value="radiology">Radiologia</option>
                </LabelAndChange>

                <LabelAndChange
                  select
                  name="Fun????o"
                  onChange={event => setOccupation(event.target.value)}
                >
                  <option value="" disabled selected hidden>Selecione a fun????o do funcion??rio...</option>
                  { sector === 'administration' ? (<>
                    <option value="" disabled selected hidden>Selecione a fun????o do funcion??rio...</option>
                    <option value="doorman">Porteiro(a)</option>
                    <option value="hospitalReceptionist">Rec. de Hospital</option>
                    <option value="biller">Faturista</option>
                    <option value="officeAssistant">Aux. De Escrit??rio</option>
                    <option value="administrator">Administrador(a)</option>
                    <option value="humanResources">Recursos Humanos</option>
                    <option value="youngApprentice">Jovem Aprendiz</option>
                    <option value="archivist">Arquivista</option>
                    <option value="maintenanceChief">Chefe de Manuten????o</option>
                    <option value="MaintenanceAssistant">Aux. de Manuten????o </option>
                  </>) : false }

                  { sector === 'kitchen' ? (<>
                    <option value="" disabled selected hidden>Selecione a fun????o do funcion??rio...</option>
                    <option value="nutritionist">Nutricionista</option>
                    <option value="butler">Copeiro(a)</option>
                    <option value="kitchenAssistant">Aux. de Cozinha</option>
                  </>) : false }

                  { sector === 'nursing' ? (<>
                    <option value="" disabled selected hidden>Selecione a fun????o do funcion??rio...</option>
                    <option value="nursingSupervisor">Sup. de Enfermagem</option>
                    <option value="nurse">Enfermeiro(a)</option>
                    <option value="nursingTechnician">Tec. em Enfermagem</option>
                  </>) : false }

                  { sector === 'drugstore' ? (<>
                    <option value="" disabled selected hidden>Selecione a fun????o do funcion??rio...</option>
                    <option value="pharmaceutical">Farmac??utico</option>
                    <option value="pharmacyAttendant">Aten. de Farm??cia</option>
                  </>) : false }

                  { sector === 'laboratory' ? (<>
                    <option value="" disabled selected hidden>Selecione a fun????o do funcion??rio...</option>
                    <option value="Biomedical">Biom??dico(a)</option>
                    <option value="pathologyTechnician">Aux. de Laborat??rio</option>
                    <option value="laboratoryAssistant">Tec. em Patologia</option>
                  </>) : false }

                  { sector === 'cleaning' ? (<>
                    <option value="" disabled selected hidden>Selecione a fun????o do funcion??rio...</option>
                    <option value="cleaner">Faxineiro(a)</option>
                  </>) : false }

                  { sector === 'clothingProcessing' ? (<>
                    <option value="" disabled selected hidden>Selecione a fun????o do funcion??rio...</option>
                    <option value="dressmaker">Costureiro(a)</option>
                    <option value="washer">Lavador(a)</option>
                  </>) : false }

                  { sector === 'radiology' ? (<>
                    <option value="" disabled selected hidden>Selecione a fun????o do funcion??rio...</option>
                    <option value="radiologist">Radiologista</option>
                    <option value="radiologyTechnician">Tec. em Radiologia</option>
                    <option value="radiologyAttendant">Aten. de Radiologia</option>
                  </>) : false }
                </LabelAndChange>
              </div>    
            </div>

            <h2>Endere??o</h2>
            <div className="Infos">
              <div>
                <LabelAndChange
                  input 
                  name="CEP"
                  type="text" 
                  onChange={event => setCep(event.target.value)}
                  placeholder="Digite o CEP do employeee..."
                  value={cep !== '' ? cep : undefined}
                />

                <LabelAndChange
                  input 
                  name="Rua"
                  type="text" 
                  onChange={event => setStreet(event.target.value)}
                  placeholder="Digite o rua do employeee..."
                  value={street !== '' ? street : undefined}
                />

                <LabelAndChange
                  input 
                  name="Complemento"
                  type="text" 
                  onChange={event => setComplement(event.target.value)}
                  placeholder="Digite o complemento do endere??o..."
                  value={complement !== '' ? complement : undefined}
                />
              </div>

              <div>
                <LabelAndChange
                  input 
                  name="Cidade"
                  type="text" 
                  onChange={event => setCity(event.target.value)}
                  placeholder="Digite o cidade do employeee..."
                  value={city !== '' ? city : undefined}
                />

                <LabelAndChange
                  input 
                  name="N??mero"
                  type="text" 
                  onChange={event => setNumber(parseFloat(event.target.value) || 0)}
                  placeholder="Digite o n??mero do employeee..."
                  value={number !== 0 ? number : undefined}
                />
              </div>

              <div>
                <LabelAndChange
                  input 
                  name="Estado"
                  type="text" 
                  onChange={event => setState(event.target.value)}
                  placeholder="Digite o estado do employeee..."
                  value={state !== '' ? state : undefined}
                />

                <LabelAndChange
                  input 
                  name="Bairro"
                  type="text" 
                  onChange={event => setDistrict(event.target.value)}
                  placeholder="Digite o bairro do employeee..."
                  value={district !== '' ? district : undefined}
                />
              </div>
            </div>
          </form>
        </div>
        <Button onClick={handleChangeEmployee}>{params.id ? "Salvar Altera????es" : "Cadastrar Funcion??rio"}</Button>
      </main>

      {alertFullFields ? 
        <Modal 
          alert 
          title="Alerta ao cadastrar funcion??rio" 
          handleToCancel={() => {setAlertFullFields(false)}}
        >
          Preencha todos os campos!
        </Modal> 
      : false}

      {alertRegistered ? 
        <Modal 
          alert 
          title="Funcion??rio Cadastrado"
          handleToCancel={() => {
            setAlertRegistered(false); 
            history.push('/employees');
          }}
        >
          {`Funcion??rio ${name} cadastrado com sucesso!`}
        </Modal> 
      : false}

      {alertEdited ? 
        <Modal 
          alert 
          title="Funcion??rio Editado"
          handleToCancel={() => {
            setAlertEdited(false);
            history.push('/employees');
          }}
        >
          {`Funcion??rio ${name} editado com sucesso!!!`}
        </Modal> 
      : false}
    </div>
  );
}
