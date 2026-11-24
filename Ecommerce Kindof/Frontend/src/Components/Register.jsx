import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { registerUser } from '../Services/User';

function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('confirmPassword', confirmPassword)
      try {
    const result = await registerUser(formData);
    alert("Registered successfully!");
    navigate("/login")
  } catch (err) {
    setError(err.message)
  }

  };

  return (
    <div className="w-full max-w-5xl mx-auto min-h-150 bg-[#FBF9F6] grid grid-cols-1 md:grid-cols-2 font-sans overflow-hidden">
      
      {/* Left Side: Editorial & Design Panel */}
      <div className="hidden md:flex relative bg-stone-100 flex-col items-center justify-center p-12 overflow-hidden border-r border-stone-200/50">
        {/* Subtle Decorative Diamonds matching the Studio layout */}
        <div className="absolute -right-12 -top-12 w-40 h-40 bg-[#B82626]/10 rotate-45 pointer-events-none rounded-xl"></div>
        <div className="absolute left-4 bottom-8 w-16 h-16 bg-rose-500/10 rotate-45 pointer-events-none rounded-md"></div>
        
        {/* Core Focal Cluster */}
        <div className="z-10 flex flex-col items-center text-center max-w-sm">
          <div className="w-24 h-24 bg-[#B82626] rotate-45 rounded-xl shadow-md mb-12 flex items-center justify-center border-4 border-white">
            <span className="-rotate-45 text-white font-extrabold tracking-widest text-lg uppercase">DS</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-[0.2em] text-stone-800 uppercase mb-4">
            Join The Studio
          </h2>
          <p className="text-xs text-stone-500 leading-loose tracking-wide">
            Create an account to build custom tool wishlists, unlock streamlined checkout setups, and join our creative member rewards space.
          </p>
        </div>
      </div>

      {/* Right Side: Interactive Registration Form Panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-16 lg:px-20 bg-[#FBF9F6]">
        <div className="w-full max-w-md mx-auto">
          
          {/* Header Block */}
          <div className="mb-6 text-center md:text-left">
            <h1 className="text-2xl font-extrabold tracking-[0.15em] text-stone-800 uppercase mb-2">
              Create Account
            </h1>
            <p className="text-xs text-stone-500 tracking-wide">
              Already have an account?{' '}
              <NavLink to="/login" className="text-rose-600 font-semibold hover:underline">
                Sign in instead
              </NavLink>
            </p>
          </div>

          { error ? <div className='text-rose-600 text-sm'>* {error}</div> : "" }

          {/* Form Action */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label htmlFor="username" className="block text-[10px] font-bold uppercase tracking-widest text-stone-700 mb-1">
                UserName:
              </label>
              <input
                id="Username"
                type="text"
                required
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-white/70 border border-stone-200 focus:border-stone-800 transition-colors rounded-sm px-4 py-2 text-xs text-stone-800 focus:outline-none placeholder-stone-300 font-medium tracking-wide"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-stone-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
           onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-white/70 border border-stone-200 focus:border-stone-800 transition-colors rounded-sm px-4 py-2 text-xs text-stone-800 focus:outline-none placeholder-stone-300 font-medium tracking-wide"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-widest text-stone-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
          onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/70 border border-stone-200 focus:border-stone-800 transition-colors rounded-sm px-4 py-2 text-xs text-stone-800 focus:outline-none placeholder-stone-300 font-medium tracking-wide"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-[10px] font-bold uppercase tracking-widest text-stone-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                 onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/70 border border-stone-200 focus:border-stone-800 transition-colors rounded-sm px-4 py-2 text-xs text-stone-800 focus:outline-none placeholder-stone-300 font-medium tracking-wide"
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-2 pt-1 select-none">
              <input
                id="acceptTerms"
                type="checkbox"
                required
                className="w-3.5 h-3.5 mt-0.5 rounded-sm border-stone-300 text-stone-800 focus:ring-0 accent-stone-800 cursor-pointer"
              />
              <label htmlFor="acceptTerms" className="text-[11px] font-medium text-stone-500 tracking-wide leading-tight cursor-pointer">
                I agree to the privacy statement and terms of service.
              </label>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              className="w-full bg-stone-800 hover:bg-stone-900 active:bg-stone-950 text-white text-xs font-bold uppercase tracking-[0.2em] py-3.5 rounded-sm shadow-sm transition-colors mt-2"
            >
              Create Account
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}

export default Register;
