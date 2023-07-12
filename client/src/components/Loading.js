import React from 'react'

const Loading = ({ message }) => {
    return (
        <div className='h-[70vh] flex flex-col justify-center items-center'>
            <div className="flex justify-center items-center h-screen flex-col">
                {/* Loading Spinner */}
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-gray-900"></div>
                <span className="text-gray-500 mt-3 text-sm">{message}</span>
            </div>
        </div>
    )
}

export default Loading