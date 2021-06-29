import React from 'react';
import { useHistory } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';

import './SignUp.css'

const SignUp = () => {

    const history = useHistory();

    type SignUpData = {
        email: string,
        username: string,
        password: string
    }

    function signUpHandler(signUpData: SignUpData) {
        console.log(JSON.stringify(signUpData));
        fetch(
            'http://localhost:5000/api/v1/users/register',
            {
              method: 'POST',
              body: JSON.stringify(signUpData),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          ).then(() => {
            history.replace('/');
          });
    }

    return (
        <div className='sign-up-container'>
            <h1>Sign Up</h1>
            <SignUpForm onSignUp={signUpHandler}/>
        </div>
    );
};

export default SignUp;