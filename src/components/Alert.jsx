import React from 'react'
import {FaCircleExclamation} from 'react-icons/fa6'
function Alert({message}) {
  return (
    <div className='text-xs text-white bg-red-600 w-fit px-2 py-1 ml-1 flex justify-center items-center gap-3 rounded-sm'><FaCircleExclamation color='white'/>{message}</div>
  )
}

export default Alert