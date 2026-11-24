import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Contact() {

    const navigate = useNavigate()

   const handleSubmit = (e) => {
    e.preventDefault()

    const name = e.target.name.value
    const email = e.target.email.value

    navigate(`/thankyou/${name}/${email}`)
}


    return (
        <div className="mx-auto w-11/12 py-20 font-mono">

            <h1 className="text-5xl font-bold text-center">
                Contact Us
            </h1>

            <form onSubmit={handleSubmit} className="w-1/2 mt-10 mx-auto space-y-6">

                <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full border-b-2 border-gray-300 p-3 outline-none focus:border-black"
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full border-b-2 border-gray-300 p-3 outline-none focus:border-black"
                />

                <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    required
                    className="w-full border-b-2 border-gray-300 p-3 outline-none focus:border-black"
                />

                <button
                    type="submit"
                    className="rounded-full bg-black px-8 py-3 font-semibold text-white"
                >
                    Send Message
                </button>

            </form>

        </div>
    )
}
