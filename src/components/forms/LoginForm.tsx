import React, {useRef} from 'react';

import Card from '../ui/Card';

import './SignUpForm.css'

type LoginData = {
    usernameOrEmail: string
    password: string
}

type PropsLoginForm = {
    onLogin(loginData: LoginData): void,
    invalidCreds: boolean
}


const LoginForm: React.FC<PropsLoginForm> = (props) => {

    const usernameOrEmailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (null !== usernameOrEmailInputRef.current && null !== passwordInputRef.current) {
            const enteredUsernameOrEmail = usernameOrEmailInputRef.current.value;
            const enteredPassword = passwordInputRef.current.value;

            const loginData: LoginData = {
                usernameOrEmail: enteredUsernameOrEmail,
                password: enteredPassword
            }

            props.onLogin(loginData)
        } else {
            console.log("ERROR BRO");
        }

    }

    return (
        <div>
            <Card>
                <form className='form' onSubmit={submitHandler}>
                    <div className='control'>
                    </div>
                    <div className='control'>
                        <label htmlFor='usernameOrEmail'>Username Or Email</label>
                        <input type='text' required id='username' ref={usernameOrEmailInputRef} />
                    </div>
                    <div className='control'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' required id='password' ref={passwordInputRef}/>
                        {props.invalidCreds && <p>Invalid credentials</p>}
                    </div>
                    <div className='actions'>
                        <button type="submit" id="submit-btn">Login</button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default LoginForm;