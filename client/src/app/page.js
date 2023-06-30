'use client'
import { useContext, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router, useRouter } from 'next/navigation';
import LoginContext from "@/contexts/login/logincontext";



export default function Home() {

  const loginContext = useContext(LoginContext)

  const router = useRouter()

  const backEndurl = 'https://cloudnotebook-backend.vercel.app'

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
    console.log(data.user)


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
      {(loginContext.isLoggedIn) ? <div className=" mt-10">
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
      </div > : router.push('/login')}
    </>
  )
}
