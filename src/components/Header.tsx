
import React from "../assets/react.png";
import Tailwind from "../assets/tailwind.png";
import TS from "../assets/Typescript.png";
import Vite from "../assets/Vitejs.png";
import Vercel from "../assets/vercel.jpg";
import Redux from "../assets/redux.png";

const Header = () => {
  return (
    <>
      <div className="flex mt-0 justify-center items-center ">
        {/* <h1 className=" text-gray-600 pr-3">Build with:</h1> */}
        <span className="w-7 h-7">
          <img src={Vite} alt="Vite icon" />
        </span>
        <span className="my-auto mx-2 text-gray-500 text-lg"> + </span>
        <span className="w-7 h-7">
          <img src={React} alt="React icon" />
        </span>
        <span className="my-auto mx-2 text-gray-500 text-lg"> + </span>
        <span className="w-7 h-7">
          <img src={TS} alt="TS icon" />
        </span>
        <span className="my-auto mx-2 text-gray-500 text-lg"> + </span>
        <span className="w-7 h-7">
          <img src={Redux} alt="Redux icon" />
        </span>
        <span className="my-auto mx-2 text-gray-500 text-lg"> + </span>
        <span className="w-7 h-7">
          <img src={Tailwind} alt="Tailwind icon" />
        </span>
        <span className="my-auto mx-2 text-gray-500 text-lg"> + </span>
        <span className="w-7 h-7">
          <img src={Vercel} alt="Vercel icon" />
        </span>
      </div>
    </>
  );
};

export default Header;
