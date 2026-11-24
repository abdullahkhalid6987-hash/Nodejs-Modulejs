import React from 'react'
import { NavLink } from 'react-router-dom'
import block1 from '../../Assets/block1.jpg'
import block2 from '../../Assets/block2.jpg'
import block3 from '../../Assets/block3.jpg'
import branch from '../../Assets/branch.jpg'

export default function Home(){

    return(
      <main className='w-11/12 mx-auto font-mono'>
      <h1 className='absolute text-5xl md:text-9xl mt-5 md:top-20 flex font-semibold items-center justify-center w-11/12 -z-10'>Lorem Ipsum</h1>
      <div className='flex justify-center items-center h-screen mt-5 md:mt-24 space-x-2 md:space-x-20 mx-auto'>
        <div className='h-8/12 w-1/2 md:h-11/12 rounded-3xl border overflow-clip md:w-50 bg-center bg-cover bg-no-repeat duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-slate-700'>
            <img src={`${block1}`} className='h-full' alt="" />
        </div>
        <div className='h-8/12 w-1/2 md:h-11/12 mt-20 rounded-3xl border overflow-clip md:w-50 bg-center bg-cover bg-no-repeat duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-slate-700'>
            <img src={`${block2}`} className='h-full' alt="" />
        </div>
        <div className='h-8/12 w-1/2 md:h-11/12 rounded-3xl border overflow-clip md:w-50 bg-center bg-cover bg-no-repeat duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-slate-700' >
        <img src={`${block3}`} className='h-full' alt="" />
        </div>
      </div>
      <div className='flex flex-col items-start w-full h-fit mt-20 p-10 border-t border-b bg-cover bg-center bg-no-repeat grayscale-30 brightness-110' style={{backgroundImage: `url(${branch})`}}>
        <h1 className='text-5xl font-semibold'>Something</h1>
        <p className='mt-5 font-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quaerat sit sunt odit, non eos saepe voluptatum minus maxime atque optio quisquam quam accusamus quos? Assumenda dolores corrupti sapiente nemo atque veritatis, consequatur saepe tenetur. Neque, aliquam ducimus blanditiis labore dignissimos beatae nostrum nam sapiente, laboriosam explicabo corrupti rem sint.</p>
        <NavLink to="about" className={"bg-black text-white text-2xl mt-5 px-3 py-1 rounded-2xl duration-300 hover:-translate-y-1 hover:shadow-2xl"}>About Us</NavLink>
      </div>
      </main>
    )
} 
