import './App.css';
import './Font.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Frame from './components/Frame/Frame'
import Login from './components/Login/Login'
import Search from './components/Search/Search'
import Addroom from './components/room/Addroom/Addroom'
import Roomlist from './components/room/Roomlist/Roomlist'
import Roominfo from './components/room/Roominfo/Roominfo'
import Myroom from './components/room/Myroom/Myroom'
import Setting from './components/Setting/Setting'
//import Login from './components/user/login'
import User from './components/user/user'
import NewUser from './components/user/newuser'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login"><Login/></Route>
        <Route exact path="/"><Frame><Search/></Frame></Route>
        <Route exact path="/search"><Frame><Search/></Frame></Route>
        <Route exact path="/addroom"><Frame><Addroom/></Frame></Route>
        <Route exact path="/roomlist"><Roomlist/></Route>
        <Route exact path="/roominfo"><Roominfo/></Route>
        <Route exact path="/myroom"><Frame><Myroom/></Frame></Route>
        <Route exact path="/setting"><Frame><Setting/></Frame></Route>
        <Route exact path="/users">
          <User/>
          <Link to='/users/new'>New user</Link>
        </Route>
        <Route exact path="/users/new"><NewUser/></Route>
      </Switch>
    </Router>
  );
}

export default App;
