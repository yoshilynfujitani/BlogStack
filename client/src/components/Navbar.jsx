import React, { useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";

import { CgMenuGridO } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import { TfiWrite } from "react-icons/tfi";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const link = `transition text-md font-semibold hover:text-transparent flex items-center `;

  let [searchParams, setSearchParams] = useSearchParams();

  function handleCategory(event) {
    searchParams.set("category", event);
    setSearchParams(searchParams);
  }

  return (
    <div className="navbar p-5 mb-5 shadow-md">
      <div className="container flex items-center justify-between">
        <div className="logo">
          <Link to="/">
            <h1 className="text-2xl font-bold">
              Blog
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Stack
              </span>
            </h1>
          </Link>
        </div>
        {/* Mobile */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          {isOpen ? <GrClose size={16} /> : <CgMenuGridO size={20} />}
        </button>
        {isOpen ? (
          <div className="absolute right-0 mx-5 top-16 bg-slate-50 rounded-md p-4">
            {" "}
            <Link className={link} onClick={() => handleCategory("art")}>
              <h6
                className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text"
                onClick={() => setIsOpen((isOpen) => !isOpen)}
              >
                ART
              </h6>
            </Link>
            <Link className={link} onClick={() => handleCategory("science")}>
              <h6
                className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text"
                onClick={() => setIsOpen((isOpen) => !isOpen)}
              >
                SCIENCE
              </h6>
            </Link>
            <Link className={link} onClick={() => handleCategory("technology")}>
              <h6
                className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text"
                onClick={() => setIsOpen((isOpen) => !isOpen)}
              >
                TECHNOLOGY
              </h6>
            </Link>
            <Link className={link} onClick={() => handleCategory("cinema")}>
              <h6
                className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text"
                onClick={() => setIsOpen((isOpen) => !isOpen)}
              >
                CINEMA
              </h6>
            </Link>
            <Link className={link} onClick={() => handleCategory("design")}>
              <h6
                className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text"
                onClick={() => setIsOpen((isOpen) => !isOpen)}
              >
                DESIGN
              </h6>
            </Link>
            <Link className={link} onClick={() => handleCategory("food")}>
              <h6
                className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text"
                onClick={() => setIsOpen((isOpen) => !isOpen)}
              >
                FOOD
              </h6>
            </Link>
            {/* User Details */}
            <h1 className="text-cyan-500">Account Details</h1>
            <div className="flex flex-col">
              {currentUser && <span>{currentUser.username}</span>}
              {currentUser ? (
                <button
                  onClick={logout}
                  className="bg-red-500 text-white rounded-md font-semibold mx-4 my-1"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="link">
                  Login
                </Link>
              )}
            </div>
            {currentUser && (
              <div className="flex items-center gap-2 my-1">
                <TfiWrite />
                <span className="font-semibold">
                  <Link className="link" to="/write">
                    Write
                  </Link>
                </span>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
        {/* Desktop */}
        <div className="hidden md:flex md:gap-5 md:items-center">
          <Link className={link} onClick={() => handleCategory("art")}>
            <h6 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
              ART
            </h6>
          </Link>
          <Link className={link} onClick={() => handleCategory("science")}>
            <h6 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
              SCIENCE
            </h6>
          </Link>
          <Link className={link} onClick={() => handleCategory("technology")}>
            <h6 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
              TECHNOLOGY
            </h6>
          </Link>
          <Link className={link} onClick={() => handleCategory("cinema")}>
            <h6 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
              CINEMA
            </h6>
          </Link>
          <Link className={link} onClick={() => handleCategory("design")}>
            <h6 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
              DESIGN
            </h6>
          </Link>
          <Link className={link} onClick={() => handleCategory("food")}>
            <h6 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
              FOOD
            </h6>
          </Link>
          {currentUser && <span>{currentUser.username}</span>}
          {currentUser ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to="/login" className="link">
              Login
            </Link>
          )}

          {currentUser && (
            <div className="flex items-center gap-2 my-1">
              <TfiWrite />
              <span className="font-semibold">
                <Link className="link" to="/write">
                  Write
                </Link>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
