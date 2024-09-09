"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useCallback } from 'react';



export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter()
  const [user, setUser] = useState<{ username?: string; emailId?: string } | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout successful')
      setUser(null)
      router.push('/Form/Login')
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/users/getuser')
      
      console.log('user data', response.data)
      setUser(response.data.data)
    } catch (error: any) {
      console.error('Failed to fetch data')
      toast.error('Failed to fetch user data')
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])


  useEffect(() => {
    console.log('Rendering with user:', user); // Log user state to verify its structure
  }, [user]);



  const handleClickOutside = useCallback((event: any) => {
    if (event.target.closest("#user-menu-button") === null) {
      setDropdownOpen(false);
    }
    if (event.target.closest("#navbar-user") === null && menuOpen) {
      setMenuOpen(false);
    }
  }, [menuOpen]);
  
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);
  
  return (
    <nav className="bg-gray-900 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/Doglogo.jpg"
            className="h-8 rounded-full"
            alt="Flowbite Logo"
            width={32} // Set the appropriate width
            height={32} // Set the appropriate height
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-white">
            Pet Parade
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={dropdownOpen}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <Image
              className="w-8 h-8 rounded-full"
              src="/Doglogo.jpg"
              alt="User photo"
              width={32}  
              height={32}
              />
          </button>
          <div
            className={`z-50 absolute right-0 mt-2 ${dropdownOpen ? "" : "hidden"} text-base list-none bg-gray-600 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
            id="user-dropdown"
            style={{ top: "100%", right: 0 }}
          >
            <div className="px-4 py-3">
              {user ? (
                <>
                  <span className="block text-sm text-gray-400 dark:text-white">
                    {user.username || 'User'}
                  </span>
                  <span className="block text-sm text-gray-400 truncate dark:text-gray-400">
                    {user.emailId || 'No Email'}
                  </span>
                </>
              ) : (
                <span className="block text-sm text-gray-400 dark:text-gray-400">
                  Loading...
                </span>
              )}
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/Form/Signup"
                  className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"

                >
                  Signup
                </a>
              </li>
              <li>
                <a
                  href="/Form/Login"
                  className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="/Form/petofthemonthform"
                  className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Petofthemonthform
                </a>
              </li>

              <li className="ml-2 mt-1 mb-1">
                <Button onClick={logout} className="hover:bg-gray-400 items-center">Logout</Button>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${menuOpen ? "" : "hidden"} md:block`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-600 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/petofthemonth"
                className="block py-2 px-3 text-black md:hover:text-blue-700 rounded md:bg-transparent  md:p-0 md:dark:text-white md:text-white"
                aria-current="page"
              >
                Pet of the month
              </a>
            </li>
            <li>
              <a
                href="/gallery"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-400 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 md:text-white"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="Form/PetForm"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-400 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 md:text-white"
              >
                Pet Form
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
