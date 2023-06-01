import { useRef, useState } from "react"
import { SendGet, SendPost } from "../../Hooks/useFetch";
import Cookies from "js-cookie";

const ListingTitle = ({ title, listingID, sellerMode, isNew }: { title: string, listingID: string, sellerMode: boolean, isNew: boolean }) => {

    const [editTitleMode, setEditTitleMode] = useState(false);
    const [listingTitle, setListingTitle] = useState(title);

    const newTitleRef = useRef<HTMLInputElement>(null);

    const GetListingTitle = () => {
        SendGet("get-listing-title", { listingID: listingID }).then(data => {
            setListingTitle(data.listingTitle);
        });
    }

    const HandleUpdateListingTitle = () => {
        SendPost("update-listing-info", { seshID: Cookies.get("seshID"), listingID: listingID, toUpdate: "title", newTitle: newTitleRef.current?.value }).then(data => {
            if (data.status != 200) return alert("Problem sa novim nazivom...");
            GetListingTitle();
            setEditTitleMode(false);
        })
    }

    return (
        <div className="flex items-center justify-center text-center bg-listing-dark w-[90%] mx-auto sm:mx-0 sm:w-full rounded-[10px] gap-3 relative">
            <div className="absolute top-0 left-0">
                <p className="bg-listing-light text-mint px-5 rounded-b-[10px]">
                    {isNew==true?
                    "Novo":isNew==false?"Polovno":isNew==undefined&&""}
                </p>
            </div>
            
            {
                !editTitleMode ? <h1 className={`sm:text-[24px] text-[20px] font-semibold w-full p-[24px] ${listingTitle.includes(" ") ? "break-words" : "break-all"}`}>{listingTitle}</h1>
                    :
                    <div className="flex items-center gap-5 w-full p-[24px] animate__animated animate__fadeIn">
                        <input maxLength={30} className="outline-0 bg-transparent sm:text-[24px] text-[20px] text-center w-full" type="text" placeholder={listingTitle} defaultValue={listingTitle} ref={newTitleRef} />
                        <button className="min-w-[24px] w-[24px] h-[24px]" onClick={HandleUpdateListingTitle}><img className="min-w-[24px] w-[24px] h-[24px]" src="save.svg" alt="" /></button>
                    </div>
            }
            {
                (sellerMode && !editTitleMode) &&
                <button className="mr-[24px] w-[24px] h-[24px] max-w-[24px]" onClick={() => setEditTitleMode(true)}><img className="min-w-[24px]" src="edit.svg" alt="" /></button>
            }
        </div>
    )
}

export default ListingTitle;