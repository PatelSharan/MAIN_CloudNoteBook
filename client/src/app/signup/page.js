"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router, useRouter } from 'next/navigation';

const Page = () => {

    const backEndurl = 'https://cloudnotebook-backend-cgb2otdmn-patelsharan.vercel.app'


    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)

    const [passValue, setPassValue] = useState('')

    const passInput = (e) => {
        setPassValue(e.target.value)
    }


    //Set input values in user
    const [user, setUser] = useState({
        name: '', email: '', password: ''
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


    const postData = async (e) => {
        e.preventDefault()
        const { name, email, password } = user

        const res = await fetch(`${backEndurl}/registeruser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        });

        const data = await res.json()

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
        else if (res.status === 400 || !data) {
            toast.error('Email Already Exist!', {
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
            toast.success('User Registered Successfully..!', {
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
                }
            })
            localStorage.setItem('token', data.jwttokens)
            setUser({ name: '', email: '', password: '' })
        }


    }

    return (
        <>
            <section class="text-gray-600 body-font px-5 py-12">
                <form action="" method='POST'>
                    <div class="rounded-lg p-4 flex flex-col m-auto mt-10 md:mt-0 sm:w-[80vw]">
                        <h2 class="text-gray-900 text-2xl font-medium title-font mb-5">Sign Up</h2>
                        <div class="relative mb-4">
                            <label for="name" class="leading-7 text-xs text-gray-600">Name</label>
                            <input type="text" id="name" value={user.name} onChange={handleInputs} name="name" class="w-full bg-white border-b-2 border-black focus:border-b-blue-700  text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out mb-3" />
                        </div>
                        <div class="relative mb-4">
                            <label for="email" class="leading-7 text-xs text-gray-600">Email</label>
                            <input type="email" id="email" value={user.email} onChange={handleInputs} name="email" class="w-full bg-white border-b-2 border-black focus:border-b-blue-700  text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out mb-3" />
                        </div>
                        <div class="relative mb-4">
                            <label for="password" class="leading-7 text-xs text-gray-600">Password</label>
                            <input type={showPassword ? 'text' : 'password'} id="password" value={user.password} name="password" class="w-full bg-white border-b-2 border-black focus:border-b-blue-700 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out mb-3" onChange={mulEvents} />
                            {/* If Password has Value then Login */}
                            {passValue ? <button onClick={handleEventPreventDefaulf}>
                                {/* If ShowPassword the Login */}
                                {!showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill cursor-pointer absolute right-3 bottom-5" viewBox="0 0 16 16" onClick={() => { { !showPassword ? setShowPassword(true) : setShowPassword(false) } }}>
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash-fill cursor-pointer absolute right-3 bottom-5" viewBox="0 0 16 16" onClick={() => { { !showPassword ? setShowPassword(true) : setShowPassword(false) } }}>
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                </svg>}
                            </button> : <button></button>}
                        </div>
                        <button class="text-white bg-black  py-2 px-8 text-sm w-32  hover:bg-white hover:text-black border-2 border-black hover:-translate-y-2 duration-200 ease-in-out" onClick={postData}>Sign Up</button>
                        <p class="text-xs text-gray-500 mt-3">Already Have An Account ? <Link className='text-blue-700 cursor-pointer hover:underline font-semibold' href={'/login'}>Login</Link></p>
                    </div>
                </form>
                <ToastContainer />
            </section>
        </>
    )
}

export default Page