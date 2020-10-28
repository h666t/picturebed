import React from 'react';
import {lazy,Suspense} from 'react'
import './App.css';
import {Route, HashRouter as Router, Switch} from 'react-router-dom';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import Loading from './components/Loading';
const Home = lazy(()=>import('./view/Home'))
const History = lazy(()=>import('./view/History'))
const About = lazy(()=>import('./view/About'))

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Suspense fallback={<Loading/>}>
          <Switch>
            <Route exact path="/about" component={About}/>
            <Route exact path="/history" component={History}/>
            <Route exact path="/" component={Home}/>
          </Switch>
        </Suspense>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
