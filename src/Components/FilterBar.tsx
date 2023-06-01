import { useEffect, useRef, useState } from "react";
import PlusInput from "./Functionality/PlusInput";
import { TFilter, TPhoneSpecifications, TSpecifications } from "../../types";
import { SendPost } from "../../Hooks/useFetch";
import Cookies from "js-cookie";

const FilterBar = ({ setFilters, filters }: { setFilters: Function, filters: TFilter | undefined }) => {

    const [priceMin, setPriceMin] = useState<number>();
    const [priceMax, setPriceMax] = useState<number>();

    const [listingType, setListingType] = useState<string>();
    const [listingState, setListingState] = useState<string>();

    const [specifications, setSpecifications] = useState<TSpecifications>();
    const [phoneSpecifications, setPhoneSpecifications] = useState<TPhoneSpecifications>();

    const [alertIcon, setAlertIcon] = useState<string>("bell.svg");
    const [showMobileHelp, setShowMobileHelp] = useState(false);

    const HandleCreateFilterAlert = () => {
        if (!filters?.listingType) return alert("Morate da unesete barem tip oglasa za koji želite da dobijete obaveštenja...");
        SendPost("create-filter-alert", { seshID: Cookies.get("seshID"), filters: JSON.stringify(filters) }).then(data => {
            if (data.status != 200 && !data.reason) return alert("Problem sa dodavanjem filtera...");
            if (data.reason == "already-exists") return alert("Već ste dodali taj filter na praćenje...")
            setAlertIcon("thumbs-up.svg");
            setTimeout(() => setAlertIcon("bell.svg"), 1500);
        });
    }

    useEffect(() => {

        listingType == "computer" || listingType == "laptop" &&
            setFilters({
                priceMin: priceMin,
                priceMax: priceMax,
                listingType: listingType,
                state: listingState,
                ...specifications
            });
        listingType == "phone"
        setFilters({
            priceMin: priceMin,
            priceMax: priceMax,
            listingType: listingType,
            state: listingState,
            ...phoneSpecifications
        });

    }, [priceMin, priceMax, listingType, listingState, specifications, phoneSpecifications]);


    return (
        <div className="flex gap-[8px] flex-wrap sm:w-[580px] w-[294px] self-center mt-[8px]">
            <p className="w-full text-mint">Dodajte filtere:</p>
            <PlusInput setState={setPriceMin} title="Min cena" />
            <PlusInput setState={setPriceMax} title="Max cena" />
            <PlusInput setState={setListingType} dropDownOptions={[
                {
                    title: "Kompjuter",
                    value: "computer"
                },
                {
                    title: "Laptop",
                    value: "laptop"
                },
                {
                    title: "Komponenta",
                    value: "component"
                },
                {
                    title: "Telefon",
                    value: "phone"
                },
                {
                    title: "Deo za telefon",
                    value: "phone-parts"
                },
                {
                    title:"Digitalni produkt",
                    value:"digital-zone"
                }
            ]} title="Tip oglasa" />
            <PlusInput setState={setListingState} dropDownOptions={[
                {
                    title: "Novo",
                    value: "new"
                },
                {
                    title: "Polovno",
                    value: "used"
                }
            ]} title="Stanje" />

            {
                (listingType == "computer" || listingType == "laptop") &&
                <PlusInput title="Specifikacije" subMenuOptions={{ setFunction: setSpecifications, type: listingType }} />
            }

            {
                (listingType == "phone") &&
                <PlusInput title="Specifikacije" subMenuOptions={{ setFunction: setPhoneSpecifications, type: listingType }} />
            }
            <button className="group relative h-[24px] w-[24px] pt-[4px]" onClick={HandleCreateFilterAlert}>
                <img src={alertIcon} alt="" />
                <p style={{ pointerEvents: "none" }} className="sm:group-hover:opacity-100 opacity-0 absolute sm:top-[50px] top-10 right-[0px] z-50 sm:right-0 text-nowrap bg-mint px-5 py-3 rounded-[10px] text-black text-left transition transform duration-700 ease-in-out w-[300px]">
                    Klikom na zvonce ćete zapratiti filtere koje ste podesili. Kada se nov oglas pojavi sa tim filterima, bićete obavešteni.
                </p>
            </button>
            <button onClick={()=>setShowMobileHelp(!showMobileHelp)} className="sm:hidden w-[24px] h-[24px] pt-[4px]">
                <img src="help-circle.svg" alt="" />
            </button>
            {
                showMobileHelp &&
                <p style={{ pointerEvents: "none" }} className="mt-5 sm:top-[50px] top-10 right-[0px] z-50 sm:right-0 text-nowrap bg-mint px-5 py-3 rounded-[10px] text-black text-left transition transform duration-700 ease-in-out w-[300px]">
                    Klikom na zvonce ćete zapratiti filtere koje ste podesili. Kada se nov oglas pojavi sa tim filterima, bićete obavešteni.
                </p>
            }

        </div>
    )
}

export default FilterBar;