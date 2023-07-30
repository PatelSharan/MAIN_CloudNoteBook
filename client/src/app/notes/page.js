"use client"
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingContext from '@/contexts/loading/LoadingContext';
import Loading from '@/components/Loading';
import EditNote from '@/components/EditNote';
import UserNotHaveNotes from '@/components/UserNotHaveNotes';
import NoteBox from '@/components/NoteBox';


const Page = () => {

    const loadingContext = useContext(LoadingContext)

    //Hosted backend api 
    const backEndurl = 'https://cloudnotebook-backend.vercel.app'

    //local backend api
    // const backEndurl = 'http://localhost:7000'

    const [notes, setNotes] = useState([])

    const [editedNote, setEditedNote] = useState({ id: '', title: '', body: '' });


    //Fetch All Notes
    const fetchNotes = async (url) => {

        loadingContext.setIsLoading(true);

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
            loadingContext.setIsLoading(false);
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
            {loadingContext.isLoading ? (
                <Loading message={'Loading...'} />
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
                        <UserNotHaveNotes />
                    )}
                </>
            )}


            {/* <------- When User Want To Edit note */}
            {editedNote.id && (
                <EditNote editedNoteTitle={editedNote.title} editedNoteBody={editedNote.body} handleInputChange={handleInputChange} saveChanges={saveChanges} cancelEdit={cancelEdit} />
            )}

        </>
    )
}

export default Page
