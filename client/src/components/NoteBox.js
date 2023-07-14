import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NoteBox = ({ noteId, noteTitle, noteBody, editNote, deleteNote }) => {
    return (
        <>
            <section className="text-gray-600 body-font" key={noteId + 1}>
                {console.log(noteId)}
                <div className="flex flex-wrap px-5 py-3 m-auto sm:w-[80vw]">
                    <div className="flex border shadow-md rounded border-gray-200 p-5 sm:flex-row flex-col w-full">
                        <div className="flex-grow">
                            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">{noteTitle}</h2>
                            <p className="leading-relaxed text-sm">{noteBody}</p>
                            <div className="text-right space-x-5 mt-4">
                                <button className="text-white bg-black border-2 border-black py-2 focus:outline-none hover:bg-white hover:text-black text-xs w-24 hover:-translate-y-2 duration-200 ease-in-out" onClick={editNote}>Edit Note</button>
                                <button className="text-white bg-black border-2 border-black py-2 focus:outline-none hover:bg-white hover:text-black text-xs w-24 hover:-translate-y-2 duration-200 ease-in-out" onClick={deleteNote}> Delete Note</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    )
}

export default NoteBox