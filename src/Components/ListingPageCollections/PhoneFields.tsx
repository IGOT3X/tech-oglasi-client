const PhoneFields = ({specs}:{specs?:any})=>{
    return (
        specs?
        <div className="flex flex-col gap-5 sm:w-[200px] w-[90%] mx-auto sm:mx-0 bg-listing-dark rounded-[10px] h-[180px] mt-5 sm:mt-0">
            <div className="flex flex-col gap-5 items-start px-[24px] justify-center text-center bg-ark py-5 w-full rounded-[10px] mt-5 sm:mt-0">
             {(specs.color) &&
                    <div className="flex gap-3 break-words items-start group">
                        <img src="color.svg" alt="" />
                        <div className="relative">
                            <p className="">{specs.color.charAt(0).toUpperCase() + specs.color.slice(1)}</p>
                            <p className="absolute opacity-0 transition transform duration-700 ease-in-out group-hover:opacity-100 top-[-3px] right-[-50px] bg-mint rounded-[5px] text-black py-1 px-2 text-[12px]">Boja</p>
                        </div>
                    </div>
                }
                {(specs.ramSize) &&
                    <div className="flex gap-3 break-words items-start group">
                        <img src="ram.svg" alt="" />
                        <div className="relative">
                            <p className="">{specs.ramSize + " GB"}</p>
                            <p className="absolute opacity-0 transition transform duration-700 ease-in-out group-hover:opacity-100 top-[-3px] right-[-50px] bg-mint rounded-[5px] text-black py-1 px-2 text-[12px]">Ram</p>
                        </div>
                    </div>
                }
                {(specs.memorySize) &&
                    <div className="flex gap-3 break-words items-start group">
                        <img src="storage.svg" alt="" />
                        <div className="relative">
                            <p className="">{specs.memorySize + " GB"}</p>
                            <p className="absolute opacity-0 transition transform duration-700 ease-in-out group-hover:opacity-100 top-[-3px] right-[-80px] bg-mint rounded-[5px] text-black py-1 px-2 text-[12px]">Memorija</p>
                        </div>
                    </div>
                }
                </div>
        </div>
        :
        null
    )
}

export default PhoneFields;