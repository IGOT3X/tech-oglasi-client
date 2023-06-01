import { TSpecifications } from "../../../types"

const PreviewComputer = ({specs}:{specs?:TSpecifications}) =>{
    return(
        specs?
        <div className="flex flex-col gap-3 w-[189px] self-center">
                    {(specs.cpuModel || specs.cpuModel) &&
                        <div className="flex gap-3 break-words items-start group">
                            <img src="cpu.svg" alt="" />
                            <div className="relative">
                                <p className="text-[14px]">{specs.cpuMake && specs.cpuMake?.charAt(0).toUpperCase() + (specs.cpuMake && specs.cpuMake?.slice(1))} {specs.cpuModel && specs.cpuModel}</p>
                                <p className="absolute opacity-0 transition transform duration-700 ease-in-out group-hover:opacity-100 top-[-3px] right-[-80px] bg-mint rounded-[5px] text-black py-1 px-2 text-[12px]">Procesor</p>
                            </div>
                        </div>
                    }
                    {(specs.gpuModel || specs.gpuMake) &&
                        <div className="flex gap-3 break-words items-start group">
                            <img src="gpu.svg" alt="" />
                            <div className="relative">
                                <p className="text-[14px]">{specs.gpuMake && specs.gpuMake?.charAt(0).toUpperCase() + (specs.gpuMake && specs.gpuMake?.slice(1))} {specs.gpuModel && specs.gpuModel}</p>
                                <p className="absolute opacity-0 transition transform duration-700 ease-in-out group-hover:opacity-100 top-[-3px] right-[-80px] bg-mint rounded-[5px] text-black py-1 px-2 text-[12px]">Grafička</p>
                            </div>
                        </div>
                    }
                    {(specs.ram && specs.ram[0]) &&
                        <div className="flex gap-3 break-words items-start group">
                            <img src="ram.svg" alt="" />
                            <div className="relative">
                                <p className="text-[14px]">{specs.ram[0].ramMake && (specs.ram[0].ramMake?.charAt(0).toUpperCase() + specs.ram[0].ramMake?.slice(1))} {specs.ram[0].ramAmount && specs.ram[0].ramAmount + "GB"} {specs.ram[0].ramModel} {specs.ram[0].ramSpeed && " @ " + specs.ram[0].ramSpeed + " MHZ"} {(specs && specs.ram && specs?.ram?.length > 1) && <div className="flex"><img className="w-[12px]" src="plus.svg" alt="" /><img className="w-[12px]" src="plus.svg" alt="" /></div>}</p>
                                <p className="absolute opacity-0 transition transform duration-700 ease-in-out group-hover:opacity-100 top-[-3px] right-[-40px] bg-mint rounded-[5px] text-black py-1 px-2 text-[12px]">Ram</p>
                            </div>
                        </div>
                    }
                </div>
                :
                null
    )
}

export default PreviewComputer;