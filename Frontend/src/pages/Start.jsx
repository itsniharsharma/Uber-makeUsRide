import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='bg-cover bg-[url(https://i.pinimg.com/736x/88/fd/ec/88fdec28e166d79bd5bfd7b7d319c888.jpg)] h-screen pt-8 w-full flex justify-between flex-col bg-red-400'>
        <img className='w-16 ml-8' src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n" alt="" />
       <div className='bg-white py-5 pb-7 px-4'>
        <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
        <Link to='/login' className='w-full flex items-center justify-center bg-black text-white py-3 mt-5 rounded'>Continue</Link>
       </div>
    </div>
  )
}

export default Start