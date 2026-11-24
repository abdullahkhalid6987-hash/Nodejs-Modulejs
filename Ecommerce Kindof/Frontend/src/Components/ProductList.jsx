import { NavLink, useNavigate } from 'react-router-dom';
import { getProducts } from '../Services/Products';
import { useUser } from '../Context/userContext';
import { useEffect, useState } from 'react';
import { removeProduct } from '../Services/Admin';
import { addOrder } from '../Services/User';

function Products() {

  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [quantities, setQuantities] = useState({});

  const {user} = useUser()

  const handleDelete = async(productId) => {
    try{
      const response = await  removeProduct(productId)
      alert(response.message)
    }
    catch(error){
      console.log(error.message)
    }
  }

  const handleQuantityChange = (productId, value, maxStock) => {
  const quantity = Number(value);

  if (value === "") {
    setQuantities(prev => ({ ...prev, [productId]: "" }));
    return;
  }

  if (Number.isInteger(quantity) && quantity >= 1 && quantity <= maxStock) {
    setQuantities(prev => ({ ...prev, [productId]: quantity }));
  }
};


  const handleOrder = async (productId, quantity) => {
    if(!user){
      navigate("/login")
      return
    }

    try {
      const data = await addOrder(productId, quantity)
      alert(data.message)
    } catch (error) {
      alert(error.message)
    }

  }

  
  useEffect( () => {
    const productsList = async () => {
      const response = await getProducts()
      
      if(response.data){
        setProducts(response.data)
      }
      else{
        setProducts([])
      }
    }

    productsList()
  }, [products])


  return (
    <div className="w-full max-w-5xl mx-auto bg-[#FBF9F6] px-8 py-12 font-sans mt-16">
      
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-stone-200/60 pb-6 mb-10 gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-extrabold tracking-[0.15em] text-stone-800 uppercase mb-1">
            Studio Collections
          </h1>
          <p className="text-xs text-stone-500 tracking-wide">
            Carefully curated, premium workspace tools stationed for your ideas.
          </p>
        </div>
      </div>

      {(products.length > 0) ?  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">{products.map( product => 
        <div key={product._id} className="group relative flex flex-col justify-between bg-white/40 p-3 rounded-md border border-transparent hover:border-stone-200/50 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
          
          <div>
            <div className="relative aspect-square w-full bg-stone-100 overflow-hidden rounded-sm mb-4 border border-stone-200/30">

  {product.quantity > 0 && (
    <span className="absolute top-2.5 left-2.5 z-10 bg-stone-800 text-white text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-xs scale-90 origin-top-left">
      Best Seller
    </span>
  )}

  <img
    src={`http://localhost:3000/api/v1/${product.imagePath}`}
    alt={product.name}
    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
      product.quantity === 0 ? "grayscale" : ""
    }`}
  />

  {product.quantity === 0 && (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
      <span className="bg-black/80 text-white text-sm font-extrabold uppercase tracking-[0.2em] px-5 py-3 rounded-sm">
        Sold Out
      </span>
    </div>
  )}

</div>

            <div className="px-1 mb-3">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1 line-clamp-1 group-hover:text-rose-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-[11px] text-stone-500 leading-relaxed tracking-wide line-clamp-2">
                {product.description}
              </p>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-stone-100 border border-stone-200 px-3 py-2">
    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
      Stock Available
    </span>

    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
        (product.quantity ?? 0) > 10
          ? "bg-emerald-100 text-emerald-700"
          : (product.quantity ?? 0) > 0
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {product.quantity ?? 0}
    </span>
  </div>
          </div>

          
<div className="px-1 pt-3 border-t border-stone-100 mt-auto">
  <div className="flex items-center justify-between gap-2 mb-3">
    <span className="text-sm font-extrabold text-stone-800 tracking-wider">
      ${product.price}
    </span>

    {(user && user.userType === "admin") ? (
      <button
        className="text-[10px] font-bold uppercase tracking-widest text-stone-600 hover:text-rose-600 transition-colors py-1"
        onClick={() => handleDelete(product._id)}
      >
        Remove −
      </button>
    ) : (
      <div className="flex items-center gap-2">
        <label
          htmlFor={`quantity-${product._id}`}
          className="text-[10px] font-bold uppercase tracking-wider text-stone-500"
        >
          Qty
        </label>

        <input
          id={`quantity-${product._id}`}
          type="number"
          min="1"
          max={product.quantity}
          step="1"
          value={quantities[product._id] ?? 1}
          disabled={!product.quantity}
          onChange={(e) =>
            handleQuantityChange(
              product._id,
              e.target.value,
              product.quantity
            )
          }
          className="w-16 rounded-md border border-stone-200 bg-white px-2 py-1.5 text-sm text-stone-800 outline-none focus:border-rose-400 disabled:bg-stone-100"
        />
      </div>
    )}
  </div>

  {(!user || user.userType !== "admin") && (
    <button
      disabled={
        !product.quantity ||
        !Number.isInteger(Number(quantities[product._id] ?? 1)) ||
        Number(quantities[product._id] ?? 1) < 1 ||
        Number(quantities[product._id] ?? 1) > product.quantity
      }
      className="w-full rounded-md bg-stone-800 px-3 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-stone-300"
      onClick={() =>
        handleOrder(product._id, Number(quantities[product._id] ?? 1))
      }
    >
      {!product.quantity
        ? "Out of Stock"
        : `Add ${quantities[product._id] ?? 1} to Order +`}
    </button>
  )}
</div>


        </div>

      )}</div> : <div className='text-center text-md'>There are no products</div> }
     

    </div>
  );
}

export default Products;
