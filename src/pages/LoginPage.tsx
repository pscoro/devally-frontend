import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import LoginForm from '../components/forms/LoginForm';
import { LoginData } from '../shared/types';
import { login } from '../util/auth';

import "./LoginPage.css"

const Login = () => {

    const history = useHistory();

    const [invalidCreds, setInvalidCreds] = useState(false);

    

    function loginHandler(loginData: LoginData) {
      console.log("HANDLED");
        // console.log(JSON.stringify(loginData));
        fetch(
            'http://localhost:5000/api/v1/users/login',
            {
              method: 'POST',
              body: JSON.stringify(loginData),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          ).then(res => {
            if (res.status === 401) {
                setInvalidCreds(true);
            } else if (res.status === 200) {
                setInvalidCreds(false);

                res.json().then(json => {
                  // console.log(json.accessToken);
                  // window.localStorage.setItem('access-token', json.accessToken);
                  const accessToken  = json.acess_token as string;
                  const accessExpireTime = json.access_expires_in as number;

                  if (accessToken && accessExpireTime) login({jwtToken: accessToken, tokenExpiry: accessExpireTime})
                  history.replace('/dashboard');
                });
                
                // console.log("all good");
                
            }
            
          });
    }

    return (
        <div className='login-container'>
            <h1>Login</h1>
            <LoginForm onLogin={loginHandler} invalidCreds={invalidCreds}/>
        </div>
    );
};

export default Login;