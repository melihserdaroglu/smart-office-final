import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";

const EnergyConsumption = () => {
  const [button1Text, setButton1Text] = useState("Saatlik");
  const [button2Text, setButton2Text] = useState("Günlük");
  const [button3Text, setButton3Text] = useState("Haftalık");
  const [button4Text, setButton4Text] = useState("Aylık");
  const [button5Text, setButton5Text] = useState("Ayarlar");

  const handleButtonClick = (buttonNumber) => {
    if (buttonNumber === 1) {
      setButton1Text(
        button1ext === "Perdeyi aç" ? "Perdeyi kapat" : "Perdeyi aç"
      );
    } else if (buttonNumber === 2) {
      setButton2Text(
        button2Text === "Klimayı aç" ? "Klimayı kapat" : "Klimayı aç"
      );
    } else if (buttonNumber === 3) {
      setButton3Text(
        button3Text === "Nemlendiriciyi aç"
          ? "Nemlendiriciyi kapat"
          : "Nemlendiriciyi aç"
      );
    } else if (buttonNumber === 4) {
      setButton4Text(
        button4Text === "Nemlendiriciyi aç"
          ? "Nemlendiriciyi kapat"
          : "Nemlendiriciyi aç"
      );
    } else if (buttonNumber === 5) {
      setButton5Text(
        button5text === "Nemlendiriciyi aç"
          ? "Nemlendiriciyi kapat"
          : "Nemlendiriciyi aç"
      );
    }
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
      <div className="flex justify-end items-center mt-2">
        <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-400 rounded-2xl hover:bg-gray-500 focus:outline-none dark:bg-gray-400 dark:hover:bg-gray-500 "
            onClick={toggleVisibility}
        >
          {isVisible ? "" : ""}
          Sayfayı düzenle
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          />
        </button>
      </div>
      <div className="flex justify-end mt-7">
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
      <div className="max-w-6xl bg-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:bg-gray-800 mb-6 mt-4 opacity-95">
        <a href="#">
          <img
            className="rounded-t-lg"
            src="/docs/images/blog/image-1.jpg"
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <div className="flex justify-between items-center">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-gray-200 dark:text-white">
                Enerji Tüketimi
              </h5>
              {isVisible && (
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                    >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
              )}
            </div>
          </a>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
          <div className="mt-80"></div>

          <Tab.Group>
            <Tab.Panels>
              <Tab.Panel>
                <div>
                  <p class="mb-3 font-normal text-gray-800 dark:text-gray-200">
                    Perde sistemini buradan kontrol edebilirsiniz.
                  </p>
                  <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-400 rounded-2xl hover:bg-gray-100 focus:outline-none dark:bg-gray-400 dark:hover:bg-gray-500 ">
                    <button>Parlaklık</button>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div>
                  <p class="mb-3 font-normal text-gray-900 dark:text-gray-200 dark:text-gray-400">
                    Işık sıcaklığını buradan kontrol edebilirsiniz.
                  </p>

                  <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-400 rounded-2xl hover:bg-gray-100 focus:outline-none dark:bg-gray-400 dark:hover:bg-gray-500 ">
                    <button>Işık sıcaklığı</button>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div>
                  <p class="mb-3 font-normal text-gray-900 dark:text-gray-200 dark:text-gray-400">
                    Enerji tüketimini buradan takip edebilirsiniz.
                  </p>
                  <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-400 rounded-2xl hover:bg-gray-100 focus:outline-none dark:bg-gray-400 dark:hover:bg-gray-500 ">
                    <button>Haftalık</button>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div>
                  <p class="mb-3 font-normal text-gray-900 dark:text-gray-200 dark:text-gray-400">
                    Enerji tüketimini buradan takip edebilirsiniz.
                  </p>
                  <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-400 rounded-2xl hover:bg-gray-100 focus:outline-none dark:bg-gray-400 dark:hover:bg-gray-500 ">
                    <button>Aylık</button>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div>
                  <p class="mb-3 font-normal text-gray-900 dark:text-gray-200 dark:text-gray-400">
                    Enerji tüketimini buradan takip edebilirsiniz.
                  </p>
                  <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-400 rounded-2xl hover:bg-gray-100 focus:outline-none dark:bg-gray-400 dark:hover:bg-gray-500 ">
                    <button>Ayarlar</button>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
            <Tab.List>
              <div className="flex justify-between text-white">
                <Tab>
                  <div>
                    <div className="flex justify-between text-black dark:text-gray-200">
                      <a> Saatlik </a>
                    </div>
                  </div>
                </Tab>
                <Tab>
                  <div>
                    <div className="flex justify-between text-black dark:text-gray-200">
                      <a> Günlük </a>
                    </div>
                  </div>
                </Tab>
                <Tab>
                  <div>
                    <div className="flex justify-between text-black dark:text-gray-200">
                      <a>Haftalık</a>
                    </div>
                  </div>
                </Tab>
                <Tab>
                  <div>
                    <div className="flex justify-between text-black dark:text-gray-200">
                      <a> Aylık </a>
                    </div>
                  </div>
                </Tab>
                <Tab>
                  <div>
                    <div className="flex justify-between text-black dark:text-gray-200">
                      <a> Ayarlar</a>
                    </div>
                  </div>
                </Tab>
              </div>
            </Tab.List>
          </Tab.Group>

          <div className="flex justify-end mt-4">
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-400 rounded-2xl hover:bg-gray-100 focus:outline-none dark:bg-gray-400 dark:hover:bg-gray-500 ">

              Yazdır
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnergyConsumption;
