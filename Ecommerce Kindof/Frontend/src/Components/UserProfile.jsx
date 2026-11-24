import { NavLink } from 'react-router-dom';
import { useUser } from '../Context/userContext';
import { useEffect, useState } from 'react';
import { ordersList } from '../Services/User';
import { removeOrder } from '../Services/User';

function UserProfile() {

  const {user, setUser} = useUser() 
  const [orders, setOrders] = useState([])

   const getOrders = async () => {
      try{
        const response = await ordersList()
        setOrders(response.data)
      }
      catch(error){
        console.log(error.message)
      }
    }

  const handleRemoveOrder = async (productId) => {

    try {
      const response = await removeOrder(productId)
      alert(response.message)
      getOrders()
      
    } catch (error) {
      alert(error)
    }

  }

  
  useEffect(() => {
    getOrders()
  }, [])
  
  if(!user){
    return 
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#FBF9F6] px-8 py-12 font-sans min-h-150 mt-16">
      
      {/* PROFILE HEADER PANEL */}
      <div className="bg-white border border-stone-200/60 p-6 rounded-md shadow-sm mb-10 flex flex-col sm:flex-row items-center gap-6">
        {/* Minimalist Graphic Initials Avatar (No Profile Picture) */}
        <div className="w-16 h-16 bg-stone-800 rotate-45 rounded-xl flex items-center justify-center shrink-0 border-4 border-stone-100 shadow-sm">
          <span className="-rotate-45 text-white font-extrabold tracking-widest text-sm uppercase">
            {user.username?.substring(0, 2)}
          </span>
        </div>
        
        {/* Core Profile Credentials */}
        <div className="text-center sm:text-left space-y-1">
          <h1 className="text-xl font-extrabold tracking-[0.15em] text-stone-800 uppercase">
            {user.username}
          </h1>
          <p className="text-xs text-stone-500 tracking-wide">
            {user.email}
          </p>
          <div className="inline-block text-[9px] uppercase font-bold tracking-widest text-amber-800 bg-amber-800/5 px-2 py-0.5 rounded-xs mt-1">
            {user.userType}
          </div>
        </div>
      </div>

      {/* LOWER PANEL: SELECTED / SAVED ITEMS SECTION */}
      <div>
        <div className="border-b border-stone-200/60 pb-3 mb-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-stone-800">
            Your Selected Studio Tools
          </h2>
        </div>

        {(orders.length > 0) ?  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">{
          orders.map( order =>
          <div key={order.product._id} className="group relative flex flex-col justify-between bg-white/40 p-3 rounded-md border border-transparent hover:border-stone-200/50 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
           {console.log(order)} 
            <div>
              <div className="relative aspect-square w-full bg-stone-100 overflow-hidden rounded-sm mb-4 border border-stone-200/30">
                <img 
                  src={`http://localhost:3000/api/v1/${order.product.imagePath}`} 
                  alt="Minimalist Linen Journal"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="px-1 mb-3">
                <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1 line-clamp-1 group-hover:text-rose-600 transition-colors">
                  {order.product.name}
                </h3>
                <p className="text-[11px] text-stone-500 leading-relaxed tracking-wide line-clamp-2">
                  {order.product.description}
                </p>
              </div>
            </div>

            <div className="px-1 pt-2 border-t border-stone-100 flex items-center justify-between gap-2 mt-auto">
              <span className="text-xs font-extrabold text-stone-800 tracking-wider">
                ${order.product.price}
              </span>
              
              <button 
                className="text-[10px] font-bold uppercase tracking-widest text-stone-600 hover:text-rose-600 transition-colors py-1 flex items-center gap-1 group/btn focus:outline-none" onClick = {() => {handleRemoveOrder(order.product._id)}}
              >
                <span>Remove from Cart</span>
                <span className="inline-block transition-transform group-hover/btn:translate-x-0.5">→</span>
              </button>
            </div>

          </div>

        )}</div> : <div className='text-center text-md'>There are no Items</div>}

       
      </div>

    </div>
  );
}

export default UserProfile;
