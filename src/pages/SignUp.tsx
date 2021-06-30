import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import SignUpForm from '../components/forms/SignUpForm';

import './SignUp.css'

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
              return res.json();
            } else  if (res.status === 201) {
              setUsernameAlreadyExists(false);
              setEmailAlreadyExists(false);
              console.log("all good");
              history.replace('/dashboard');
            }
          }).then(object => {
            if ('username' in object.error.keyValue) {
              setUsernameAlreadyExists(true);
            } else if ('email' in object.error.keyValue) {
              setEmailAlreadyExists(true);
            } else {
              console.log("WANK");
            }
          });
    }

    return (
        <div className='sign-up-container'>
            <h1>Sign Up</h1>
            <SignUpForm onSignUp={signUpHandler} usernameAlreadyExists={usernameAlreadyExists} emailAlreadyExists={emailAlreadyExists}/>
        </div>
    );
};

export default SignUp;