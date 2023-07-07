"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const NoteBox = () => {

    const backEndurl = 'https://cloudnotebook-backend.vercel.app'

    const [loading, setLoading] = useState(false);

    const [notes, setNotes] = useState([])

    const [editedNote, setEditedNote] = useState({ id: '', title: '', body: '' });


    //Fetch All Notes
    const fetchNotes = async (url) => {

        setLoading(true);

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
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNotes(`${backEndurl}/getnotes`)
    }, [])


    //Delete Specific Note
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
            toast.success('Note Deleted Successfully...', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }
    }



    //Edit Specific Note
    const editNote = async (id) => {
        const noteToEdit = notes.find((note) => note._id === id);
        setEditedNote({
            id: noteToEdit._id,
            title: noteToEdit.title,
            body: noteToEdit.body
        });
    }

    const handleInputChange = (e) => {
        setEditedNote({
            ...editedNote,
            [e.target.name]: e.target.value
        });
    }

    const saveChanges = async (e) => {
        e.preventDefault()
        const { id, title, body } = editedNote;
        try {
            const res = await fetch(`${backEndurl}/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'jwt-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, body }),
            });
            if (res.ok) {
                const updatedNote = { ...editedNote };
                const updatedNotes = notes.map((note) => {
                    if (note._id === updatedNote.id) {
                        return { ...note, ...updatedNote };
                    }
                    return note;
                });
                setNotes(updatedNotes);
                setEditedNote({ id: '', title: '', body: '' });
                toast.success('Note Edited Successfully...', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                })
            } else {
                console.error('Failed to update note:', res.status, res.statusText);
            }
        } catch (error) {
            console.error('Failed to update note:', error.message);
        }
    };

    const cancelEdit = () => {
        setEditedNote({ id: '', title: '', body: '' });
    };

    return (
        <>
            {/* when User has any note */}
            {loading ? (
                <div className='w-screen h-[70vh] flex flex-col justify-center items-center'>
                    <div className="flex justify-center items-center h-screen flex-col">
                        {/* Loading Spinner */}
                        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-gray-900"></div>
                        <span className="text-gray-500 mt-3 text-sm">Loading...</span>
                    </div>
                </div>

            ) : (
                <>
                    {/* When User has any note */}
                    {notes.length > 0 ? (
                        notes.map((note) => (
                            <section className="text-gray-600 body-font" key={note._id}>
                                <div className="flex flex-wrap px-5 py-3 m-auto sm:w-[80vw]">
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
                                <ToastContainer />
                            </section>
                        ))
                    ) : (
                        // User does not have any note
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
                    )}
                </>
            )}




            {/* <------- When User Want To Edit note */}
            {editedNote.id && (
                <div className='h-[100vh] w-[100vw] fixed top-0 backdrop-blur-md'>
                    <div className="my-10">
                        <form action="" method="POST">
                            <section className="text-gray-600 body-font">
                                <div className="w-[90vw] border rounded-md sm:w-[32vw] bg-white flex flex-col md:py-8 mt-8 md:mt-0 m-auto shadow-md  p-5 sm:p-10 ">
                                    <h2 className="text-gray-900 text-2xl mb-1 font-medium title-font text-center">Update Note</h2>
                                    <div className="relative mb-4">
                                        <label for="title" className="leading-7 text-xs text-gray-600">Title</label>
                                        <input type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out font-semibold" value={editedNote.title} onChange={handleInputChange} />
                                    </div>
                                    <div className="relative mb-4">
                                        <label for="description" className="leading-7 text-xs text-gray-600">Description</label>
                                        <textarea id="body" name="body" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-sm outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" value={editedNote.body} onChange={handleInputChange}></textarea>
                                    </div>
                                    <div className="text-right space-x-4">
                                        <button type='submit' className="text-white bg-black border-2 border-black py-2 px-6 focus:outline-none hover:bg-white hover:text-black text-xs w-32 hover:-translate-y-2 duration-200 ease-in-out" onClick={saveChanges}>Update Note</button>
                                        <button type='submit' className="text-white bg-black border-2 border-black py-2 px-6 focus:outline-none hover:bg-white hover:text-black text-xs w-32 hover:-translate-y-2 duration-200 ease-in-out" onClick={cancelEdit}>Cancel</button>
                                    </div>
                                </div>
                                <ToastContainer />
                            </section >
                        </form>
                    </div >
                </div>
            )}

        </>
    )
}

export default NoteBox
