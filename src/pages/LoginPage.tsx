import React, {useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';

import LoginForm from '../components/forms/LoginForm';
import { LoginData } from '../shared/types';
import { login, LoginContext } from '../util/auth';

import "./LoginPage.css"

const Login = () => {

    const history = useHistory();

    const [invalidCreds, setInvalidCreds] = useState(false);
    const loginContext = useContext(LoginContext);

    

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

                loginContext.setIsLoggedIn(true);
                console.log("is logged in? " + loginContext.isLoggedIn);

                res.json().then(json => {
                  // console.log(json.accessToken);
                  // window.localStorage.setItem('access-token', json.accessToken);
                  const accessToken  = json.access_token as string;
                  const accessExpireTime = json.access_expires_in as number;
                  const accessIssuedAt = json.access_issued_at as number;

                  const refreshToken = json.refresh_token as string;
                  const refreshExpireTime = json.refresh_expires_in as number;
                  const refreshIssuedAt = json.refresh_issued_at as number;

                  if (accessToken && accessExpireTime) login({jwtToken: accessToken, tokenExpiry: accessExpireTime, issuedAt: accessIssuedAt},
                    {jwtToken: refreshToken, tokenExpiry: refreshExpireTime, issuedAt: refreshIssuedAt})

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