import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="mt-20 border-t-2 border-black font-mono">
            <div className="mx-auto w-11/12 py-12">

                <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">

                    {/* Logo / Description */}
                    <div className="max-w-sm">
                        <h2 className="text-2xl font-bold">
                            Lorem Ipsum
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-gray-600">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam, voluptatum. Lorem ipsum dolor sit
                            amet consectetur adipisicing elit.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-semibold">
                            Navigation
                        </h3>

                        <div className="mt-4 flex flex-col gap-3 text-sm">
                            <NavLink
                                to="/"
                                className="transition hover:text-gray-500"
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/about"
                                className="transition hover:text-gray-500"
                            >
                                About
                            </NavLink>

                            <NavLink
                                to="/contact"
                                className="transition hover:text-gray-500"
                            >
                                Contact
                            </NavLink>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold">
                            Contact
                        </h3>

                        <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600">
                            <p>hello@example.com</p>
                            <p>+1 234 567 890</p>
                            <p>123 Lorem Street</p>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-12 border-t border-gray-300 pt-6 text-sm text-gray-500">
                    <p>
                        © {new Date().getFullYear()} Lorem Ipsum. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    )
}