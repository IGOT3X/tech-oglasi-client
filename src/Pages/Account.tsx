import SearchBar from "../Components/SearchBar";
import Menu from "../Components/Menu";

import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";

import { TFilter, TListing, TUser } from "../../types";
import { SendGet, SendPostImage, SendPost } from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";

import 'animate.css';
import MobileBack from "../Components/MobileBack";
import ListingPreview from "../Components/ListingPreview";
import Review from "../Components/Review";
import ReviewForm from "../Components/ReviewForm";
import NewOrderHandler from "../Components/NewOrderHandler";
import ContactItem from "../Components/ContactItem";
import FilterItem from "../Components/FilterItem";

// If account has no search USER ID in the link  then show one's own account. If there is a query 
// for another account then show that user's account.
// use window.location.href.includes(?) to check if we are searching for an acc.
// Also if you search for yourself don't allow to show page as another user's acc.


// Make a call to the server and get the active purchases

const Account = () => {

    const [showEditDetails, setShowEditDetails] = useState(false);
    const [userInfo, setUserInfo] = useState<TUser>();
    const [browseMode, setBrowseMode] = useState(false);
    const [showVerificationPanel, setShowVerificationPanel] = useState(false);
    const [isNewContact, setIsNewContact] = useState(false);


    const [newOrders, setNewOrders] = useState([]);
    const [userOrdered, setUserOrdered] = useState([]);

    const [ratedOrders, setRatedOrders] = useState([]);
    const [unRatedOrders, setUnRatedOrders] = useState<TListing[]>([]);

    const [contacts, setContacts] = useState([]);

    const usernameRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const companyNameRef = useRef<HTMLInputElement>(null);
    const companyLinkRef = useRef<HTMLInputElement>(null);

    const IDDocRef = useRef<HTMLInputElement>(null);
    const IDNumberRef = useRef<HTMLInputElement>(null);


    const navigate = useNavigate();

    const [pfp, setPfp] = useState();
    const [pfpLoading, setPfpLoading] = useState(true);

    const [orderInfos, setOrderInfos] = useState<TUser[]>([]);
    const [userListings, setUserListings] = useState<TListing[]>([]);
    const [alertListings, setAlertListings] = useState<TListing[]>([]);
    const [followedListings, setFollowedListings] = useState<TListing[]>([]);
    const [followedFilters, setFollowedFilters] = useState<TFilter[]>([]);
    const [showReviewFilter, setShowReviewFilter] = useState(false);
    const [typeOfReviewsToShow, setTypeOfReviewsToShow] = useState("all");

    const [alerts, setAlerts] = useState([]);


    const HandleImageUpload = () => {
        const formData = new FormData();

        formData.append('file', document.querySelector("#image-upload")!.files[0]);
        formData.append('seshID', String(Cookies.get("seshID")));

        SendPostImage("update-user-pfp", formData).then(() => {
            setPfpLoading(true);
            setPfp(undefined);
            SendGet("get-user-pfp", { seshID: Cookies.get("seshID") }).then(data => {
                setPfpLoading(false);
                setPfp(data.pfp.buffer.data);
            });
        });

    }
    const GetUserInfo = () => {
        SendGet("get-user-info", { seshID: Cookies.get("seshID") }).then(data => {
            setUserInfo(data.user);
        });
    }

    const HandleDetailsChange = () => {
        const dataToSend = { seshID: Cookies.get("seshID"), username: usernameRef.current?.value, firstName: firstNameRef.current?.value, lastName: lastNameRef.current?.value, address: addressRef.current?.value, phone: phoneRef.current?.value, city: cityRef.current?.value, companyName: companyNameRef.current?.value, companyLink: companyLinkRef.current?.value };

        SendPost("update-user-info", dataToSend).then(() => {
            setShowEditDetails(false);
            GetUserInfo();
        });
    }

    const HandleVerification = () => {
        SendPost("verify-user", { seshID: Cookies.get("seshID"), IDDoc: IDDocRef.current?.value, IDNumber: IDNumberRef.current?.value }).then(data => {
            if (data.status != 200) return alert(data.reason);

            location.reload();
        })
    }

    useEffect(() => {
        if (!Cookies.get("seshID")) return navigate("/login?reason=account");


        if (window.location.href.includes("?username=")) {
            // IF ON OTHER USERS PAGE
            const username = window.location.href.split("?username=")[1];
            setBrowseMode(true);
            SendGet("get-user-pfp", { username: username }).then(data => {
                setPfpLoading(false);
                if (data.pfp)
                    setPfp(data.pfp.buffer?.data);
            });
            SendGet("get-user-info", { username: username }).then(data => {
                if (data.status != 200) return navigate("/");
                if (!data.user) return navigate("/");
                setUserInfo(data.user);
            });
            SendGet("get-listings", { username: username }).then(data => {
                if (data.listings)
                    setUserListings(data.listings);
            });
            SendGet("get-rated-orders", { username: username }).then(data => {
                if (data.ratedOrders)
                    setRatedOrders(data.ratedOrders);
            });

            GetIfUserInAddressBook();
        }
        else {
            SendGet("get-user-pfp", { seshID: Cookies.get("seshID") }).then(data => {
                setPfpLoading(false);
                setPfp(data.pfp.buffer?.data);
            });
            GetUserInfo();
            GetNewOrders();
            setInterval(() => {
                GetNewOrders();
                SendGet("get-contacts", { seshID: Cookies.get("seshID") }).then(data => {
                    setContacts(data.contacts);
                });
                SendGet("get-listings", { username: Cookies.get("username") }).then(data => {
                    setUserListings(data.listings);
                });
                SendGet("get-unrated-orders", { seshID: Cookies.get("seshID") }).then(data => {
                    setUnRatedOrders(data.unratedOrders);
                });
                SendGet("get-rated-orders", { seshID: Cookies.get("seshID") }).then(data => {
                    setRatedOrders(data.ratedOrders);
                });
            }, 60000);

            GetContacts();
            GetFollowedFilters();
            SendGet("get-listings", { username: Cookies.get("username") }).then(data => {
                setUserListings(data.listings);
            });
            SendGet("get-unrated-orders", { seshID: Cookies.get("seshID") }).then(data => {
                setUnRatedOrders(data.unratedOrders);
            });
            SendGet("get-rated-orders", { seshID: Cookies.get("seshID") }).then(data => {
                setRatedOrders(data.ratedOrders);
            });
            SendGet("get-alerts-body", { seshID: Cookies.get("seshID") }).then(data => {
                setAlerts(data.alerts);
                SendGet("get-listings-by-ids", { listingIDS: JSON.stringify(data.alerts) }).then(data => {
                    setAlertListings(data.listings);
                });
            });
            SendGet("get-followed-listings", { seshID: Cookies.get("seshID") }).then(data => {
                setFollowedListings(data.listings);
            });

        }

    }, []);

    const GetOrderUserInfo = (username: string) => {
        SendGet("get-user-info", { username: username }).then(data => {
            setOrderInfos(prevValue => {
                return ([
                    ...prevValue,
                    data.user
                ])
            });
        });
    }
    const GetIfUserInAddressBook = () => {
        SendGet("get-if-following-user", { username: window.location.href.split("?username=")[1], seshID: Cookies.get("seshID") }).then(data => {
            setIsNewContact(data.isFollowingUser);
        })
    }

    const GetContacts = () => {
        SendGet("get-contacts", { seshID: Cookies.get("seshID") }).then(data => {
            setContacts(data.contacts);
        });
    }

    const GetFollowedFilters = () => {
        SendGet("get-followed-filters", { seshID: Cookies.get("seshID") }).then(data => {
            setFollowedFilters(data.followedFilters);
        });
    }

    useEffect(() => {

        if (!Cookies.get("seshID")) return navigate("/login?reason=account");
        for (let i = 0; i < newOrders.length; i++) {
            GetOrderUserInfo(newOrders[i].orderedBy);
        }

    }, [newOrders]);

    const GetNewOrders = () => {
        SendGet("get-new-orders", { seshID: Cookies.get("seshID"), mode: "seller" }).then(data => {
            setNewOrders(data.orderedListings);
        });
        SendGet("get-new-orders", { seshID: Cookies.get("seshID"), mode: "buyer" }).then(data => {
            setUserOrdered(data.orderedListings);
        })
    }

    const HandleAddToContacts = () => {
        SendPost("add-to-contacts", { seshID: Cookies.get("seshID"), contact: window.location.href.split("?username=")[1] }).then(data => {
            if (data.status != 200) return alert("Greška u dodavanju korisnika u adresar");
            GetIfUserInAddressBook();

        })
    }

    const HandleDeleteFromContacts = () => {
        SendPost("delete-from-contacts", { seshID: Cookies.get("seshID"), contact: window.location.href.split("?username=")[1] }).then(data => {
            if (data.status != 200) return alert("Greška u brisanju korisnika iz adresara");
            GetIfUserInAddressBook();

        });
    }

    return (
        <div className="flex flex-col w-screen sm:max-w-[1150px] h-full text-mint pb-20 sm:pb-10 overflow-x-hidden mx-auto">
            <MobileBack />
            <Menu />

            <div className="flex flex-col gap-5 items-center self-center mt-10 w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between flex-wrap gap-20 w-full">
                    <div className="flex flex-col gap-5 items-center mx-auto sm:w-[190px] w-[294px]">
                        <div className="relative flex items-center justify-center">
                            <div className="group">
                                <div className="relative">
                                    {pfp ? <img className="w-[128px] h-[128px] object-cover rounded-full" src={`data:image/png;base64,${btoa(new Uint8Array(pfp).reduce((data, byte) => { return data + String.fromCharCode(byte) }, ''))}`} alt="" /> : pfpLoading ? <div className="w-[128px] h-[128px] flex items-center justify-center border border-mint rounded-full"><img className="animate-spin w-[24px]" src="loader.svg" /></div> : <img className="w-[128px] h-[128px] object-cover rounded-full" src="doggo.jpeg" />}
                                    {/*userInfo?.isOwner&&<div className="absolute top-[50%] left-[50%] translate-x-[-52%] translate-y-[-49%] w-[145px]"><img className="w-[145px] " src="ownerBorder.png" alt="" /></div>*/}
                                </div>
                                <div className={`invisible ${!browseMode && "group-hover:visible"} absolute w-[128px] h-[128px] flex items-center justify-center rounded-full bg-mint bg-opacity-25 cursor-pointer top-0`}>
                                    <label className="relative cursor-pointer">
                                        <input type="file" accept={`image/png, image/jpeg, image/jpg ${userInfo?.isOwner && ", image/gif"}`} style={{ pointerEvents: "all" }} className="file:p-20 top-[-50px] left-[-50px] opacity-0 cursor-pointer absolute top-0" id="image-upload" onInput={HandleImageUpload} />
                                    </label>
                                    <img src="edit.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 w-[190px] flex-wrap items-center justify-center">
                            <p className="text-[20px] font-semibold break-words">{userInfo?.username}</p>
                            {userInfo?.verifiedSeller && <img src="verified.svg" alt="" />}
                        </div>
                        {
                            (!browseMode && !userInfo?.verifiedSeller) &&
                            (!showVerificationPanel ?
                                <button onClick={() => setShowVerificationPanel(true)} className="sm:self-start border border-blue font-semibold sm:w-[190px] w-full h-[44px] rounded-[10px] flex gap-3 items-center sm:justify-between justify-center px-7 transition transform duration-700 ease-in-out hover:bg-listing-light"><p className="">Verifikuj se</p>  <img src="verified.svg" alt="" /></button> :
                                <button onClick={() => setShowVerificationPanel(false)} className="sm:self-start hover:border-red border border-mint sm:w-[190px] w-full h-[44px] rounded-[10px] flex gap-3 items-center justify-center transition transform duration-700 ease-in-out hover:bg-listing-light">Otkaži <img src="x.svg" alt="" /></button>
                            )
                        }
                        {
                            showVerificationPanel &&
                            <div className="flex flex-col gap-2 w-full animate__animated animate__fadeIn">
                                <input className="text-center sm:w-[190px] w-full rounded-[10px] bg-transparent border border-mint h-[34px] p-2 " type="text" placeholder="JMBG" ref={IDDocRef} />
                                <input className="text-center sm:w-[190px] w-full rounded-[10px] bg-transparent border border-mint h-[34px] p-2 " type="text" placeholder="Broj LK" ref={IDNumberRef} />
                                <button onClick={() => { setShowVerificationPanel(true); HandleVerification(); }} className="sm:self-start border border-mint sm:w-[190px] w-full h-[34px] rounded-[10px] flex gap-3 items-center justify-center transition transform duration-700 ease-in-out hover:bg-listing-light">Pošalji podatke <img src="send.svg" alt="" /></button>
                            </div>
                        }
                        {
                            userInfo?.isOwner &&
                            <div className="flex items-center justify-center sm:w-[190px] w-full h-[30px] bg-red rounded-[5px] gap-3">
                                <p className="text-mint font-semibold">
                                    Osnivač
                                </p>
                            </div>
                        }
                        {
                            !browseMode&&
                            <button className="sm:self-start border border-red border-opacity-50 sm:w-[190px] w-full h-[44px] rounded-[10px] flex gap-3 items-center sm:justify-between justify-center px-7 font-semibold transition transform duration-700 ease-in-out hover:bg-listing-light" onClick={()=>{Cookies.remove("seshID");Cookies.remove("username");navigate("/")}}><p className="">Izloguj se</p> <img src="log-out.svg" alt="" /></button>
                        }
                        <div className="flex flex-col gap-5 bg-listing-dark rounded-[10px] sm:w-[190px] w-full px-2 py-3 items-start">
                            <div className="flex gap-3 items-center">
                                <p className="text-[20px] w-[50px]">Rank</p>
                                {
                                    <div className="flex gap-3 items-center">
                                        <img src="ranking-bronze.svg" />
                                        <p>{userInfo?.rank.charAt(0).toUpperCase() + userInfo?.rank.slice(1)}</p>
                                    </div>
                                }
                            </div>
                            <div className="flex gap-3 items-center">
                                <p className="text-[20px] w-[50px]">Rep</p>
                                <img src={`${userInfo?.reputation > 90 ? 'star.svg' : 'star-red.svg'}`} alt="" />
                                <p>{userInfo?.reputation}%</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 bg-listing-dark rounded-[10px] sm:w-[190px] w-full px-2 py-3 items-start">
                            <div className="flex gap-3 items-center relative group cursor-default">
                                <img src="user-mint.svg" alt="" />
                                {userInfo?.accCreationDate ? <p>{userInfo.accCreationDate}</p> : <p>/</p>}
                                <p className="absolute invisible sm:group-hover:visible right-[-210px] transition transform duration-700 ease-in-out bg-mint text-black text-[14px] p-2 rounded-[10px]">Nalog napravljen datuma</p>
                            </div>
                            <div className="flex gap-3 items-center group relative cursor-default">
                                <img src="location-mint.svg" alt="" />
                                {userInfo?.city ? <p>{userInfo?.city.charAt(0).toUpperCase() + userInfo.city.slice(1)}</p> : <p>Nije uneto</p>}
                                <p className="absolute invisible sm:group-hover:visible right-[-140px] transition transform duration-700 ease-in-out bg-mint text-black text-[14px] p-2 rounded-[10px]">Grad prodavca</p>

                            </div>
                            <div className="flex gap-3 items-center group relative cursor-default">
                                <img src="phone-mint.svg" alt="" />
                                {userInfo?.phoneNumber ? <p className="break-all">{userInfo?.phoneNumber}</p> : <p>Nije uneto</p>}
                                <p className="absolute invisible sm:group-hover:visible right-[-120px] transition transform duration-700 ease-in-out bg-mint text-black text-[14px] p-2 rounded-[10px]">Broj telefona</p>

                            </div>
                            <div className="flex gap-3 items-center group relative cursor-default">
                                <img src="company-mint.svg" alt="" />
                                {userInfo?.companyName ? <a className={userInfo.companyLink && 'underline'} href={userInfo?.companyLink && userInfo.companyLink} target={userInfo.companyLink && '_blank'}>{userInfo?.companyName}</a> : <p>Nije uneto</p>}
                                <p className="absolute invisible sm:group-hover:visible right-[-150px] transition transform duration-700 ease-in-out bg-mint text-black text-[14px] p-2 rounded-[10px]">Firma prodavca</p>
                            </div>
                        </div>
                        {!browseMode ?
                            <button onClick={() => setShowEditDetails(!showEditDetails)} className={`sm:self-start border ${showEditDetails && "hover:border-red"} border-mint sm:w-[190px] w-full h-[44px] rounded-[10px] flex gap-3 items-center justify-center transition transform duration-700 ease-in-out hover:bg-listing-light font-semibold`}>
                                {!showEditDetails ? "Izmeni podatke" : "Otkaži"}
                                <img src="edit.svg" alt="" />
                            </button>
                            :
                            !isNewContact ?
                                // Check if you have already added that person to your contacts
                                <button onClick={HandleAddToContacts} className="sm:self-start border border-mint w-[190px] h-[44px] rounded-[10px] flex gap-3 items-center justify-center hover:bg-listing-light transition transform duration-700 ease-in-out">
                                    Dodaj u adresar
                                    <img src="plus.svg" alt="" />
                                </button>
                                :
                                <button onClick={HandleDeleteFromContacts} className="sm:self-start border border-mint w-[190px] h-[44px] rounded-[10px] flex gap-3 items-center justify-center hover:bg-listing-light transition transform duration-700 ease-in-out hover:border-red">
                                    Ukloni korisnika
                                    <img src="minus.svg" alt="" />
                                </button>
                        }
                    </div>

                    {(!browseMode && !showEditDetails) &&
                        <div className={`bg-listing-dark rounded-[10px] sm:w-[500px] w-[90%] grow self-center sm:self-start flex items-center justify-center overflow-y-auto sm:h-[600px] shadow-2xl ${newOrders.length > 0 ? "flex" : "hidden sm:flex"}`}>
                            {
                                newOrders.length > 0 ?
                                    <div className={`flex flex-col ${newOrders.length < 2 ? "self-center" : "self-start"}  my-10 sm:w-[90%] gap-10`}>
                                        <div className="flex gap-5 self-center">
                                            <h1 className="text-center text-[24px]">Najnovije porudžbine</h1>
                                            <img src="bell.svg" alt="" />
                                        </div>
                                        {
                                            newOrders.map((order, i) => (
                                                <NewOrderHandler order={order} orderInfos={orderInfos[i]} GetNewOrders={GetNewOrders} />
                                            ))
                                        }
                                    </div>
                                    : <h1 className="self-center text-[20px] text-center">Nove porudžbine će biti prikazane ovde...</h1>
                            }
                        </div>
                    }
                    {
                        (!browseMode && showEditDetails) &&
                        <div className="animate__animated animate__fadeIn flex flex-col grow gap-5 bg-listing-dark rounded-[10px] sm:w-[500px] w-[90%] self-center h-[600px] sm:p-0 justify-center items-center  shadow-2xl">
                            <div className="flex items-center justify-between w-[80%]">
                                <h1 className="text-[20px] font-semibold px-5 sm:px-0">Promena ličnih podataka:</h1>
                                <img className="cursor-pointer pr-5 sm:pr-0" src="x.svg" alt="" onClick={() => setShowEditDetails(false)} />
                            </div>
                            {/*<input className="w-[80%] rounded-[10px] bg-transparent border border-mint h-[44px] p-2 " type="text" placeholder={'Korisničko ime: ' + userInfo?.username} ref={usernameRef} />*/}
                            <input className="w-[80%] rounded-[10px] bg-transparent border border-mint h-[44px] p-2 " type="text" placeholder={'Ime: ' + userInfo?.firstName} ref={firstNameRef} />
                            <input className="w-[80%] rounded-[10px] bg-transparent border border-mint h-[44px] p-2 " type="text" placeholder={'Prezime: ' + userInfo?.lastName} ref={lastNameRef} />
                            <input className="w-[80%] rounded-[10px] bg-transparent border border-mint h-[44px] p-2" type="text" placeholder={userInfo?.city ? 'Grad: ' + userInfo.city : "Grad"} ref={cityRef} />
                            <input className="w-[80%] rounded-[10px] bg-transparent border border-mint h-[44px] p-2" type="text" placeholder={userInfo?.address ? 'Adresa: ' + userInfo.address : "Adresa"} ref={addressRef} />
                            <div className="flex gap-1 items-center w-[80%] rounded-[10px] bg-transparent border border-mint h-[44px]">
                                <p className="opacity-50 pl-2">+381</p>
                                <input className="focus:outline-none bg-transparent w-full px-2" type="text" onChange={e=>{/^\d+$/.test(e.target.value) ? null:e.target.value=""}} placeholder={userInfo?.phoneNumber ? 'Telefon: ' + userInfo.phoneNumber : "Broj telefona"} ref={phoneRef} />
                            </div>
                            <input className="w-[80%] rounded-[10px] bg-transparent border border-mint h-[44px] p-2" type="text" placeholder={userInfo?.companyName ? 'Firma: ' + userInfo.companyName : "Ime firme"} ref={companyNameRef} />
                            <input className="w-[80%] rounded-[10px] bg-transparent border border-mint h-[44px] p-2" type="text" placeholder={userInfo?.companyLink ? 'Websajt: ' + userInfo.companyLink : "Website link vaše firme"} ref={companyLinkRef} />
                            <button className="border border-mint w-[190px] h-[44px] rounded-[10px] flex gap-3 items-center justify-center transition transform duration-700 ease-in-out hover:scale-105 hover:bg-listing-light" onClick={HandleDetailsChange}>Sačuvaj podatke <img src="save.svg" alt="" /></button>
                        </div>
                    }
                    {
                        browseMode &&
                        <div className="bg-listing-dark rounded-[10px] w-[500px] sm:flex grow items-center justify-center hidden  shadow-2xl">
                            <h1 className="self-center text-[20px] text-center">Korisnik nema novih ocena...</h1>
                        </div>
                    }
                </div>
            </div>
            {
                userOrdered.length > 0 &&
                <div className="flex flex-col gap-5">
                    <h1 className="self-center sm:self-start mt-5 text-[24px]">Vi ste poručili:</h1>
                    <div className="flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap">
                        {
                            userOrdered.map(order => (
                                <ListingPreview listing={order} showControls={true} />
                            ))
                        }
                    </div>
                </div>

            }
            {(!browseMode && alertListings.length > 0) && <div className="flex gap-3 sm:mt-20 mt-10"> <img className="sm:ml-5" src="alert-octagon-mint.svg" alt="" /> <h1 className="text-[24px]">Filter obaveštenja:</h1></div>}
            <div className="flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap">
                {
                    (!browseMode && alertListings.length > 0) &&
                    alertListings.map((listing) => (
                        <ListingPreview listing={listing} />
                    ))
                }
            </div>

            {unRatedOrders.length > 0 && <h1 className="self-center sm:self-start mt-5 text-[24px]">Niste još ocenili ove oglase:</h1>}
            <div className="flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap">
                {
                    unRatedOrders.map(unratedOrder => (
                        <ReviewForm listing={unratedOrder} />
                    ))
                }
            </div>
            {
                (!browseMode && followedFilters?.length > 0) &&
                <div className="flex flex-col gap-5 mt-20">
                    <h1 className="text-[24px] text-center sm:text-left">Filteri koje pratite ({followedFilters.length}) : </h1>
                    <div className="flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap">
                        {followedFilters?.map(filter => (
                            <FilterItem filter={filter} refreshFilters={GetFollowedFilters} />
                        ))}
                    </div>
                </div>
            }
            {
                followedListings.length > 0 && <div className="flex flex-col gap-5 mt-20">
                    <h1 className="text-[24px] self-center text-center">Oglasi koje pratite ({followedListings.length}) :</h1>
                    <div className="flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap">
                        {followedListings.map(listing => (
                            <ListingPreview listing={listing} />
                        ))}
                    </div>

                </div>

            }

            {userListings.length > 0 && <h1 className="self-center sm:self-start mt-20 text-[24px]">{window.location.href.includes("?username=") ? "Oglasi korisnika" : "Vaši oglasi"}</h1>}
            <div className="flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap mt-10">
                {
                    userListings.map(listing => (
                        <ListingPreview listing={listing} />
                    ))
                }

            </div>

            {contacts.length > 0 && <h1 className="self-center sm:self-start my-5 text-[24px]">Adresar ({contacts.length}) :</h1>}
            <div className="flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap pb-5">
                {
                    contacts.map(contact => (
                        <ContactItem contact={contact} GetContacts={GetContacts} />
                    ))
                }
            </div>

            {ratedOrders.length > 0 &&
                <div className="flex sm:flex-row flex-col gap-3 items-center self-center sm:self-start mt-5">
                    <div className="flex gap-3">
                        <h1 className="text-[24px]">Knjiga utisaka ( {ratedOrders.length} ):</h1>
                        <button onClick={() => setShowReviewFilter(!showReviewFilter)}><img src="filter.svg" alt="" /></button>
                    </div>
                    {
                        showReviewFilter &&
                        <select className="bg-transparent appearance-none border border-mint rounded-[10px] p-1 text-center" onChange={e => setTypeOfReviewsToShow(e.currentTarget.value)}>
                            <option value={"all"}>Sve</option>
                            <option value={"positive"}>Pozitivne</option>
                            <option value={"negative"}>Negativne</option>
                        </select>
                    }

                </div>
            }
            {ratedOrders &&
                <div className="flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap pt-10">
                    {
                        ratedOrders.map(ratedOrder => (
                            (ratedOrder.isPositive && typeOfReviewsToShow == "positive" || typeOfReviewsToShow == "all") ?
                                <Review review={ratedOrder} />
                                : (!ratedOrder.isPositive && typeOfReviewsToShow == "negative" || typeOfReviewsToShow == "all") &&
                                <Review review={ratedOrder} />

                        ))
                    }
                </div>

            }

        </div>
    )
}

export default Account;