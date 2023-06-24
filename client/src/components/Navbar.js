import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav>
            <ul className='flex space-x-4'>
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href={'/login'}>Login</Link>
                </li>
                <li>
                    <Link href={'/signup'}>SignUP</Link>
                </li>
            </ul>
        </nav >
    )
}

export default Navbar