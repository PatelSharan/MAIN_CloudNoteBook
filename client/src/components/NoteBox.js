"use client"
import React, { useEffect, useState } from 'react'

const NoteBox = () => {

    const backEndurl = 'http://localhost:7000'

    const [notes, setNotes] = useState([])

    const fetchNotes = async (url) => {
        try {
            const res = await fetch(url, {
                headers: {
                    'jwt-token': localStorage.getItem('token')
                }
            })
            const data = await res.json()
            console.log(data)
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
        let result = confirm('Want to Delete note')
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
    }

    return (
        <>
            {notes.map((note) => {
                // const { title, body } = notes
                return (
                    < section class="text-gray-600 body-font" >
                        <div class="flex flex-wrap px-5 py-3 m-auto  sm:w-[80vw]" key={note.id}>
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