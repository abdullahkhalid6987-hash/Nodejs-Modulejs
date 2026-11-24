import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../Context/userContext';
import { logoutUser, userSession } from '../Services/User';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const {user, setUser} = useUser()


  const getLinkClass = ({ isActive }) =>
    `transition-colors ${
      isActive ? 'text-stone-900 font-bold' : 'text-stone-600 hover:text-stone-900'
    }`;

  const getMobileLinkClass = ({ isActive }) =>
    `py-2 border-b border-stone-100 uppercase tracking-widest text-xs font-semibold transition-colors ${
      isActive ? 'text-stone-900 font-bold' : 'text-stone-600'
    }`;

  const handleLogout = async () =>{
    try {
      const response = await logoutUser()
      console.log(response.data, response.message)
      setUser("")

    } catch (error) {
        console.log(error.message)
    }
  }

  useEffect(() => {
    const fetchSession = async () => {
    try {
      const response = await userSession()
      setUser(response.data)

    } catch (error) {
      console.log(error.message)
    }
  }

  fetchSession()

  }, [])

    if(user){

    if(user.userType === "admin"){
   return (
    <nav className="w-full mx-auto bg-[#FBF9F6]/90 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex items-center justify-between border-b border-stone-200/50 font-sans">
      {/* Logo Area */}
      <NavLink to="/" className="flex items-center gap-1.5 group">
        <span className="text-sm font-extrabold tracking-[0.2em] text-stone-800 uppercase">
          DESK STATI
        </span>
        <span className="inline-block text-rose-600 scale-75 transform transition-transform group-hover:rotate-45 duration-300">
          ◆
        </span>
        <span className="text-sm font-extrabold tracking-[0.2em] text-stone-800 uppercase">
          N
        </span>
      </NavLink>

      {/* Desktop Navigation Links with isActive */}
      <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest">
        <NavLink to="/" className={getLinkClass}>Home</NavLink>
        <NavLink to="/products" className={getLinkClass}>Products</NavLink>
        <NavLink to="/userList" className={getLinkClass}>Users</NavLink>
        <NavLink to="/addProduct" className={getLinkClass}>Add Products</NavLink>
        <NavLink to="/" className={getLinkClass} onClick={handleLogout}>logout</NavLink>
      </div>

      {/* Right Side Actions (Cart & Mobile Menu) */}
      <div className="flex items-center gap-4">


        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1 text-stone-700 hover:text-stone-900 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Drawer with isActive */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FBF9F6] border-b border-stone-200 p-6 flex flex-col gap-4 md:hidden shadow-lg animate-fade-in-down z-50">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={getMobileLinkClass}>Home</NavLink>
          <NavLink to="/products" onClick={() => setIsOpen(false)} className={getMobileLinkClass}>Products</NavLink>
          <NavLink to="/userList" onClick={() => setIsOpen(false)} className={getMobileLinkClass}>Users</NavLink>
          <NavLink to="/addProduct" onClick={() => setIsOpen(false)} className={getMobileLinkClass}>Add Products</NavLink>
          <NavLink to="/" onClick={handleLogout} className={getMobileLinkClass}>logout</NavLink>
        </div>
      )}
    </nav>
  );
}


    if(user.userType === "user"){
  return (
    <nav className="w-full mx-auto bg-[#FBF9F6]/90 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex items-center justify-between border-b border-stone-200/50 font-sans">
      {/* Logo Area */}
      <NavLink to="/" className="flex items-center gap-1.5 group">
        <span className="text-sm font-extrabold tracking-[0.2em] text-stone-800 uppercase">
          DESK STATI
        </span>
        <span className="inline-block text-rose-600 scale-75 transform transition-transform group-hover:rotate-45 duration-300">
          ◆
        </span>
        <span className="text-sm font-extrabold tracking-[0.2em] text-stone-800 uppercase">
          N
        </span>
      </NavLink>

      {/* Desktop Navigation Links with isActive */}
      <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest">
        <NavLink to="/" className={getLinkClass}>Home</NavLink>
        <NavLink to="/products" className={getLinkClass}>Products</NavLink>
        <NavLink to="/userProfile" className={getLinkClass}>Profile</NavLink>
        <NavLink to="/" className={getLinkClass} onClick={handleLogout}>Logout</NavLink>
      </div>

      {/* Right Side Actions (Cart & Mobile Menu) */}
      <div className="flex items-center gap-4">
            {/* Shopping Cart Icon Link */}
        <NavLink to="/cart" className="relative p-1 text-stone-700 hover:text-stone-900 transition-colors" aria-label="Cart">
          <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-rose-600 text-[9px] font-bold text-white rounded-full w-4 h-4 flex items-center justify-center scale-90">
            {user.order.length}
          </span>
        </NavLink>


        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1 text-stone-700 hover:text-stone-900 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Drawer with isActive */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FBF9F6] border-b border-stone-200 p-6 flex flex-col gap-4 md:hidden shadow-lg animate-fade-in-down z-50">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={getMobileLinkClass}>Home</NavLink>
          <NavLink to="/products" onClick={() => setIsOpen(false)} className={getMobileLinkClass}>Products</NavLink>
          <NavLink to="/userProfile" onClick={() => setIsOpen(false)} className={getMobileLinkClass}>Profile</NavLink>
          <NavLink to="/" onClick={handleLogout} className={getMobileLinkClass}>Logout</NavLink>
        </div>
      )}
    </nav>
  );
}
}

  return (
    <nav className="w-full mx-auto bg-[#FBF9F6]/90 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex items-center justify-between border-b border-stone-200/50 font-sans">
      {/* Logo Area */}
      <NavLink to="/" className="flex items-center gap-1.5 group">
        <span className="text-sm font-extrabold tracking-[0.2em] text-stone-800 uppercase">
          DESK STATI
        </span>
        <span className="inline-block text-rose-600 scale-75 transform transition-transform group-hover:rotate-45 duration-300">
          ◆
        </span>
        <span className="text-sm font-extrabold tracking-[0.2em] text-stone-800 uppercase">
          N
        </span>
      </NavLink>

      {/* Desktop Navigation Links with isActive */}
      <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest">
        <NavLink to="/" className={getLinkClass}>Home</NavLink>
        <NavLink to="/products" className={getLinkClass}>Products</NavLink>
        <NavLink to="/login" className={getLinkClass}>Login</NavLink>
        <NavLink to="/register" className={getLinkClass}>Register</NavLink>
      </div>

      {/* Right Side Actions (Cart & Mobile Menu) */}
      <div className="flex items-center gap-4">
        {/* Shopping Cart Icon Link */}

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1 text-stone-700 hover:text-stone-900 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Drawer with isActive */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FBF9F6] border-b border-stone-200 p-6 flex flex-col gap-4 md:hidden shadow-lg animate-fade-in-down z-50">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={getMobileLinkClass}>Home</NavLink>
          <NavLink to="/products" onClick={() => setIsOpen(false)} className={getMobileLinkClass}>Products</NavLink>
          <NavLink to="/login" onClick={() => setIsOpen(false)} className={getMobileLinkClass}>Login</NavLink>
          <NavLink to="/register" onClick={() => setIsOpen(false)} className={getMobileLinkClass}>Register</NavLink>
        </div>
      )}
    </nav>
  );
}

export default Header;
