'use client'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import LoginContext from '@/contexts/login/logincontext';


const Navbar = () => {

    const [showNavbar, setShowNavbar] = useState(false)

    const loginContext = useContext(LoginContext)

    const toggleNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    return (
        <nav className='bg-black text-gray-200 h-16 sticky w-full z-10 top-0 flex items-center'>
            <ul className='flex'>

                {/* To open Navbar */}
                <div className='ml-3 cursor-pointer' onClick={toggleNavbar}>
                    {/* Menu Svg */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                    </svg>
                </div>

                {/*<---- Responsive Navbar */}
                <div className={`fixed top-0 left-0 z-10 w-64 h-full bg-black shadow-md flex flex-col items-center p-2 transition-transform duration-300 ease-in-out ${showNavbar ? 'translate-x-0' : '-translate-x-full'}`} onClick={toggleNavbar}>
                    <div className='mt-2 w-[100%] space-y-2 text-gray-400'>
                        <div className='ml-2 cursor-pointer' onClick={toggleNavbar}>
                            {/* Menu Svg */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </div>
                        <li className='text-center'>
                            <Link href={'/'}>
                                <button className='text-gray-300 text-2xl mb-4'>CloudNoteBook</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                <button className={`w-[100%] py-1 mb-2 px-3 text-left  flex  ${loginContext.activeLink === '/' ? 'text-white' : 'hover:text-white'
                                    }`}
                                    onClick={() => loginContext.setActiveLink('/')}>
                                    <span className='ml-4'>Home</span>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/notes'}>
                                <button className={`w-[100%] py-1 mb-2 px-3 text-left  flex  ${loginContext.activeLink === '/notes' ? 'text-white' : 'hover:text-white'
                                    }`}
                                    onClick={() => loginContext.setActiveLink('/notes')}>
                                    <span className='ml-4'>Notes</span>
                                </button>
                            </Link>
                        </li>
                    </div>
                </div>


                {/* If User not Login */}
                {
                    (!loginContext.isLoggedIn) ? <>
                        <div className='absolute right-3 space-x-3'>
                            <Link href={'/login'}>
                                <button className='py-[6px] w-16 bg-gray-200 text-black text-sm border border-white hover:bg-black hover:text-white'>Login</button>
                            </Link>
                            <Link href={'/signup'} >
                                <button className='py-[6px] w-16 bg-gray-200 text-black text-sm border border-white hover:bg-black hover:text-white'>SignUp</button>
                            </Link>
                        </div>
                    </>
                        : (
                            // If User login then show user Profile
                            <div className='mb-3 absolute right-4 top-4 cursor-pointer' onClick={() => { loginContext.setShowProfile(true) }}>
                                {/* User Svg */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                            </div>
                        )
                }

                {/* <----- UserProfile */}
                {
                    loginContext.showProfile && (
                        <div className='fixed w-[100vw] h-[100vh] top-0 left-0 z-10 backdrop-blur-sm'>
                            <div className='absolute top-0 right-0'>
                                <div className='w-64 sm:w-80 h-[100vh] bg-gray-100 shadow-md border flex flex-col items-center p-5'>
                                    <div className='absolute top-3 right-3 sm:right-6'>
                                        {/* User Svg */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle-fill text-black cursor-pointer" viewBox="0 0 16 16" onClick={() => { loginContext.setShowProfile(false) }}>
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                        </svg>
                                    </div>
                                    <div className='mt-8'>
                                        <div className='w-20 h-20 m-auto mb-4'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-person-circle text-black" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                            </svg>
                                        </div>
                                        <div className='text-gray-700 text-sm space-y-1'>
                                            <div><span>Name : </span> <span>{loginContext.userDetails.name}</span></div>
                                            <div> <span>Email : </span><span>{loginContext.userDetails.email}</span></div>
                                        </div>
                                    </div>
                                    <div className='space-y-2 w-[90%] flex flex-col mt-7'>
                                        <button className='py-[6px] bg-black text-xs border border-black hover:bg-white hover:text-black' onClick={loginContext.logout}>Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </ul >
        </nav >
    )
}

export default Navbar
