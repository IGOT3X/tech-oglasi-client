import { useRef } from "react";
import { TFilter } from "../../../types";

const LaptopFilters = ({ setFilter, filter }: { setFilter: Function, filter?: TFilter }) => {
    const processorMakeRef = useRef<HTMLSelectElement>(null);
    const graphicsMakeRef = useRef<HTMLSelectElement>(null);
    const storageTypeRef = useRef<HTMLSelectElement>(null);
    const ramMakeRef = useRef<HTMLInputElement>(null);
    const ramModelRef = useRef<HTMLInputElement>(null);
    const mbMakeRef = useRef<HTMLInputElement>(null);
    const mbModelRef = useRef<HTMLInputElement>(null);
    const psuMakeRef = useRef<HTMLInputElement>(null);
    const psuModelRef = useRef<HTMLInputElement>(null);
    const storageMakeRef = useRef<HTMLInputElement>(null);
    const storageModelRef = useRef<HTMLInputElement>(null);

    const minRamSizeRef = useRef<HTMLInputElement>(null);
    const minRamSpeedRef = useRef<HTMLInputElement>(null);
    const minProcessorSpeedRef = useRef<HTMLInputElement>(null);

    const minStorageSizeRef = useRef<HTMLInputElement>(null);

    const processorModelRef = useRef<HTMLInputElement>(null);
    const graphicsModelRef = useRef<HTMLInputElement>(null);

    const screenResolutionRef = useRef<HTMLInputElement>(null);
    const batterySizeRef = useRef<HTMLInputElement>(null);

    const cityRef = useRef<HTMLSelectElement>(null);
    const priceMinRef = useRef<HTMLInputElement>(null);
    const priceMaxRef = useRef<HTMLInputElement>(null);
    const stateRef = useRef<HTMLSelectElement>(null);


    const ApplyFilters = () => {
        const filters = {
            listingType: "laptop",
            state: stateRef.current?.value,
            cpuMake: processorMakeRef.current?.value,
            cpuModel: processorModelRef.current?.value.toLowerCase(),
            minCpuSpeed: minProcessorSpeedRef.current?.value,
            gpuMake: graphicsMakeRef.current?.value,
            gpuModel: graphicsModelRef.current?.value.toLowerCase(),
            memoryType: storageTypeRef.current?.value,
            minMemoryAmount: minStorageSizeRef.current?.value,
            minRamSize: minRamSizeRef.current?.value,
            minRamSpeed: minRamSpeedRef.current?.value,
            ramMake: ramMakeRef.current?.value.toLowerCase(),
            ramModel: ramModelRef.current?.value.toLowerCase(),
            mbMake: mbMakeRef.current?.value.toLowerCase(),
            mbModel: mbModelRef.current?.value.toLowerCase(),
            psuMake: psuMakeRef.current?.value.toLowerCase(),
            psuModel: psuModelRef.current?.value.toLowerCase(),
            memoryMake: storageMakeRef.current?.value.toLowerCase(),
            memoryModel: storageModelRef.current?.value.toLowerCase(),
            city: cityRef.current?.value,
            priceMin: priceMinRef.current?.value,
            priceMax: priceMaxRef.current?.value
        }
        setFilter(filters);
    }

    return (
        <div className="flex flex-wrap gap-5 justify-center">
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Cena min:</p>
                <div className="w-[208px] 2xl:text-[20px] px-2 h-[28px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                    <input onBlur={ApplyFilters} className="2xl:text-[20px] h-[28px] bg-transparent focus:outline-none w-full rounded-[10px] text-center" type="number" ref={priceMinRef} />
                    <p className="opacity-25">EUR</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Cena max:</p>
                <div className="w-[208px] 2xl:text-[20px] px-2 h-[28px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                    <input onBlur={ApplyFilters} className="2xl:text-[20px] h-[28px] bg-transparent focus:outline-none w-full rounded-[10px] text-center" type="number" ref={priceMaxRef} />
                    <p className="opacity-25">EUR</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center self-center w-[208px]">
                <p>Stanje</p>
                <select value={filter?.state} onChange={ApplyFilters} className='w-[208px] h-[28px] dark:bg-transparent bg-[rgb(12,40,50)] text-mint border border-mint rounded-[10px] appearance-none text-center text-[14px] [text-align-last:center]' ref={stateRef}>
                    <option value="all">
                        Sve
                    </option>
                    <option value="new">
                        Novo
                    </option>
                    <option value="used">
                        Polovno
                    </option>
                </select>
            </div>

            <div className="flex flex-col gap-3 items-center self-center w-[208px]">


                <p>Grad</p>
                <select value={filter?.city} onChange={ApplyFilters} className='w-[208px] h-[28px] dark:bg-transparent  bg-[rgb(12,40,50)] text-mint border border border-mint rounded-[10px] appearance-none text-center text-[14px] [text-align-last:center]' ref={cityRef}>
                    <option value="all">
                        Sve
                    </option>
                    <option value="kraljevo">
                        Kraljevo
                    </option>
                    <option value="beograd">
                        Beograd
                    </option>
                    <option value="bor">
                        Bor
                    </option>
                    <option value="valjevo">
                        Valjevo
                    </option>
                    <option value="vranje">
                        Vranje
                    </option>
                    <option value="vršac">
                        Vršac
                    </option>
                    <option value="zaječar">
                        Zaječar
                    </option>
                    <option value="zrenjanin">
                        Zrenjanin
                    </option>
                    <option value="jagodina">
                        Jagodina
                    </option>
                    <option value="kikinda">
                        Kikinda
                    </option>
                    <option value="kragujevac">
                        Kragujevac
                    </option>
                    <option value="kruševac">
                        Kruševac
                    </option>
                    <option value="leskovac">
                        Leskovac
                    </option>
                    <option value="loznica">
                        Loznica
                    </option>
                    <option value="niš">
                        Niš
                    </option>
                    <option value="novipazar">
                        Novi Pazar
                    </option>
                    <option value="novisad">
                        Novi Sad
                    </option>
                    <option value="pančevo">
                        Pančevo
                    </option>
                    <option value="pirot">
                        Pirot
                    </option>
                    <option value="požarevac">
                        Požarevac
                    </option>
                    <option value="priština">
                        Priština
                    </option>
                    <option value="projuplje">
                        Prokuplje
                    </option>
                    <option value="smederevo">
                        Smederevo
                    </option>
                    <option value="sombor">
                        Sombor
                    </option>
                    <option value="sremskamitrovica">
                        Sremska Mitrovica
                    </option>
                    <option value="subotica">
                        Subotica
                    </option>
                    <option value="užice">
                        Užice
                    </option>
                    <option value="čačak">
                        Čačak
                    </option>
                    <option value="šabac">
                        Šabac
                    </option>
                </select>

            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Proizvodjač procesora</p>
                <select value={filter?.cpuMake} onChange={() => ApplyFilters()} className='w-[208px] h-[28px] dark:bg-transparent bg-[rgb(12,40,50)] text-mint border border-mint rounded-[10px] appearance-none text-center text-[14px] [text-align-last:center]' ref={processorMakeRef}>
                    <option value="all">
                        Sve
                    </option>
                    <option value="intel">
                        Intel
                    </option>
                    <option value="amd">
                        AMD
                    </option>
                    <option value="apple">
                        Apple
                    </option>
                </select>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Model procesora</p>
                <div className="w-[208px] 2xl:text-[20px] px-2 h-[28px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                    <input onBlur={() => ApplyFilters()} className="w-[208px] 2xl:text-[20px] h-[28px] bg-transparent focus:outline-none w-full rounded-[10px] text-center" type="text" ref={processorModelRef} />
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Min. brzina procesora</p>
                <div className="w-[208px] 2xl:text-[20px] px-2 h-[28px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                    <input onBlur={() => ApplyFilters()} className="2xl:text-[20px] h-[28px] bg-transparent focus:outline-none w-full rounded-[10px] text-center" type="number" ref={minProcessorSpeedRef} />
                    <p className="opacity-25">GHZ</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Proizvodjač RAM-a</p>
                <div className="w-[208px] 2xl:text-[20px] px-2 h-[28px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                    <input onBlur={() => ApplyFilters()} className="w-[208px] 2xl:text-[20px] h-[28px] bg-transparent focus:outline-none w-full rounded-[10px] text-center" type="text" ref={ramMakeRef} />
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Model RAM-a</p>
                <div className="w-[208px] 2xl:text-[20px] px-2 h-[28px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                    <input onBlur={() => ApplyFilters()} className="w-[208px] 2xl:text-[20px] h-[28px] bg-transparent focus:outline-none w-full rounded-[10px] text-center" type="text" ref={ramModelRef} />
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Min. količina RAM-a</p>
                <div className="w-[208px] 2xl:text-[20px] px-2 h-[28px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                    <input onBlur={() => ApplyFilters()} className="2xl:text-[20px] h-[28px] bg-transparent focus:outline-none w-full rounded-[10px] text-center" type="number" ref={minRamSizeRef} />
                    <p className="opacity-25">GB</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Min. brzina RAM-a</p>
                <div className="w-[208px] 2xl:text-[20px] px-2 h-[28px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                    <input onBlur={() => ApplyFilters()} className="2xl:text-[20px] h-[28px] bg-transparent focus:outline-none w-full rounded-[10px] text-center" type="number" ref={minRamSpeedRef} />
                    <p className="opacity-25">MHZ</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Proizvodjač grafičke</p>
                <select value={filter?.gpuMake} onChange={() => ApplyFilters()} className='w-[208px] h-[28px] dark:bg-transparent bg-[rgb(12,40,50)] text-mint border border border-mint rounded-[10px] appearance-none text-center text-[14px] [text-align-last:center]' ref={graphicsMakeRef}>
                    <option value="all">
                        Sve
                    </option>
                    <option value="intel">
                        Intel
                    </option>
                    <option value="nvidia">
                        Nvidia
                    </option>
                    <option value="amd">
                        AMD
                    </option>
                    <option value="apple">
                        Apple
                    </option>
                </select>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Model grafičke</p>
                <div className="w-[208px] 2xl:text-[20px] px-2 h-[28px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                    <input onBlur={() => ApplyFilters()} className="w-[208px] 2xl:text-[20px] h-[28px] bg-transparent focus:outline-none w-full rounded-[10px] text-center" type="text" ref={graphicsModelRef} />
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Tip memorije</p>
                <select value={filter?.memoryType} onChange={() => ApplyFilters()} className='w-[208px] h-[28px] dark:bg-transparent bg-[rgb(12,40,50)] text-mint border border border-mint rounded-[10px] appearance-none text-center text-[14px] [text-align-last:center]' ref={storageTypeRef}>
                    <option value="all">
                        Sve
                    </option>
                    <option value="m.2">
                        M.2
                    </option>
                    <option value="ssd">
                        SSD
                    </option>
                    <option value="hdd">
                        HDD
                    </option>
                </select>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Min. količina memorije</p>
                <div className="w-[208px] 2xl:text-[20px] px-2 h-[28px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                    <input onBlur={() => ApplyFilters()} className="2xl:text-[20px] h-[28px] bg-transparent focus:outline-none w-full rounded-[10px] text-center" type="number" ref={minStorageSizeRef} />
                    <p className="opacity-25">GB</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Proizvodjač memorije</p>
                <div className="w-[208px] 2xl:text-[20px] px-2 h-[28px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                    <input onBlur={() => ApplyFilters()} className="w-[208px] 2xl:text-[20px] h-[28px] bg-transparent focus:outline-none w-full rounded-[10px] text-center" type="text" ref={storageMakeRef} />
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Model memorije</p>
                <div className="w-[208px] 2xl:text-[20px] px-2 h-[28px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                    <input onBlur={() => ApplyFilters()} className="w-[208px] 2xl:text-[20px] h-[28px] bg-transparent focus:outline-none w-full rounded-[10px] text-center" type="text" ref={storageModelRef} />
                </div>
            </div>
        </div>
    )
}

export default LaptopFilters;