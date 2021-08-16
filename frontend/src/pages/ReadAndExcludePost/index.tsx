import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Header } from '../../components/Header';
import { PageCRUD } from '../../components/PageCRUD';
import { Row } from '../../hooks/useTable';
import { Modal } from '../../components/Modal';

import PostController from '../../service/controllers/PostController';

export function ReadAndExcludePost() {
  const history = useHistory();
  const [rowsSelected, setRowsSelected] = useState<Row[]>([]);

  const [justOnePost, setJustOnePost] = useState(false);
  const [selectOnePost, setSelectOnePost] = useState(false);
  const [selectMorePost, setSelectMorePost] = useState(false);
  const [confirmExcludedPost, setConfirmExcludedPost] = useState(false);
  const [excludedPost, setExcludedPost] = useState(false);

  async function handleToNewPost() {
    history.push('/new/post');
  }
  
  async function handleToEditPost() {
    if(rowsSelected.length > 1){
      setJustOnePost(true);
      return
    }
    if(rowsSelected.length < 1){
      setSelectOnePost(true);
      return
    }
    history.push(`/edit/post/${rowsSelected[0]._id}`);
  }

  async function handleToRemovePost() {
    if(rowsSelected.length < 1){
      setSelectMorePost(true);
      return
    }
    setConfirmExcludedPost(true);
  }

  return(
    <div>
      <Header title="Postagens"/>

      <PageCRUD 
        title="posts"
        handleToNew={handleToNewPost}
        handleToEdit={handleToEditPost}
        handleToRemove={handleToRemovePost}
        setRowsSelected={setRowsSelected}
      />

      {justOnePost ? 
        <Modal 
          alert 
          title="Alerta ao editar postagem" 
          handleToCancel={() => {setJustOnePost(false)}}
        >
          Não é possível editar mais de uma postagem por vez.
        </Modal> 
      : false}

      {selectOnePost ? 
        <Modal 
          alert 
          title="Alerta ao editar postagem" 
          handleToCancel={() => {setSelectOnePost(false)}}
        >
          Selecione uma postagem para editar.
        </Modal> 
      : false}

      {selectMorePost ? 
        <Modal 
          alert 
          title="Alerta ao excluir postagem" 
          handleToCancel={() => {setSelectMorePost(false)}}
        >
          Selecione uma ou mais postagems para excluir.
        </Modal> 
      : false}

      {confirmExcludedPost ? 
        <Modal 
          confirm 
          title="Alerta ao excluir postagem" 
          handleToCancel={() => {setConfirmExcludedPost(false)}}
          handleToConfirm={() => {
            setConfirmExcludedPost(false);
            PostController.delete(rowsSelected).then(() => {
              setExcludedPost(true);
            });
          }}
        >
          {`Deseja excluir a(s) postagem(s) ${rowsSelected.map(e => ' '+e.title)} ?`}
        </Modal> 
      : false}

      {excludedPost ? 
        <Modal 
          alert 
          title="Alerta ao excluir postagem" 
          handleToCancel={() => {
            window.location.reload();
            setExcludedPost(false)
          }}
        >
          postagem(s) excluída(s) com sucesso!
        </Modal> 
      : false}
    </div>
  );
}