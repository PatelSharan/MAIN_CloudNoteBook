'use client'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import LoginContext from '@/contexts/login/logincontext';


const Navbar = () => {

    const loginContext = useContext(LoginContext)

    const [showProfile, setShowProfile] = useState(false)

    return (
        <nav className='border-b borderx bg-black text-gray-200 h-16 '>
            <ul className='flex h-[100%] items-center'>
                <li className='py- px-4 hover:text-white text-sm'>
                    <Link href={'/'}>Home</Link>
                </li>
                <li className='py- px-4 hover:text-white text-sm'>
                    <Link href={'/notes'}>Notes</Link>
                </li>
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
                        <div className='w-10 h-10 bg-blue-500 rounded-full m-auto mb-3 absolute right-3 top-3 cursor-pointer' onClick={() => { setShowProfile(true) }}></div>
                    )}

                {/* <----- UserProfile */}
                {showProfile && (
                    <div className='fixed w-[100vw] h-[100vh] top-0 left-0 z-10 backdrop-blur-sm'>
                        <div className='absolute top-0 right-0'>
                            <div className='w-64 sm:w-80 h-[100vh] bg-gray-100 shadow-md border flex flex-col items-center p-5'>
                                <div className='absolute top-3 right-3 sm:right-6'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle-fill text-black cursor-pointer" viewBox="0 0 16 16" onClick={() => { setShowProfile(false) }}>
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                    </svg>
                                </div>
                                {/* onClick={() => { setShowProfile(false) }} */}
                                <div className='mt-8'>
                                    <div className='w-20 h-20 bg-blue-500 rounded-full m-auto mb-4'></div>
                                    <div className='text-gray-700 text-sm space-y-1'>
                                        <div><span>Name : </span> <span>Sharan Patel</span></div>
                                        <div> <span>Email : </span><span>sharanpatel@gmail.com</span></div>
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

