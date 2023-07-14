import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditNote = ({ editedNoteTitle, editedNoteBody, handleInputChange, saveChanges, cancelEdit }) => {
    return (
        <>
            <div className='h-[100vh] w-[100vw] fixed top-0 backdrop-blur-md'>
                <div className="my-10">
                    <form action="" method="POST">
                        <section className="text-gray-600 body-font">
                            <div className="w-[90vw] border rounded-md sm:w-[32vw] bg-white flex flex-col md:py-8 mt-8 md:mt-0 m-auto shadow-md  p-5 sm:p-10 ">
                                <h2 className="text-gray-900 text-2xl mb-1 font-medium title-font text-center">Update Note</h2>
                                <div className="relative mb-4">
                                    <label for="title" className="leading-7 text-xs text-gray-600">Title</label>
                                    <input type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out font-semibold" value={editedNoteTitle} onChange={handleInputChange} />
                                </div>
                                <div className="relative mb-4">
                                    <label for="description" className="leading-7 text-xs text-gray-600">Description</label>
                                    <textarea id="body" name="body" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-sm outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" value={editedNoteBody} onChange={handleInputChange}></textarea>
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
        </>
    )
}

export default EditNote