import Menu from "../Components/Menu";
import MobileBack from "../Components/MobileBack";
import SearchBar from "../Components/SearchBar";

import { useState, useEffect, useRef } from "react";
import { TFilter, TListing } from "../../types";
import { SendGet } from "../../Hooks/useFetch";
import ListingPreview from "../Components/ListingPreview";

import { Helmet } from "react-helmet-async";
import FilterBar from "../Components/FilterBar";

const Listings = () => {

    const [promotedListings, setPromotedListings] = useState<TListing[]>([]);
    const [listings, setListings] = useState<TListing[]>([]);
    const [listingAmount, setListingAmount] = useState(0);

    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState<TFilter>();


    const [searchTerm, setSearchTerm] = useState<string>("");

    const [checkedUrl, setCheckedUrl] = useState(false);


    useEffect(() => {
        if (!checkedUrl) return;
        setLoading(true);
        setListings([]);

        if (filters) {
            setLoading(true);
            SendGet("get-listings", {
                skip: listingAmount,
                search: searchTerm,
                filters: JSON.stringify(filters)
            }).then(data => {
                setListings(data.listings);
                setLoading(false);
            });
        }

        if (!filters)
            SendGet("get-listings", {
                skip: listingAmount,
                search: searchTerm
            }).then(data => {
                setListings(data.listings);
                setLoading(false);
            });
        // Get promoted listings


    }, [listingAmount, filters, searchTerm, checkedUrl]);

    useEffect(() => {
        SendGet("get-listings", { limit: 20, skip: 0, isPromotedTop: true }).then(data => {
            setPromotedListings(data.listings);
        });

        if (document.location.href.includes("?type="))
            setFilters({ listingType: document.location.href.split("?type=")[1] });
        if (document.location.href.includes("?search="))
            setSearchTerm(decodeURI(document.location.href.split("?search=")[1]));

        setCheckedUrl(true);
    }, []);


    return (
        <div className="flex flex-col sm:max-w-[1150px] mx-auto">
            <Helmet>
                <title>Tech Oglasi - Polovni ili novi kompjuteri, računari, laptopovi, komponente</title>
                <meta name='description' content='Polovni ili novi kompjuteri, laptopovi, komponente, sve na jednom mestu!' />
            </Helmet>
            <MobileBack />
            <Menu />
            <div className="flex flex-col gap-10 items-center">
                <div className="flex">
                    <SearchBar setSearch={setSearchTerm} />
{/*                     <button onClick={()=>filterMenuRef.current?.ToggleMenu()} className="self-start p-2 transition transform duration-700 ease-in-out bg-mint bg-opacity-0 hover:bg-opacity-25 rounded-[10px] ml-2">
                        <img src="filter.svg"/>
                    </button> */}
                </div>
            </div>
{/*             <div className="self-center mt-5 sm:mt-0">
                <FilterMenu setFilters={setFilters} currentFilters={filters} ref={filterMenuRef}/>
            </div> */}
            <FilterBar setFilters={setFilters} filters={filters}/>

            {
                (promotedListings.length > 0 && !filters && !searchTerm) &&
                <div className="flex gap-5 self-center mt-0 sm:self-start text-mint">
                    <h1 className="text-[24px] font-semibold">Istaknuti oglasi</h1>
                    <img src="star-gold.svg" alt="" />
                </div>
            }
            <div className="mt-10 flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap">
                {(promotedListings.length > 0 && !filters && !searchTerm) &&
                    promotedListings.map((listing, i) => (
                        <ListingPreview key={i} listing={listing} />
                    ))
                }
            </div>
            {
                listings.length > 0 &&
                <div className="flex gap-5 self-center sm:self-start text-mint">
                    <h1 className="text-[24px] font-semibold">{filters ? "Rezultati filtera" : searchTerm ? "Rezultati pretrage" : "Svi oglasi"}</h1>
                    {filters && <img src="filter.svg" alt="" />}
                </div>}
            <div className="flex gap-x-[11%] gap-y-5 justify-center self-center items-start w-full flex-wrap mt-10">
                {
                    loading &&
                    <div className="flex gap-5 text-mint">
                        <p>Oglasi se učitavaju</p>
                        <img className="animate-spin" src="loader.svg" alt="" />
                    </div>
                }
                {
                    !loading && (
                        (listings.length <= 0 && !filters) ?
                            checkedUrl && <p className="text-mint text-[24px] font-semibold mb-10 sm:mb-0 text-center">Trenutno nema oglasa</p>
                            : (listings.length <= 0 && filters) &&
                            checkedUrl && <p className="text-mint text-[24px] font-semibold mb-10 sm:mb-0 self-center text-center">Trenutno nema oglasa sa izabranim filterima</p>
                    )

                }
                {
                    listings.map((listing, i) => (
                        <ListingPreview key={i} listing={listing} />
                    ))
                }
            </div>
            <div className="self-center mt-10 flex gap-5">
                {
                    (listingAmount >= 10) &&
                    <button onClick={() => setListingAmount(listingAmount - 10)} className="bg-listing-dark hover:bg-listing-light text-mint flex gap-3 items-center justify-center rounded-[10px] px-4 h-[44px] transition transform duration-700 ease-in-out hover:scale-105 border border-mint">Prethodna strana</button>

                }
                {(listings.length % 10 == 0 && listings.length != 0) &&
                    <button onClick={() => setListingAmount(listingAmount + 10)} className="bg-listing-dark hover:bg-listing-light text-mint flex gap-3 items-center justify-center rounded-[10px] px-4 h-[44px] transition transform duration-700 ease-in-out hover:scale-105 border border-mint">Sledeća strana</button>
                }
            </div>
            {listings.length > 0 && <p className="self-center text-mint mt-5 sm:mb-10 mb-20">Stranica: {(listingAmount / 10) + 1}</p>}

        </div>

    )
}
// When you get to the bottom of the page make sure to load more listings and show the loader component...


export default Listings;