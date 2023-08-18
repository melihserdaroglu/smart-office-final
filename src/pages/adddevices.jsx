import React from 'react';
import { Link } from "react-router-dom";


const Adddevices = () => {
  return (

    <>
    <div className='flex justify-start'>
         <div>
<div></div>
         <Link to={`/control-panel`} href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white">

         <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-400 rounded-2xl hover:bg-gray-500 focus:outline-none dark:bg-gray-400 dark:hover:bg-gray-500 ">

          Geri
         <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  

          </svg>

       </button>
       </Link>

         </div>
       </div> 

       <div className="grid grid-cols-2 gap-4">


    <div>
      <h1>
        
      <div className="max-w-2xl bg-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 mb-6 mt-4 opacity-95">
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-200 dark:text-white">Cihaz Ekle</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">    </p>
          
        </div>
      </div>
      

      </h1>
    </div>
    </div> 

    </> 

  );
}

export default Adddevices;
