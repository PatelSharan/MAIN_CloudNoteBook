"use client"
import React, { useEffect, useState } from 'react'

const NoteBox = () => {

    const [notes, setNotes] = useState([])

    const fetchNotes = async (url) => {
        try {
            const res = await fetch(url, {
                headers: {
                    'jwt-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaW5kVXNlciI6eyJpZCI6IjY0OWMyZDJhYzhmMTNkNzYwNDIxNjliNyJ9LCJpYXQiOjE2ODc5NTY3OTB9.NXl3csuqYXe7Lppx8uZ8CdEb3e8KvK9ERYQxCDVyaJk'
                }
            })
            const data = await res.json()
            if (data.length > 0) {
                setNotes(data)
            }
        } catch (error) {
            console.error('Error', error)
        }
    }

    useEffect(() => {
        fetchNotes('http://localhost:7000/getnotes')
    }, [])

    const deleteNote = async (id) => {
        let result = confirm('Want to Delete note')
        if (result) {
            const res = await fetch(`http://localhost:7000/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'jwt-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaW5kVXNlciI6eyJpZCI6IjY0OWMyZDJhYzhmMTNkNzYwNDIxNjliNyJ9LCJpYXQiOjE2ODc5NTY3OTB9.NXl3csuqYXe7Lppx8uZ8CdEb3e8KvK9ERYQxCDVyaJk'
                }
            })
            let newNote = notes.filter((notes) => { return notes._id !== id })
            setNotes(newNote)
        }
    }

    const editNote = async (id) => {
        const res = await fetch(`http://localhost:7000/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'jwt-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaW5kVXNlciI6eyJpZCI6IjY0OWMyZDJhYzhmMTNkNzYwNDIxNjliNyJ9LCJpYXQiOjE2ODc5NTY3OTB9.NXl3csuqYXe7Lppx8uZ8CdEb3e8KvK9ERYQxCDVyaJk'
            },
            body: JSON.stringify({
                title, body
            })
        })
    }

    return (
        <>
            {notes.map((note) => {
                // const { title, body } = notes
                return (
                    < section class="text-gray-600 body-font" >
                        <div class="flex flex-wrap px-5 py-3 m-auto  sm:w-[80vw]">
                            <div class="flex border shadow-md rounded border-gray-200 p-5 sm:flex-row flex-col w-full">
                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">{note.title}</h2>
                                    <p class="leading-relaxed text-sm">{note.body}</p>
                                    {/* <h2 class="text-gray-900 text-lg title-font font-medium mb-3">sakj;fkasjfk;</h2>
                            <p class="leading-relaxed text-sm">falskjflasdfjkasklfkas;jfkjasdkfasf a;lj lkfj;fjsdakf;</p> */}
                                    <div className="text-right space-x-5 mt-4">
                                        <button class="text-white bg-black border-2 border-black py-2 focus:outline-none hover:bg-white hover:text-black text-xs w-24 hover:-translate-y-2 duration-200 ease-in-out" onClick={() => { editNote(note._id) }}>Edit Note</button>
                                        <button class="text-white bg-black border-2 border-black py-2 focus:outline-none hover:bg-white hover:text-black text-xs w-24 hover:-translate-y-2 duration-200 ease-in-out" onClick={() => { deleteNote(note._id) }}> Delete Note</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >
                )
            })}
        </>
    )
}

export default NoteBox