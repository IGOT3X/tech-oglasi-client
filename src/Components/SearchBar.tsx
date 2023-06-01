import { useState, useEffect } from "react";
import { TTerms } from '../../types';

import { SendGet, SendPost } from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";

import 'animate.css';


const SearchBar = ({ setSearch }: { setSearch: Function }) => {

    const [searchToggled, setSearchToggled] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [topTerms, setTopTerms] = useState<TTerms[]>();
    const navigate = useNavigate();
    // Do a get for the most searched terms

    // If not on listings page, redirect to it and auto fill itself with the search you did.

    const GetPopularSearchTerms = () => {
        SendGet("get-popular-search-terms", {}).then(data => {
            setTopTerms(data.terms);
        });
    }

    useEffect(() => {
        GetPopularSearchTerms();
    }, []);

    const UpdateSearchTermPopularity = () => {
        SendPost("UpdateSearchTermPopularity", { searchTerm: searchTerm }).then(data => { })
    }

    const Search = () => {
        UpdateSearchTermPopularity()
        if (!document.location.href.includes("listings"))
            return navigate("/listings?search=" + searchTerm);
        setSearch(searchTerm);
    }

    return (
        <div className={`${document.location.href.includes("listings")?"sm:w-[580px] w-[294px]":"sm:w-[600px] w-[294px]"}`}>
            <div className="h-[40px] w-full flex border border-mint bg-transparent rounded-[10px]">
                <input className="mx-3 border border-mint text-mint focus:outline-none w-full rounded-[10px] outline:none border-none bg-transparent" type="text" placeholder="Brza pretraga" onFocus={() => { setSearchToggled(true); GetPopularSearchTerms(); }} onBlur={() => setSearchToggled(false)} onChange={e => setSearchTerm(e.target.value)} value={searchTerm} onKeyDown={e => e.key == 'Enter' && setSearch(searchTerm)} />
                <div className="w-[48px] flex items-center justify-center mx-3 my-1 transition transform duration-700 ease-in-out hover:bg-gray rounded-[10px]">
                    <img onClick={Search} className="w-[24px] cursor-pointer " src="search-mint.svg" alt="" />
                </div>
            </div>
            {
                searchToggled &&
                <div className={`${document.location.href.includes("listings")?"sm:w-[580px]":"sm:w-[600px] w-[294px]"} flex gap-2 mt-2 animate__animated animate__fadeIn overflow-x-auto pb-5 self-start rounded-b-[30px]`}>
                    {
                        topTerms?.map(term => (
                            term.term.toLowerCase().includes(searchTerm.toLowerCase()) && <div key={term.term} className="cursor-pointer hover:underline h-[26px] rounded-[10px] px-2 bg-mint text-blue flex-none" onMouseDown={() => setSearchTerm(term.term)}>
                                {term.term.charAt(0).toUpperCase() + term.term.slice(1)}
                            </div>
                        ))
                    }
                </div>
            }
        </div>

    )
}

export default SearchBar;