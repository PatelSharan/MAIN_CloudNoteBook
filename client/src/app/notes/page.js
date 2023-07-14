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

    const backEndurl = 'https://cloudnotebook-backend.vercel.app'

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
                            <NoteBox noteId={note._id} noteTitle={note.title} noteBody={note.body} editNote={() => { editNote(note._id) }} deleteNote={() => { deleteNote(note._id) }} />
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
