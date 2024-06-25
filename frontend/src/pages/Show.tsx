import React from 'react';
import { useLocation} from 'react-router-dom';

const show = () => {


  const location = useLocation();
  var param = location.pathname.split('/')
  var names = param[param.length-1]

  return (
    <div className=' w-screnn h-screen flex justify-center items-center relative'>
      <h1 className=' font-black text-red-600 bg-blue-600 text-9xl w-full h-full text-center text-balance pt-60'>{`cmk hai tu sale ${names}`}</h1>
    </div>
  )
}

export default show