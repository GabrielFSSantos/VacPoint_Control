import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/logo.png'

import './styles.scss';

type SidebarProps = {
  children?: ReactNode;
}

export function Sidebar({children}: SidebarProps) {
  const history = useHistory();

  async function handleToHome() {
    history.push('/home');
  }

  async function handleToClients() {
    history.push('/employees');
  }

  async function handleToRequests() {
    history.push('/vaccines');
  }

  async function handleToCosts() {
    history.push('/posts');
  }

  return(
    <div id="sidebar" >
      <aside>
        <img src={logo} alt="Logo" onClick={handleToHome}/>
        <div className="list">
          <span onClick={handleToClients}>Funcionários</span>
          <span onClick={handleToRequests}>Vacinas</span>
          <span onClick={handleToCosts}>Postages</span>
        </div>
      </aside>
      <section>
        {children}
      </section>
    </div>
  );
}