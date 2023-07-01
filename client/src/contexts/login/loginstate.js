'use client'
import React, { useState, useEffect } from 'react';
import LoginContext from './logincontext';
import { Router, useRouter } from 'next/navigation';


const LoginState = (props) => {
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/login');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
            {props.children}
        </LoginContext.Provider>
    );
};

export default LoginState;
