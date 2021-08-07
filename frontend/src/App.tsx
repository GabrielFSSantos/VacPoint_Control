import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';

import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { ReadAndExcludeEmployee } from './pages/ReadAndExcludeEmployee';
import { RegisterAndEditEmployee } from './pages/RegisterAndEditEmployee';
import { ReadAndExcludeVaccine } from './pages/ReadAndExcludeVaccine';
import { ReadAndExcludePost } from './pages/ReadAndExcludePost';
import { RegisterAndEditPost } from './pages/RegisterAndEditPost';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/*localStorage.getItem('token')*/ true ? (
            <Sidebar>
              <Route path="/home" component={Home}/>
              <Route path="/employees" component={ReadAndExcludeEmployee}/>
              <Route path="/new/employee" component={RegisterAndEditEmployee}/>
              <Route path="/edit/employee/:id" component={RegisterAndEditEmployee}/>
              <Route path="/vaccines" component={ReadAndExcludeVaccine}/>
              <Route path="/posts" component={ReadAndExcludePost}/>
              <Route path="/new/post" component={RegisterAndEditPost}/>
              <Route path="/edit/post/:id" component={RegisterAndEditPost}/>
            </Sidebar>
          ): <Route path="/" exact component={Login}/>}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
