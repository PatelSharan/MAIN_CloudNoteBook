import React from 'react'
import Link from 'next/link'

const UserNotHaveNotes = () => {
    return (
        <>
            <div className="h-[80vh] flex flex-col justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-lightbulb" viewBox="0 0 16 16">
                    <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" />
                </svg>
                <div className='my-4 px-4'>
                    <p>There are no notes to display.</p>
                    <p>Notes you add will appear here.</p>
                </div>
                <Link href={'/'}><button className='text-white bg-black border-2 border-black py-2 focus:outline-none hover:bg-white hover:text-black text-xs w-24 hover:-translate-y-2 duration-200 ease-in-out'>Add Note</button></Link>
            </div>
        </>
    )
}

export default UserNotHaveNotes