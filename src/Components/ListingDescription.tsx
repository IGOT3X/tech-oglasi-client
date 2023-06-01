import { useRef, useState } from "react";
import { SendGet, SendPost } from "../../Hooks/useFetch";
import Cookies from "js-cookie";
import RenderMarkdown from "./RenderMarkdown";

const ListingDescription = ({ description, listingID, sellerMode }: { description: string, listingID: string, sellerMode: boolean }) => {

    const [editDescriptionMode, setEditDescriptionMode] = useState(false);
    const [listingDescription, setListingDescription] = useState<string>(description);
    const newDescriptionRef = useRef<HTMLTextAreaElement>(null);


    const GetListingDescription = () => {
        SendGet("get-listing-description", { listingID: listingID }).then(data => {
            setListingDescription(data.listingDescription);
        });
    }
    const HandleUpdateDescription = () => {
        SendPost("update-listing-info", { seshID: Cookies.get("seshID"), listingID: listingID, toUpdate: "description", newDescription: newDescriptionRef.current?.value }).then(data => {
            if (data.status != 200) return alert("Problem sa novim opisom...");
            GetListingDescription();
            setEditDescriptionMode(false);
        });
    }

    return (
        <div className="px-[24px] flex gap-3 items-center justify-center text-left bg-listing-dark py-5 rounded-[10px] sm:w-full w-[90%] mx-auto sm:mx-0">
            {
                !editDescriptionMode ? listingDescription ? <p className="w-full mx-auto sm:mx-0"><span>
                    <div className="break-words">
                        <RenderMarkdown toRender={listingDescription} />
                    </div>
                </span>
                </p> : <p className="w-full text-center">Ovaj oglas nema opis</p>
                    :
                    <div className="flex gap-5 w-full animate__animated animate__fadeIn">
                        <textarea className="outline-0 bg-transparent text-start w-full p-5" rows={10} placeholder={listingDescription ? listingDescription : "Unesite vaš novi opis"} defaultValue={listingDescription} ref={newDescriptionRef} />
                        <div className="flex flex-col gap-[12px]">
                            <button className="self-start" onClick={HandleUpdateDescription}><img className="w-[24px] max-w-[24px]" src="save.svg" alt="" /></button>
                            <div className="group relative">
                                <img className="opacity-100" src="help-circle.svg" alt="" />
                                <p style={{ pointerEvents: "none" }} className="z-40 group-hover:opacity-100 opacity-0 absolute sm:top-[-20px] top-10 left-[-250px] sm:left-10 text-nowrap bg-mint px-5 py-3 rounded-[10px] text-black text-left transition transform duration-700 ease-in-out w-[300px]">
                                    <span className="text-[20px] font-semibold">Formatiranje teksta</span> <br /> <br /> Tekst izmedju "**" karaktera je boldovan (**<span className="font-semibold">bold</span>**) <br /> <br /> Tekst izmedju "*" karaktera je italic (*<span className="italic">italic</span>*) <br /> <br /> Za listu koristite "-" ili "*" <br /> - stvar <br /> * stvar <br /> <br /> Sve ispred "#" se tretira kao naslov i imaće najveća slova <br /> <br /> Sve ispred "##" se tretira kao manji naslov i imaće veća slova od običnog teksta, najbolje se koristi kao pod-naslov
                                </p>
                            </div>
                        </div>
                    </div>
            }
            {
                (sellerMode && !editDescriptionMode) &&
                <button onClick={() => { setEditDescriptionMode(true) }} className="self-start w-[24px] h-[24px] max-w-[24px]"><img className="w-[24px] h-[24px] max-w-[24px]" src="edit.svg" alt="" /></button>
            }
        </div>
    )
}

export default ListingDescription;