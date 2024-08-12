import {
  FaSearch,
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaUserAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    // <header className="bg-gradient-to-r from-red-100 to-blue-200 shadow-md  ">
    //   <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-red-100 to-blue-200 shadow-md z-50 ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-black">Apni</span>
            <span className="text-red-600">Property</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-2 rounded-lg flex items-center shadow-inner"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-blue-600 hover:text-red-600 transition-colors duration-200" />
          </button>
        </form>
        <div className="flex sm:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <FaTimes className="text-black text-2xl" />
            ) : (
              <FaBars className="text-black text-2xl" />
            )}
          </button>
        </div>
        <ul className="hidden sm:flex sm:gap-4">
          <Link to="/">
            <li className="text-black hover:text-red-600 transition-colors duration-200 ">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="text-black hover:text-red-600 transition-colors duration-200">
              About
            </li>
          </Link>
          <Link to="/contact">
            <li className="text-black hover:text-red-600 transition-colors duration-200">
              Contact
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-white hover:text-yellow-300 transition-colors duration-200">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-300 text-black shadow-lg transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:hidden`}
      >
        <div className="flex justify-between items-center p-3">
          <h1 className="font-bold text-lg">
            <span className="text-black">Menu</span>
          </h1>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <FaTimes className="text-black text-2xl" />
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-3">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <li className="flex items-center gap-2 text-black hover:text-yellow-300 transition-colors duration-200">
              <FaHome />
              Home
            </li>
          </Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
            <li className="flex items-center gap-2 text-black hover:text-yellow-300 transition-colors duration-200">
              <FaInfoCircle />
              About
            </li>
          </Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <li className="flex items-center gap-2 text-black hover:text-yellow-300 transition-colors duration-200">
              <FaPhoneAlt />
              Contact
            </li>
          </Link>
          <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
            {currentUser ? (
              <li className="flex items-center gap-2">
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
                <span className="hover:text-yellow-300 transition-colors duration-200">
                  Profile
                </span>
              </li>
            ) : (
              <li className="flex items-center gap-2 text-black hover:text-yellow-300 transition-colors duration-200">
                <FaUserAlt />
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
