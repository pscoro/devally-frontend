import React, {useRef, useState} from 'react';

import './SignUpForm.css';
import Card from './ui/Card';

type SignUpData = {
    email: string,
    username: string,
    password: string
}

type PropsSignUpForm = {
    onSignUp(signUpData: SignUpData): void
}

const SignUpForm: React.FC<PropsSignUpForm> = (props) => {

    function validateEmail(email: string): boolean {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const usernameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const retypePasswordInputRef = useRef<HTMLInputElement>(null);

    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [validEmail, setValidEmail] = useState(true);

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        console.log("CLICK");

        if (null !== usernameInputRef.current && null !== emailInputRef.current && null !== passwordInputRef.current && null !== retypePasswordInputRef) {
            const enteredUsername = usernameInputRef.current.value;
            const enteredEmail = emailInputRef.current.value;
            const enteredPassword = passwordInputRef.current.value;
            // const enteredRetypePassword = passwordInputRef.current.value;
        
            if(passwordsMatch && validEmail) {
                const signUpData: SignUpData = {
                    email: String(enteredEmail).toLowerCase(),
                    username: enteredUsername,
                    password: enteredPassword
                }
        
                props.onSignUp(signUpData);
            }
 
        } else {
            console.log("ERROR BRO");
        }

    }



    return (
        <div>
            <Card>
                <form className='form' onSubmit={submitHandler}>
                    <div className='control'>
                        <label htmlFor='email'>Email</label>
                        <input type='text' required id='email' ref={emailInputRef} onChange={() => {
                            if (emailInputRef.current) {
                                validateEmail(emailInputRef.current.value) ? setValidEmail(true) : setValidEmail(false);
                            }
                        }} />
                        {!validEmail && <p>Email is Invalid</p>}
                    </div>
                    <div className='control'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' required id='username' ref={usernameInputRef} />
                    </div>
                    <div className='control'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' required id='password' ref={passwordInputRef} onChange={() => {
                            if (passwordInputRef.current && retypePasswordInputRef.current) {
                                (passwordInputRef.current.value === retypePasswordInputRef.current.value) ? setPasswordsMatch(true) : setPasswordsMatch(false);
                            }
                        }}/>
                    </div>
                    <div className='control'>
                        <label htmlFor='retype-password'>Retype Password</label>
                        <input type='password' required id='retype-password' ref={retypePasswordInputRef} onChange={() => {
                            if (passwordInputRef.current && retypePasswordInputRef.current) {
                                (passwordInputRef.current.value === retypePasswordInputRef.current.value) ? setPasswordsMatch(true) : setPasswordsMatch(false);
                            }
                        }}/>
                        {!passwordsMatch && <p>Passwords do not match</p>}
                    </div>
                    <div className='actions'>
                        <button type="submit" id="submit-btn" disabled={!validEmail || !passwordsMatch}>Sign Up</button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default SignUpForm;