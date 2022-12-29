import { React, useState } from 'react';
import { login } from '../../actions/auth_actions';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Input from '../../components/input';
import LoginLayout from '../../components/layouts/login_layout';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);


    const userLogin = (e) => {
        e.preventDefault();

        const user = {
            email,
            password
        }
        dispatch(login(user));
    }

    if (auth.authenticate)
        return <Navigate replace to="/" />;
    return (
        <LoginLayout signin onSubmit={userLogin}>

            <Input
                controlId="formEmail"
                label="Email Address"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input
                controlId="formPassword"
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />


        </LoginLayout>
    )
}
