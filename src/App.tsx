import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import { useAuth, LoginProvider } from './util/auth';
import React from 'react';
// import { withAuthProps } from './shared/types';
import { useState } from 'react';


function App() {

  let {isLoggedIn, redirectLogin, error} = useAuth();

  const [ isLoggedInState, setIsLoggedInState ] = useState(isLoggedIn);
  console.log("isloggedin " + isLoggedIn);
  const [ redirectLoginState, setRedirectLoginState ] = useState(redirectLogin);


  let login = {isLoggedIn: isLoggedInState, redirectLogin: redirectLoginState, setIsLoggedIn: setIsLoggedInState, setRedirectLogin: setRedirectLoginState}

  return (
    <LoginProvider value={login} >
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route exact path='/'>
              <LandingPage />
            </Route>
            <Route exact path='/explore'>
              <ExplorePage />
            </Route>
            <Route exact path='/login'>
              <LoginPage />
            </Route>
            <Route path='/sign-up'>
              <SignUpPage />
            </Route>
            <Route path='/dashboard'>
              <DashboardPage />
            </Route>
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;