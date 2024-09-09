import Link from "next/link";
import React from "react";

type Props = {
    isOpen: boolean;
}
export default function Sidebar({ isOpen }: Props) {
    return (
        <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-60 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="p-4">
                <ul>
                    <li>
                        <Link href='/profile'>
                            <a className="block py-2">Your Profile</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/pet-form'>
                            <a className="block py-2">Pet Form</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/login'>
                            <a className="block py-2">Login</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/logout'>
                            <a className="block py-2">Logout</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}