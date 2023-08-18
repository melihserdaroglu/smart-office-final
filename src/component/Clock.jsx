import React, { useState } from 'react';

const KontrolPaneli = () => {
  const [isOpen, setIsOpen] = useState([false, false, false, false]);

  const handleToggle = (index) => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = [...prevIsOpen];
      newIsOpen[index] = !prevIsOpen[index];
      return newIsOpen;
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Kart 1 */}
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
</svg>

        <a href="#">
          <h5 className="mb-3 text-1xl font-semibold tracking-tight text-gray-500 dark:text-white">Sıcaklık Sensörü</h5>
        </a>  
        <button
          className={`inline-flex items-center text-blue-400 hover:underline ${isOpen[0] ? 'bg-blue-50 dark:bg-blue-400 text-white' : 'bg-white dark:bg-blue-500 text-blue-400'}`}
          onClick={() => handleToggle(0)}
        >
          {isOpen[0] ? 'Kapat' : 'Aç'}
        </button>
      </div>

      {/* Kart 2 */}
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {/* Diğer kartlar için SVG ikonu burada yer alabilir */}
        <a href="#">
          <h5 className="mb-3 text-1xl font-semibold tracking-tight text-gray-500 dark:text-white">Hareket Sensörü</h5>
        </a>    
        <button
          className={`inline-flex items-center text-blue-600 hover:underline ${isOpen[1] ? 'bg-blue-100 dark:bg-blue-600 text-white' : 'bg-white dark:bg-blue-800 text-blue-600'}`}
          onClick={() => handleToggle(1)}
        >
          {isOpen[1] ? 'Kapat' : 'Aç'}
        </button>
      </div>

      {/* Kart 3 */}
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {/* Diğer kartlar için SVG ikonu burada yer alabilir */}
        <a href="#">
          <h5 className="mb-3 text-1xl font-semibold tracking-tight text-gray-500 dark:text-white">Aydınlatma</h5>
        </a>
        <button
          className={`inline-flex items-center text-blue-600 hover:underline ${isOpen[2] ? 'bg-blue-100 dark:bg-blue-600 text-white' : 'bg-white dark:bg-blue-800 text-blue-600'}`}
          onClick={() => handleToggle(2)}
        >
          {isOpen[2] ? 'Kapat' : 'Aç'}
        </button>
      </div>

      {/* Kart 4 */}
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {/* Diğer kartlar için SVG ikonu burada yer alabilir */}
        <a href="#">
          <h5 className="mb-3 text-1xl font-semibold tracking-tight text-gray-500 dark:text-white">Klima</h5>
        </a>
        <button
          className={`inline-flex items-center text-blue-600 hover:underline ${isOpen[3] ? 'bg-blue-100 dark:bg-blue-600 text-white' : 'bg-white dark:bg-blue-800 text-blue-600'}`}
          onClick={() => handleToggle(3)}
        >
          {isOpen[3] ? 'Kapat' : 'Aç'}
        </button>
      </div>
    </div>
  );
};

export default KontrolPaneli;