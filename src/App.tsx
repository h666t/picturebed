import React from 'react';
import {lazy, Suspense} from 'react';
import {Route, HashRouter as Router, Switch} from 'react-router-dom';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import Loading from './components/Loading';

const Home = lazy(() => import('./view/Home'));
const History = lazy(() => import('./view/History'));
const About = lazy(() => import('./view/About'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));

function App() {
  return (
    <>
      <Router>
        <Header/>
        <main>
          <Suspense fallback={<Loading/>}>
            <Switch>
              <Route exact path={'/register'} component={Register}/>
              <Route exact path={'/login'} component={Login}/>
              <Route exact path="/about" component={About}/>
              <Route exact path="/history" component={History}/>
              <Route exact path="/" component={Home}/>
            </Switch>
          </Suspense>
        </main>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
