import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Frame from './core/Frame/Frame'
import Login from './core/Login/Login'
import Search from './core/Search/Search'
import Addroom from './core/Addroom/Addroom'
import Myroom from './core/Myroom/Myroom'
import Setting from './core/Setting/Setting'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login"><Login/></Route>
        <Route exact path="/"><Frame><Search/></Frame></Route>
        <Route exact path="/search"><Frame><Search/></Frame></Route>
        <Route exact path="/addroom"><Frame><Addroom/></Frame></Route>
        <Route exact path="/myroom"><Frame><Myroom/></Frame></Route>
        <Route exact path="/setting"><Frame><Setting/></Frame></Route>
      </Switch>
    </Router>
  );
}

export default App;
