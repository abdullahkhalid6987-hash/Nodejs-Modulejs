import React from 'react'
import { useParams } from 'react-router-dom'

export default function ThankYou() {

    const { name, email } = useParams()

    return (
        <div className="flex min-h-[70vh] items-center justify-center font-mono">
            <div className="text-center">

                <h1 className="text-4xl font-semibold">
                    Thank you for contacting us, {name}!
                </h1>

                <p className="mt-5 text-lg text-gray-600">
                    We will contact you shortly at your email
                </p>

                <p className="mt-2 font-semibold">
                    {email}
                </p>

            </div>
        </div>
    )
}
