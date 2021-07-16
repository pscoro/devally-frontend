import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import { withAuthSync } from './util/auth';
// import { withAuthProps } from './shared/types';


function App() {
  return (
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
  );
}

export default withAuthSync(App);