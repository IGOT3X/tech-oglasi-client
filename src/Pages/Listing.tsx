import { useState, useEffect, useRef } from "react";
import { SendGet, SendPost } from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";

import { TListing, TUser } from "../../types";

import Menu from "../Components/Menu";
import MobileBack from "../Components/MobileBack";
import SearchBar from "../Components/SearchBar";
import Price from "../Components/Price";

import Cookies from "js-cookie";
import ReactMarkdown from 'react-markdown'
import RenderMarkdown from "../Components/RenderMarkdown";
import ListingTitle from "../Components/ListingTitle";
import ListingDescription from "../Components/ListingDescription";
import ComputerFields from "../Components/ListingPageCollections/ComputerFields";
import PhoneFields from "../Components/ListingPageCollections/PhoneFields";



const Listing = () => {

    const navigate = useNavigate();

    const [listingID, setListingID] = useState(
        window.location.href.split("listingID=")[1]
    );

    const [listing, setListing] = useState<TListing>();
    const sellerMode = listing?.sellerUsername == Cookies.get("username");
    const [showProlongListing, setShowProlongListing] = useState(false);

    const [pfp, setPfp] = useState();
    const [pfpLoading, setPfpLoading] = useState(true);
    const [listingLoading, setListingLoading] = useState(true);

    const [imageFullScreen, setImageFullScreen] = useState(false);

    const [currImage, setCurrImage] = useState(0);

    const [editPriceMode, setEditPriceMode] = useState(false);
    const [user, setUser] = useState<TUser>();


    const newPriceRefPC = useRef<HTMLInputElement>(null);
    const newPriceRef = useRef<HTMLInputElement>(null);


    const GetListing = () => {
        SendGet("get-listing", { listingID: listingID, username: Cookies.get("username") }).then(data => {
            if (data.status != 200) return alert("Problem sa učitavanjem oglasa...");
            setListing(data.listing);
            setListingLoading(false);
        })
    }

    useEffect(() => {

        if (!listingID) return navigate("/listings");

        SendGet("get-listing", { listingID: listingID, username: Cookies.get("username") }).then(data => {
            if (data.status != 200) return alert("Problem sa učitavanjem oglasa...");
            setListing(data.listing);
            setListingLoading(false);
            SendGet("get-user-pfp", { username: data.listing.sellerUsername }).then(data => {
                setPfpLoading(false);
                setPfp(data.pfp.buffer?.data);
            });
            SendGet("get-user-info", { username: data.listing.sellerUsername }).then(data => {
                setUser(data.user);
            });
            SendGet("get-if-expires-shortly", { listingID: listingID }).then(data => {
                setShowProlongListing(data.expiresShortly);
            });

        });
    }, []);

    const HandleDeleteListing = () => {
        SendPost("delete-listing", { seshID: Cookies.get("seshID"), listingID: listingID }).then(data => {
            if (data.status != 200) return alert("Problem sa brisanjem oglasa...");
            navigate("/listings");
        });
    }

    const HandleUpdatePrice = () => {
        if(newPriceRef.current?.value) newPriceRefPC.current.value = newPriceRef.current?.value;
        if(newPriceRefPC.current?.value) newPriceRef.current.value = newPriceRefPC.current?.value;

        SendPost("update-listing-info", { seshID: Cookies.get("seshID"), listingID: listingID, toUpdate: "price", newPrice: newPriceRef.current?.value }).then(data => {
            if (data.status != 200) return alert("Problem sa novom cenom...");
            GetListing();
            setEditPriceMode(false);
        });
    }

    const HandleProlongListing = () => {
        SendPost("prolong-listing", { listingID: listingID, seshID: Cookies.get("seshID") }).then(data => {
            if (data.status != 200) return alert("Greška pri produžavanju ogalsa...");

            return location.reload();
        });
    }



    return (
        listingLoading ?
            <div className="text-center text-mint flex sm:max-w-[1150px] mx-auto w-screen h-screen justify-center items-center">

                <p className="font-semibold text-[24px]">Oglas se učitava...</p>
                <img className="animate-spin" src="loader.svg" alt="" />
            </div>
            :

            <div className="flex flex-col text-mint mb-20 sm:max-w-[1150px] mx-auto w-screen ">
                <MobileBack />
                <Menu />
                <div className="self-center w-full mb-[64px] h-[3px] linear-line opacity-25 rounded-[10px]"></div>

                <div className="sm:hidden flex items-center justify-center gap-5 mt-10">
                    {pfp ? <img className="w-[64px] h-[64px] object-cover rounded-full" src={`data:image/png;base64,${btoa(new Uint8Array(pfp).reduce((data, byte) => { return data + String.fromCharCode(byte) }, ''))}`} alt="" /> : pfpLoading ? <div className="w-[64px] h-[64px] flex items-center justify-center border border-mint rounded-full"><img className="animate-spin w-[24px]" src="loader.svg" /></div> : <img className="w-[64px] h-[64px] object-cover rounded-full" src="doggo.jpeg" />}
                    <a className="underline" href={`/account?username=${listing?.sellerUsername}`}>{listing?.sellerUsername}</a>
                </div>
                <div className="flex flex-wrap items-center self-center justify-center gap-y-5 sm:justify-between w-full gap-[20%] mt-10 sm:mt-0">
                    <div className="flex gap-5 justify-center items-center">
                        <div className="hidden sm:flex items-center justify-center gap-5">
                            <a target="_blank" href={`/account?username=${listing?.sellerUsername}`}>{pfp ? <img className="w-[64px] h-[64px] object-cover rounded-full transition transform duration-700 ease-in-out hover:scale-105 border border-mint border-opacity-0 hover:border-opacity-100" src={`data:image/png;base64,${btoa(new Uint8Array(pfp).reduce((data, byte) => { return data + String.fromCharCode(byte) }, ''))}`} alt="" /> : pfpLoading ? <div className="w-[64px] h-[64px] flex items-center justify-center border border-mint rounded-full"><img className="animate-spin w-[24px]" src="loader.svg" /></div> : <img className="w-[64px] h-[64px] object-cover rounded-full" src="doggo.jpeg" />}</a>
                            <a className="underline" href={`/account?username=${listing?.sellerUsername}`}>{listing?.sellerUsername}</a>
                        </div>
                        <div className="flex gap-2">
                            <img src={`${user?.reputation > 90 ? 'star.svg' : 'star-red.svg'}`} alt="" />
                            <p>{user?.reputation}%</p>
                        </div>
                        <div className="flex gap-2">
                            <img src="ranking-bronze.svg" alt="" />
                            <p>{user?.rank.charAt(0).toUpperCase() + user?.rank.slice(1)}</p>
                        </div>
                        {
                            user?.city &&
                            <div className="flex gap-2">
                                <img src="globe.svg" alt="" />
                                <p>{user?.city.charAt(0).toUpperCase() + user?.city.slice(1)}</p>
                            </div>
                        }
                    </div>

                    {!sellerMode &&
                        <div className="hidden sm:flex gap-5">
                            <a href={`/order?listingID=${listingID}`} className="flex bg-listing-dark hover:bg-listing-light text-mint gap-3 items-center justify-center rounded-[10px] px-4 h-[44px] transition transform duration-700 ease-in-out hover:scale-105 border border-mint">
                                <p className="">Poruči</p>
                                <img src="cart.svg" alt="" />
                            </a>
                            <a href={`/chat?messageUser=${listing?.sellerUsername}&?listingID=${listing?._id}`} className="bg-listing-dark hover:bg-listing-light text-mint flex gap-3 items-center justify-center rounded-[10px] px-4 h-[44px] transition transform duration-700 ease-in-out hover:scale-105 border border-mint">
                                <p className="">Kontaktiraj prodavca</p>
                                <img src="message-mint.svg" alt="" />
                            </a>
                        </div>
                    }
                    {sellerMode &&
                        <button onClick={HandleDeleteListing} className="bg-listing-dark hover:bg-listing-light text-mint flex gap-3 items-center justify-center rounded-[10px] px-4 h-[44px] transition transform duration-700 ease-in-out hover:scale-105 border border-red">
                            <p className="">Obriši oglas</p>
                            <img src="x.svg" alt="" />
                        </button>
                    }
                    {
                        (sellerMode && showProlongListing) &&
                        <button onClick={HandleProlongListing} className="bg-listing-dark hover:bg-listing-light text-mint flex gap-3 items-center justify-center rounded-[10px] px-4 h-[44px] transition transform duration-700 ease-in-out hover:scale-105 border border-gold">
                            <p className="">Produži oglas</p>
                            <img src="clock.svg" alt="" />
                        </button>
                    }

                </div>

                <div className="px-2 w-[90%] sm:w-full flex flex-col self-center sm:items-start mt-10 sm:gap-10">
                    <div className="sm:flex sm:flex-col sm:gap-10 self-center w-full">
                        <div className="sm:flex sm:gap-10 sm:flex-wrap sm:justify-center w-full justify-between">
                            <div className="flex flex-col gap-5 sm:w-[600px] grow">
                                <ListingTitle title={listing!.title} listingID={listing!._id} sellerMode={sellerMode} isNew={listing?.state=="new"}/>
                                <div className="z-40">
                                    <ListingDescription description={listing!.description} listingID={listing!._id} sellerMode={sellerMode} />
                                </div>
                                <div className="hidden self-center sm:flex gap-5 mt-10">
                                    <div className="flex items-center gap-3">
                                        <img src="eye.svg" alt="" />
                                        <p>{listing?.views}</p>
                                    </div>
                                    <div className="w-[3px] h-[31px] bg-mint opacity-25 rounded-[10px]"></div>
                                    <div className="flex items-center gap-3">
                                        <img src="users.svg" alt="" />
                                        <p>{listing?.followedBy.length}</p>
                                    </div>
                                    <div className="w-[3px] h-[31px] bg-mint opacity-25 rounded-[10px]"></div>
                                    <div className="flex items-center gap-3">
                                        <img src="tag.svg" alt="" />
                                        {
                                            editPriceMode ?
                                                <div className="flex gap-3 animate__animated animate__fadeIn">
                                                    <div className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                                                        <input className="appearence-none bg-transparent focus:outline-none w-[80px] rounded-[10px] p-1" type="number" placeholder="Cena" ref={newPriceRefPC} />
                                                        <p className="opacity-25">EUR</p>
                                                    </div>
                                                    <button onClick={HandleUpdatePrice}><img className="w-[24px] max-w-[24px]" src="save.svg" alt="" /></button>
                                                </div>

                                                :
                                                <Price basePrice={listing?.price} />

                                        }
                                        {
                                            (sellerMode && !editPriceMode) &&
                                            <button onClick={() => setEditPriceMode(true)} className="self-center w-[24px] h-[24px] max-w-[24px] ml-3"><img className="w-[24px] h-[24px] max-w-[24px]" src="edit.svg" alt="" /></button>
                                        }
                                    </div>
                                </div>
                            </div>
                            {listing?.type=="computer" && <ComputerFields specs={listing.specifications}/>}
                            {listing?.type=="laptop" && <ComputerFields specs={listing.specifications}/> /* MUST FIX THIS */} 
                            {listing?.type=="phone" && <PhoneFields specs={listing.specifications}/>}
                        </div>




                        {
                            listing?.images[0] &&
                            <div className="hidden sm:flex gap-5 relative self-center mt-10">
                                {!imageFullScreen && <img className="cursor-pointer transition transform duration-700 ease-in-out hover:scale-125" src="left-arrow-mint.svg" onClick={() => setCurrImage(prevValue => {
                                    if (currImage > 0) return prevValue - 1;
                                    return listing.images.length - 1;
                                })} />}
                                {!imageFullScreen && <img onClick={() => setImageFullScreen(!imageFullScreen)} className={`w-[601px] h-[275px] object-cover rounded-[10px] cursor-pointer transition transform duration-700 ease-in-out border border-mint border-opacity-0 hover:border-opacity-50 hover:scale-105`} src={`data:image/png;base64,${btoa(new Uint8Array(listing.images[currImage].data).reduce((data, byte) => { return data + String.fromCharCode(byte) }, ''))}`} alt="" />}
                                {imageFullScreen &&
                                    <div className="">
                                        <img className="fixed left-[20%] top-[50%] cursor-pointer transition transform duration-700 ease-in-out hover:scale-125 z-50 bg-black rounded-full" src="left-arrow-mint.svg" onClick={() => setCurrImage(prevValue => {
                                            if (currImage > 0) return prevValue - 1;
                                            return listing.images.length - 1;
                                        })} />
                                        <img onClick={() => setImageFullScreen(!imageFullScreen)} className={`fixed w-[800px] h-[600px] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] object-cover z-50 rounded-[10px] cursor-pointer animate__animated animate__fadeIn transition transform duration-700 ease-in-out border border-mint border-opacity-0 hover:border-opacity-100 hover:scale-95`} src={`data:image/png;base64,${btoa(new Uint8Array(listing.images[currImage].data).reduce((data, byte) => { return data + String.fromCharCode(byte) }, ''))}`} alt="" />
                                        <img className="fixed right-[20%] top-[50%] cursor-pointer transition transform duration-700 ease-in-out hover:scale-125 bg-black rounded-full" src="right-arrow-mint.svg" onClick={() => setCurrImage(prevValue => {
                                            if (currImage == listing.images.length - 1) return 0;
                                            return prevValue + 1;
                                        })} />
                                    </div>
                                }
                                {!imageFullScreen && <img className="cursor-pointer transition transform duration-700 ease-in-out hover:scale-125" src="right-arrow-mint.svg" onClick={() => setCurrImage(prevValue => {
                                    if (currImage < listing.images.length - 1) return prevValue + 1;
                                    return 0;
                                })} />}
                            </div>
                        }
                    </div>


                    <div className="sm:hidden flex gap-5 mt-5 self-center">
                        <div className="flex items-center gap-3">
                            <img src="eye.svg" alt="" />
                            <p>{listing?.views}</p>
                        </div>
                        <div className="w-[3px] h-[31px] bg-mint opacity-25 rounded-[10px]"></div>
                        <div className="flex items-center gap-3">
                            <img src="users.svg" alt="" />
                            <p>{listing?.follows}</p>
                        </div>
                        <div className="w-[3px] h-[31px] bg-mint opacity-25 rounded-[10px]"></div>
                        <div className={`flex items-center gap-3`}>
                                        <img src="tag.svg" alt="" />
                                        {
                                            editPriceMode ?
                                                <div className="flex gap-3 animate__animated animate__fadeIn">
                                                    <div className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                                                        <input className="appearence-none bg-transparent focus:outline-none w-[80px] rounded-[10px] p-1" type="number" placeholder="Cena" ref={newPriceRef} />
                                                        <p className="opacity-25">EUR</p>
                                                    </div>
                                                    <button onClick={HandleUpdatePrice}><img className="w-[24px] max-w-[24px]" src="save.svg" alt="" /></button>
                                                </div>
                                                :
                                                <Price basePrice={listing?.price} />

                                        }
                                        {   
                                            (sellerMode && !editPriceMode) &&
                                            <button onClick={() => setEditPriceMode(true)} className="self-center w-[24px] h-[24px] max-w-[24px] ml-3"><img className="w-[24px] h-[24px] max-w-[24px]" src="edit.svg" alt="" /></button>
                                        }
                                    </div>
                    </div>
                    {
                        listing?.images && listing?.images[0] &&
                        <div className="sm:hidden mt-10 relative self-center flex gap-3 justify-center">
                            {!imageFullScreen && <img className={`${currImage==0 && "invisible"} cursor-pointer transition transform duration-700 ease-in-out hover:scale-125 w-[24px]`} src="left-arrow-mint.svg" onClick={() => setCurrImage(prevValue => {
                                    if (currImage > 0) return prevValue - 1;
                                    return listing.images.length - 1;
                                })} />}
                                {!imageFullScreen && <img onClick={() => setImageFullScreen(!imageFullScreen)} className={`w-[300px] min-w-[300px] h-[275px] object-cover rounded-[10px] cursor-pointer transition transform duration-700 ease-in-out border border-mint border-opacity-0 hover:border-opacity-50 hover:scale-105`} src={`data:image/png;base64,${btoa(new Uint8Array(listing.images[currImage].data).reduce((data, byte) => { return data + String.fromCharCode(byte) }, ''))}`} alt="" />}
                                {imageFullScreen &&
                                    <div className="">
                                        <img onClick={() => setImageFullScreen(!imageFullScreen)} className={`fixed w-[90%] h-[300px] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] object-cover z-50 rounded-[10px] cursor-pointer animate__animated animate__fadeIn transition transform duration-700 ease-in-out border border-mint border-opacity-0 hover:border-opacity-100 hover:scale-95`} src={`data:image/png;base64,${btoa(new Uint8Array(listing.images[currImage].data).reduce((data, byte) => { return data + String.fromCharCode(byte) }, ''))}`} alt="" />
                                    </div>
                                }
                                {!imageFullScreen && <img className={`${listing.images.length - 1 == currImage && "invisible"} cursor-pointer transition transform duration-700 ease-in-out hover:scale-125 w-[24px]`} src="right-arrow-mint.svg" onClick={() => setCurrImage(prevValue => {
                                    if (currImage < listing.images.length - 1) return prevValue + 1;
                                    return 0;
                                })} />}
                        </div>
                    }
                    {!sellerMode &&
                        <a href={`/order?listingID=${listingID}`} className="flex bg-listing-dark hover:bg-listing-light text-mint gap-3 items-center justify-center rounded-[10px] px-4 h-[44px] transition transform duration-700 ease-in-out hover:scale-105 border border-mint mt-10 mb-5 sm:hidden">
                            <p className="">Poruči</p>
                            <img src="cart.svg" alt="" />
                        </a>
                    }
                    {!sellerMode&&
                        <a href={`/chat?messageUser=${listing?.sellerUsername}&?listingID=${listing?._id}`} className="bg-listing-dark hover:bg-listing-light text-mint flex gap-3 items-center justify-center rounded-[10px] px-4 h-[44px] transition transform duration-700 ease-in-out hover:scale-105 border border-mint sm:hidden">
                            <p className="">Kontaktiraj prodavca</p>
                            <img src="message-mint.svg" alt="" />
                        </a>
                    }




                </div>

            </div>

    )
}

export default Listing;