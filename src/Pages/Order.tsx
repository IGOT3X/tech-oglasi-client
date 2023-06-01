import Menu from "../Components/Menu";
import MobileBack from "../Components/MobileBack";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { SendGet, SendPost } from "../../Hooks/useFetch";
import { TListing, DEBUG } from "../../types";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import ReactMarkdown from "react-markdown";


const Order = () => {

    // NEEDS TO HAVE AN OPTION TO BUY DIGITAL GOODS


    const turnstileRef = useRef<TurnstileInstance>();

    const [listingPicLoading, setListingPicLoading] = useState(true);
    const [sellerUsername, setSellerUsername] = useState<string>();
    const [listing, setListing] = useState<TListing>();

    const [listingOrderState, setListingOrderState] = useState<string>();


    const navigate = useNavigate();

    useEffect(() => {
        if (!document.location.href.includes("?listingID=")) return navigate("/listings");
        if (!Cookies.get("seshID")) return navigate("/login?reason=order");

        SendGet("get-listing", { listingID: document.location.href.split("?listingID=")[1] }).then(data => {
            setListing(data.listing);
            setListingPicLoading(false);
        });
        GetListingOrderState();

        setInterval(() => {
            GetListingOrderState();

        }, 5000);

    }, []);

    const GetListingOrderState = () => {
        SendGet("get-listing-order-state", { listingID: document.location.href.split("?listingID=")[1] }).then(data => {
            console.log(data);
            setListingOrderState(data.listingOrderState);
        })
    }

    const HandleOrdrer = () => {
        // If user does not have necessairy info return a 400 and issue an alert.
        SendPost("change-listing-state", { listingID: document.location.href.split("?listingID=")[1], newState: "order", seshID: Cookies.get("seshID"), turnstileToken: turnstileRef.current?.getResponse() }).then(data => {
            if (data.status != 200) return alert(data.reason);
            GetListingOrderState();
            navigate("/account");
        })
    }

    return (
        <div className="flex flex-col w-screen h-full sm:max-w-[1150px] mx-auto text-mint pb-20">
            <MobileBack />
            <Menu />
            <h1 className="text-[24px] text-center sm:mt-20">Direktno poručivanje</h1>
            <div className="flex gap-5 self-center">
                <div className="flex flex-col gap-5">
                    <h1 className={`text-[20px] self-center sm:self-start font-semibold ${listing?.type == "component" ? "self-center" : "self-start"} pt-10`}>{listing?.title}</h1>
                    <div className="flex sm:flex-row flex-col gap-5">
                        <div className="flex flex-col gap-3">
                            {!listingPicLoading ? listing?.images[0] ? <img className="w-[350px] object-cover h-[360px] rounded-[10px] self-center" src={`data:image/png;base64,${btoa(new Uint8Array(listing.images[0].data).reduce((data, byte) => { return data + String.fromCharCode(byte) }, ''))}`} alt="" /> : <p className="self-center w-[350px] h-[360px] flex items-center justify-center border border-mint rounded-[10px]">Oglas ne poseduje slike</p> : <div className="self-center w-[350px] h-[360px] flex items-center justify-center border border-mint rounded-[10px]"><img className="animate-spin w-[24px]" src="loader.svg" /></div>}

                            <div className="flex mt-2">
                                {
                                    listing?.flags.map((flag, i) => (
                                        <div key={i} className="bg-mint bg-opacity-25 border border-mint text-mint rounded-[10px] px-2 h-[26px] mr-2">
                                            <p>{flag[0].toUpperCase() + flag.substring(1, flag.length)}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        {listing?.type != "component" &&
                                <div className="flex flex-col gap-5 sm:w-[300px] w-[90%] mx-auto sm:mx-0">
                                    <div className="flex flex-col gap-5 items-start px-2 justify-center text-center bg-listing-dark py-5 w-full rounded-[10px] mt-5 sm:mt-0">
                                        {(listing?.specifications.cpuModel || listing?.specifications.cpuMake) ?
                                            <div className="flex items-start text-left gap-3">
                                                <img src="cpu.svg" alt="" />
                                                <p>{listing?.specifications.cpuMake?.charAt(0).toUpperCase() + listing.specifications?.cpuMake?.slice(1)} {listing?.specifications.cpuModel} {listing?.specifications.cpuSpeed && ' @ ' + listing?.specifications.cpuSpeed + ' GHZ'}</p>
                                            </div>
                                            :
                                            <div className="flex items-start text-left gap-3">
                                                <img src="cpu.svg" alt="" />
                                                <p>Procesor nije unet</p>
                                            </div>
                                        }
                                        {listing?.specifications.gpuModel ?
                                            <div className="flex items-start text-left gap-3">
                                                <img src="gpu.svg" alt="" />
                                                <p>{listing?.specifications.gpuMake?.charAt(0).toUpperCase() + listing.specifications?.gpuMake?.slice(1)} {listing?.specifications.gpuModel} {listing?.specifications.gpuSpeed && ' @ ' + listing?.specifications.gpuSpeed + ' MHZ'}</p>
                                            </div>
                                            :
                                            <div className="flex items-start text-left gap-3">
                                                <img src="gpu.svg" alt="" />
                                                <p>Grafička kartica nije unešena</p>
                                            </div>
                                        }
                                        {(listing?.specifications.ram && (listing?.specifications.ram[0].ramModel || listing?.specifications.ram[0].ramMake || listing?.specifications.ram[0].ramAmount)) ?
                                            <div className="flex flex-col items-start text-left gap-5">
                                                {
                                                    listing.specifications.ram.map((ram, i) => (
                                                        <div className="flex items-start text-left gap-3">
                                                            <img src="ram.svg" alt="" />
                                                            <p>{ram.ramAmount && ram.ramAmount + 'GB'} {ram.ramMake && ram.ramMake} {ram.ramModel && ram.ramModel} {ram.ramSpeed && ' @ ' + ram.ramSpeed + ' MHZ'}</p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            :
                                            <div className="flex items-start text-left gap-3">
                                                <img src="ram.svg" alt="" />
                                                <p>Ram nije unet</p>
                                            </div>
                                        }

                                        <div className="flex items-start text-left gap-3">
                                            <img src="mb.svg" alt="" />
                                            {(listing?.specifications.mbModel || listing?.specifications.mbMake) ?
                                                <p>{listing.specifications.mbMake} {listing?.specifications.mbModel}</p>
                                                :
                                                <p>Matična nije uneta</p>
                                            }
                                        </div>

                                        <div className="flex items-start text-left gap-3">
                                            <img src="psu.svg" alt="" />
                                            {listing?.specifications.psuModel || listing?.specifications.psuMake || listing?.specifications.psuPower ?
                                                <p>{listing.specifications?.psuMake} {listing.specifications?.psuModel} {listing.specifications?.psuPower + " W"}</p>
                                                :
                                                <p>Napajanje nije uneto</p>
                                            }
                                        </div>
                                        <div className="flex items-start text-left gap-3">

                                            {(listing?.specifications.memory && (listing?.specifications.memory[0].memoryModel || listing?.specifications.memory[0].memoryMake || listing?.specifications.memory[0].memoryAmount)) ?
                                                <div className="flex flex-col gap-5">
                                                    {listing.specifications.memory.map(memory => (
                                                        <div className="flex gap-3">
                                                            <img src="storage.svg" alt="" />
                                                            <p>{memory.memoryType?.toUpperCase()} {memory.memoryMake} {memory.memoryModel} {memory.memoryAmount && memory.memoryAmount + ' GB'} {memory.memorySpeed && ' @ ' + memory.memorySpeed + ' MB/s'}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                :
                                                <div className="flex gap-3">
                                                    <img src="storage.svg" alt="" />
                                                    <p>Memorijski prostor nije unet</p>
                                                </div>
                                            }
                                        </div>
                                        {listing?.type == "laptop" &&
                                            <div className="flex items-start text-left gap-3">
                                                <img src="screen.svg" alt="" />
                                                {listing?.specifications.screenResolution ?
                                                    <p>{listing.specifications.screenResolution}</p>
                                                    :
                                                    <p>Rezolucija ekrana nije uneta</p>
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div className="flex mt-2">
                                        {
                                            listing?.flags.map((flag, i) => (
                                                <div key={i} className="bg-mint bg-opacity-25 border border-mint text-mint rounded-[10px] px-2 h-[26px] mr-2">
                                                    <p>{flag[0].toUpperCase() + flag.substring(1, flag.length)}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                    </div>
                </div>

            </div>
            {
                listing?.description &&
                <div className="px-2 flex gap-3 self-center w-[350px] items-center justify-center text-left bg-listing-dark py-5 rounded-[10px] mt-5">
                    <div className="break-all">
                        <ReactMarkdown>
                            {listing.description}
                        </ReactMarkdown>
                    </div>                
                </div>
            }

            {
                !listingOrderState ?
                    <button onClick={HandleOrdrer} className="self-center mt-10 border border-mint flex bg-listing-dark text-mint gap-3 items-center justify-center rounded-[10px] px-4 h-[44px] transition transform duration-700 ease-in-out hover:scale-105 hover:bg-listing-light">Poruči <img src="cart.svg" alt="" /></button>
                    :
                    <p className="self-center text-[20px] mt-10">Ovaj oglas je {listingOrderState == "fulfilled" ? "već prodat" : "već poručen"}</p>
            }
            {listingOrderState == "" &&
                <div className="flex w-[294px] sm:w-full items-start sm:items-center gap-3 self-center justify-center mt-5">
                    <img src="alert-octagon.svg" alt="" />
                    <p className="opacity-25 text-[12px]">Nakon što kliknete poruči prodavac zadržava pravo da otkaže porudžbinu. Možete pratiti status porudžbine na vašem nalogu.</p>
                </div>
            }
            <div className="self-center mt-5">
                <Turnstile ref={turnstileRef} siteKey={DEBUG ? "1x00000000000000000000AA" : '0x4AAAAAAAEbz9q1tfKj1Giw'} />

            </div>

        </div>
    )
}

export default Order;