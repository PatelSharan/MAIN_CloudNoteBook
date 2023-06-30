'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Router, useRouter } from 'next/navigation';


const Navbar = () => {

    const router = useRouter()

    const [userLogin, setUserLogin] = useState(false)


    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log('in navbar console token is : ', token)
        if (token) {
            setUserLogin(true)
        }
    }, []);


    const handleLogout = () => {
        localStorage.clear('token')
        setUserLogin(false)
        router.push('/login')
    }


    return (
        <nav className='border-b borderx bg-black text-gray-200 h-16 '>
            <ul className='flex h-[100%] items-center'>
                <li className='py- px-4 hover:text-white text-sm'>
                    <Link href={'/'}>Home</Link>
                </li>
                <li className='py- px-4 hover:text-white text-sm'>
                    <Link href={'/notes'}>Notes</Link>
                </li>
                {!userLogin ? <div className='absolute right-3 space-x-3'>
                    <Link href={'/login'}>
                        <button className='py-[6px] w-16 bg-gray-200 text-black text-sm border border-white hover:bg-black hover:text-white'>Login</button>
                    </Link>
                    <Link href={'/signup'} >
                        <button className='py-[6px] w-16 bg-gray-200 text-black text-sm border border-white hover:bg-black hover:text-white'>SignUp</button>
                    </Link>
                </div> : <div className='absolute right-3 space-x-3'>
                    <button className='py-[6px] w-16 bg-gray-200 text-black text-sm border border-white hover:bg-black hover:text-white' onClick={handleLogout}>Logout</button>
                </div>
                }
            </ul >
        </nav >

    )
}

export default Navbar

