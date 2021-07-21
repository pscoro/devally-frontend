import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import SignUpForm from '../components/forms/SignUpForm';
import { LoginData } from '../shared/types';
import { login } from '../util/auth';

import './SignUpPage.css'

const SignUp = () => {

    const history = useHistory();

    const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false);
    const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);

    type SignUpData = {
        email: string,
        username: string,
        password: string
    }

    function signUpHandler(signUpData: SignUpData) {
        // console.log(JSON.stringify(signUpData));
        console.log("HANDLED");
        fetch(
            'http://localhost:5000/api/v1/users/register',
            {
              method: 'POST',
              body: JSON.stringify(signUpData),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          ).then(res => {
            if (res.status === 500) {
              return res.json().then(object => {
                if ('username' in object.error.keyValue) {
                  setUsernameAlreadyExists(true);
                } else if ('email' in object.error.keyValue) {
                  setEmailAlreadyExists(true);
                } else {
                  console.log("WANK");
                }
              });
            } else  if (res.status === 201) {
              setUsernameAlreadyExists(false);
              setEmailAlreadyExists(false);
              console.log("all good");
              
              let loginData: LoginData = {
                usernameOrEmail: signUpData.email,
                password: signUpData.password
              }
              
              //Log in
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
                    console.log("Trouble Logging in");
                } else if (res.status === 200) {
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
          });
    }

    return (
      <div className="page-container">
        <div className="left">
          <img src="./bracket-left.svg" alt="" />
        </div>
        <div className='sign-up-container'>
          <h1>Sign Up</h1>
          <SignUpForm onSignUp={signUpHandler} usernameAlreadyExists={usernameAlreadyExists} emailAlreadyExists={emailAlreadyExists}/>
        </div>
        <div className="right">
          <img src="./bracket-left.svg" alt="" />
        </div>
      </div>
        
    );
};

export default SignUp;