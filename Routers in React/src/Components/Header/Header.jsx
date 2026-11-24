import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header(){

    return(
        <>
        <nav className='font-mono'>
            <div className='relative flex flex-col md:flex-row items-center justify-center space-y-5 md:space-y-0 md:space-x-12 py-5 font-semibold text-md'>
            <div className='md:absolute flex justify-center items-center md:left-20 text-3xl font-semibold'><Link to="/">Lorem Ipsum</Link></div>
            <NavLink to="/" className={({isActive}) => 
                `${isActive ? 'text-white bg-black' : 'text-back'} hover:text-white hover:bg-black rounded-4xl py-2 text-center w-17.5`
            }><div>Home</div></NavLink>
            <NavLink to="about" className={({isActive}) => 
                `${isActive ? 'text-white bg-black' : 'text-back'} hover:text-white hover:bg-black rounded-4xl py-2 text-center w-17.5`
                }><div>About</div></NavLink>
            <NavLink to="contact" className={({isActive}) => 
                `${isActive ? 'text-white bg-black' : 'text-back'} hover:text-white hover:bg-black rounded-4xl py-2 text-center w-17.5`
        }><div>Contact</div></NavLink>
        </div>
        <div className='w-11/12 bg-black h-0.5 mx-auto'></div>
        </nav>
        </>
  
    )
} 
