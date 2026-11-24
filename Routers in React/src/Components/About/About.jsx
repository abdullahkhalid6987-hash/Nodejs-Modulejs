import React from 'react'
import { NavLink } from 'react-router-dom'
import branch from '../../Assets/branch.jpg'

export default function About() {
    return (
        <main className='w-11/12 mx-auto font-mono'>

            {/* Hero */}
            <section className="relative isolate min-h-[500px] overflow-hidden">

                <div
                    className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat grayscale-30 brightness-110"
                    style={{ backgroundImage: `url(${branch})` }}
                ></div>

                <div className="absolute inset-0 -z-10 bg-white/60"></div>

                <div className="mx-auto flex min-h-[500px] w-11/12 items-center">
                    <div className="max-w-2xl">

                        <p className="text-sm font-semibold uppercase tracking-[0.3em]">
                            About Us
                        </p>

                        <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl">
                            We believe simple
                            <br />
                            things matter.
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-700">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Excepturi quaerat sit sunt odit, non eos saepe
                            voluptatum minus maxime atque optio quisquam quam
                            accusamus quos.
                        </p>

                    </div>
                </div>

            </section>


            {/* Our Story */}
            <section className="mx-auto w-11/12 py-20">

                <div className="grid gap-12 md:grid-cols-2 md:items-center">

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em]">
                            Our Story
                        </p>

                        <h2 className="mt-4 text-4xl font-semibold">
                            Built with purpose.
                        </h2>
                    </div>

                    <div className="text-gray-600">
                        <p className="leading-7">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Excepturi quaerat sit sunt odit, non eos saepe
                            voluptatum minus maxime atque optio quisquam quam
                            accusamus quos?
                        </p>

                        <p className="mt-5 leading-7">
                            Assumenda dolores corrupti sapiente nemo atque
                            veritatis, consequatur saepe tenetur. Neque,
                            aliquam ducimus blanditiis labore dignissimos
                            beatae nostrum nam sapiente.
                        </p>
                    </div>

                </div>

            </section>


            {/* Values */}
            <section className="border-t-2 border-black">

                <div className="mx-auto w-11/12 py-20">

                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em]">
                            What We Value
                        </p>

                        <h2 className="mt-4 text-4xl font-semibold">
                            Less noise. More meaning.
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-3">

                        <div className="border-t border-gray-300 pt-5">
                            <h3 className="text-xl font-semibold">
                                Simplicity
                            </h3>

                            <p className="mt-3 leading-7 text-gray-600">
                                We believe good design doesn't need to be
                                complicated. Everything should have a purpose.
                            </p>
                        </div>

                        <div className="border-t border-gray-300 pt-5">
                            <h3 className="text-xl font-semibold">
                                Quality
                            </h3>

                            <p className="mt-3 leading-7 text-gray-600">
                                We care about the details and take the time to
                                create things that last.
                            </p>
                        </div>

                        <div className="border-t border-gray-300 pt-5">
                            <h3 className="text-xl font-semibold">
                                People
                            </h3>

                            <p className="mt-3 leading-7 text-gray-600">
                                Everything we do starts with people and ends
                                with creating something meaningful for them.
                            </p>
                        </div>

                    </div>

                </div>

            </section>


            {/* Call to Action */}
            <section className="mx-auto w-11/12 py-20">

                <div className="rounded-2xl bg-black px-8 py-16 text-center text-white md:px-20">

                    <h2 className="text-4xl font-semibold">
                        Want to know more?
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-gray-300">
                        We'd love to hear from you. Get in touch and let's
                        start a conversation.
                    </p>

                    <NavLink
                        to="/contact"
                        className="mt-8 inline-block rounded-full bg-white px-7 py-3 font-semibold text-black transition hover:bg-gray-200"
                    >
                        Contact Us
                    </NavLink>

                </div>

            </section>

        </main>
    )
}
