"use client"
import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router, useRouter } from 'next/navigation';
import LoginContext from '@/contexts/login/logincontext';



const Page = () => {

    const loginContext = useContext(LoginContext)

    //Hosted backend api 
    const backEndurl = 'https://cloudnotebook-backend.vercel.app'

    //local backend api
    // const backEndurl = 'http://localhost:7000'

    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)

    const [loading, setLoading] = useState(false);

    const [passValue, setPassValue] = useState('')

    const passInput = (e) => {
        setPassValue(e.target.value)
    }

    //Set input values in user
    const [user, setUser] = useState({
        email: '', password: ''
    })

    //Get User Input 
    let name, value
    const handleInputs = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }

    //Handle Muliple Events
    const mulEvents = (e) => {
        e.preventDefault()
        passInput(e)
        handleInputs(e)
    }

    //handle Event PreventDefault (auto Refresh)
    const handleEventPreventDefaulf = (e) => {
        e.preventDefault()
    }


    const loginUser = async (e) => {
        e.preventDefault()
        const { email, password } = user

        setLoading(true);

        const res = await fetch(`${backEndurl}/loginuser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = await res.json()

        setLoading(false);

        if (res.status === 422 || !data) {
            toast.error('Fill Details Properly!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else if (res.status === 401 || !data) {
            toast.error('Invalid Details !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else if (res.status === 400 || !data) {
            toast.error('User Not Exist!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast.success('Login Successfully..!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                    router.push('/')
                },
            })
            localStorage.setItem('token', data.jwttokens)
            setUser({ email: '', password: '' })

            //change loginState when use Login
            loginContext.login()
        }
    }
    return (
        <>
            <section className="text-gray-600 body-font px-5 py-12">
                <form action="" method='POST'>
                    {loading ? (
                        <div className='w-screen h-[70vh] flex flex-col justify-center items-center'>
                            <div className="flex flex-col items-center space-x-2">
                                {/* Loading Spinner */}
                                <svg className="animate-spin h-10 w-10 text-black" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4zm8-7.291A7.962 7.962 0 0116 12h-4v4c3.042 0 5.824-1.135 7.938-3l-2.647-3z" />
                                </svg>
                                <span className="text-gray-500 mt-2">Verifying A User...</span>
                            </div>
                        </div>
                    ) : <div className="rounded-lg p-4 flex flex-col m-auto mt-10 md:mt-0 sm:w-[80vw]">
                        <h2 className="text-gray-900 text-2xl font-medium title-font mb-5">Login</h2>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-xs text-gray-600">Email</label>
                            <input type="email" id="email" value={user.email} name="email" className="w-full bg-white border-b-2 border-black focus:border-b-blue-700  text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out mb-3" onChange={handleInputs} />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="leading-7 text-xs text-gray-600">Password</label>
                            <input type={showPassword ? 'text' : 'password'} id="password" value={user.password} name="password" className="w-full bg-white border-b-2 border-black focus:border-b-blue-700  text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out mb-3" onChange={mulEvents} />
                            {/* If Password has Value then Login */}
                            {passValue ? <button onClick={handleEventPreventDefaulf}>
                                {/* If ShowPassword the Login */}
                                {!showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill cursor-pointer absolute right-3 bottom-5" viewBox="0 0 16 16" onClick={() => { { !showPassword ? setShowPassword(true) : setShowPassword(false) } }}>
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash-fill cursor-pointer absolute right-3 bottom-5" viewBox="0 0 16 16" onClick={() => { { !showPassword ? setShowPassword(true) : setShowPassword(false) } }}>
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                </svg>}
                            </button> : <button></button>}
                        </div>
                        <span className='text-xs text-end mb-3 text-blue-700 font-semibold hover:underline cursor-pointer'><Link href={'/changepassword'}>Forgot Password ?</Link></span>
                        <button className="text-white bg-black  py-2 px-8 text-sm w-28  hover:bg-white hover:text-black border-2 border-black hover:-translate-y-2 duration-200 ease-in-out" onClick={loginUser}>Login</button>
                        <p className="text-xs text-gray-500 mt-3">Don&apos;t Have An Account ? <Link className='text-blue-700 cursor-pointer hover:underline font-semibold' href={'/signup'}>SignUp</Link></p>
                    </div>
                    }
                </form >
                <ToastContainer />
            </section >
        </>
    )
}

export default Page