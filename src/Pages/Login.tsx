import { useRef, useEffect, useState } from "react";
import { SendPost } from '../../Hooks/useFetch';
import Cookies from 'js-cookie';
import { redirect, useNavigate } from "react-router-dom";

import 'animate.css';
import { Helmet } from "react-helmet-async";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import {DEBUG} from "../../types";


const Login = () => {
    const navigate = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const turnstileRef = useRef<TurnstileInstance>();

    const [requestLoading, setRequestLoading] = useState(false);

    const [reason, setReason] = useState(
        document.location.href.includes("?reason=") && document.location.href.split("?reason=")[1]
    )
    const [fadeOut, setFadeOut] = useState(false);

    const HandleLoginClick = () => {
        setRequestLoading(true);
        SendPost("validate-user", { username: usernameRef.current!.value, password: passwordRef.current!.value,turnstileToken:turnstileRef.current?.getResponse() }).then(data => {
            setRequestLoading(false);
            if (data.status != 200) return alert("Problem sa logovanjem..." + data.reason);
            Cookies.set("seshID", data.seshID,{expires:7});
            Cookies.set("username", data.username,{expires:7});
            navigate("/");
        })
    }

    useEffect(() => {
        if (Cookies.get("seshID")) navigate("/");
        if (!reason) return;

        setTimeout(() => {
            setFadeOut(true);
        }, 2000);
    }, []);


    return (
        <div className="flex flex-col h-screen sm:w-[400px] w-[90%] mx-auto text-mint">
            <Helmet>
                <title>Tech Oglasi - Login</title>
                <meta name='description' content='Tech oglasi login, kompjuteri, laptopovi, komponente' />
            </Helmet>
            <h1 className="self-center text-center text-[32px] pt-5">Tech Oglasi</h1>
            <div className="flex flex-col items-center justify-center h-full gap-[11px] w-full self-center">
                <h1 className="text-[24px] text-center w-full">Svet tehnologije vas čeka</h1>
                <div className="w-[216px] h-[3px] bg-mint opacity-25"></div>
                <p className=" animate__animated animate__fadeInDown">Vreme je za nešto novo</p>
                <input className="mt-10  px-2 h-[40px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] lowercase" type="text" placeholder="Korisničko ime" ref={usernameRef} />
                <input className=" px-2 h-[40px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px]" type="password" placeholder="Šifra" name="password" ref={passwordRef} />
                <div className="flex justify-between w-full mt-5">
                    <p className="text-[14px] ">Još uvek nemaš nalog?</p>
                    <a className="underline text-[14px] " href="/register">Registracija</a>
                </div>
                <Turnstile ref={turnstileRef} siteKey={DEBUG ? "1x00000000000000000000AA" :'0x4AAAAAAAEbz9q1tfKj1Giw'} />
                <button className="flex items-center justify-center gap-3 w-full h-[50px] bg-mint text-black font-semibold rounded-[10px] " onClick={HandleLoginClick}>Uloguj se {requestLoading && <img className="animate-spin" src="loader-black.svg" />}</button>
                {
                    reason &&
                    <div className={`flex flex-col gap-3 bg-red py-5 px-2 text-mint rounded-[10px] w-full text-center font-semibold transition transform duration-[2000ms] ease-in-out items-center ${fadeOut ? "opacity-0 cursor-default" : "opacity-75"}`}>
                        <img className="w-[32px]" src="alert-octagon-mint.svg" alt="" />
                        <p id="message">{reason == "message" ? "Da bi ste slali poruke morate biti ulogovani" : reason == "account" ? "Da bi ste pristupili nalog stranici morate biti ulogovani" : reason == "order" ? "Da bi ste poručivali morate biti ulogovani" : reason == "add-listing" && "Da bi ste dodavali oglase morate biti ulogovani"}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Login;