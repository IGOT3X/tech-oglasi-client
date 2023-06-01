import { useRef } from "react";
import { TFilter } from "../../../types";

const PhoneFilters = ({ setFilter, filter }: { setFilter: Function, filter?: TFilter }) => {

    const cityRef = useRef<HTMLSelectElement>(null);
    const priceMinRef = useRef<HTMLInputElement>(null);
    const priceMaxRef = useRef<HTMLInputElement>(null);
    const stateRef = useRef<HTMLSelectElement>(null);

    const phoneMakeRef = useRef<HTMLSelectElement>(null);
    const phoneRamSizeRef = useRef<HTMLInputElement>(null);
    const phoneMemorySizeRef = useRef<HTMLInputElement>(null);
    const phoneColorRef = useRef<HTMLInputElement>(null);


    const ApplyFilters = () => {
        const filters = {
            listingType: "phone",
            state: stateRef.current?.value,

            phoneRamSize:phoneRamSizeRef.current?.value,
            phoneMemorySize:phoneMemorySizeRef.current?.value,
            phoneColor:phoneColorRef.current?.value,
            phoneMake:phoneMakeRef.current?.value,



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
                <p>Proizvodjač telefona</p>
                <select value={filter?.phoneMake} onChange={() => ApplyFilters()} className='w-[208px] h-[28px] dark:bg-transparent bg-[rgb(12,40,50)] text-mint border border-mint rounded-[10px] appearance-none text-center text-[14px] [text-align-last:center]' ref={phoneMakeRef}>
                    <option value="apple">Apple</option>
                    <option value="alcatel">Alcatel</option>
                    <option value="samsung">Samsung</option>
                    <option value="nokia">Nokia</option>
                    <option value="motorola">Motorola</option>
                    <option value="sony">Sony</option>
                    <option value="huawei">Huawei</option>
                    <option value="lenovo">Lenovo</option>
                    <option value="htc">HTC</option>
                    <option value="zte">ZTE</option>
                    <option value="xiaomi">Xiaomi</option>
                </select>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Boja</p>
                <div className="w-[208px] 2xl:text-[20px] px-2 h-[28px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                    <input onBlur={() => ApplyFilters()} className="w-[208px] 2xl:text-[20px] h-[28px] bg-transparent focus:outline-none w-full rounded-[10px] text-center" type="text" ref={phoneColorRef} />
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Min. količina RAM-a</p>
                <div className="w-[208px] 2xl:text-[20px] px-2 h-[28px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                    <input onBlur={() => ApplyFilters()} className="2xl:text-[20px] h-[28px] bg-transparent focus:outline-none w-full rounded-[10px] text-center" type="number" ref={phoneRamSizeRef} />
                    <p className="opacity-25">GB</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center w-[208px]">
                <p>Min. količina memorije</p>
                <div className="w-[208px] 2xl:text-[20px] px-2 h-[28px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                    <input onBlur={() => ApplyFilters()} className="2xl:text-[20px] h-[28px] bg-transparent focus:outline-none w-full rounded-[10px] text-center" type="number" ref={phoneMemorySizeRef} />
                    <p className="opacity-25">GB</p>
                </div>
            </div>

        </div>
    )
}

export default PhoneFilters;