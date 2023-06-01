import { TPhoneSpecifications } from "../../../types";

const PreviewPhone = ({ specs }: { specs?: TPhoneSpecifications }) => {
    return (
        specs ?
            <div className="flex flex-col gap-3 w-[189px] self-center">
                {(specs.color) &&
                    <div className="flex gap-3 break-words items-start group">
                        <img src="color.svg" alt="" />
                        <div className="relative">
                            <p className="text-[14px]">{specs.color.charAt(0).toUpperCase() + specs.color.slice(1)}</p>
                            <p className="absolute opacity-0 transition transform duration-700 ease-in-out group-hover:opacity-100 top-[-3px] right-[-50px] bg-mint rounded-[5px] text-black py-1 px-2 text-[12px]">Boja</p>
                        </div>
                    </div>
                }
                {(specs.ramSize) &&
                    <div className="flex gap-3 break-words items-start group">
                        <img src="ram.svg" alt="" />
                        <div className="relative">
                            <p className="text-[14px]">{specs.ramSize + " GB"}</p>
                            <p className="absolute opacity-0 transition transform duration-700 ease-in-out group-hover:opacity-100 top-[-3px] right-[-50px] bg-mint rounded-[5px] text-black py-1 px-2 text-[12px]">Ram</p>
                        </div>
                    </div>
                }
                {(specs.memorySize) &&
                    <div className="flex gap-3 break-words items-start group">
                        <img src="storage.svg" alt="" />
                        <div className="relative">
                            <p className="text-[14px]">{specs.memorySize + " GB"}</p>
                            <p className="absolute opacity-0 transition transform duration-700 ease-in-out group-hover:opacity-100 top-[-3px] right-[-80px] bg-mint rounded-[5px] text-black py-1 px-2 text-[12px]">Memorija</p>
                        </div>
                    </div>
                }
            </div>
            :
            null
    )
}

export default PreviewPhone;