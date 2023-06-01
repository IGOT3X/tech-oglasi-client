import Menu from "../Components/Menu";
import SearchBar from "../Components/SearchBar";
import Listing from "../Components/ListingPreview";

import { useState, useEffect } from "react";
import { TListing } from "../../types";

import 'animate.css';
import Cookies from "js-cookie";
import { SendGet } from "../../Hooks/useFetch";
import ListingPreview from "../Components/ListingPreview";

import { Helmet } from "react-helmet-async";
import FAQ from "../Components/FAQ";
const Home = () => {

    const [promotedTopListings, setPromotedTopListings] = useState<TListing[]>([]);
    const [promotedTopListingsLoading, setPromotedTopListingsLoading] = useState(true);

    const [mostViewedPCs, setMostViewedPCs] = useState<TListing[]>([]);
    const [mostViewedPCsLoading, setMostViewedPCsLoading] = useState(true);

    const [mostViewedLaptops, setMostViewedLaptops] = useState<TListing[]>([]);
    const [mostViewedLaptopsLoading, setMostViewedLaptopsLoading] = useState(true);

    const [mostViewedPhones, setMostViewedPhones] = useState<TListing[]>([]);
    const [mostViewedPhonesLoading, setMostViewedPhonesLoading] = useState(true);

    const [mostViewedPhoneParts, setMostViewedPhoneParts] = useState<TListing[]>([]);
    const [mostViewedPhonePartsLoading, setMostViewedPhonePartsLoading] = useState(true);

    const [mostViewedComponents, setMostViewedComponents] = useState<TListing[]>([]);
    const [mostViewedComponentsLoading, setMostViewedComponentsLoading] = useState(true);

    const [mostViewedDigitalGoods, setMostViewedDigitalGoods] = useState<TListing[]>([]);
    const [mostViewedDigitalGoodsLoading, setMostViewedDigitalGoodsLoading] = useState(true);



    const [readAlert, setReadAlert] = useState(true);

    useEffect(() => {
        // Get all promoted top listings from the database and place them in the promotedTopListings
        SendGet("get-listings", { limit: 20, skip: 0, isPromotedHome: true }).then(data => {
            setPromotedTopListings(data.listings);
            if (data.listings) setPromotedTopListingsLoading(false);
        });
        SendGet("get-popular-listings", {}).then(data => {
            setMostViewedPCs(data.popularPCs);
            if (data.popularPCs) setMostViewedPCsLoading(false);
            setMostViewedLaptops(data.popularLaptops);
            if (data.popularLaptops) setMostViewedLaptopsLoading(false);
            setMostViewedComponents(data.popularComponents);
            if (data.popularComponents) setMostViewedComponentsLoading(false);
            setMostViewedPhones(data.popularPhones);
            if (data.popularPhones) setMostViewedPhonesLoading(false);
            setMostViewedPhoneParts(data.popularPhoneParts);
            if (data.popularPhoneParts) setMostViewedPhonePartsLoading(false);
            setMostViewedDigitalGoods(data.popularDigitalGoods);
            if (data.popularDigitalGoods) setMostViewedDigitalGoodsLoading(false);
        })
        if (Cookies.get("readAlert") != 'yes') setReadAlert(false);
    }, []);

    const HandleDismissAlert = () => {
        setReadAlert(true);
        Cookies.set("readAlert", "yes", { expires: 7 });
    }

    return (
        <div className="flex flex-col w-screen h-full text-mint pb-10 sm:max-w-[1150px] mx-auto">
            <Helmet>
                <title>Tech Oglasi | Polovni i novi kompjuteri, laptopovi i komponente</title>
                <meta name='description' content='Tech oglasi vam omogućavaju da prodajete nove ili polovne računare, laptopove kao i komponente.' />
            </Helmet>
            {!readAlert && <div className="bg-mint flex gap-5 p-5 sm:p-2 items-center justify-center rounded-b-[10px]">
                <img src="alert-octagon-black.svg" alt="alert-image" />
                <p className="text-black">Otvorili smo <a target="_blank" href="https://discord.gg/QmgbRTKMze" className="underline text-green font-semibold">discord</a> server na kome možete glasati za ideje, prijavljivati greške i još mnogo toga.</p>
                <button className="w-[24px] min-w-[24px]" onClick={HandleDismissAlert}><img className="w-[24px]" src="x.svg" alt="dismiss button" /></button>
            </div>}

            {false && <h1 className="text-[24px] m-5 absolute hidden sm:block">Tech Oglasi</h1>}
            <div className="sm:hidden w-[294px] flex items-center justify-between mx-auto">
                <h1 className="text-[24px] m-5">Tech Oglasi</h1>
                <a href="/listings" className="w-[96px] h-[26px] bg-mint text-blue flex items-center justify-center rounded-[10px]">Svi oglasi &gt;</a>
            </div>
            <div className="sm:hidden self-center">
                {<SearchBar /> /* THIS IS NOT OPTIMIZED. FIND A WAY TO LOAD SEARCH BAR ONCE INSTEAD OF 2 TIMES */}
                <div className="w-[216px] h-[3px] bg-mint opacity-25 my-10 mx-auto rounded-[10px]"></div>
            </div>
            <Menu />
            <div className="hidden sm:flex gap-5 items-start justify-center h-[80px]">
                <SearchBar />
            </div>
            <h1 className="hidden sm:block text-[32px] font-semibold self-center mt-5">Tech Oglasi</h1>
            <p className="hidden sm:block self-center text-center mt-3  opacity-[40%]">Tech oglasi vam omogućavaju da prodajete nove ili polovne računare, laptopove kao i komponente.</p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-5 sm:mt-20">
                <a href="/listings?type=computer" className="self-center px-5 py-2 flex flex-col items-center justify-center gap-5 bg-listing-dark hover:bg-listing-light rounded-[10px] transition transform duration-700 ease-in-out hover:scale-105 border border-mint border-opacity-0 hover:border-opacity-100 mx-auto group shadow-2xl">
                    <img className="max-w-[200px] h-[200px]" src="pc.png" alt="kompjuter" />
                    <h1 className="text-[16px] font-semibold py-2 transition transform duration-700 ease-in-out opacity-25 group-hover:opacity-100">Kompjuteri</h1>
                </a>
                <a href="/listings?type=laptop" className="self-center px-5 py-2 flex flex-col items-center justify-center gap-5 bg-listing-dark hover:bg-listing-light rounded-[10px] transition transform duration-700 ease-in-out hover:scale-105 border border-mint border-opacity-0 hover:border-opacity-100 mx-auto group shadow-2xl">
                    <img className="max-w-[200px] h-[200px]" src="laptop.png" alt="laptop" />
                    <h1 className="text-[16px] font-semibold py-2 transition transform duration-700 ease-in-out opacity-25 group-hover:opacity-100">Laptopovi</h1>
                </a>
                <a href="/listings?type=component" className="self-center px-5 py-2 flex flex-col items-center justify-center gap-5 bg-listing-dark hover:bg-listing-light rounded-[10px] transition transform duration-700 ease-in-out hover:scale-105 border border-mint border-opacity-0 hover:border-opacity-100 mx-auto group shadow-2xl">
                    <img className="max-w-[200px] h-[200px]" src="component.png" alt="komponenta" />
                    <h1 className="text-[16px] font-semibold py-2 transition transform duration-700 ease-in-out opacity-25 group-hover:opacity-100">Komponente</h1>
                </a>
            </div>
            {/*  <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:mt-20 sm:gap-[128px] gap-5 mt-5">
                <a href="/listings?type=phone" className="self-center px-5 py-2 flex flex-col items-center justify-center gap-5 bg-listing-dark hover:bg-listing-light rounded-[10px] transition transform duration-700 ease-in-out hover:scale-105 border border-mint border-opacity-0 hover:border-opacity-100 group shadow-2xl">
                    <img className="max-w-[200px] h-[200px]" src="phone.png" alt="telefoni" />
                    <h1 className="text-[16px] font-semibold py-2 transition transform duration-700 ease-in-out opacity-25 group-hover:opacity-100">Telefoni</h1>
                </a>
                <a href="/listings?type=phone-parts" className="self-center px-5 py-2 flex flex-col items-center justify-center gap-5 bg-listing-dark hover:bg-listing-light rounded-[10px] transition transform duration-700 ease-in-out hover:scale-105 border border-mint border-opacity-0 hover:border-opacity-100  group shadow-2xl">
                    <img className="max-w-[200px] h-[200px]" src="phone-parts.png" alt="delovi za telefone" />
                    <h1 className="text-[16px] font-semibold py-2 transition transform duration-700 ease-in-out opacity-25 group-hover:opacity-100">Delovi za telefone</h1>
                </a>
            </div> */}

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-5 sm:mt-20">
                <a href="/listings?type=phone" className="self-center px-5 py-2 flex flex-col items-center justify-center gap-5 bg-listing-dark hover:bg-listing-light rounded-[10px] transition transform duration-700 ease-in-out hover:scale-105 border border-mint border-opacity-0 hover:border-opacity-100 mx-auto group shadow-2xl">
                    <img className="max-w-[200px] h-[200px]" src="phone.png" alt="telefoni" />
                    <h1 className="text-[16px] font-semibold py-2 transition transform duration-700 ease-in-out opacity-25 group-hover:opacity-100">Telefoni</h1>
                </a>
                <a href="/listings?type=phone-parts" className="self-center px-5 py-2 flex flex-col items-center justify-center gap-5 bg-listing-dark hover:bg-listing-light rounded-[10px] transition transform duration-700 ease-in-out hover:scale-105 border border-mint border-opacity-0 hover:border-opacity-100 mx-auto group shadow-2xl">
                    <img className="max-w-[200px] h-[200px]" src="phone-parts.png" alt="delovi za telefone" />
                    <h1 className="text-[16px] font-semibold py-2 transition transform duration-700 ease-in-out opacity-25 group-hover:opacity-100">Delovi za telefone</h1>
                </a>
                <a href="/listings?type=digital-zone" className="self-center px-5 py-2 flex flex-col items-center justify-center gap-5 bg-listing-dark hover:bg-listing-light rounded-[10px] transition transform duration-700 ease-in-out hover:scale-105 border border-mint border-opacity-0 hover:border-opacity-100 mx-auto group shadow-2xl">
                    <img className="max-w-[200px] h-[200px]" src="discord.jpeg" alt="nalozi i igrice" />
                    <h1 className="text-[16px] font-semibold py-2 transition transform duration-700 ease-in-out opacity-25 group-hover:opacity-100">Digitalna zona</h1>
                </a>
            </div>

            <div className="h-[2px] sm:w-full w-[50%] self-center bg-mint opacity-20 my-10 sm:my-20"></div>
            {
                promotedTopListingsLoading &&
                <div className="flex self-center gap-3">
                    <p>Promovisani oglasi se učitavaju...</p>
                    <img className="animate-spin w-[24px]" src="loader.svg" alt="oglasi se učitavaju" />

                </div>
            }
            {promotedTopListings.length > 0 &&
                <div className="flex gap-5 self-center sm:self-start">
                    <h1 className="text-[24px] font-semibold">Istaknuti oglasi</h1>
                    <img src="star-gold.svg" alt="istaknuti oglasi" />
                </div>
            }

            {(promotedTopListings.length > 0) &&
                <div className="flex gap-10 self-center items-center justify-between flex-wrap mt-10">
                    {promotedTopListings.map((listing, i) => (
                        <div className="mx-auto">
                            <ListingPreview key={i} listing={listing} />
                        </div>
                    ))
                    }
                </div>}
            {
                mostViewedPCsLoading &&
                <div className="flex self-center gap-3">
                    <p>Popularni računari se učitavaju...</p>
                    <img className="animate-spin w-[24px]" src="loader.svg" alt="" />

                </div>
            }
            {
                mostViewedPCs.length > 0 &&
                <div className="flex gap-3 self-center mt-10 sm:self-start">
                    <h1 className="text-[24px] font-semibold">Popularni kompjuteri</h1>
                    <img src="trending.svg" alt="popularni kompjuteri" />
                </div>
            }
            {
                (mostViewedPCs?.length > 0) &&
                <div className="mt-10 flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap">
                    {
                        mostViewedPCs.map((listing, i) => (
                            <ListingPreview key={i} listing={listing} />
                        ))
                    }
                </div>
            }
            {
                mostViewedLaptopsLoading &&
                <div className="flex self-center gap-3">
                    <p>Popularni laptopovi se učitavaju...</p>
                    <img className="animate-spin w-[24px]" src="loader.svg" alt="" />

                </div>
            }
            {mostViewedLaptops.length > 0 &&
                <div className="flex gap-3 self-center mt-10 sm:self-start">
                    <h1 className="text-[24px] font-semibold">Popularni laptopovi</h1>
                    <img src="trending.svg" alt="popularni laptopovi" />
                </div>
            }
            {(mostViewedLaptops?.length > 0) &&
                <div className="mt-10 flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap">

                    {
                        mostViewedLaptops.map((listing, i) => (
                            <ListingPreview key={i} listing={listing} />
                        ))
                    }
                </div>
            }
            {mostViewedPhones.length > 0 &&
                <div className="flex gap-3 self-center mt-10 sm:self-start">
                    <h1 className="text-[24px] font-semibold">Popularni telefoni</h1>
                    <img src="trending.svg" alt="popularni laptopovi" />
                </div>
            }
            {(mostViewedPhones?.length > 0) &&
                <div className="mt-10 flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap">
                    {mostViewedPhones.map((listing, i) => (
                        <ListingPreview key={i} listing={listing} />
                    ))
                    }
                </div>
            }
            {
                mostViewedPhonesLoading &&
                <div className="flex self-center gap-3">
                    <p>Popularni telefoni se učitavaju...</p>
                    <img className="animate-spin w-[24px]" src="loader.svg" alt="" />

                </div>
            }
            {mostViewedPhoneParts.length > 0 &&
                <div className="flex gap-3 self-center mt-10 sm:self-start">
                    <h1 className="text-[24px] font-semibold">Popularni delovi za telefone</h1>
                    <img src="trending.svg" alt="popularni laptopovi" />
                </div>
            }
            {(mostViewedPhoneParts?.length > 0) &&
                <div className="mt-10 flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap">
                    {mostViewedPhoneParts.map((listing, i) => (
                        <ListingPreview key={i} listing={listing} />
                    ))
                    }
                </div>
            }
            {
                mostViewedPhonePartsLoading &&
                <div className="flex self-center gap-3">
                    <p>Popularni delovi za telefone se učitavaju...</p>
                    <img className="animate-spin w-[24px]" src="loader.svg" alt="" />

                </div>
            }
            {
                mostViewedDigitalGoodsLoading &&
                <div className="flex self-center gap-3">
                    <p>Popularna digitalna dobra se učitavaju...</p>
                    <img className="animate-spin w-[24px]" src="loader.svg" alt="" />

                </div>
            }
            {
                mostViewedComponentsLoading &&
                <div className="flex self-center gap-3">
                    <p>Popularne komponente se učitavaju...</p>
                    <img className="animate-spin w-[24px]" src="loader.svg" alt="" />

                </div>
            }
            {mostViewedComponents.length > 0 &&
                <div className="flex gap-3 self-center mt-10 sm:self-start">
                    <h1 className="text-[24px] font-semibold">Popularne komponente</h1>
                    <img src="trending.svg" alt="popularne komponente" />
                </div>
            }
            <div className="mt-10 flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap">

                {(mostViewedComponents?.length > 0) &&
                    mostViewedComponents.map((listing, i) => (
                        <ListingPreview key={i} listing={listing} />
                    ))
                }
            
            </div>
            {mostViewedDigitalGoods.length > 0 &&
                <div className="flex gap-3 self-center mt-10 sm:self-start">
                    <h1 className="text-[24px] font-semibold">Popularna digitalna dobra</h1>
                    <img src="trending.svg" alt="popularne komponente" />
                </div>
            }
            <div className="mt-10 flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap">

                {(mostViewedDigitalGoods?.length > 0) &&
                    mostViewedDigitalGoods.map((listing, i) => (
                        <ListingPreview key={i} listing={listing} />
                    ))
                }
            </div>
            <div className="flex self-center sm:self-start mt-10 gap-3">
                <h1 className="text-[24px] font-semibold">Često postavljana pitanja</h1>
                <img src="help-circle.svg" alt="" />
            </div>

            <FAQ />
            <div className="flex flex-wrap gap-10 items-start justify-center">
            </div>
            <p className="self-center mt-20 text-[12px] font-semibold">&copy; TECH-TECH 2023</p>
            <img className="w-[64px] self-center mt-5 transition transform duration-700 ease-in-out hover:scale-110" src="Logo.png" alt="TECH-TECH logo" />
            <div className="flex flex-col justify-center items-center gap-1 mt-5 sm:mb-0 mb-20">
                <a className="underline text-[12px] text-center" href="/privacy-policy">Politika privatnosti</a>
                <a className="underline text-[12px] text-center" href="/terms-and-conditions">Uslovi korišćenja</a>
            </div>
        </div>

    )
}

export default Home;