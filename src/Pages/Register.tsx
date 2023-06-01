import { useRef,useEffect, useState } from "react";
import {SendPost} from '../../Hooks/useFetch';
import Cookies from 'js-cookie';
import { redirect, useNavigate } from "react-router-dom";

import 'animate.css';
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

import {DEBUG} from '../../types';

const Register = () =>{

    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);


    const turnstileRef = useRef<TurnstileInstance>();

    const [requestLoading,setRequestLoading] = useState(false);


    const HandleRegistrationClick = ()=>{

        if(passwordRef.current!.value != passwordConfirmRef.current!.value) return alert("Šifre nisu iste");
        setRequestLoading(true);
        SendPost("create-new-user",{username:usernameRef.current!.value,password:passwordRef.current!.value,email:emailRef.current!.value,turnstileToken:turnstileRef.current?.getResponse()}).then(data=>{
            setRequestLoading(false);
            if (data.status !=200) return alert("Problem sa kreiranjem naloga..." + data.reason);
            Cookies.set("seshID",data.seshID,{expires:7});
            Cookies.set("username",data.username,{expires:7});
            navigate("/");

        })
    }

    useEffect(()=>{
        if (Cookies.get("seshID")) navigate("/");

    },[]);


    return(
        <div className="flex flex-col h-screen sm:w-[400px] w-[90%] mx-auto text-mint">
            <h1 className="self-center text-center text-[32px] pt-5">Tech Oglasi</h1>
            <div className="flex flex-col items-center justify-center h-full gap-[11px] w-[294px] 2xl:w-[400px] self-center">
                <h1 className="text-[24px] text-center w-full">Svet tehnologije vas čeka</h1>
                <div className="w-[216px] h-[3px] bg-mint opacity-25"></div>
                <p className="animate__animated animate__fadeInDown">Unesite podatke radi registracije</p>
                <input className=" mt-10 px-2 h-[40px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px]" type="text" placeholder="Email" ref={emailRef}/>
                <input className=" px-2 h-[40px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] lowercase" type="text" placeholder="Korisničko ime" ref={usernameRef}/>
                <input className=" px-2 h-[40px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px]" type="password" placeholder="Šifra" name="password" ref={passwordRef}/>
                <input className=" px-2 h-[40px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px]" type="password" placeholder="Šifra ponovo" name="password-confirmation" ref={passwordConfirmRef}/>
                <div className="flex justify-between w-full mt-5">
                    <p className="text-[14px] ">Poseduješ nalog?</p>
                    <a className="underline text-[14px] " href="/login">Uloguj se</a>
                </div>
                <Turnstile ref={turnstileRef} siteKey={DEBUG ? "1x00000000000000000000AA" :'0x4AAAAAAAEbz9q1tfKj1Giw'} />
                <button className="flex items-center justify-center gap-3 w-full h-[50px] bg-mint text-black font-semibold rounded-[10px] " onClick={HandleRegistrationClick}>Registruj se {requestLoading&&<img className="animate-spin" src="loader-black.svg"/>}</button>
            </div>
        </div>
    )
}

export default Register;