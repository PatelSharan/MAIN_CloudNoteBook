import React from 'react'

const NoteItem = () => {
    return (
        <>
            <div className='w-[300px] h-auto shadow-md border rounded p-2 inline-block m-3'>
                <p className='text-xs ml-2 mt-2 text-gray-500'>Enter Title And Body For Your Note</p>
                <input type="text" placeholder='Enter Title For Note' className='border w-[90%] mx-auto px-3 py-2 text-sm mt-3 ml-3 font-semibold' />
                <input type="text" placeholder='Enter Description For Note' className='border w-[90%] h-[300px] mx-auto px-3 py-2 text-sm my-3 ml-3 ' />
                <button className='bg-slate-600 text-white hover:bg-slate-700 rounded text-xs py-2 px-4 mx-1 relative left-44 mb-2'>Add Note</button>
            </div>
        </>
    )
}

export default NoteItem