import React from "../assets/react.png";
import Tailwind from "../assets/tailwind.png";
import TS from "../assets/Typescript.png";
import Vite from "../assets/Vitejs.png";
import Vercel from "../assets/vercel.jpg";
import Redux from "../assets/redux.png";
import Firebase from "../assets/firebase.png";
import { useState } from 'react';
// import { FiSun, FiMoon } from 'react-icons/fi';

const Header = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);}
  
  return (
    <>
      <div className="flex mt-0 justify-center items-center ">
        <span className="w-5 h-5 sm:w-7 sm:h-7">
          <img src={Vite} alt="Vite icon" />
        </span>
        <span className="my-auto mx-2 text-gray-500 text-lg"> + </span>
        <span className="w-5 h-5 sm:w-7 sm:h-7">
          <img src={React} alt="React icon" />
        </span>
        <span className="my-auto mx-2 text-gray-500 text-lg"> + </span>
        <span className="w-5 h-5 sm:w-7 sm:h-7">
          <img src={TS} alt="TS icon" />
        </span>
        <span className="my-auto mx-2 text-gray-500 text-lg"> + </span>
        <span className="w-5 h-5 sm:w-7 sm:h-7">
          <img src={Redux} alt="Redux icon" />
        </span>
        <span className="my-auto mx-2 text-gray-500 text-lg"> + </span>
        <span className="w-5 h-5 sm:w-7 sm:h-7">
          <img src={Tailwind} alt="Tailwind icon" />
        </span>
        <span className="my-auto mx-2 text-gray-500 text-lg"> + </span>
        <span className="w-5 h-5 sm:w-7 sm:h-7">
          <img src={Firebase} alt="Firebase icon" />
        </span>
        <span className="my-auto mx-2 text-gray-500 text-lg"> + </span>
        <span className="w-5 h-5 sm:w-7 sm:h-7">
          <img src={Vercel} alt="Vercel icon" />
        </span>

        <label htmlFor="AcceptConditions" className="relative h-8 w-14 cursor-pointer">
      <input
        type="checkbox"
        id="AcceptConditions"
        className="peer sr-only [&amp;:checked_+_span_svg[data-checked-icon]]:block [&amp;:checked_+_span_svg[data-unchecked-icon]]:hidden"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />

      <span
        className="absolute inset-y-0 start-0 z-10 m-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600"
      >
        <svg
          data-unchecked-icon
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>

        <svg
          data-checked-icon
          xmlns="http://www.w3.org/2000/svg"
          className={isChecked ? 'h-4 w-4' : 'hidden h-4 w-4'}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>

      <span
        className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"
      ></span>
    </label>
      </div>
    </>
  );
};

export default Header;
