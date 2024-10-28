import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  useEffect(() => {
    // Trigger re-render on route change
  }, [location]);

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center space-x-14">
        <a href="/">
          <img
            src="/logo.png"
            alt="logo"
            width={104}
            height={41}
            className="cursor-pointer"
          />
        </a>
        <div className="group font-semibold relative pb-1">
          <a href="/chat">Chat</a>
          <span
            className={
              location.pathname === "/chat"
                ? "h-1 w-full bg-[#0FA958] absolute top-6 left-0"
                : "h-1 w-0 bg-[#0FA958] group-hover:w-full transition-all ease-in-out duration-300 absolute top-6 left-0"
            }
          ></span>
        </div>
        <div className="group font-semibold relative pb-1">
          <a href="/Synced">Synced</a>
          <span
            className={
              location.pathname === "/synced"
                ? "h-1 w-full bg-[#0FA958] absolute top-6 left-0"
                : "h-1 w-0 bg-[#0FA958] group-hover:w-full transition-all ease-in-out duration-300 absolute top-6 left-0"
            }
          ></span>
        </div>
        <div className="group font-semibold relative pb-1">
          <a href="/upload">Upload</a>
          <span
            className={
              location.pathname === "/upload"
                ? "h-1 w-full bg-[#0FA958] absolute top-6 left-0"
                : "h-1 w-0 bg-[#0FA958] group-hover:w-full transition-all ease-in-out duration-300 absolute top-6 left-0"
            }
          ></span>
        </div>
        <div className="group font-semibold relative pb-1">
          <a href="/about">About</a>
          <span
            className={
              location.pathname === "/about"
                ? "h-1 w-full bg-[#0FA958] absolute top-6 left-0"
                : "h-1 w-0 bg-[#0FA958] group-hover:w-full transition-all ease-in-out duration-300 absolute top-6 left-0"
            }
          ></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
