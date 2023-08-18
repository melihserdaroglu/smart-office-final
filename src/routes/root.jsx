import { Outlet, Link } from "react-router-dom";
import "../App.css";
import { useState, useEffect } from "react";

const Root = () => {
  const handleButtonClick = (buttonNumber) => {
    if (buttonNumber === 1) {
      setButton1Text(
        button1Text === "Işıkları aç" ? "Işıkları kapat" : "Işıkları aç"
      );
    } else if (buttonNumber === 2) {
      setButton2Text(
        button2Text === "Perdeyi aç" ? "Perdeyi kapat" : "Perdeyi aç"
      );
    } else if (buttonNumber === 3) {
      setButton3Text(
        button3Text === "Klimayı aç" ? "Klimayı kapat" : "Klimayı aç"
      );
    } else if (buttonNumber === 4) {
      setButton4Text(
        button4Text === "Nemlendiriciyi aç"
          ? "Nemlendiriciyi kapat"
          : "Nemlendiriciyi aç"
      );
    }
  };

  const [theme, setTheme] = useState("light");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setIsDarkTheme(newTheme === "dark");
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [isFirstIcon, setIsFirstIcon] = useState(true);
  const handleClick = () => {
    setIsFirstIcon((prevState) => !prevState);
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        class="fixed top-20 left-6 z-40 w-60 h-screen transition-transform -translate-x-full sm:translate-x-0 opacity-95"
        aria-label="Sidebar"
      >
        <div
          className=" h-90 px-3 py-4 overflow-y-auto rounded-3xl bg-gray-200 dark:border-gray-700  dark:bg-gray-800"
        >
          <ul class="space-y-2 font-medium">
            <li>
              <Link
                to={`homepage`}
                href="#"
                className="flex items-center p-2  rounded-3xl   text-gray-800  text-gray-300  dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>

                <title>home </title>
                <path d="M9.12,3.54l-5,3.68A1.65,1.65,0,0,0,3.44,8.6v6.76a1.35,1.35,0,0,0,1.35,1.35H7.94V13.28a2.08,2.08,0,0,1,4.16,0v3.46h3.11a1.34,1.34,0,0,0,1.35-1.35V8.6a1.73,1.73,0,0,0-.69-1.38L10.92,3.54a1.56,1.56,0,0,0-1.8,0Zm0,0" />

                <span class="ml-3">Anasayfa</span>
              </Link>
            </li>
            <li>
              <Link
                to={`control-panel`}
                href="#"
                className="flex items-center p-2  rounded-3xl   text-gray-800  text-gray-300  dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 6H8M8 6V4M8 6V8M20 6H12M4 12H14M14 12V10M14 12V14M20 12H18M4 18H10M10 18V16M10 18V20M20 18H14" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Kontrol Paneli
                </span>
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
              </Link>
            </li>
            <li>
              <Link
                to={`scenery`}
                href="#"
                className="flex items-center p-2  rounded-3xl   text-gray-800  text-gray-300  dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">

                <svg
                  class="w-7 h-7 dark:text-white bi bi-gear"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 60 63"
                  x="0px"
                  y="0px"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M47.43,28.76h0c-.69,0-1.32-.44-1.53-1.1-.26-.84-.6-1.65-1-2.42-.32-.62-.19-1.37,.3-1.86h0c.61-.62,.61-1.61,0-2.22l-2.36-2.36c-.61-.61-1.61-.61-2.22,0h0c-.49,.49-1.25,.63-1.86,.3-.77-.4-1.58-.74-2.42-1-.66-.21-1.1-.83-1.1-1.53,0-.87-.7-1.57-1.57-1.57h-3.34c-.87,0-1.57,.7-1.57,1.57v.03c0,.67-.42,1.29-1.07,1.48-.85,.26-1.67,.6-2.45,1.01-.62,.32-1.37,.19-1.86-.3h0c-.61-.62-1.61-.62-2.22,0l-2.36,2.36c-.61,.61-.61,1.61,0,2.22h0c.49,.49,.62,1.25,.3,1.87-.4,.77-.74,1.58-1,2.42-.21,.66-.83,1.1-1.53,1.1h0c-.87,0-1.57,.7-1.57,1.57v3.34c0,.87,.7,1.57,1.57,1.57h0c.69,0,1.32,.44,1.53,1.1,.26,.84,.6,1.65,1,2.42,.32,.62,.19,1.37-.3,1.86h0c-.61,.62-.61,1.61,0,2.22l2.36,2.36c.61,.61,1.61,.61,2.22,0h0c.49-.49,1.25-.63,1.86-.3,.77,.4,1.58,.74,2.42,1,.66,.21,1.1,.83,1.1,1.53,0,.87,.7,1.57,1.57,1.57h3.34c.87,0,1.57-.7,1.57-1.57,0-.69,.44-1.32,1.1-1.53,.84-.26,1.65-.6,2.42-1,.62-.32,1.37-.19,1.86,.3h0c.61,.62,1.61,.62,2.22,0l2.36-2.36c.61-.61,.61-1.61,0-2.22h0c-.49-.49-.62-1.25-.3-1.87,.41-.78,.75-1.6,1.01-2.45,.2-.64,.81-1.07,1.48-1.07h.03c.87,0,1.57-.7,1.57-1.57v-3.34c0-.87-.7-1.57-1.57-1.57Zm-15.43,13.24c-5.52,0-10-4.48-10-10s4.48-10,10-10,10,4.48,10,10-4.48,10-10,10Z" />
                  <polygon points="29 36 36 32 29 28 29 36" />
                  <path d="M61.05,42.79c3.16-8.51,2.44-18.08-2.08-26.07l-1.74,.98c4.19,7.42,4.88,16.31,1.99,24.23l-2.61-1.21,1.37,6.52,5.88-3.14-2.82-1.32Z" />
                  <path d="M4.77,22.06l2.61,1.22-1.37-6.52L.13,19.9l2.82,1.32C-.2,29.73,.51,39.3,5.03,47.28l1.74-.98c-4.2-7.42-4.89-16.31-2-24.24Z" />
                  <path d="M47.25,6.01L44.1,.13l-1.32,2.83C34.27-.2,24.7,.51,16.72,5.03l.98,1.74c7.42-4.19,16.31-4.88,24.23-1.99l-1.22,2.61,6.52-1.37Z" />
                  <path d="M22.06,59.23l1.22-2.61-6.52,1.37,3.14,5.88,1.32-2.82c3.48,1.29,7.13,1.94,10.78,1.94,5.29,0,10.57-1.35,15.29-4.02l-.98-1.74c-7.42,4.19-16.31,4.88-24.24,2Z" />
                </svg>

                <span class="flex-1 ml-3 whitespace-nowrap">Senaryolar</span>
              </Link>
            </li>
            <li>
              <Link
                to={`energyconsumption`}
                href="#"
                className="flex items-center p-2  rounded-3xl   text-gray-800  text-gray-300  dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>

                <span class="flex-1 ml-3 whitespace-nowrap">
                  Enerji Tüketimi
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={`settings`}
                href="#"
                className="flex items-center p-2  rounded-3xl   text-gray-800  text-gray-300  dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <span class="flex-1 ml-3 whitespace-nowrap">Ayarlar</span>
              </Link>
            </li>
            <li>
              <Link
                to={`logbook`}
                href="#"
                className="flex items-center p-2  rounded-3xl   text-gray-800  text-gray-300  dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                  />
                </svg>

                <title>home </title>
                <path d="M9.12,3.54l-5,3.68A1.65,1.65,0,0,0,3.44,8.6v6.76a1.35,1.35,0,0,0,1.35,1.35H7.94V13.28a2.08,2.08,0,0,1,4.16,0v3.46h3.11a1.34,1.34,0,0,0,1.35-1.35V8.6a1.73,1.73,0,0,0-.69-1.38L10.92,3.54a1.56,1.56,0,0,0-1.8,0Zm0,0" />

                <span className="ml-3">Logbook</span>
              </Link>
            </li>
            <li>
              <Link
                to={`notifications`}
                href="#"
                className="flex items-center p-2  rounded-3xl   text-gray-800  text-gray-300  dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                  />
                </svg>

                <title>home </title>
                <path d="M9.12,3.54l-5,3.68A1.65,1.65,0,0,0,3.44,8.6v6.76a1.35,1.35,0,0,0,1.35,1.35H7.94V13.28a2.08,2.08,0,0,1,4.16,0v3.46h3.11a1.34,1.34,0,0,0,1.35-1.35V8.6a1.73,1.73,0,0,0-.69-1.38L10.92,3.54a1.56,1.56,0,0,0-1.8,0Zm0,0" />

                <span class="ml-3">Bildirimler</span>
              </Link>
            </li>
            <li>
              <Link
                to={`profiles`}
                href="#"
                className="flex items-center p-2  rounded-3xl   text-gray-800  text-gray-300  dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <title>home </title>
                <path d="M9.12,3.54l-5,3.68A1.65,1.65,0,0,0,3.44,8.6v6.76a1.35,1.35,0,0,0,1.35,1.35H7.94V13.28a2.08,2.08,0,0,1,4.16,0v3.46h3.11a1.34,1.34,0,0,0,1.35-1.35V8.6a1.73,1.73,0,0,0-.69-1.38L10.92,3.54a1.56,1.56,0,0,0-1.8,0Zm0,0" />

                <span class="ml-3">Profiller</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="text-md">
        <img className="moon cursor-pointer" src="./icon-moon.svg" alt="" />
        <img className="sun cursor-pointer" src="./icon-moon.svg" alt="" />
      </div>

      <script src="./test.js"></script>

      <div class="p-4 sm:ml-64">
        <div class="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
