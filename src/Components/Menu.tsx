import { useEffect, useState } from "react";
import { SendGet } from "../../Hooks/useFetch";
import Cookies from "js-cookie";

import { TAlert } from "../../types";

const Menu = () => {

    // Get request here to check for notifications and new messages
    const [currPage, setCurrPage] = useState(
        window.location.pathname
    );

    const [alerts, setAlerts] = useState<TAlert>();

    // Get what page you are currently on to signal the menu what to bold with href

    useEffect(() => {
        if (!Cookies.get("seshID")) return;
        SendGet("get-alerts", { seshID: Cookies.get("seshID") }).then(data => {
            if (data.status != 200) return;
            setAlerts(data.alerts);
        });
        setInterval(() => {
            SendGet("get-alerts", { seshID: Cookies.get("seshID") }).then(data => {
                if (data.status != 200) return;
                setAlerts(data.alerts);
            });
        }, 60000);
    }, []);

    return (
        <div>
            <div className="flex fixed z-50 sm:hidden px-10 items-center justify-between bottom-0 w-screen h-[50px] rounded-tl-[20px] rounded-tr-[20px] rounded-br-[0px] rounded-bl-[0px] bg-mint">
                <a href="/"><img src="home.svg" alt="" /></a>
                <a href="/add-listing"><img src="add.svg" alt="" /></a>
                <a href="/listings"><img src="search.svg" alt="" /></a>
                <a className="relative" href="/chat"><img src="message.svg" alt="" />{alerts?.message && <div className="w-[8px] h-[8px] absolute bg-red rounded-full right-0 top-0"><div className="w-[8px] h-[8px] absolute relative bg-red rounded-full right-0 top-0 animate-ping"></div></div>}</a>
                <a className="relative" href="/account"><img src="user.svg" alt="" />{alerts?.order && <div className="w-[8px] h-[8px] absolute bg-red rounded-full right-0 top-0"><div className="w-[8px] h-[8px] absolute relative bg-red rounded-full right-0 top-0 animate-ping"></div></div>}</a>
            </div>
            <div className="hidden sm:flex my-[24px] w-[600px] mx-auto items-center justify-between text-mint">
                <a className={`${currPage == "/" && "font-semibold"} text-[20px] relative transition transform duration-700 ease-in-out hover:scale-105`} href="/">Početna {currPage == "/" && <div className="absolute h-[3px] w-full bg-listing-light"></div>}</a>
                <a className={`${currPage == "/add-listing" && "font-semibold"} text-[20px] relative transition transform duration-700 ease-in-out hover:scale-105`} href="/add-listing">Dodaj oglas {currPage == "/add-listing" && <div className="absolute h-[3px] w-full bg-listing-light"></div>}</a>
                <a className={`${currPage == "/listings" && "font-semibold"} text-[20px] relative transition transform duration-700 ease-in-out hover:scale-105`} href="/listings">Oglasi {currPage == "/listings" && <div className="absolute h-[3px] w-full bg-listing-light"></div>}</a>
                <a className={`${currPage == "/chat" && "font-semibold"} text-[20px] relative transition transform duration-700 ease-in-out hover:scale-105`} href="/chat"><p>Poruke {currPage == "/chat" && <div className="absolute h-[3px] w-full bg-listing-light"></div>}</p> {alerts?.message && <div className="w-[8px] h-[8px] absolute bg-green rounded-full right-0 top-[-4px]"><div className="w-[8px] h-[8px] absolute relative bg-green rounded-full right-0 top-0 animate-ping"></div></div>}</a>
                <a className={`${currPage == "/account" && "font-semibold"} text-[20px] relative transition transform duration-700 ease-in-out hover:scale-105`} href="/account"><p>Nalog {currPage == "/account" && <div className="absolute h-[3px] w-full bg-listing-light"></div>}</p> {(alerts?.listing || alerts?.order) && <div className="w-[8px] h-[8px] absolute bg-green rounded-full right-0 top-[-4px]"><div className="w-[8px] h-[8px] absolute relative bg-green rounded-full right-0 top-0 animate-ping"></div></div>}</a>
            </div>
        </div>
    )
}

export default Menu;