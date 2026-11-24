import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ordersList } from '../Services/User';
import { removeOrder } from '../Services/User';

function Cart() {

  const [orders, setOrders] = useState([])
  const [total, setTotal] = useState("")

  useEffect(()=>{

  })

const getOrders = async () => {
      try{
        const response = await ordersList()
        setOrders(response.data)
        const summedPrices = response.data.reduce((sum, item) => {
  return (sum + item.product.price * item.quantity);
}, 0)
        setTotal(summedPrices.toFixed(2))
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

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#FBF9F6] px-8 py-12 font-sans min-h-150 mt-16">
      
      {/* Structural Context Header */}
      <div className="border-b border-stone-200/60 pb-6 mb-10">
        <h1 className="text-2xl font-extrabold tracking-[0.15em] text-stone-800 uppercase mb-1">
          Your Creative Basket
        </h1>
        <p className="text-xs text-stone-500 tracking-wide">
          Review your selected studio tools before checking out.
        </p>
      </div>

      {/* TWO-COLUMN CART INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Side: Auto-Scaling Grid List of Basket Items */}
        <div className="lg:col-span-2 grid grid-cols-1 gap-4">
          
          {/* SINGLE STATIC CART ITEM COMPONENT */}
          { ( orders.length > 0) ? orders.map( order => <div className="flex gap-4 bg-white/50 border border-stone-200/40 p-4 rounded-md shadow-sm items-center justify-between">
            {/* Left: Thumbnail & Core Details */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-stone-100 border border-stone-200/40 rounded-sm overflow-hidden shrink-0">
                <img 
                  src={`http://localhost:3000/api/v1/${order.product.imagePath}`} 
                  alt="Minimalist Linen Journal" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1 line-clamp-1">
                  {order.product.name}
                </h3>
                <p className="text-[11px] text-stone-400 tracking-wide mb-2">
                  Unit Price: {order.product.price}
                </p>
                
                {/* Quantity Control Buttons */}
                <div className="flex items-center border border-stone-200 rounded-sm w-fit bg-white">
                  <button className="px-2.5 py-1 text-xs text-stone-500 hover:text-stone-900 transition-colors font-medium">
                    −
                  </button>
                  <span className="px-2 text-xs font-bold text-stone-800 min-w-6 text-center select-none">
                    {order.quantity}
                  </span>
                  <button className="px-2.5 py-1 text-xs text-stone-500 hover:text-stone-900 transition-colors font-medium">
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Price Total & Delete Command */}
            <div className="text-right flex flex-col justify-between items-end h-20 py-1 shrink-0">
              <span className="text-xs font-extrabold text-stone-800 tracking-wider">
                ${(order.product.price * order.quantity).toFixed(2)}
              </span>
              
              <button 
                className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-rose-600 transition-colors focus:outline-none"
                aria-label="Remove item" onClick ={() => handleRemoveOrder(order.product._id)}
              >
                Remove
              </button>
            </div>

          </div>) : <div className='text-center text-md'>There are no items</div>}
          {/* END OF SINGLE CART ITEM COMPONENT */}

        </div>

        {/* Right Side: Sticky Checkout Order Summary Panel */}
        <div className="lg:col-span-1 bg-white border border-stone-200/60 p-6 rounded-md shadow-sm space-y-4 lg:sticky lg:top-24">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-stone-800 pb-3 border-b border-stone-100">
            Order Summary
          </h2>
          
          <div className="space-y-2.5 pt-1 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-800">${total}</span>
            </div>
            <div className="flex justify-between">
              <span>Studio Shipping</span>
              <span className="text-stone-400 italic">Calculated next</span>
            </div>
            <div className="border-t border-stone-100 pt-3 flex justify-between text-stone-800 font-extrabold tracking-wider">
              <span className="uppercase text-[11px]">Estimated Total</span>
              <span>${total}</span>
            </div>
          </div>

          <button className="w-full bg-stone-800 hover:bg-stone-900 active:bg-stone-950 text-white text-xs font-bold uppercase tracking-[0.2em] py-3.5 rounded-sm shadow-sm transition-colors pt-4">
            Proceed To Checkout
          </button>
          
          <div className="text-center">
            <NavLink to="/products" className="text-[10px] uppercase font-bold tracking-widest text-stone-400 hover:text-stone-700 transition-colors underline">
              Continue Shopping
            </NavLink>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Cart;
