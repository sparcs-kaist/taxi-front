import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navigation from './core/Navigation'
import Footer from './core/Footer'
import Search from './core/Search/Search'

function App() {
  return (
    <div id="main-container">
      <div id="main-content">
        <Router>
          <Switch>
            <Route exact path="/" component={Search}/>
          </Switch>
        </Router>
        <Footer/>
      </div>
      <Navigation/>
    </div>
  );
}

export default App;
