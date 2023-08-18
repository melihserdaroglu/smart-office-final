import React, { useState, useEffect } from "react";

const Profiles = () => {
  const [isFirstIcon, setIsFirstIcon] = useState(true);
  const handleClick = () => {
    setIsFirstIcon((prevState) => !prevState);
  };
  return (
    <div>
      <div className="flex justify-end">
        {/* <p className="mr-3">
          <button
      onClick={handleClick}
      className="w-6 h-6 text-gray-200 focus:outline-none"
    >
      {isFirstIcon ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-gray-200"
        >
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-gray-200"
        >
          <path
            fillRule="evenodd"
            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
        </p> */}
      </div>
      <div className="mt-40"></div>
      <div className="flex justify-center items-center mr-28">
        <div class="w-full bg-gray-200 rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 opacity-90">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-800 dark:text-gray-200 md:text-2xl dark:text-white">
                Giriş yap
              </h1>
            </div>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200 dark:text-white"
                >
                  Kullanıcı adı
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class=" bg-gray-300 dark:bg-gray-500 text-gray-900 sm:text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="örnek@mail.com"
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200 dark:text-white"
                >
                  Şifre
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-300 dark:bg-gray-500  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4  border-gray-300 rounded bg-gray-500 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div class="ml-1 text-sm">
                    <label
                      for="remember"
                      class="text-gray-800 dark:text-gray-200"
                    >
                      Beni hatırla
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-medium text-gray-800 dark:text-gray-200 text-primary-600 hover:underline dark:text-primary-500"
                >
                  Şifreyi unuttum!
                </a>
              </div>

              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <a
                      href="#"
                      class="font-medium text-gray-800 dark:text-gray-200 text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Kullanıcı oluştur
                    </a>
                  </div>
                  <div>
                    <button
                      type="submit"
                      class="w-md bg-gray-400 text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Giriş yap
                    </button>
                  </div>
                </div>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
