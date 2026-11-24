import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../Context/userContext';
import { loginUser } from '../Services/User';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("")
  const {setUser} = useUser()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData() 

    formData.append('email', email)
    formData.append('password', password)

    try{
      const response = await loginUser(formData)
      navigate("/")
      setUser(response.data)
    }
    catch(err){
      setError(err.message)
    }

  };

  return (
    <div className="w-full max-w-5xl mx-auto min-h-150 bg-[#FBF9F6] grid grid-cols-1 md:grid-cols-2 font-sans overflow-hidden">
      

      <div className="hidden md:flex relative bg-stone-100 flex-col items-center justify-center p-12 overflow-hidden border-r border-stone-200/50">

        <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-[#E06A4E]/20 rotate-45 pointer-events-none rounded-xl"></div>
        <div className="absolute right-4 top-8 w-16 h-16 bg-rose-500/10 rotate-45 pointer-events-none rounded-md"></div>
        
        <div className="z-10 flex flex-col items-center text-center max-w-sm">
          <div className="w-24 h-24 bg-[#E06A4E] rotate-45 rounded-xl shadow-md mb-12 flex items-center justify-center border-4 border-white">
            <span className="-rotate-45 text-white font-extrabold tracking-widest text-lg uppercase">DS</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-[0.2em] text-stone-800 uppercase mb-4">
            Welcome Back
          </h2>
          <p className="text-xs text-stone-500 leading-loose tracking-wide">
            Sign in to access your saved journals, trace your recent deliveries, and review your member-exclusive desktop drops.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-12 sm:px-16 lg:px-20 bg-[#FBF9F6]">
        <div className="w-full max-w-md mx-auto">
          
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-2xl font-extrabold tracking-[0.15em] text-stone-800 uppercase mb-2">
              Account Login
            </h1>
            <p className="text-xs text-stone-500 tracking-wide">
              New to our studio?{' '}
              <NavLink to="/register" className="text-rose-600 font-semibold hover:underline">
                Create an account
              </NavLink>
            </p>
          </div>

          { error ? <div className='text-rose-600 text-sm'>* {error}</div> : ""}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-stone-700 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-white/70 border border-stone-200 focus:border-stone-800 transition-colors rounded-sm px-4 py-2.5 text-xs text-stone-800 focus:outline-none placeholder-stone-300 font-medium tracking-wide"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-widest text-stone-700">
                  Password
                </label>
                <a href="#" className="text-[10px] text-stone-400 hover:text-stone-700 transition-colors tracking-wide">
                  Forgot?
                </a>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/70 border border-stone-200 focus:border-stone-800 transition-colors rounded-sm px-4 py-2.5 text-xs text-stone-800 focus:outline-none placeholder-stone-300 font-medium tracking-wide"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded-sm border-stone-300 text-stone-800 focus:ring-0 accent-stone-800 cursor-pointer"
                />
                <span className="text-[11px] font-medium text-stone-500 tracking-wide">Remember my session</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-stone-800 hover:bg-stone-900 active:bg-stone-950 text-white text-xs font-bold uppercase tracking-[0.2em] py-3.5 rounded-sm shadow-sm transition-colors mt-2"
            >
              Sign In
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}

export default Login;
