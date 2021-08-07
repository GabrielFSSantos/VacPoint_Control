import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Header } from '../../components/Header';
import { LabelAndChange } from '../../components/LabelAndChange';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';

import { Post } from '../../service/models/Post';
import PostController from '../../service/controllers/PostController';
import cam from '../../assets/cam.png';

import './styles.scss'

type PostParams = {
  id: string;
}

export function RegisterAndEditPost() {
  const history = useHistory();
  const params = useParams<PostParams>();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');
  const [date, setDate] = useState('');
  
  const [alertFullFields, setAlertFullFields] = useState(false);
  const [alertRegistered, setAlertRegistered] = useState(false);
  const [alertEdited, setAlertEdited] = useState(false);

  useEffect(() => {
    if(params.id){
      PostController.show(params.id, 'id').then((dados) => {
        if (dados) {
          setTitle(dados.title);
          setSubtitle(dados.subtitle);
          setImage(dados.image);
          setLink(dados.link);
          setDate(dados.date);
        }
        else{
          history.push('/posts');
        }
      });
    }
  },[params, history]);

  function handleChangePost(){
    
    if(title !== '' && subtitle !== '' && image !== '' && link !== '') {
        
      const post: Post = {
        title,
        subtitle,
        date: date === '' ? new Date(Date.now()).toLocaleDateString() : date,
        image,
        link
      }

      if(params.id) {
        PostController.update(post).then(() => {
          setAlertEdited(true);
        });
      }
      else {
        PostController.create(post).then(() => {
          setAlertRegistered(true);
        });
      }
    }
    else{
      setAlertFullFields(true);
    }
  }

  return(
    <div id="register-and-edit-post" >
      <Header title={params.id ? "Editar Postagem" : "Nova Postagem"}/>
      
      <main>
        <div className="board">
          <form>
            <div className="Infos">
              <div>
                <LabelAndChange
                  input 
                  name="Título"
                  type="text" 
                  onChange={event => setTitle(event.target.value)}
                  placeholder="Digite o título da postagem..."
                  value={title !== '' ? title : undefined}
                />

                <LabelAndChange
                  input 
                  name="Subtítulo"
                  type="text" 
                  onChange={event => setSubtitle(event.target.value)}
                  placeholder="Digite o subtítulo da postagem..."
                  value={subtitle !== '' ? subtitle : undefined}
                />

                <LabelAndChange
                  input 
                  name="Link"
                  type="text" 
                  onChange={event => setLink(event.target.value)}
                  placeholder="Digite o link da postagem..."
                  value={link !== '' ? link : undefined}
                />
              </div>

              <div>
                <LabelAndChange
                  input 
                  name="imagem"
                  type="text" 
                  onChange={event => setImage(event.target.value)}
                  placeholder="Digite o endereço da imagem da postagem..."
                  value={image !== '' ? image : undefined}
                />

                <div className="imageContent">
                  <span>Visualização:</span>
                  {image ? (<img src={image} alt="image"/>) : (<img src={cam} alt="image"/>)}
                </div>
              </div>
            </div>
          </form>
        </div>
        <Button onClick={handleChangePost}>{params.id ? "Salvar Alterações" : "Cadastrar Postagem"}</Button>
      </main>

      {alertFullFields ? 
        <Modal 
          alert 
          title="Alerta ao cadastrar postagem" 
          handleToCancel={() => {setAlertFullFields(false)}}
        >
          Preencha todos os campos!
        </Modal> 
      : false}

      {alertRegistered ? 
        <Modal 
          alert 
          title="Postagem Cadastrada"
          handleToCancel={() => {
            setAlertRegistered(false); 
            history.push('/posts');
          }}
        >
          {`Postagem ${title} cadastrada com sucesso!`}
        </Modal> 
      : false}

      {alertEdited ? 
        <Modal 
          alert 
          title="Postagem Editada"
          handleToCancel={() => {
            setAlertEdited(false);
            history.push('/posts');
          }}
        >
          {`Postagem ${title} editada com sucesso!!!`}
        </Modal> 
      : false}
    </div>
  );
}
