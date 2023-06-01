import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";
import MobileBack from "../Components/MobileBack";
import Cookies from "js-cookie";
import 'animate.css';

import InputFields from "../Components/InputFields";
import { TSpecifications } from "../../types";


const AddListing = () => {

    const [addType, setAddType] = useState<string>("single");

    const [listingType, setListingType] = useState<string>("computer");
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get("seshID")) navigate("/login?reason=add-listing");
    }, []);


    return (
        <div className="flex flex-col gap-10 text-mint sm:pb-0 pb-20 sm:max-w-[1150px] mx-auto overflow-x-hidden">
            <MobileBack />
            <Menu />
            {!addType &&
                <div className="flex flex-col items-center gap-10 self-center w-[250px] pb-20">
                    <h1 className="text-[24px]">Šta dodajete?</h1>
                    <div className="flex gap-5 items-center justify-center flex-wrap sm:flex-nowrap">
                        <button className="w-[248px] h-[314px] sm:rotate-[-5deg] bg-listing-dark rounded-[10px] border border-mint border-opacity-0 flex flex-col justify-center relative transition transform duration-700 ease-in-out hover:rotate-0 hover:scale-105 hover:border-opacity-100  shadow-2xl" onClick={() => setAddType('single')}>
                            <div className="self-end m-5 absolute top-0 group">
                                <img className="" src="help-circle.svg" alt="" />
                                <p className="absolute opacity-0 group-hover:opacity-100 bg-mint text-black p-2 rounded-[10px] right-[-40px] transition transform duration-700 ease-in-out">Predstavlja jedan oglas.</p>
                            </div>
                            <p className="font-semibold text-[20px] self-center my-auto ">Oglas</p>
                        </button>
                        <div className="w-[3px] h-[31px] bg-mint opacity-25 rounded-[10px] sm:block hidden"></div>
                    </div>
                </div>
            }
            {
                addType == 'single' &&
                <div className="flex flex-col gap-10 items-center animate__animated animate__fadeIn">
                    <div className="flex flex-col items-center gap-5 sm:w-full w-[294px]">
                        <h1 className="text-[24px]">Izaberi tip oglasa:</h1>
                        <div className="flex flex-wrap gap-5 justify-between w-full">
                            <button className={`h-[248px] sm:w-[248px] w-[294px] border mx-auto ${listingType == "computer" ? "border-blue border-opacity-100 scale-105 bg-listing-light" : "border-mint border-opacity-0 bg-listing-dark"}  rounded-[10px] p-5 flex flex-col gap-5 transition transform duration-700 ease-in-out hover:border-opacity-100 hover:bg-listing-light`} onClick={() => setListingType("computer")}><img className="w-[162px] self-center" src="pc.png" alt="" /><p className="self-center font-semibold">Kompjuter</p></button>
                            <button className={`h-[248px] sm:w-[248px] w-[294px] border mx-auto ${listingType == "laptop" ? "border-blue border-opacity-100 scale-105 bg-listing-light" : "border-mint border-opacity-0 bg-listing-dark"} rounded-[10px] p-5 flex flex-col gap-5 transition transform duration-700 ease-in-out hover:border-opacity-100 hover:bg-listing-light`} onClick={() => setListingType("laptop")}><img className="w-[162px] self-center" src="laptop.png" alt="" /><p className="self-center font-semibold">Laptop</p></button>
                            <button className={`h-[248px] sm:w-[248px] w-[294px] border mx-auto ${listingType == "component" ? "border-blue border-opacity-100 scale-105 bg-listing-light" : "border-mint border-opacity-0 bg-listing-dark"} rounded-[10px] p-5 flex flex-col gap-5 transition transform duration-700 ease-in-out hover:border-opacity-100 hover:bg-listing-light`} onClick={() => setListingType("component")}><img className="w-[162px] self-center" src="component.png" alt="" /><p className="self-center font-semibold">Komponenta</p></button>
                        </div>
                        <div className="flex flex-wrap gap-5 justify-between w-full">
                            <button className={`h-[248px] sm:w-[248px] w-[294px] border mx-auto ${listingType == "phone" ? "border-blue border-opacity-100 scale-105 bg-listing-light" : "border-mint border-opacity-0 bg-listing-dark"} rounded-[10px] p-5 flex flex-col gap-5 transition transform duration-700 ease-in-out hover:border-opacity-100 hover:bg-listing-light`} onClick={() => setListingType("phone")}><img className="w-[162px] self-center" src="phone.png" alt="" /><p className="self-center font-semibold">Telefon</p></button>
                            <button className={`h-[248px] sm:w-[248px] w-[294px] border mx-auto ${listingType == "phone-parts" ? "border-blue border-opacity-100 scale-105 bg-listing-light" : "border-mint border-opacity-0 bg-listing-dark"} rounded-[10px] p-5 flex flex-col gap-5 transition transform duration-700 ease-in-out hover:border-opacity-100 hover:bg-listing-light`} onClick={() => setListingType("phone-parts")}><img className="w-[162px] self-center" src="phone-parts.png" alt="" /><p className="self-center font-semibold">Deo za telefon</p></button>
                            <button className={`h-[248px] sm:w-[248px] w-[294px] border mx-auto ${listingType == "digital-zone" ? "border-blue border-opacity-100 scale-105 bg-listing-light" : "border-mint border-opacity-0 bg-listing-dark"} rounded-[10px] p-5 flex flex-col gap-5 transition transform duration-700 ease-in-out hover:border-opacity-100 hover:bg-listing-light`} onClick={() => setListingType("digital-zone")}><img className="w-[162px] self-center" src="discord.jpeg" alt="" /><p className="self-center font-semibold">Digitalni produkt</p></button>
                        </div>
                        <InputFields type={listingType} />
                    </div>
                </div>
            }
        </div>
    )
}


export default AddListing;