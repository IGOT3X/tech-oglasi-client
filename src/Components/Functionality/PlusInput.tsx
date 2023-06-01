import { useEffect, useRef, useState } from "react";
import Select from "./Select";

const PlusInput = ({ title, setState, dropDownOptions, subMenuOptions }: { title?: string, setState?: Function, dropDownOptions?: { title: string, value: string }[], subMenuOptions?: { setFunction: Function, type: String } }) => {
    const [enabled, setEnabled] = useState(false);
    const [value, setValue] = useState<string | number | null>();


    const cpuMakeRef = useRef<HTMLInputElement>(null);
    const cpuModelRef = useRef<HTMLInputElement>(null);
    const cpuMinSpeedRef = useRef<HTMLInputElement>(null);

    const ramMakeRef = useRef<HTMLInputElement>(null);
    const ramModelRef = useRef<HTMLInputElement>(null);
    const ramMinSpeedRef = useRef<HTMLInputElement>(null);
    const ramMinAmountRef = useRef<HTMLInputElement>(null);

    const gpuMakeRef = useRef<HTMLInputElement>(null);
    const gpuModelRef = useRef<HTMLInputElement>(null);
    const gpuMinSpeedRef = useRef<HTMLInputElement>(null);
    const gpuMinRamAmountRef = useRef<HTMLInputElement>(null);

    const [memoryType, setMemoryType] = useState<string>();
    const memoryMinAmountRef = useRef<HTMLInputElement>(null);
    const memoryMakeRef = useRef<HTMLInputElement>(null);
    const memoryModelRef = useRef<HTMLInputElement>(null);

    const mbMakeRef = useRef<HTMLInputElement>(null);
    const mbModelRef = useRef<HTMLInputElement>(null);

    const psuMakeRef = useRef<HTMLInputElement>(null);
    const psuModelRef = useRef<HTMLInputElement>(null);

    const phoneColorRef = useRef<HTMLInputElement>(null);
    const phoneMinRamRef = useRef<HTMLInputElement>(null);
    const phoneMinMemoryRef = useRef<HTMLInputElement>(null);

    const [phoneMake, setPhoneMake] = useState<string>();




    useEffect(() => {
        if (!setState) return;
        setEnabled(false);
        setState(value);
    }, [value]);

    useEffect(() => {
        if (subMenuOptions)
            !enabled && subMenuOptions.setFunction({});
    }, [enabled]);

    useEffect(() => {
        SetSpecs();
    }, [memoryType, phoneMake])

    const SetSpecs = () => {
        (subMenuOptions?.type == "computer" || subMenuOptions?.type == "laptop") &&
            subMenuOptions?.setFunction({

                cpuMake: cpuMakeRef.current?.value.toLowerCase(),
                cpuModel: cpuModelRef.current?.value.toLowerCase(),
                cpuSpeed: cpuMinSpeedRef.current?.value,

                ramSpeed: ramMinSpeedRef.current?.value,
                ramAmount: ramMinAmountRef.current?.value,
                ramModel: ramModelRef.current?.value.toLowerCase(),
                ramMake: ramMakeRef.current?.value.toLowerCase(),

                gpuMake: gpuMakeRef.current?.value.toLowerCase(),
                gpuModel: gpuModelRef.current?.value.toLowerCase(),
                gpuSpeed: gpuMinSpeedRef.current?.value,
                gpuRam: gpuMinRamAmountRef.current?.value,

                memoryType: memoryType,
                memoryMake: memoryMakeRef.current?.value.toLowerCase(),
                memoryModel: memoryModelRef.current?.value.toLowerCase(),
                memoryAmount: memoryMinAmountRef.current?.value,

                mbMake: mbMakeRef.current?.value.toLowerCase(),
                mbModel: mbModelRef.current?.value.toLowerCase(),

                psuMake: psuMakeRef.current?.value.toLowerCase(),
                psuModel: psuModelRef.current?.value.toLowerCase(),

            });

        (subMenuOptions?.type == "phone") &&
            subMenuOptions?.setFunction({

                phoneMake: phoneMake,
                phoneColor: phoneColorRef.current?.value.toLocaleLowerCase(),
                phoneRamSize: phoneMinRamRef.current?.value,
                phoneMemorySize: phoneMinMemoryRef.current?.value

            });
    }

    return (
        <div onClick={() => (!enabled && !value) && setEnabled(true)} className={`flex ${((dropDownOptions || subMenuOptions) && enabled) && "w-full"} items-start gap-[8px] bg-transparent border border-mint border-opacity-25 py-[6px] px-[12px] rounded-[10px] text-mint cursor-pointer transition transform duration-700 ease-in-out hover:border-opacity-50`}>
                <button className={`${(dropDownOptions && !enabled) ? "pt-[2px]" : ((dropDownOptions && enabled) || (subMenuOptions && enabled)) ? "pt-[11px]" : "pt-[2px]"}`} onClick={() => { !value ? setEnabled(false) : setValue(null); }}><img className="w-[18px]" src={((enabled || value)) ? "delete.svg" : "plus.svg"} alt="" /></button>
        
            {(value && !enabled) && <button className="pt-[2px]" onClick={() => { setEnabled(true) }}><img className="w-[18px]" src={"settings.svg"} alt="" /></button>}
            {!enabled ?
                <div className="flex gap-[8px] items-center">
                    <p className="text-[14px] pt-[1px]">{!value ? title : !dropDownOptions ? value : title}</p>
                    {(value && !dropDownOptions) && <p className="opacity-50">EUR {title?.includes("Max") ? <span className="text-[12px]">(max)</span> :<span className="text-[12px]">(min)</span>}</p>}
                </div>
                :
                (!dropDownOptions && !subMenuOptions) ?
                    <div className="flex gap-[8px]">
                        <input className="bg-transparent appearance-none focus:outline-none w-[50px]" type="number" onBlur={(e) => { setEnabled(false); setValue(e.target.value) }} />
                        <p className="opacity-50">EUR</p>
                    </div>
                    :
                    dropDownOptions ?
                        <Select title={title ? title : "EMPTY]]]]"} options={dropDownOptions} setState={setValue} customHeight="40" customWidth="full" transparentBG={true} />
                        :
                        (subMenuOptions && (subMenuOptions.type == "computer" || subMenuOptions?.type == "laptop")) ?
                            <div className="flex flex-wrap w-full gap-[24px]">
                                <div className="flex gap-[8px] self-center justify-center items-center mx-auto mt-[8px]">
                                    <p>Procesor</p>
                                    <img className="w-[24px]" src="ram.svg" alt="" />
                                </div>
                                <div className="flex sm:flex-row w-full flex-col gap-[8px]">
                                    <input className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full p-[8px]" placeholder="Proizvodjač" type="text" ref={cpuMakeRef} onBlur={SetSpecs} />
                                    <input className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full p-[8px]" placeholder="Model" type="text" ref={cpuModelRef} onBlur={SetSpecs} />
                                    <input className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full p-[8px]" placeholder="Min brzina" type="number" ref={cpuMinSpeedRef} onBlur={SetSpecs} />
                                </div>

                                <div className="flex gap-[8px] self-center justify-center items-center mx-auto mt-[8px]">
                                    <p>Ram</p>
                                    <img className="w-[24px]" src="ram.svg" alt="" />
                                </div>
                                <div className="flex sm:flex-row w-full flex-col gap-[8px]">
                                    <input className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full p-[8px]" placeholder="Proizvodjač" type="text" ref={ramMakeRef} onBlur={SetSpecs} />
                                    <input className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full p-[8px]" placeholder="Model" type="text" ref={ramModelRef} onBlur={SetSpecs} />
                                </div>
                                <div className="flex sm:flex-row w-full flex-col gap-[8px]">
                                    <div className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full gap-[8px] flex items-center p-[8px]">
                                        <input className="bg-transparent appearance-none focus:outline-none w-full" placeholder="Min. brzina" type="number" onBlur={SetSpecs} ref={ramMinSpeedRef} />
                                        <p className="opacity-50 mr-[8px]">MHZ</p>
                                    </div>
                                    <div className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full gap-[8px] flex items-center p-[8px]">
                                        <input className="bg-transparent appearance-none focus:outline-none w-full" placeholder="Min. količina" type="number" onBlur={SetSpecs} ref={ramMinAmountRef} />
                                        <p className="opacity-50 mr-[8px]">GB</p>
                                    </div>
                                </div>

                                <div className="flex gap-[8px] self-center justify-center items-center mx-auto mt-[8px]">
                                    <p>Grafička kartica</p>
                                    <img className="w-[24px]" src="gpu.svg" alt="" />
                                </div>
                                <div className="flex sm:flex-row w-full flex-col gap-[8px]">
                                    <input className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full p-[8px]" placeholder="Proizvodjač" type="text" ref={gpuMakeRef} onBlur={SetSpecs} />
                                    <input className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full p-[8px]" placeholder="Model" type="text" ref={gpuModelRef} onBlur={SetSpecs} />
                                </div>
                                <div className="flex sm:flex-row w-full flex-col gap-[8px]">
                                    <div className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full gap-[8px] flex items-center p-[8px]">
                                        <input className="bg-transparent appearance-none focus:outline-none w-full" placeholder="Min. brzina" type="number" onBlur={SetSpecs} ref={gpuMinSpeedRef} />
                                        <p className="opacity-50 mr-[8px]">MHZ</p>
                                    </div>
                                    <div className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full gap-[8px] flex items-center p-[8px]">
                                        <input className="bg-transparent appearance-none focus:outline-none w-full" placeholder="Min. količina" type="number" onBlur={SetSpecs} ref={gpuMinRamAmountRef} />
                                        <p className="opacity-50 mr-[8px]">GB</p>
                                    </div>
                                </div>

                                <div className="flex gap-[8px] self-center justify-center items-center mx-auto mt-[8px]">
                                    <p>Memorija</p>
                                    <img className="w-[24px]" src="storage.svg" alt="" />
                                </div>
                                <div className="flex sm:flex-row w-full flex-col gap-[8px]">
                                    <Select title={"Tip memorije"} options={[
                                        {
                                            title: "Sve",
                                            value: "all"
                                        },
                                        {
                                            title: "SSD",
                                            value: "ssd"
                                        },
                                        {
                                            title: "HDD",
                                            value: "hdd"
                                        },
                                        {
                                            title: "M.2",
                                            value: "m.2"
                                        }
                                    ]} setState={setMemoryType} customHeight="40" customWidth="full" transparentBG={true} />
                                    <input className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full p-[8px]" placeholder="Proizvodjač" type="text" ref={memoryMakeRef} onBlur={SetSpecs} />
                                </div>
                                <div className="flex sm:flex-row w-full flex-col gap-[8px]">
                                    <input className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full p-[8px]" placeholder="Model" type="number" ref={memoryModelRef} onBlur={SetSpecs} />
                                    <div className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full gap-[8px] flex items-center p-[8px]">
                                        <input className="bg-transparent appearance-none focus:outline-none w-full" placeholder="Min. količina" type="number" onBlur={SetSpecs} ref={memoryMinAmountRef} />
                                        <p className="opacity-50 mr-[8px]">GB</p>
                                    </div>
                                </div>
                                <div className="flex gap-[8px] self-center justify-center items-center mx-auto mt-[8px]">
                                    <p>Matična ploča</p>
                                    <img className="w-[24px]" src="mb.svg" alt="" />
                                </div>
                                <div className="flex sm:flex-row w-full flex-col gap-[8px]">
                                    <input className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full p-[8px]" placeholder="Proizvodjač" type="text" ref={mbMakeRef} onBlur={SetSpecs} />
                                    <input className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full p-[8px]" placeholder="Model" type="text" ref={mbModelRef} onBlur={SetSpecs} />
                                </div>

                                <div className="flex gap-[8px] self-center justify-center items-center mx-auto mt-[8px]">
                                    <p>Napajanje</p>
                                    <img className="w-[24px]" src="psu.svg" alt="" />
                                </div>
                                <div className="flex sm:flex-row w-full flex-col gap-[8px]">
                                    <input className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full p-[8px]" placeholder="Proizvodjač" type="text" ref={psuMakeRef} onBlur={SetSpecs} />
                                    <input className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full p-[8px]" placeholder="Model" type="text" ref={psuModelRef} onBlur={SetSpecs} />
                                </div>
                            </div>
                            :
                            <div className="flex flex-wrap w-full gap-[24px]">
                                <div className="flex gap-[8px] self-center justify-center items-center mx-auto mt-[8px]">
                                    <p>Boja</p>
                                    <img className="w-[24px]" src="color.svg" alt="" />
                                </div>
                                <div className="flex sm:flex-row w-full flex-col gap-[8px]">
                                    <input className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full p-[8px]" placeholder="Crna, siva, bela..." type="text" ref={phoneColorRef} onBlur={SetSpecs} />
                                </div>
                                <div className="flex gap-[8px] self-center justify-center items-center mx-auto mt-[8px]">
                                    <p>Specifikacije</p>
                                    <img className="w-[24px]" src="cpu.svg" alt="" />
                                </div>
                                <div className="flex sm:flex-row w-full flex-col gap-[8px]">
                                    <Select customHeight="40" customWidth="full" title="Proizvodjač" setState={setPhoneMake} options={[
                                        { title: "Sve", value: "all" },
                                        {
                                            title: "Apple",
                                            value: "apple"
                                        },
                                        {
                                            title: "Alcatel",
                                            value: "alcatel"
                                        }, {
                                            title: "Samsung",
                                            value: "samsung"
                                        }, {
                                            title: "Nokia",
                                            value: "nokia"
                                        }, {
                                            title: "Motorola",
                                            value: "motorola"
                                        }, {
                                            title: "Sony",
                                            value: "sony"
                                        }, {
                                            title: "Huawei",
                                            value: "huawei"
                                        }, {
                                            title: "Lenovo",
                                            value: "lenovo"
                                        }, {
                                            title: "HTC",
                                            value: "htc"
                                        }, {
                                            title: "ZTE",
                                            value: "zte"
                                        }, {
                                            title: "Xiaomi",
                                            value: "xiaomi"
                                        },
                                    ]} />
                                </div>
                                <div className="flex sm:flex-row w-full flex-col gap-[8px]">

                                    <div className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full gap-[8px] flex items-center p-[8px]">
                                        <input className="bg-transparent appearance-none focus:outline-none w-full" placeholder="Min. količina ram-a" type="number" onBlur={SetSpecs} ref={phoneMinRamRef} />
                                        <p className="opacity-50 mr-[8px]">GB</p>
                                    </div>
                                    <div className="bg-transparent appearance-none focus:outline-none border border-mint rounded-[10px] w-full gap-[8px] flex items-center p-[8px]">
                                        <input className="bg-transparent appearance-none focus:outline-none w-full" placeholder="Min. količina ram-a" type="number" onBlur={SetSpecs} ref={phoneMinMemoryRef} />
                                        <p className="opacity-50 mr-[8px]">GB</p>
                                    </div>
                                </div>
                            </div>
            }
        </div>
    )
    //check if there are options, values to know if it is a dropwdown type
}

export default PlusInput;