'use client'
import React, { useState } from 'react'
import LoginContext from './logincontext'
import { Router, useRouter } from 'next/navigation';


const LoginState = (props) => {
    const router = useRouter()

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.clear('token')
        setIsLoggedIn(false);
        router.push('/login')
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
            {props.children}
        </LoginContext.Provider>
    );
};


export default LoginState