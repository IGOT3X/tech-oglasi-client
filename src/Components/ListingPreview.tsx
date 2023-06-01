import { TListing } from "../../types";
import { useState, useEffect, useRef } from "react";
import { SendGet, SendPost } from "../../Hooks/useFetch";
import Price from "./Price";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ListingMenu from "./ListingMenu";
import PreviewComputer from "./PreviewCollections/PreviewComputer";
import PreviewPhone from "./PreviewCollections/PreviewPhone";


const ListingPreview = ({ listing, showControls, showRatingControls }: { listing: TListing, showControls?: boolean, showRatingControls?: boolean }) => {

    const [pfp, setPfp] = useState();
    const [pfpLoading, setPfpLoading] = useState(true);

    const [listingPic, setListingPic] = useState();
    const [listingPicLoading, setListingPicLoading] = useState(true);
    const [showListingMenu, setShowListingMenu] = useState(false);

    const [orderState, setOrderState] = useState<string>();

    const navigate = useNavigate();

    useEffect(() => {
        SendGet("get-user-pfp", { username: listing.sellerUsername }).then(data => {
            setPfpLoading(false);
            if (!data.pfp) return;
            setPfp(data.pfp.buffer?.data);
        });
        SendGet("get-first-listing-picture", { listingID: listing._id }).then(data => {
            setListingPicLoading(false);
            if (!data.listingPic) return;
            setListingPic(data.listingPic.data);
        });
        if (showControls) SendGet("get-listing-order-state", { listingID: listing._id }).then(data => {
            setOrderState(data.listingOrderState);
        });
    }, []);

    const HandleCancel = (event: any) => {
        event.cancelBubble = true;
        event.preventDefault();
        event.stopPropagation();
        SendPost("change-listing-state", { listingID: listing._id, newState: "cancel", seshID: Cookies.get("seshID") }).then(data => {
            SendGet("get-listing-order-state", { listingID: listing._id }).then(data => {
                location.reload();
            });
        })
    }
    const HandleConfirm = (event: any) => {
        event.cancelBubble = true;
        event.preventDefault();
        event.stopPropagation();
        SendPost("change-listing-state", { listingID: listing._id, newState: "fulfilled", seshID: Cookies.get("seshID") }).then(data => {
            SendGet("get-listing-order-state", { listingID: listing._id }).then(data => {
                location.reload();
            });
        })
    }

    const HandleCloseMenu = (event: any) => {
        setShowListingMenu(false);
        event.cancelBubble = true;
        event.preventDefault();
        event.stopPropagation();
    }

    const HandleClick = (event: any) => {
        if (event.currentTarget.id != 'listing') {
            event.cancelBubble = true;
            event.preventDefault();
            event.stopPropagation();
            setShowListingMenu(true);
            return;
        }
    }
    //
    return (
        <div className="flex flex-col text-mint">
            <a href={(!showRatingControls && !showListingMenu) ? `/listing?listingID=${listing._id}` : null} id="listing" target="_blank" className={`relative w-[294px] flex flex-col gap-5 bg-listing-dark hover:bg-listing-light rounded-[10px]  py-5 cursor-pointer shadow-2xl ${(listing.isPromotedTop || listing.isPromotedHome) && "border border-gold"} ${(listing.sellerUsername == Cookies.get("username") && !listing.isPromotedHome && !listing.isPromotedTop) && "border border-green"} ${!showControls && "cursor-pointer"} transition transform duration-700 ease-in-out hover:scale-105`}>
                {
                    (listing.isPromotedTop || listing.isPromotedHome) &&
                    <div className="flex gap-3 self-center items-center">
                        <img src="star.svg" alt="" />
                        <p className="text-gold font-semibold">Istaknut oglas</p>
                    </div>
                }
                <div className="flex items-center justify-between px-3 self-center w-full">
                    {pfp ? <img className="w-[40px] h-[40px] object-cover rounded-full" src={`data:image/png;base64,${btoa(new Uint8Array(pfp).reduce((data, byte) => { return data + String.fromCharCode(byte) }, ''))}`} alt="" /> : pfpLoading ? <div className="w-[40px] h-[40px] flex items-center justify-center border border-mint rounded-full"><img className="animate-spin w-[24px]" src="loader.svg" /></div> : <img className="w-[40px] h-[40px] object-cover rounded-full" src="doggo.jpeg" />}
                    <a target="_blank" className="underline" href={`/account?username=${listing?.sellerUsername}`}>{listing.sellerUsername}</a>
                    <div className="w-[32px] flex items-center justify-center py-1 transition transform duration-700 ease-in-out hover:bg-gray rounded-[10px]" onClick={HandleClick}>
                        <button className="" name="toggleMenu" id="toggleMenu">
                            <img className="" src="listing-options.svg" alt="" />
                        </button>
                    </div>

                </div>
                {showListingMenu &&
                    <ListingMenu HandleClose={HandleCloseMenu} listingID={listing._id} sellerMode={Cookies.get("username") == listing.sellerUsername} isPromotedHome={listing.isPromotedHome} isPromotedTop={listing.isPromotedTop} />
                }
                <div className="self-center w-[189px] h-[3px] bg-mint opacity-25 rounded-[10px]"></div>
                <h1 className="self-center text-[20px] font-medium text-center px-2">{listing.title}</h1>
                {
                    !listingPicLoading ? listingPic ? <img className="w-[189px] h-[107px] object-cover rounded-[10px] self-center border border-mint" src={`data:image/png;base64,${btoa(new Uint8Array(listingPic).reduce((data, byte) => { return data + String.fromCharCode(byte) }, ''))}`} alt="" />
                        :
                        <div className="self-center w-[189px] h-[107px] rounded-[10px] bg-listing-light flex items-center justify-center border border-mint">
                            <p className="text-[12px]">Ovaj oglas ne poseduje slike</p>
                        </div>
                        :
                        <div className="self-center w-[189px] h-[107px] rounded-[10px] bg-listing-light flex items-center justify-center border border-mint">
                            <img className="animate-spin" src="loader.svg" alt="" />
                        </div>
                }
                {(listing.type == "computer" || listing.type == "laptop") && <PreviewComputer specs={listing?.specifications}/>}
                {listing.type == "phone" && <PreviewPhone specs={listing.specifications}/>}
                <div className="self-center w-[189px] h-[3px] bg-mint opacity-25 rounded-[10px]"></div>
                <div className="self-center flex gap-3 items-center justify-center">
                    <div className="flex gap-1">
                        <img src="eye.svg" alt="" />
                        <p>{listing.views.length}</p>
                    </div>
                    <div className="w-[3px] h-[31px] bg-mint opacity-25 rounded-[10px]"></div>
                    <div className="flex gap-1">
                        <img src="tag.svg" alt="" />
                        <Price basePrice={listing.price} />
                    </div>
                </div>
                {showControls &&
                    <div className="flex flex-col gap-[8px] mt-[10px]">
                        <div className="flex gap-3 self-center">
                            <p className="text-center text-mint text-[14px]">Status: </p>
                            <p className={`text-center ${orderState == "ordered" ? "text-gold" : orderState == "sent" && "text-green"} text-[14px]`}>{orderState == "ordered" ? "Na čekanju" : orderState == "sent" && "Poslato"}</p>
                        </div>
                        {(showControls && orderState == "ordered") ? <button onClick={(e) => HandleCancel(e)} className="self-center flex bg-listing-light border border-red text-red font-semibold gap-3 items-center justify-center rounded-[10px] px-[24px] py-[8px] transition transform duration-700 ease-in-out hover:bg-listing-dark">Otkaži porudžbinu</button> : orderState == "sent" && <button onClick={(e) => HandleConfirm(e)} className="self-center flex bg-listing-light border border-green text-green font-semibold gap-3 items-center justify-center rounded-[10px] px-[24px] py-[8px] transition transform duration-700 ease-in-out hover:bg-listing-dark">Paket preuzet</button>}
                        {(showControls && orderState == "sent") && <div className="flex w-[294px] mt-1 items-start gap-3 self-center px-[24px]">
                            <img src="alert-octagon.svg" alt="" />
                            <p className="opacity-25 text-[12px]">Potrebno je da potvrdite prijem porudžbine u roku od 3 dana, u suprotnom će se smatrati da je porudžbina preuzeta.</p>
                        </div>
                        }
                    </div>

                }

                {listing.sellerUsername == Cookies.get("username") && <p className={`${(listing.isPromotedHome || listing.isPromotedTop) ? "text-gold" : "text-green"} pb-2 self-center`}>Ovo je vaš oglas</p>}
            </a>
            <div className="flex mt-4 flex-wrap">
                {
                    listing.flags.map((flag, i) => (
                        <div key={i} className="bg-mint bg-opacity-25 border border-mint text-mint rounded-[10px] px-2 h-[26px] mr-2">
                            <p>{flag[0].toUpperCase() + flag.substring(1, flag.length)}</p>
                        </div>
                    ))
                }
            </div>
            {false && <div className="flex gap-3">
                <a href="">Kontaktiraj prodavca</a>
                <a href=""><img src="message-mint.svg" alt="" /></a>
            </div>}


        </div>

    )
}

export default ListingPreview;