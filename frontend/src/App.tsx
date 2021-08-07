import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';

import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { ReadAndExcludeEmployee } from './pages/ReadAndExcludeEmployee'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/*localStorage.getItem('token')*/ true ? (
            <Sidebar>
              <Route path="/home" component={Home}/>
              <Route path="/employees" component={ReadAndExcludeEmployee}/>
            </Sidebar>
          ): <Route path="/" exact component={Login}/>}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
