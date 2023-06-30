"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const NoteBox = () => {

    const backEndurl = 'https://cloudnotebook-backend.vercel.app'

    const [notes, setNotes] = useState([])


    const fetchNotes = async (url) => {
        try {
            const res = await fetch(url, {
                headers: {
                    'jwt-token': localStorage.getItem('token')
                }
            })
            const data = await res.json()
            if (data.length > 0) {
                setNotes(data)
            }

        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        fetchNotes(`${backEndurl}/getnotes`)
    }, [])

    const deleteNote = async (id) => {
        let result = confirm('Are Your Sure You Want To Delete Note')
        if (result) {
            const res = await fetch(`${backEndurl}/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'jwt-token': localStorage.getItem('token')
                }
            })
            let newNote = notes.filter((notes) => { return notes._id !== id })
            setNotes(newNote)
        }
    }


    const editNote = async (id) => {

        const { title, body } = notes

        const res = await fetch(`${backEndurl}/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'jwt-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                title, body
            })
        })
        const data = await res.json()
        console.log(data)
    }


    return (
        <>
            {(notes.length > 0) ? (notes.map((note) => {
                return (

                    <section className="text-gray-600 body-font" key={note._id} >
                        <div className="flex flex-wrap px-5 py-3 m-auto  sm:w-[80vw]">
                            <div className="flex border shadow-md rounded border-gray-200 p-5 sm:flex-row flex-col w-full">
                                <div className="flex-grow">
                                    <h2 className="text-gray-900 text-lg title-font font-medium mb-3">{note.title}</h2>
                                    <p className="leading-relaxed text-sm">{note.body}</p>
                                    <div className="text-right space-x-5 mt-4">
                                        <button className="text-white bg-black border-2 border-black py-2 focus:outline-none hover:bg-white hover:text-black text-xs w-24 hover:-translate-y-2 duration-200 ease-in-out" onClick={() => { editNote(note._id) }}>Edit Note</button>
                                        <button className="text-white bg-black border-2 border-black py-2 focus:outline-none hover:bg-white hover:text-black text-xs w-24 hover:-translate-y-2 duration-200 ease-in-out" onClick={() => { deleteNote(note._id) }}> Delete Note</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >
                )
            })) :
                <div className='h-[80vh] flex flex-col justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-lightbulb" viewBox="0 0 16 16">
                        <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" />
                    </svg>
                    <div className='my-4 px-4'>
                        <p>There is No Notes To Display,</p>
                        <p>Notes You Add Appear Here.</p>
                    </div>
                    <Link href={'/'}><button className='text-white bg-black border-2 border-black py-2 focus:outline-none hover:bg-white hover:text-black text-xs w-24 hover:-translate-y-2 duration-200 ease-in-out'>Add Note</button></Link>
                </div>
            }
        </>
    )
}

export default NoteBox