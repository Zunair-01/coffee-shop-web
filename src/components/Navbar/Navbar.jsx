import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/website/coffee_logo.png";
import { FaCoffee } from "react-icons/fa";

const Menu = [
  { id: 1, name: "Home", link: "/home" },
  { id: 2, name: "Services", link: "/services" },
  { id: 3, name: "About", link: "/banner" },
];

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-secondary to-secondary/90 shadow-md bg-gray-900 text-white">
        <div className="container py-2">
          <div className="flex justify-between items-center">
            {/* Logo section */}
            <div data-aos="fade-down" data-aos-once="true">
              <Link
                to="/"
                className="font-bold text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider font-cursive"
              >
                <img src={Logo} alt="Logo" className="w-14" />
                Coffee Cafe
              </Link>
            </div>

            {/* Link section */}
            <div
              data-aos="fade-down"
              data-aos-once="true"
              data-aos-delay="300"
              className="flex justify-between items-center gap-4"
            >
              <ul className="hidden sm:flex items-center gap-4">
                {Menu.map((menu) => (
                  <li key={menu.id}>
                    <Link
                      to={menu.link}
                      className="inline-block text-xl py-4 px-4 text-white/70 hover:text-white duration-200"
                    >
                      {menu.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className="bg-primary/70 hover:bg-primary duration-200 text-white px-4 py-2 rounded-full flex items-center gap-3"
                  onClick={toggleDropdown}
                >
                  Coffee
                  <FaCoffee className="text-xl text-white drop-shadow-sm cursor-pointer" />
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 bg-gradient-to-r from-secondary to-secondary/90 text-white rounded-md shadow-lg z-10">
                    <li>
                      <Link
                        to="/favourite"
                        className="block px-4 py-2 hover:bg-primary/70 duration-200"
                      >
                        Favourite
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/addtocart"
                        className="block px-4 py-2 hover:bg-primary/70 rounded-b-md duration-200"
                      >
                        Carts
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogoutClick}
                        className="block px-4 py-2 hover:bg-primary/70 rounded-t-md duration-200 w-full text-left"
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm mx-4 p-6">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-around">
              <button
                onClick={handleLogoutConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 duration-200"
              >
                Logout
              </button>
              <button
                onClick={handleModalClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
