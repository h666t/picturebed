import React from 'react';
import './App.css';
import {Route, HashRouter as Router, Link, Switch} from 'react-router-dom';
import {About} from './view/About';
import {Home} from './view/Home';
import {History} from './view/History';
import {Header} from './components/Header';
import {Footer} from './components/Footer';

function App() {
  return (
    <div className="App">

      <Router>
        <Header/>
        <ul>
          <li><Link to={'/about'}>about</Link></li>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/history'}>history</Link></li>
        </ul>
        <Switch>
          <Route exact path="/about" component={About}/>
          <Route exact path="/history" component={History}/>
          <Route exact path="/" component={Home}/>
        </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
