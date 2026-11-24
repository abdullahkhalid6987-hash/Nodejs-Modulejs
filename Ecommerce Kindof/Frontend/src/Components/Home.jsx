function Home(){
    return(
        <div className="relative w-full max-w-5xl mx-auto min-h-125 bg-[#FBF9F6] p-4 sm:p-8 overflow-hidden font-sans flex flex-col lg:flex-row items-center justify-between gap-8 mt-16">
  
  <div className="w-full lg:w-2/5 z-10 flex flex-col items-center lg:items-start">
    <div className="text-center lg:text-left tracking-widest text-xs text-amber-800 font-semibold mb-2"> STATIONERY STORE </div>
    <h1 className="text-3xl md:text-4xl font-extrabold tracking-[0.2em] text-stone-800 text-center lg:text-left uppercase leading-tight mb-6">
      Y <span className="inline-block text-rose-600 scale-75 transform -translate-y-0.5">◆</span> U R <br/>
      D E S K<br/>
      S T A T I <span className="inline-block text-rose-600 scale-75 transform -translate-y-0.5">◆</span> N
    </h1>
    
    <p className="text-xs text-stone-600 leading-loose tracking-wide text-justify max-w-sm">
      Welcome to your ultimate creative station, where everyday tools inspire big ideas. From reliable notebooks to the desk essentials that spark joy, our collection is stationed for your success. Whether you're organizing your thoughts or stocking up on favorites, find your perfect desk companions and start creating your world on paper today.
    </p>
  </div>

  <div className="w-full overflow-hidden flex items-center justify-center shrink-0 max-w-120ect-square lg:w-120 lg:h-120">
    <div className="relative w-120 h-120 scale-[0.65] xs:scale-[0.8] sm:scale-100 transition-transform origin-center grid grid-cols-8 grid-rows-8 gap-2 p-4 shrink-0">
      
      <div className="col-start-1 col-span-1 row-start-2 row-span-1 flex items-center justify-center">
        <div className="w-8 h-8 bg-rose-500 rotate-45 rounded-sm shadow-sm"></div>
      </div>
      
      <div className="col-start-3 col-span-2 row-start-1 row-span-2 flex items-center justify-center">
        <div className="w-16 h-16 overflow-hidden rotate-45 rounded-md border-2 border-white shadow-md">
          <img 
            src="./Random.jpg" 
            alt="Profile Portrait" 
            className="w-[142%] h-[142%] max-w-none object-cover -rotate-45 translate-x-[-15%] translate-y-[-15%]"
          />
        </div>
      </div>

      <div className="col-start-2 col-span-4 row-start-3 row-span-4 flex items-center justify-center z-20">
        <div className="w-56 h-56 overflow-hidden rotate-45 rounded-xl border-4 border-white shadow-xl">
          <img 
            src="./Pens.jpg" 
            alt="Main Feature Photo" 
            className="w-[142%] h-[142%] max-w-none object-cover -rotate-45 translate-x-[-15%] translate-y-[-15%]"
          />
        </div>
      </div>

      <div className="col-start-5 col-span-3 row-start-1 row-span-3 flex items-center justify-center z-10">
        <div className="w-40 h-40 overflow-hidden rotate-45 rounded-lg border-2 border-white shadow-md">
          <img 
            src="./Pencils.jpg" 
            alt="Scenic Layout Photo" 
            className="w-[142%] h-[142%] max-w-none object-cover -rotate-45 translate-x-[-15%] translate-y-[-15%]"
          />
        </div>
      </div>

      <div className="col-start-4 col-span-2 row-start-6 row-span-2 flex items-center justify-center z-30">
        <div className="w-20 h-20 overflow-hidden rotate-45 rounded-md border-2 border-white shadow-lg">
          <img 
            src="./image2.jpg" 
            alt="Lower Portrait" 
            className="w-[142%] h-[142%] max-w-none object-cover -rotate-45 translate-x-[-15%] translate-y-[-15%]"
          />
        </div>
      </div>

      <div className="col-start-5 col-span-3 row-start-4 row-span-4 flex items-center justify-center z-10">
        <div className="w-36 h-36 bg-[#E06A4E] rotate-45 rounded-xl shadow-lg"></div>
      </div>

      <div className="col-start-8 col-span-1 row-start-5 row-span-1 flex items-center justify-center z-20">
        <div className="w-10 h-10 bg-orange-600 rotate-45 rounded-sm shadow-sm"></div>
      </div>

      <div className="absolute -right-16 -top-16 w-36 h-36 bg-[#B82626] rotate-45 z-0 pointer-events-none"></div>

    </div>
  </div>

</div>
    )
}

export default Home
