'use client'
import { useContext, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router, useRouter } from 'next/navigation';
import LoginContext from "@/contexts/login/logincontext";
import Link from "next/link";

export default function Home() {

  const loginContext = useContext(LoginContext)

  const router = useRouter()

  //Hosted backend api 
  const backEndurl = 'https://cloudnotebook-backend.vercel.app'

  //local backend api
  // const backEndurl = 'http://localhost:7000'

  const [note, setNote] = useState({
    title: '', body: ''
  })

  let name, value
  const handleInputs = (e) => {
    name = e.target.name
    value = e.target.value
    setNote({ ...note, [name]: value })
  }

  const postData = async (e) => {
    e.preventDefault()
    const { title, body } = note

    const res = await fetch(`${backEndurl}/addnote`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'jwt-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        title, body
      })
    });
    const data = await res.json()


    if (res.status === 422 || !data) {
      toast.error('Cannot Add Note!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      toast.success('Note Added', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      })
      setNote({
        title: '', body: ''
      })
    }
  }

  return (
    <>
      {(loginContext.isLoggedIn) ?
        <div className=" mt-10">
          <form action="" method="POST">
            <section className="text-gray-600 body-font">
              <div className="w-[90vw] border rounded-md sm:w-[35vw] bg-white flex flex-col md:py-8 mt-8 md:mt-0 m-auto shadow-md  p-5 sm:p-10 ">
                <h2 className="text-gray-900 text-2xl mb-1 font-medium title-font text-center">CloudNoteBook</h2>
                <p className="leading-relaxed mb-5 text-xs text-gray-600 text-center">Save Your Notes On Cloud</p>
                <div className="relative mb-4">
                  <label htmlFor="title" className="leading-7 text-xs text-gray-600">Title</label>
                  <input type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out font-semibold" value={note.title} onChange={handleInputs} />
                </div>
                <div className="relative mb-4">
                  <label htmlFor="description" className="leading-7 text-xs text-gray-600">Description</label>
                  <textarea id="body" name="body" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-sm outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" value={note.body} onChange={handleInputs}></textarea>
                </div>
                <div className="text-right">
                  <button className="text-white bg-black border-2 border-black py-2 px-6 focus:outline-none hover:bg-white hover:text-black text-xs w-32 hover:-translate-y-2 duration-200 ease-in-out" onClick={postData}>Add Note</button>
                </div>
              </div>
            </section >
          </form>
          <ToastContainer />
        </div > :
        <div className='h-[80vh] flex flex-col justify-center items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
          </svg>
          <div className='my-4 px-4'>
            <p>Please ! Login To Add Notes</p>
          </div>
          <Link href={'/login'}><button className='text-white bg-black border-2 border-black py-2 focus:outline-none hover:bg-white hover:text-black text-xs w-24 hover:-translate-y-2 duration-200 ease-in-out'>Login</button></Link>
        </div>
      }
    </>
  )
}
