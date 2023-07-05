'use client'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import LoginContext from '@/contexts/login/logincontext';


const Navbar = () => {

    const [showNavbar, setShowNavbar] = useState(false)

    const loginContext = useContext(LoginContext)

    return (
        <nav className='border-b borderx bg-black text-gray-200 h-16 '>
            <ul className='flex h-[100%] items-center'>

                {/* To open Navbar */}
                <div className='mb-3 absolute left-2 top-4 cursor-pointer' onClick={() => { setShowNavbar(true) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </div>

                {/*<---- Responsive Navbar */}
                {showNavbar && <div className='fixed w-[100vw] h-[100vh] top-0 left-0 z-10 backdrop-blur-sm'>
                    <div className='fixed top-0 left-0 z-10'>
                        <div className='w-64 h-[100vh] bg-black shadow-md flex flex-col items-center p-5'>
                            <div className='absolute top-4 left-4 sm:right-6'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle-fill cursor-pointer" viewBox="0 0 16 16" onClick={() => { setShowNavbar(false) }}>
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                </svg>
                            </div>
                            <div className='mt-12 w-[90%] space-y-2'>
                                <li>
                                    <Link href={'/'}>
                                        <button className='text-gray-300 text-2xl mb-4'>CloudNoteBook</button>
                                    </Link>
                                </li>
                                <li className=''>
                                    <Link href={'/'}>
                                        <button className='w-[100%] py-2 px-3 text-left rounded-lg hover:bg-gray-100 hover:text-black flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                                            </svg>
                                            <span className='ml-4'>Home</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/notes'}>
                                        <button className='w-[100%] py-2 px-3 text-left rounded-lg hover:bg-gray-100 hover:text-black flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-stickies-fill mt-1" viewBox="0 0 16 16">
                                                <path d="M0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5A1.5 1.5 0 0 0 0 1.5z" />
                                                <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177V10.5z" />
                                            </svg>
                                            <span className='ml-4'>Notes</span>
                                        </button>
                                    </Link>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>}

                {/* If User not Login */}
                {(!loginContext.isLoggedIn) ? <>
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
                        <div className='mb-3 absolute right-5 top-3 cursor-pointer' onClick={() => { loginContext.setShowProfile(true) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                        </div>
                    )}

                {/* <----- UserProfile */}
                {loginContext.showProfile && (
                    <div className='fixed w-[100vw] h-[100vh] top-0 left-0 z-10 backdrop-blur-sm'>
                        <div className='absolute top-0 right-0'>
                            <div className='w-64 sm:w-80 h-[100vh] bg-gray-100 shadow-md border flex flex-col items-center p-5'>
                                <div className='absolute top-3 right-3 sm:right-6'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle-fill text-black cursor-pointer" viewBox="0 0 16 16" onClick={() => { loginContext.setShowProfile(false) }}>
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                    </svg>
                                </div>
                                <div className='mt-8'>
                                    <div className='w-20 h-20 m-auto mb-4'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-person-circle text-black" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>
                                    </div>
                                    <div className='text-gray-700 text-sm space-y-1'>
                                        <div><span>Name : </span> <span>{loginContext.userDetails.name}</span></div>
                                        <div> <span>Email : </span><span>{loginContext.userDetails.email}</span></div>
                                    </div>
                                </div>
                                <div className='space-y-2 w-[90%] flex flex-col mt-7'>
                                    <button className='py-[6px] bg-black text-xs border border-black hover:bg-white hover:text-black'>Edit Profile</button>
                                    <button className='py-[6px] bg-black text-xs border border-black hover:bg-white hover:text-black' onClick={loginContext.logout}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </ul >
        </nav >
    )
}

export default Navbar
