import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='border-b borderx bg-slate-950 text-gray-200'>
            <ul className='flex'>
                <li className='py-5 px-4 hover:text-white text-sm'>
                    <Link href={'/'}>Home</Link>
                </li>
                <li className='py-5 px-4 hover:text-white text-sm'>
                    <Link href={'/login'}>Login</Link>
                </li>
                <li className='py-5 px-4 hover:text-white text-sm'>
                    <Link href={'/signup'}>SignUp</Link>
                </li>
            </ul>
        </nav>

    )
}

export default Navbar