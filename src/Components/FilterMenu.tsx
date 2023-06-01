import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

import 'animate.css';
import { TFilter } from '../../types';
import { SendPost } from '../../Hooks/useFetch';
import Cookies from 'js-cookie';
import ComputerFilters from './FilterCollections/ComputerFilters';
import LaptopFilters from './FilterCollections/LaptopFilters';
import PhoneFilters from './FilterCollections/PhoneFilters';

const FilterMenu = forwardRef(({ setFilters, currentFilters }: { setFilters: Function, currentFilters: TFilter }, ref) => {

    const [visible, setVisible] = useState(false);

    const [listingType, setLisitingType] = useState("all");
    const listingTypeRef = useRef<HTMLSelectElement>(null);

    const [filter, setFilter] = useState<TFilter>();
    const [displayOk, setDisplayOk] = useState(false);


    useImperativeHandle(ref, () => ({
        ToggleMenu() {
            setVisible(!visible);
        }
    }), [visible]);


    const HandleCreateFilterAlert = () => {
        if (!filter) return alert("Morate da unesete barem neki filter...");
        SendPost("create-filter-alert", { seshID: Cookies.get("seshID"), filters: JSON.stringify(filter) }).then(data => {
            if (data.status != 200 && !data.reason) return alert("Problem sa dodavanjem filtera...");
            if (data.reason == "already-exists") return alert("Već ste dodali taj filter na praćenje...")
            setDisplayOk(true);

            setTimeout(() => {
                setDisplayOk(false);
            }, 1000);

        });
    }

    useEffect(()=>{
        setFilter(prevValue=>{
            return {
                ...prevValue,
                listingType:listingTypeRef.current?.value
            }
        })
        setFilters(filter);
    },[listingType]);

    useEffect(()=>{
        setFilters(filter);
    },[filter])

    useEffect(() => {
        setFilter(currentFilters);
    }, []);

    return (visible &&
        <div className="flex flex-col items-center justify-center text-mint animate__animated animate__fadeIn p-5 border border-mint rounded-[10px] sm:w-[1100px] w-[309px] self-center mb-10 text shadow-2xl">
            <div className={`flex items-center ${Cookies.get("username") ? "justify-between" : "justify-center"} w-full`}>
                <h1 className='text-[24px] font-semibold text-center'>Filteri</h1>
                {Cookies.get("username") && <button onClick={HandleCreateFilterAlert} className='group relative flex gap-3 items-center border border-mint rounded-[10px] h-[31px] p-2 hover:bg-listing-light transition transform duration-700 ease-in-out hover'>
                    <p>Prati filtere</p>
                    <img src={displayOk ? "check.svg" : "bell.svg"} alt="" />
                    <div className="absolute opacity-0 flex group-hover:opacity-100  gap-2 top-[100px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-mint text-black rounded-[10px] p-2 w-[230px] transition transform duration-700 ease-in-out hover">
                        <img className='self-start' src="alert-octagon-black.svg" alt="" />
                        <p className='text-left'>Kada se novi oglas sa ovim specifikacijama postavi, bićete obavešteni</p>
                    </div>
                </button>
                }
            </div>

            <div className="flex justify-center items-center gap-5 w-full">
                <div className="flex gap-5">
                    {/*  <button onClick={ApplyFilters} className='flex gap-3 items-center border border-mint rounded-[10px] h-[31px] p-2 hover:bg-listing-light'>
                        <p>Primeni filtere</p>
                    </button> */}

                </div>
            </div>
            <div className="flex flex-col gap-3 items-center self-center mt-10 mb-20">
                <div className="flex flex-wrap gap-5 justify-center items-center self-center">
                    <div className="flex flex-col gap-3 items-center w-[208px]">
                        <p>Tip oglasa</p>
                        <select value={listingType} onChange={(e) => { setLisitingType(e.target.value); }} className='w-[208px] h-[28px] dark:bg-transparent  bg-[rgb(12,40,50)] text-mint border border-mint rounded-[10px] appearance-none text-center text-[14px] [text-align-last:center]' ref={listingTypeRef}>
                            <option value="all">
                                Sve
                            </option>
                            <option value="computer">
                                Kompjuter
                            </option>
                            <option value="laptop">
                                Laptop
                            </option>
                            <option value="phone">
                                Telefon
                            </option>
                            <option value="phone-parts">
                                Deo za telefon
                            </option>
                            <option value="component">
                                Komponenta
                            </option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-3 items-center w-[208px]">
                </div>
                {(listingType == "computer") && <ComputerFilters setFilter={setFilter} filter={filter} />}
                {(listingType == "laptop") && <LaptopFilters setFilter={setFilter} filter={filter} />}
                {(listingType == "phone") && <PhoneFilters setFilter={setFilter} filter={filter} />}

                {listingType == "phone" && <div className="flex flex-wrap gap-5 justify-center">

                </div>
                }
            </div>
        </div>
    )
});

export default FilterMenu;