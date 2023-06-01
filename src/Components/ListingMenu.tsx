import 'animate.css';
import { useEffect, useState } from 'react';
import { SendGet, SendPost } from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_live_51Ml5ztIP5AtTAbJj7I7p1QVgioonzNktROCKLpjyTxRkIjKQWnnMdQQDcsPnzpBFaSPCpZ83TwHV5mHGjbbYYDHY005E6HsWHt");

import CheckoutForm from "./CheckoutForm";

const ListingMenu = ({ HandleClose, listingID, sellerMode, isPromotedHome, isPromotedTop }: { HandleClose: Function, listingID: string, sellerMode: boolean, isPromotedHome: boolean, isPromotedTop: boolean }) => {

    // Get if following the listing to know if follow or unfollow is needed
    // 

    const [showPromoteMenu, setShowPromoteMenu] = useState(false);
    const [showFollow, setShowFollow] = useState(false);
    const [showProlongListing, setShowProlongListing] = useState(false);
    const [promoteChosen, setPromoteChosen] = useState<string>();

    const [clientSecret, setClientSecret] = useState("");


    const navigate = useNavigate();

    useEffect(() => {

        SendGet("get-is-following-listing", { seshID: Cookies.get("seshID"), listingID: listingID }).then(data => {
            //console.log(data);
            setShowFollow(data.isFollowingListing);
        });
        SendGet("get-if-expires-shortly", { listingID: listingID }).then(data => {
            setShowProlongListing(data.expiresShortly);
        });
    }, []);

    const HandleFollow = () => {
        SendPost("change-follow-state", { listingID: listingID, newState: 'follow', seshID: Cookies.get("seshID") }).then(data => {
            if (data.status == 200) { setShowFollow(true), HandleClose(); };
        });
    }
    const HandleUnfollow = () => {
        SendPost("change-follow-state", { listingID: listingID, newState: 'unFollow', seshID: Cookies.get("seshID") }).then(data => {
            if (data.status == 200) { setShowFollow(false); HandleClose(); };
        });
    }

    const HandleDeleteListing = () => {
        SendPost("delete-listing", { seshID: Cookies.get("seshID"), listingID: listingID }).then(data => {
            if (data.status != 200) return alert("Problem sa brisanjem oglasa...");
            location.reload();
        });
    }

    const CreatePaymentIntent = (promoteType: string) => {
        SendPost("create-payment-intent", { promoteType: promoteType }).then(data => {
            setClientSecret(data.clientSecret)
        })
    }

    const HandleProlongListing =()=>{
        SendPost("prolong-listing",{listingID:listingID,seshID:Cookies.get("seshID")}).then(data=>{
            if(data.status != 200) return alert("Greška pri produžavanju ogalsa...");

            return location.reload();
        });
    }

    const appearance = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#F4FFF8',
            colorBackground: '#092A37',
            colorText: '#F4FFF8',
            colorDanger: '#df1b41',
            fontFamily: 'Poppins, system-ui, sans-serif',
            spacingUnit: '3px',
            borderRadius: '10px',
            // See all possible variables below
        }
    }
    const options = {
        clientSecret,
        appearance,
    };

    return (
        showPromoteMenu ?
            clientSecret ? (
                <div className="flex flex-col gap-5 p-2">
                    <p className='self-center text-[20px] font-semibold'>Cena (€): {promoteChosen == "topPage" ? "5" : "10"}</p>

                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm listingID={listingID} />
                    </Elements>
                </div>

            ) :
                <div className="absolute right-0 top-[60px] w-[220px] flex flex-col gap-5 p-5 rounded-[10px] bg-listing-dark border border-green animate__animated animate__fadeIn z-50 items-center">
                    <div className="flex justify-between w-full">
                        <p className='font-semibold text-[14px]'>Promocija oglasa</p>
                        <button className='transition transform duration-700 ease-in-out hover:scale-110' onClick={() => setShowPromoteMenu(false)}><img src="back-arrow.svg" alt="" /></button>
                    </div>
                    {!clientSecret && <button className='px-3 items-center border border-mint rounded-[10px] w-full text-center justify-between flex text-[14px] h-[31px] p-2 hover:bg-listing-light transition transform duration-700 ease-in-out hover:scale-105' onClick={() => { CreatePaymentIntent("topPage"); setPromoteChosen("topPage") }}>Vrh oglasa <img src="promote.svg" alt="" /></button>}
                    {!clientSecret && <button className='px-3 items-center border border-mint rounded-[10px] w-full text-center justify-between flex text-[14px] h-[31px] p-2 hover:bg-listing-light transition transform duration-700 ease-in-out hover:scale-105' onClick={() => { CreatePaymentIntent("home"); setPromoteChosen("home") }}>Početna strana <img src="home-mint.svg" alt="" /></button>}

                </div>
            :
            <div className="absolute flex flex-col gap-5 p-5 rounded-[10px] right-0 top-[60px] w-[220px] bg-listing-dark border border-green animate__animated animate__fadeIn z-50">

                <div className="flex gap-3 items-center justify-between">
                    <p className="text-[14px] font-semibold">Moguće akcije</p>
                    <button className='transition transform duration-700 ease-in-out hover:scale-110 hover:border rounded-full' onClick={HandleClose}><img src="exit.svg" alt="" /></button>
                </div>

                {
                    (sellerMode && !isPromotedHome && !isPromotedTop) &&
                    <button onClick={() => setShowPromoteMenu(true)} className="flex gap-3 items-center border border-mint rounded-[10px] h-[31px] p-2 hover:bg-listing-light transition transform duration-700 ease-in-out hover:scale-105">
                        <img src="promote.svg" alt="" />
                        <p className="text-[14px]">Promoviši oglas</p>
                    </button>
                }
                {
                    (sellerMode && showProlongListing) &&
                    <button onClick={HandleProlongListing} className="flex gap-3 items-center border border-gold rounded-[10px] h-[31px] p-2 hover:bg-listing-light transition transform duration-700 ease-in-out hover:scale-105">
                        <img src="clock.svg" alt="" />
                        <p className="text-[14px]">Produži oglas</p>
                    </button>
                }
                {(!showFollow && !showPromoteMenu) ? !sellerMode &&
                    <button id='follow' onClick={HandleFollow} className={`flex gap-3 items-center border border-mint rounded-[10px] h-[31px] p-2 hover:bg-listing-light transition transform duration-700 ease-in-out hover:scale-105 ${sellerMode && "cursor-not-allowed"}`}>
                        <img src="eye.svg" alt="" />
                        <p className="text-[14px]">Prati oglas</p>
                    </button>
                    : !showPromoteMenu &&
                    <button id='unfollow' onClick={HandleUnfollow} className="flex gap-3 items-center border border-mint rounded-[10px] h-[31px] p-2 hover:bg-listing-light transition transform duration-700 ease-in-out hover:scale-105">
                        <img src="eye-off.svg" alt="" />
                        <p className="text-[14px]">Otprati oglas</p>
                    </button>
                }
                {
                    sellerMode &&
                    <button id='follow' onClick={HandleDeleteListing} className={`flex gap-3 items-center border border-mint rounded-[10px] h-[31px] p-2 hover:bg-listing-light transition transform duration-700 ease-in-out hover:scale-105`}>
                        <img src="x.svg" alt="" />
                        <p className="text-[14px]">Obriši oglas</p>
                    </button>
                }

            </div>
    )
}

export default ListingMenu;