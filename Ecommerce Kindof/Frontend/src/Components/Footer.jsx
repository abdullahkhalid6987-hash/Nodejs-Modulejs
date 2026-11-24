import { NavLink } from 'react-router-dom';

function Footer() {
  // Reusable styling for structural footer navigation links
  const linkClass = "text-stone-500 hover:text-stone-900 transition-colors text-xs tracking-wider block py-1";

  return (
    <footer className="w-full mx-auto bg-[#FBF9F6] border-t border-stone-200/60 font-sans px-8 pt-12 pb-6 mt-16">
      
      {/* Upper Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Column */}
        <div className="md:col-span-1 flex flex-col items-start gap-3">
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
          <p className="text-stone-500 text-xs leading-relaxed max-w-xs">
            Premium desk essentials and creative tools thoughtfully stationed to transform your everyday workspace.
          </p>
        </div>

        {/* Shop Navigation Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-stone-800 mb-3">Shop</h4>
          <ul className="space-y-1">
            <li><NavLink to="/products" className={linkClass}>All Collections</NavLink></li>
            <li><NavLink to="/products?category=notebooks" className={linkClass}>Notebooks & Journals</NavLink></li>
            <li><NavLink to="/products?category=pens" className={linkClass}>Fine Writing & Ink</NavLink></li>
            <li><NavLink to="/products?category=desk" className={linkClass}>Desk Organization</NavLink></li>
          </ul>
        </div>

        {/* Brand Information & Help */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-stone-800 mb-3">Assistance</h4>
          <ul className="space-y-1">
            <li><NavLink to="/shipping" className={linkClass}>Shipping & Delivery</NavLink></li>
            <li><NavLink to="/returns" className={linkClass}>Returns & Exchanges</NavLink></li>
            <li><NavLink to="/contact" className={linkClass}>Contact Studio</NavLink></li>
            <li><NavLink to="/faq" className={linkClass}>Common Questions</NavLink></li>
          </ul>
        </div>

        {/* Newsletter Subscription Box */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-stone-800 mb-3">The Journal</h4>
          <p className="text-stone-500 text-xs mb-3 leading-relaxed">
            Subscribe to receive studio updates, secret drops, and 10% off your next checkout.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-xs border-b border-stone-400 focus-within:border-stone-800 transition-colors py-1">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent text-xs text-stone-800 w-full focus:outline-none placeholder-stone-400 font-medium tracking-wide"
              required
            />
            <button 
              type="submit" 
              className="text-stone-700 hover:text-rose-600 transition-colors px-1"
              aria-label="Subscribe"
            >
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </form>
        </div>

      </div>

      {/* Lower Copyright & Legal Area */}
      <div className="border-t border-stone-200/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[10px] text-stone-400 tracking-wider">
          &copy; {new Date().getFullYear()} DESK STATION. All rights reserved.
        </div>
        
        {/* Subtle Social Media Anchors */}
        <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-stone-700 transition-colors">Instagram</a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-stone-700 transition-colors">Pinterest</a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-stone-700 transition-colors">TikTok</a>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
