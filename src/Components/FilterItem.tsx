import Cookies from "js-cookie";
import { SendPost } from "../../Hooks/useFetch";
import { TFilter } from "../../types";

const FilterItem = ({ filter, refreshFilters }: { filter: TFilter, refreshFilters: Function }) => {
    const DeleteFilter = () => {
        SendPost("delete-filter", { filter: filter, seshID: Cookies.get("seshID") }).then(data => {
            if (data.status != 200) return alert("Problem sa brisanjem filtera");

            refreshFilters();
        });
    }
    return (
        <div className="flex flex-col gap-5 sm:w-[300px]">
            <div className="flex flex-col gap-5 items-start px-5 justify-center text-center bg-listing-dark py-5 w-full rounded-[10px] mt-5 sm:mt-0">
                <div className="flex gap-5 justify-between w-full">
                    <p className="font-semibold">Specifikacije filtera</p>
                    <button onClick={DeleteFilter} className=""><img className="transition transform border border-mint border-opacity-0 duration-700 ease-in-out hover:scale-125 hover:border-opacity-100 rounded-full" src="exit.svg" alt="" /></button>
                </div>
                {
                    (filter.city && filter.city != "all") &&
                    <div className="flex items-start text-left gap-3">
                        <img src="globe.svg" alt="" />
                        <p>{filter.city.charAt(0).toUpperCase() + filter.city.slice(1)}</p>
                    </div>
                }
                {
                    filter.priceMin &&
                    <div className="flex items-center text-left gap-3 pl-[1px]">
                        <p className="text-[24px]">€</p>
                        <p>Min: {filter.priceMin}</p>
                    </div>
                }
                {
                    filter.priceMax &&
                    <div className="flex items-center text-left gap-3 pl-[1px]">
                        <p className="text-[24px]">€</p>
                        <p>Max: {filter.priceMax}</p>
                    </div>
                }
                {
                    (filter.listingType && filter.listingType != 'all') &&
                    <div className="flex items-center text-left gap-3">
                        <img src="package.svg" alt="" />
                        <p>{filter.listingType == "computer" ? "Kompjuter" : filter.listingType == "laptop" ? "Laptop" : filter.listingType == "phone" ? "Telefon" : filter.listingType=="digital-zone"? "Digitalni produkt": "Komponenta"}</p>
                    </div>
                }
                {
                    (filter.state && filter.state != "all") &&
                    <div className="flex items-center text-left gap-3">
                        <img src="package.svg" alt="" />
                        <p>{filter.state == "new" ? "Novo" : filter.listingType == "used" ? "Polovno" : "Preprodaja"}</p>
                    </div>
                }


                {(filter?.cpuModel || filter?.cpuMake || filter.minCpuSpeed) &&
                    <div className="flex items-start text-left gap-3">
                        <img src="cpu.svg" alt="" />
                        <p>{filter.cpuMake == "all" ? "Sve " : (filter?.cpuMake?.charAt(0).toUpperCase() + filter?.cpuMake?.slice(1))} {filter?.cpuModel} {filter?.minCpuSpeed && ' @ ' + filter?.minCpuSpeed + ' GHZ'}</p>
                    </div>
                }
                {(filter?.gpuModel || filter.gpuMake || filter.gpuRam) &&
                    <div className="flex items-start text-left gap-3">
                        <img src="gpu.svg" alt="" />
                        <p>{filter.gpuMake == "all" ? "Sve" : (filter?.gpuMake?.charAt(0).toUpperCase() + filter?.gpuMake?.slice(1))} {filter?.gpuModel}</p>
                    </div>
                }
                {(filter?.ramModel || filter?.ramMake || filter?.minRamAmount || filter.minRamSpeed) &&
                    <div className="flex items-start text-left gap-3">
                        <img src="ram.svg" alt="" />
                        <p>{filter.minRamSize && (filter.minRamSize + 'GB')} {filter?.ramMake} {filter?.ramModel} {filter?.minRamSpeed && ' @ ' + filter?.minRamSpeed + ' MHZ'}</p>
                    </div>
                }

                {
                    (filter?.mbModel || filter?.mbMake) &&
                    <div className="flex items-start text-left gap-3">
                        <img src="mb.svg" alt="" />
                        <p>{filter.mbMake} {filter?.mbModel}</p>
                    </div>
                }
                {filter?.psuModel &&
                    <div className="flex items-start text-left gap-3">
                        <img src="psu.svg" alt="" />
                        <p>{filter.psuModel}</p>
                    </div>
                }
                {(filter?.memoryModel || filter?.memoryMake) &&

                    <div className="flex items-start text-left gap-3">
                        <img src="storage.svg" alt="" />
                        <p>{filter.memoryType?.toUpperCase()} {filter.memoryMake} {filter?.memoryModel} {filter.minMemoryAmount && filter.minMemoryAmount + ' GB'} {filter.memorySpeed && ' @ ' + filter.memorySpeed + ' MHZ'}</p>
                    </div>
                }

                {
                    filter.phoneMake &&
                    <div className="flex items-start text-left gap-3">
                        <img src="cpu.svg" alt="" />
                        <p>{filter.phoneMake.charAt(0).toUpperCase() + filter.phoneMake.slice(1)}</p>
                    </div>
                }
                {
                    filter.phoneColor &&
                    <div className="flex items-start text-left gap-3">
                        <img src="color.svg" alt="" />
                        <p>{filter.phoneColor.charAt(0).toUpperCase() + filter.phoneColor.slice(1)}</p>
                    </div>
                }
                {
                    filter.phoneRamSize &&
                    <div className="flex items-start text-left gap-3">
                        <img src="ram.svg" alt="" />
                        <p>{filter.phoneRamSize}</p>
                    </div>
                }
                                {
                    filter.phoneMemorySize &&
                    <div className="flex items-start text-left gap-3">
                        <img src="storage.svg" alt="" />
                        <p>{filter.phoneMemorySize}</p>
                    </div>
                }

            </div>
        </div>
    )
}

export default FilterItem;