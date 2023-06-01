import { TSpecifications } from "../../../types";

const ComputerFields = ({specs}:{specs?:TSpecifications}) => {
    return (
        specs?
        <div className="flex flex-col gap-5 sm:w-[300px] w-[90%] mx-auto sm:mx-0 bg-listing-dark rounded-[10px] mt-5 sm:mt-0">
            <div className="flex flex-col gap-5 items-start px-[24px] justify-center text-center bg-ark py-5 w-full rounded-[10px] mt-5 sm:mt-0">
                {(specs.cpuModel || specs.cpuMake) ?
                    <div className="flex items-start text-left gap-3">
                        <img src="cpu.svg" alt="" />
                        <p>{specs.cpuMake?.charAt(0).toUpperCase() + specs?.cpuMake?.slice(1)} {specs.cpuModel} {specs.cpuSpeed && ' @ ' + specs.cpuSpeed + ' GHZ'}</p>
                    </div>
                    :
                    <div className="flex items-start text-left gap-3">
                        <img src="cpu.svg" alt="" />
                        <p>Procesor nije unet</p>
                    </div>
                }
                {specs.gpuModel ?
                    <div className="flex items-start text-left gap-3">
                        <img src="gpu.svg" alt="" />
                        <p>{specs.gpuMake?.charAt(0).toUpperCase() + specs?.gpuMake?.slice(1)} {specs.gpuModel} {specs.gpuSpeed && ' @ ' + specs.gpuSpeed + ' MHZ'}</p>
                    </div>
                    :
                    <div className="flex items-start text-left gap-3">
                        <img src="gpu.svg" alt="" />
                        <p>Grafička kartica nije unešena</p>
                    </div>
                }
                {(specs.ram && (specs.ram[0].ramModel || specs.ram[0].ramMake || specs.ram[0].ramAmount)) ?
                    <div className="flex flex-col items-start text-left gap-5">
                        {
                            specs.ram.map((ram, i) => (
                                <div className="flex items-start text-left gap-3">
                                    <img src="ram.svg" alt="" />
                                    <p>{ram.ramAmount && ram.ramAmount + 'GB'} {ram.ramMake && ram.ramMake} {ram.ramModel && ram.ramModel} {ram.ramSpeed && ' @ ' + ram.ramSpeed + ' MHZ'}</p>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div className="flex items-start text-left gap-3">
                        <img src="ram.svg" alt="" />
                        <p>Ram nije unet</p>
                    </div>
                }

                <div className="flex items-start text-left gap-3">
                    <img src="mb.svg" alt="" />
                    {(specs.mbModel || specs.mbMake) ?
                        <p>{specs.mbMake} {specs.mbModel}</p>
                        :
                        <p>Matična nije uneta</p>
                    }
                </div>

                <div className="flex items-start text-left gap-3">
                    <img src="psu.svg" alt="" />
                    {specs.psuModel || specs.psuMake || specs.psuPower ?
                        <p>{specs?.psuMake} {specs?.psuModel} {specs?.psuPower + " W"}</p>
                        :
                        <p>Napajanje nije uneto</p>
                    }
                </div>
                <div className="flex items-start text-left gap-3">

                    {(specs.memory && (specs.memory[0].memoryModel || specs.memory[0].memoryMake || specs.memory[0].memoryAmount)) ?
                        <div className="flex flex-col gap-5">
                            {specs.memory.map(memory => (
                                <div className="flex gap-3">
                                    <img src="storage.svg" alt="" />
                                    <p>{memory.memoryType?.toUpperCase()} {memory.memoryMake} {memory.memoryModel} {memory.memoryAmount && memory.memoryAmount + ' GB'} {memory.memorySpeed && ' @ ' + memory.memorySpeed + ' MB/s'}</p>
                                </div>
                            ))}
                        </div>

                        :
                        <div className="flex gap-3">
                            <img src="storage.svg" alt="" />
                            <p>Memorijski prostor nije unet</p>
                        </div>
                    }
                </div>
            </div>
        </div>
        :
        null
    )
}

export default ComputerFields;