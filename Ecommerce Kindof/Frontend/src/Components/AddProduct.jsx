import { useState } from 'react';
import { addProduct } from '../Services/Admin';
import { useNavigate } from 'react-router-dom';

function AddProduct() {

  const navigate = useNavigate()
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    imageFile: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Handle text input field mutations
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData((prev) => ({
        ...prev,
        imageFile: file
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('image', productData.imageFile);
    formData.append('quantity', productData.quantity);
    try {
      const data = await addProduct(formData)
      navigate('/products')

    } catch (error) {
      alert(error.message)
    }
    
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#FBF9F6] px-8 py-12 font-sans min-h-150">
      
      {/* Structural Context Header */}
      <div className="border-b border-stone-200/60 pb-6 mb-10">
        <h1 className="text-2xl font-extrabold tracking-[0.15em] text-stone-800 uppercase mb-1">
          Add New Product
        </h1>
        <p className="text-xs text-stone-500 tracking-wide">
          Upload and introduce premium workspace items directly into your active studio registry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    
        <form 
          onSubmit={handleSubmit} 
          encType="multipart/form-data" 
          className="md:col-span-2 space-y-5"
        >
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-widest text-stone-700 mb-1.5">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={productData.name}
              onChange={handleInputChange}
              placeholder="e.g., Solid Brass Draft Ruler"
              className="w-full bg-white border border-stone-200 focus:border-stone-800 transition-colors rounded-sm px-4 py-2.5 text-xs text-stone-800 focus:outline-none placeholder-stone-300 font-medium tracking-wide"
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-[10px] font-bold uppercase tracking-widest text-stone-700 mb-1.5">
              Product Description
            </label>
            <textarea
              id="description"
              required
              rows="4"
              value={productData.description}
              onChange={handleInputChange}
              placeholder="Provide item material metrics, paper weights, dimension specifications, and curated design details..."
              className="w-full bg-white border border-stone-200 focus:border-stone-800 transition-colors rounded-sm px-4 py-2.5 text-xs text-stone-800 focus:outline-none placeholder-stone-300 font-medium tracking-wide resize-none leading-relaxed"
            />
          </div>

          {/* Price Field */}
          <div>
            <label htmlFor="price" className="block text-[10px] font-bold uppercase tracking-widest text-stone-700 mb-1.5">
              Retail Price (\$)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              required
              value={productData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              className="w-full bg-white border border-stone-200 focus:border-stone-800 transition-colors rounded-sm px-4 py-2.5 text-xs text-stone-800 focus:outline-none placeholder-stone-300 font-medium tracking-wide"
            />
          </div>

          {/*Quantity Field */}
          <div>
            <label htmlFor="price" className="block text-[10px] font-bold uppercase tracking-widest text-stone-700 mb-1.5">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              step="1"
              min="0"
              required
              value={productData.quantity}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full bg-white border border-stone-200 focus:border-stone-800 transition-colors rounded-sm px-4 py-2.5 text-xs text-stone-800 focus:outline-none placeholder-stone-300 font-medium tracking-wide"
            />
          </div>

          {/* File Binary Attachment Input */}
          <div>
            <label htmlFor="imageFile" className="block text-[10px] font-bold uppercase tracking-widest text-stone-700 mb-1.5">
              Upload Media Resource
            </label>
            <input
              id="imageFile"
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="w-full bg-white border border-stone-200 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-stone-800 file:text-white hover:file:bg-stone-900 transition-colors text-xs text-stone-500 py-1.5 focus:outline-none cursor-pointer"
            />
          </div>

          {/* Core Action Submit Button */}
          <button
            type="submit"
            className="w-full bg-stone-800 hover:bg-stone-900 active:bg-stone-950 text-white text-xs font-bold uppercase tracking-[0.2em] py-3.5 rounded-sm shadow-sm transition-colors pt-4"
          >
            Publish To Store
          </button>
        </form>

        {/* Right Column: Dynamic Live Canvas Preview Card */}
        <div className="md:col-span-1 flex flex-col items-center md:items-start">
          <div className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">
            Real-Time Preview Canvas
          </div>
          
          {/* Replicates your single product card structure dynamically */}
          <div className="w-full max-w-60 bg-white border border-stone-200/60 p-3 rounded-md shadow-sm">
            <div className="relative aspect-square w-full bg-stone-50 overflow-hidden rounded-sm mb-4 border border-stone-200/30 flex items-center justify-center">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Live Preview Frame"
                  className="w-full h-full object-cover animate-fade-in"
                />
              ) : (
                <span className="text-[10px] text-stone-300 uppercase tracking-widest font-semibold px-4 text-center">
                  Image Canvas
                </span>
              )}
            </div>

         <div className="px-1 mb-3">
  <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1 truncate min-h-4">
    {productData.name || "Untitled Tool"}
  </h3>

  <p className="text-[11px] text-stone-500 leading-normal tracking-wide line-clamp-2 min-h-8 mb-3">
    {productData.description || "No layout description details provided yet."}
  </p>

  <div className="flex items-center justify-between rounded-lg bg-stone-100 border border-stone-200 px-3 py-2">
    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
      Stock Available
    </span>

    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
        (productData.quantity ?? 0) > 10
          ? "bg-emerald-100 text-emerald-700"
          : (productData.quantity ?? 0) > 0
          ? "bg-amber-100 text-amber-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {productData.quantity ?? 0}
    </span>
  </div>
</div>

            <div className="px-1 pt-2 border-t border-stone-100 flex items-center justify-between gap-2 mt-auto">
              <span className="text-xs font-extrabold text-stone-800 tracking-wider">
                \${productData.price ? parseFloat(productData.price).toFixed(2) : "0.00"}
              </span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-stone-400">Preview</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AddProduct;
