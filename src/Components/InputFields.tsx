import { useState, useRef, memo } from "react";
import { TPhoneSpecifications, TSpecifications } from "../../types";
import { SendGet, SendPost, SendPostImage } from "../../Hooks/useFetch";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { Turnstile } from '@marsidev/react-turnstile'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import { DEBUG } from "../../types";

import 'animate.css';
import ComputerInputs from "./InputCollections/ComputerInputs";
import LaptopInputs from "./InputCollections/LaptopInputs";
import PhoneInputs from "./InputCollections/PhoneInputs";
import Select from "./Functionality/Select";

const InputFields = ({ type }: { type: string }) => {

    const turnstileRef = useRef<TurnstileInstance>();
    const [specifications, setspecifications] = useState<TSpecifications>({ cpuMake: "", gpuMake: "", memory: [{ memoryType: "" }] });
    const [phoneSpecifications, setPhoneSpecifications] = useState<TPhoneSpecifications>({ make: "" });

    const [flags, setFlags] = useState<string[]>([]);

    const [imagesCount, setImagesCount] = useState<number>();

    const priceRef = useRef<HTMLInputElement>(null);
    const [state, setState] = useState('');
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const originalLinkRef = useRef<HTMLInputElement>(null);
    //const amountRef = useRef<HTMLInputElement>(null);

    const [deleteOnSale, setDeleteOnSale] = useState(false);
    const [overclocked, setOverclocked] = useState(false);
    const [sellerPaysForTransport, setsellerPaysForTransport] = useState(false);

    const [uploadLoading, setUploadLoading] = useState(false);

    const [titleCharsLeft, setTitleCharsLeft] = useState(40);

    const navigate = useNavigate();

    const PostListing = async () => {
        const formData = new FormData();
        formData.append('seshID', String(Cookies.get("seshID")));
        for (let i = 0; i < document.querySelector("#image-upload")!.files.length; i++) {
            formData.append('file', document.querySelector("#image-upload")!.files[i]);
        }
        if (state == "" && type!="digital-zone") return alert("Morate da izaberete stanje");
        let promise;
        switch (type) {
            case "computer":
            case "laptop":
                promise = SendPost("post-listing", {
                    specifications,
                    title: titleRef.current!.value,
                    description: descriptionRef.current!.value,
                    price: priceRef.current!.value,
                    state: state,
                    overclocked: false,
                    type: type,
                    deleteOnSale: true,
                    originalLink: originalLinkRef.current?.value,
                    sellerPaysForTransport: false,
                    flags: flags,
                    turnstileToken: turnstileRef.current?.getResponse(),
                    seshID: Cookies.get("seshID")
                });
                break;
            case "phone":
                promise = SendPost("post-listing", {
                    phoneSpecifications,
                    title: titleRef.current!.value,
                    description: descriptionRef.current!.value,
                    price: priceRef.current!.value,
                    state: state,
                    overclocked: false,
                    type: type,
                    deleteOnSale: true,
                    originalLink: originalLinkRef.current?.value,
                    sellerPaysForTransport: false,
                    flags: flags,
                    turnstileToken: turnstileRef.current?.getResponse(),
                    seshID: Cookies.get("seshID")
                });
                break;
            case "digital-zone":
                promise = SendPost("post-listing", {
                    title: titleRef.current!.value,
                    description: descriptionRef.current!.value,
                    price: priceRef.current!.value,
                    state: "new",
                    overclocked: false,
                    type: type,
                    deleteOnSale: true,
                    originalLink: originalLinkRef.current?.value,
                    sellerPaysForTransport: false,
                    flags: flags,
                    turnstileToken: turnstileRef.current?.getResponse(),
                    seshID: Cookies.get("seshID")
                });
                break;
            case "phone-parts":
            case "component":
                promise = SendPost("post-listing", {
                    title: titleRef.current!.value,
                    description: descriptionRef.current!.value,
                    price: priceRef.current!.value,
                    state: state,
                    overclocked: false,
                    type: type,
                    deleteOnSale: true,
                    originalLink: originalLinkRef.current?.value,
                    sellerPaysForTransport: false,
                    flags: flags,
                    turnstileToken: turnstileRef.current?.getResponse(),
                    seshID: Cookies.get("seshID")
                });
                break;

            default:
                break;
        }
        promise.then(data => {
            if (data.status != 200) return alert("Greška u dodavanju oglasa: " + data.reason);
            formData.append("listingID", data.listingID);
            setUploadLoading(true);
            SendPostImage("update-listing-images", formData).then(data => {
                console.log(data.status);
                setUploadLoading(false);
                navigate("/account");
            });
        });

    }



    return (
        <div className="flex flex-col gap-[0px] w-full sm:mt-20 text-[16px] mb-20">
            <div className="flex gap-5 bg-transparent border border-mint rounded-[10px] items-center">
                <input maxLength={40} id="titleInput" className="px-2 h-[40px] bg-transparent focus:outline-none w-full  font-semibold" type="text" placeholder="Naslov" ref={titleRef} onChange={() => setTitleCharsLeft(40 - titleRef.current?.value.length)} />
                <p className={`p-2 ${titleCharsLeft > 10 ? "opacity-25" : (titleCharsLeft <= 10 && titleCharsLeft > 5) ? "text-gold opacity-75" : titleCharsLeft <= 5 && "text-red opacity-100"}`}>{titleCharsLeft}</p>
            </div>

            <div className="flex flex-wrap w-full gap-5 mt-[24px] font-semibold">
                <div className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none rounded-[10px] flex items-center justify-between sm:grow w-full sm:w-auto">
                    <input className="appearence-none h-[40px] bg-transparent focus:outline-none  rounded-[10px] w-full" type="number" placeholder="Cena" ref={priceRef} />
                    <p className="opacity-50">EUR</p>
                </div>
                { type!="digital-zone"&&
                <Select title="Izaberite stanje" options={[
                    {
                        title: "Novo",
                        value: "new"
                    },
                    {
                        title:"Polovno",
                        value:"used"
                    }
                ]} setState={setState}  customHeight="40" transparentBG={true}/>
            }

                {
                    (state == 'resell' || state == 'new') &&
                    <input className="h-[40px] px-2 bg-transparent focus:outline-none border border-mint rounded-[10px] sm:grow w-full sm:w-auto" type="text" placeholder="Originalni link" ref={originalLinkRef} />

                }
            </div>



            {type == "computer" && <ComputerInputs setspecifications={setspecifications} specifications={specifications} />}
            {type == "laptop" && <LaptopInputs setspecifications={setspecifications} specifications={specifications} />}
            {type == "phone" && <PhoneInputs setPhoneSpecifications={setPhoneSpecifications} phoneSpecifications={phoneSpecifications} />}

            <div className="flex relative border border-mint bg-transparent w-full rounded-[10px] mt-[64px] mb-[24px]">
                <textarea className="p-2 bg-transparent focus:outline-none w-full" cols={30} rows={10} placeholder="Opis oglasa" ref={descriptionRef} />
                <div className="group min-w-[24px] mt-2 mx-2">
                    <img className="opacity-100" src="help-circle.svg" alt="" />
                    <p style={{ pointerEvents: "none" }} className="group-hover:opacity-100 opacity-0 absolute sm:top-[50px] top-10 right-[0px] z-50 sm:right-0 text-nowrap bg-mint px-5 py-3 rounded-[10px] text-black text-left transition transform duration-700 ease-in-out w-[300px]">
                        <span className="text-[20px] font-semibold">Formatiranje teksta</span> <br /> <br /> Tekst izmedju "**" karaktera je boldovan (**<span className="font-semibold">bold</span>**) <br /> <br /> Tekst izmedju "*" karaktera je italic (*<span className="italic">italic</span>*) <br /> <br /> Za listu koristite "-" ili "*" <br /> - stvar <br /> * stvar <br /> <br /> Sve ispred "#" se tretira kao naslov i imaće najveća slova <br /> <br /> Sve ispred "##" se tretira kao manji naslov i imaće veća slova od običnog teksta, najbolje se koristi kao pod-naslov
                    </p>
                </div>
            </div>
            <div className="self-center w-full flex flex-col gap-5">
                <button className="bg-transparent border border-mint border-dashed relative p-2 rounded-[10px] flex gap-3 w-full sm:py-20 items-center justify-center"><p className="hidden sm:block">Dodaj ili prevuci fotografije ovde</p> <p className="sm:hidden">Dodaj fotografije</p> <img src="upload-cloud.svg" alt="" /><input className="opacity-0 absolute top-[0%] sm:left-[0%] sm:p-20 px-[1000px] cursor-pointer" multiple={true} type="file" accept="image/png, image/jpeg, image/jpg" id="image-upload" onChange={() => setImagesCount(document.querySelector("#image-upload")!.files.length)} /></button>
                {imagesCount && <p className="self-end"><span className="font-semibold">{imagesCount}</span></p>}
            </div>
            <div className="flex gap-5 flex-wrap mt-[24px]">
                {
                    flags.map((flag, i) => (
                        <select key={i} className="appearance-none px-2 h-[40px] dark:bg-transparent bg-[rgb(12,40,50)] text-mint dark:text-mint border border-mint focus:outline-none grow rounded-[10px] animate__animated animate__fadeIn font-semibold" onChange={(e) => setFlags(prevState => {
                            return (
                                [
                                    ...flags.slice(0, flags.length - 1),
                                    e.target.value
                                ]
                            )
                        })}>
                            <option value="novo">Novo</option>
                            <option value="gaming">Gaming</option>
                            <option value="očuvano">Očuvano</option>
                            <option value="jeftino">Jeftino</option>
                            <option value="uveženo">Uveženo</option>
                        </select>
                    ))
                }
            </div>

            <div className="flex justify-center mt-[24px]">
                <button className="py-[10px] px-[16px] rounded-[10px] flex items-center justify-items-center bg-transparent border border-mint gap-[8px] border-opacity-50 transition transform duration-700 ease-in-out hover:border-opacity-100" onClick={() => flags.length < 3 && setFlags(prevState => {
                    return (
                        [
                            ...prevState,
                            "novo"
                        ]
                    )
                })}>
                    <img src="plus.svg" alt="" />
                    <p>Dodaj oznaku</p>
                </button>
            </div>


            <div className="self-center my-5">
                <Turnstile ref={turnstileRef} siteKey={DEBUG ? "1x00000000000000000000AA" : '0x4AAAAAAAEbz9q1tfKj1Giw'} />
            </div>

            <button className="w-[192px] h-[44px] bg-transparent self-center border border-mint rounded-[10px] flex items-center justify-center flex gap-3" onClick={PostListing}>
                <p>Postavi oglas</p>
                {
                    uploadLoading &&
                    <img className="animate-spin" src="loader.svg" alt="" />
                }
            </button>

        </div>

    )
}

export default InputFields;