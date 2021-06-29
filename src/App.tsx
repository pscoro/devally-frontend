import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import MainLayout from './components/MainLayout';

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
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;