import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import LoginForm from '../components/forms/LoginForm';

import "./Login.css"

const Login = () => {

    const history = useHistory();

    const [invalidCreds, setInvalidCreds] = useState(false);

    type LoginData = {
        usernameOrEmail: string,
        password: string
    }

    function loginHandler(loginData: LoginData) {
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
            } else  if (res.status === 200) {
                setInvalidCreds(false);
                console.log("all good");
                history.replace('/dashboard');
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