import { useEffect, useState } from "react";
import { TPhoneSpecifications } from "../../../types"
import Select from "../Functionality/Select";

const PhoneInputs = ({ setPhoneSpecifications, phoneSpecifications }: { setPhoneSpecifications: Function, phoneSpecifications: TPhoneSpecifications }) => {

    const [specificationsChosen, setSpecificationsChosen] = useState({
        make: false,
        color: false,
        ramSize: false,
        memorySize: false,
    });

    const [make, setMake] = useState<string>();


    useEffect(() => {
        setPhoneSpecifications((prevState: TPhoneSpecifications) => {
            return (
                {
                    ...prevState,
                    make: make
                }
            )
        });
    }, [make])

    const EnableMakeInput = () => {
        setSpecificationsChosen(prevState => {
            return (
                {
                    ...prevState,
                    make: true
                }
            )
        });
        setPhoneSpecifications((prevState: TPhoneSpecifications) => {
            return (
                {
                    ...prevState,
                    make: 'apple'
                }
            )
        });
    }
    const EnableColorInput = () => {
        setSpecificationsChosen(prevState => {
            return (
                {
                    ...prevState,
                    color: true
                }
            )
        });
    }
    const EnableRamInpit = () => {
        setSpecificationsChosen(prevState => {
            return (
                {
                    ...prevState,
                    ramSize: true
                }
            )
        });
    }
    const EnableMemoryInput = () => {
        setSpecificationsChosen(prevState => {
            return (
                {
                    ...prevState,
                    memorySize: true
                }
            )
        });
    }
    return (
        <div className="flex flex-wrap self-start items-end w-full pt-[24px] gap-[24px]">
            {!specificationsChosen.make &&
                <button className="h-[40px] px-[16px] rounded-[10px] flex items-center justify-items-center bg-transparent border border-mint border-opacity-50 gap-[8px] transition transform duration-700 ease-in-out hover:border-opacity-100" onClick={EnableMakeInput}>
                    <img className="w-[18px]" src="plus.svg" alt="" />
                    <p>Proizvodjač</p>
                </button>
            }
            {specificationsChosen.make &&
                <div className="flex flex-col gap-4 grow animate__animated animate__fadeIn min-w-[50%]">
                    <div className="flex gap-5 self-center">
                        <p className="text-center">Proizvodjač</p>
                        <img src="cpu.svg" alt="" />
                    </div>
                    <div className="flex flex-wrap gap-5 w-full">
                        <Select title={"Izaberi proizvodjača"} transparentBG={true} customHeight="40" customWidth="full" options={[
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
                        ]} setState={setMake} />
                    </div>
                </div>
            }
            {!specificationsChosen.color &&
                <button className="h-[40px] px-[16px] rounded-[10px] flex items-center justify-items-center bg-transparent border border-mint border-opacity-50 gap-[8px] transition transform duration-700 ease-in-out hover:border-opacity-100" onClick={EnableColorInput}>
                    <img className="w-[18px]" src="plus.svg" alt="" />
                    <p>Boja</p>
                </button>
            }
            {specificationsChosen.color &&
                <div className="flex flex-col gap-4 grow animate__animated animate__fadeIn">
                    <div className="flex gap-5 self-center">
                        <p className="text-center">Boja</p>
                        <img src="color.svg" alt="" />
                    </div>
                    <div className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                        <input className="h-[40px] bg-transparent focus:outline-none w-full rounded-[10px]" type="text" placeholder="Crna, plava, zelena..." onChange={(e) => setPhoneSpecifications((prevState: TPhoneSpecifications) => {
                            return (
                                {
                                    ...prevState,
                                    color: e.target.value.toLowerCase()
                                }
                            )
                        })} />
                    </div>
                </div>}
            {(specificationsChosen.memorySize || specificationsChosen.ramSize) && <div className="w-full"></div>}
            {!specificationsChosen.ramSize &&
                <button className="h-[40px] px-[16px] rounded-[10px] flex items-center justify-items-center bg-transparent border border-mint border-opacity-50 gap-[8px] transition transform duration-700 ease-in-out hover:border-opacity-100" onClick={EnableRamInpit}>
                    <img className="w-[18px]" src="plus.svg" alt="" />
                    <p>Količina RAM memorije</p>
                </button>
            }
            {specificationsChosen.ramSize &&
                <div className="flex flex-col gap-4 grow animate__animated animate__fadeIn min-w-[50%]">
                    <div className="flex gap-5 self-center">
                        <p className="text-center">Količina RAM memorije</p>
                        <img src="ram.svg" alt="" />
                    </div>
                    <div className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                        <input className="h-[40px] bg-transparent focus:outline-none w-full rounded-[10px]" type="number" placeholder="Količina RAM-a" onChange={(e) => setPhoneSpecifications((prevState: TPhoneSpecifications) => {
                            return (
                                {
                                    ...prevState,
                                    ramSize: e.target.value
                                }
                            )
                        })} />
                        <p className="opacity-50">GB</p>
                    </div>
                </div>}
            {!specificationsChosen.memorySize &&
                <button className="h-[40px] px-[16px] rounded-[10px] flex items-center justify-items-center bg-transparent border border-mint border-opacity-50 gap-[8px] transition transform duration-700 ease-in-out hover:border-opacity-100" onClick={EnableMemoryInput}>
                    <img className="w-[18px]" src="plus.svg" alt="" />
                    <p>Količina memorije</p>
                </button>
            }
            {specificationsChosen.memorySize &&
                <div className="flex flex-col gap-4 grow animate__animated animate__fadeIn">
                    <div className="flex gap-5 self-center">
                        <p className="text-center">Količina memorije</p>
                        <img src="storage.svg" alt="" />
                    </div>
                    <div className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none w-full rounded-[10px] flex items-center justify-between">
                        <input className="h-[40px] bg-transparent focus:outline-none w-full rounded-[10px]" type="number" placeholder="Količina memorije" onChange={(e) => setPhoneSpecifications((prevState: TPhoneSpecifications) => {
                            return (
                                {
                                    ...prevState,
                                    memorySize: e.target.value
                                }
                            )
                        })} />
                        <p className="opacity-50">GB</p>
                    </div>
                </div>}
        </div>)
}

export default PhoneInputs;