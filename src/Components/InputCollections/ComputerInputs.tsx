import { useEffect, useState } from "react";
import { TSpecifications } from "../../../types";
import Select from "../Functionality/Select";

const ComputerInputs = ({ setspecifications, specifications }: { setspecifications: Function, specifications: TSpecifications }) => {
    // Needs to set specifications in the parent component on input change.
    const [specificationsChosen, setSpecificationsChosen] = useState({
        cpu: false,
        gpu: false,
        ram: false,
        mb: false,
        psu: false,
        memory: false,
        battery: false,
        screen: false
    });

    const [cpu, setCpu] = useState<string>();
    const [gpu, setGpu] = useState<string>();
    const [memory, setMemory] = useState<string[]>([]);

    useEffect(() => {
        cpu &&
            setspecifications((prevState: TSpecifications) => {
                return (
                    {
                        ...prevState,
                        cpuMake: cpu.toLowerCase()
                    }
                )
            })
        gpu &&
            setspecifications((prevState: TSpecifications) => {
                return (
                    {
                        ...prevState,
                        gpuMake: gpu.toLowerCase()
                    }
                )
            })
        if(memory)
            setspecifications((prevState: TSpecifications) => {
              return {
                ...prevState,
                memory: prevState.memory.map((memoryItem: any, index: number) => {
                  if (memory[index]) {
                    return {
                      ...memoryItem,
                      memoryType: memory[index].toLowerCase(),
                    };
                  } else {
                    return memoryItem;
                  }
                }),
              };
            });

    }, [cpu, gpu, memory])

    const EnableProcessorInput = () => {
        setSpecificationsChosen(prevState => {
            return (
                {
                    ...prevState,
                    cpu: true
                }
            )
        });
        setspecifications((prevState: TSpecifications) => {
            return (
                {
                    ...prevState,
                    cpuMake: 'intel'
                }
            )
        });
    }

    const EnableGraphicsInput = () => {
        setSpecificationsChosen(prevState => {
            return (
                {
                    ...prevState,
                    gpu: true
                }
            )
        });
        setspecifications((prevState: TSpecifications) => {
            return (
                {
                    ...prevState,
                    gpuMake: 'intel'
                }
            )
        });
    }

    const EnableStorageInput = () => {
        setSpecificationsChosen(prevState => {
            return (
                {
                    ...prevState,
                    memory: true
                }
            )
        });
        setspecifications((prevState: TSpecifications) => {
            return (
                {
                    ...prevState,
                    memory: [{ memoryType: "ssd" }]
                }
            )
        });
    }
    const EnableRamInput = () => {
        setSpecificationsChosen(prevState => {
            return (
                {
                    ...prevState,
                    ram: true
                }
            )
        });
        setspecifications((prevState: TSpecifications) => {
            return (
                {
                    ...prevState,
                    ram: [{}]
                }
            )
        })
    }
    const AddAnotherRamInput = () => {
        setspecifications((prevState: TSpecifications) => {
            return (
                {
                    ...prevState,
                    ram: prevState.ram?.concat([{}])
                }
            )
        })
    }
    const AddAnotherMemoryInput = () => {
        setspecifications((prevState: TSpecifications) => {
            return (
                {
                    ...prevState,
                    memory: prevState.memory?.concat([{ memoryType: "ssd" }])
                }
            )
        })
    }

    return (
        <div className="flex flex-wrap self-start w-full pt-[24px] gap-[24px]">
            <div className="flex gap-3 items-center mt-[64px] self-center w-full">
                <p className="self-center font-semibold">Dodaj komponente</p>
                <div className="group relative">
                    <img className="opacity-50" src="help-circle.svg" alt="" />
                    <p style={{ pointerEvents: "none" }} className="z-40 group-hover:opacity-100 opacity-0 absolute sm:top-[-20px] top-10 left-[-50px] sm:left-10 text-nowrap bg-mint px-5 py-3 rounded-[10px] text-black text-center transition transform duration-700 ease-in-out sm:w-[300px]">Ukoliko želite možete dodati komponente radi lakše prodaje</p>
                </div>
            </div>
            {!specificationsChosen.cpu &&
                <button className="h-[40px] px-[16px] rounded-[10px] flex items-center justify-items-center bg-transparent border border-mint border-opacity-50 gap-[8px] transition transform duration-700 ease-in-out hover:border-opacity-100" onClick={EnableProcessorInput}>
                    <img className="w-[18px]" src="plus.svg" alt="" />
                    <p>Procesor</p>
                </button>
            }
            {specificationsChosen.cpu &&
                <div className="flex flex-col gap-4 w-full animate__animated animate__fadeIn">
                    <div className="flex gap-5 self-center">
                        <p className="text-center">Procesor</p>
                        <img src="cpu.svg" alt="" />
                    </div>
                    <div className="flex flex-wrap gap-5 w-full">
                        <Select title={"Proizvodjač procesora"} customHeight="40" transparentBG={true} options={
                            [
                                {
                                    title: "Intel",
                                    value: "intel"
                                },
                                {
                                    title: "AMD",
                                    value: "amd"
                                },
                                {
                                    title: "Apple",
                                    value: "apple"
                                }
                            ]
                        } setState={setCpu} />

                        <input className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow min-w-[32%] rounded-[10px]" type="text" placeholder="Model procesora" value={specifications?.cpuModel} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                            return (
                                {
                                    ...prevState,
                                    cpuModel: e.target.value.toLowerCase()
                                }
                            )
                        })} />
                        <div className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow min-w-[32%] rounded-[10px] flex items-center justify-between">
                            <input className="h-[40px] bg-transparent focus:outline-none w-full rounded-[10px]" type="number" placeholder="Brzina procesora" value={specifications?.cpuSpeed} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                                return (
                                    {
                                        ...prevState,
                                        cpuSpeed: e.target.value
                                    }
                                )
                            })} />
                            <p className="opacity-50">GHZ</p>
                        </div>
                    </div>
                </div>
            }

            {!specificationsChosen.ram &&
                <button className="h-[40px] px-[16px] rounded-[10px] flex items-center justify-items-center bg-transparent border border-mint gap-[8px] border-opacity-50 transition transform duration-700 ease-in-out hover:border-opacity-100" onClick={EnableRamInput}>
                    <img className="w-[18px]" src="plus.svg" alt="" />
                    <p>Ram</p>
                </button>
            }

            {specificationsChosen.ram &&
                specifications.ram?.map((ram, i) => (
                    <div className="flex flex-col gap-4 w-full animate__animated animate__fadeIn mt-[40px]">
                        <div className="flex gap-5 self-center">
                            <p className="text-center">RAM: {i + 1}</p>
                            <img src="ram.svg" alt="" />
                        </div>
                        <div className="flex flex-wrap gap-5 w-full">
                            <input className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow rounded-[10px]" type="text" placeholder="Proizvodjač RAM-a" value={specifications?.ram[i].ramMake} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                                const updatedRam = [...prevState.ram];
                                updatedRam[i] = {
                                    ...updatedRam[i],
                                    ramMake: e.target.value.toLowerCase()
                                };
                                return {
                                    ...prevState,
                                    ram: updatedRam
                                };
                            })} />
                            <input className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow rounded-[10px]" type="text" placeholder="Model RAM-a" value={specifications?.ram[i].ramModel} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                                const updatedRam = [...prevState.ram];
                                updatedRam[i] = {
                                    ...updatedRam[i],
                                    ramModel: e.target.value.toLowerCase()
                                };
                                return {
                                    ...prevState,
                                    ram: updatedRam
                                };
                            })} />
                            <div className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow rounded-[10px] flex items-center justify-between">
                                <input className="h-[40px] bg-transparent focus:outline-none w-full rounded-[10px]" type="number" placeholder="Količina RAM-a" value={specifications?.ram[i].ramAmount} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                                    const updatedRam = [...prevState.ram];
                                    updatedRam[i] = {
                                        ...updatedRam[i],
                                        ramAmount: e.target.value
                                    };
                                    return {
                                        ...prevState,
                                        ram: updatedRam
                                    };
                                })} />
                                <p className="opacity-50">GB</p>
                            </div>
                            <div className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow rounded-[10px] flex items-center justify-between">
                                <input className="h-[40px] bg-transparent focus:outline-none w-full rounded-[10px]" type="number" placeholder="Brzina RAM-a" value={specifications?.ram[i].ramSpeed} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                                    const updatedRam = [...prevState.ram];
                                    updatedRam[i] = {
                                        ...updatedRam[i],
                                        ramSpeed: e.target.value
                                    };
                                    return {
                                        ...prevState,
                                        ram: updatedRam
                                    };
                                })} />
                                <p className="opacity-50">MHZ</p>
                            </div>
                            {(specifications.ram && i == specifications.ram.length - 1) && <button className="h-[40px] px-[16px] rounded-[10px] flex items-center justify-items-center bg-transparent border border-mint gap-[8px] w-[100px] border-opacity-50 transition transform duration-700 ease-in-out hover:border-opacity-100" onClick={AddAnotherRamInput}>
                                <img className="w-[18px]" src="plus.svg" alt="" />
                                <p>Ram</p>
                            </button>}
                        </div>
                    </div>
                ))

            }
            {!specificationsChosen.gpu &&
                <button className="h-[40px] px-[16px] rounded-[10px] flex items-center justify-items-center bg-transparent border border-mint gap-[8px] border-opacity-50 transition transform duration-700 ease-in-out hover:border-opacity-100" onClick={EnableGraphicsInput}>
                    <img className="w-[18px]" src="plus.svg" alt="" />
                    <p>Grafička kartica</p>
                </button>
            }
            {specificationsChosen.gpu &&
                <div className="flex flex-col gap-4 w-full animate__animated animate__fadeIn mt-[40px]">
                    <div className="flex gap-5 self-center">
                        <p className="text-center">Grafička kartica</p>
                        <img src="gpu.svg" alt="" />
                    </div>
                    <div className="flex flex-wrap gap-5 w-full">
                        <Select title={"Proizvodjač grafičke"} customHeight="40" transparentBG={true} options={
                            [
                                {
                                    title: "Apple",
                                    value: "apple"
                                },
                                {
                                    title: "AMD",
                                    value: "amd"
                                },
                                {
                                    title: "Intel",
                                    value: "intel"
                                },
                                {
                                    title: "Nvidia",
                                    value: "nvidia"
                                }

                            ]
                        } setState={setGpu} />
                        <input className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow min-w-[23%] rounded-[10px]" type="text" placeholder="Model grafičke" value={specifications?.gpuModel} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                            return (
                                {
                                    ...prevState,
                                    gpuModel: e.target.value.toLowerCase()
                                }
                            )
                        })} />
                        <div className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow min-w-[23%] rounded-[10px] flex items-center justify-between">
                            <input className="h-[40px] bg-transparent focus:outline-none w-full rounded-[10px]" type="number" placeholder="Brzina grafičke" value={specifications?.gpuSpeed} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                                return (
                                    {
                                        ...prevState,
                                        gpuSpeed: e.target.value
                                    }
                                )
                            })} />
                            <p className="opacity-50">MHZ</p>
                        </div>
                        <div className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow min-w-[23%] rounded-[10px] flex items-center justify-between">
                            <input className="h-[40px] bg-transparent focus:outline-none w-full rounded-[10px]" type="number" placeholder="Memorija grafičke" value={specifications?.gpuRam} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                                return (
                                    {
                                        ...prevState,
                                        gpuRam: e.target.value
                                    }
                                )
                            })} />
                            <p className="opacity-50">GB</p>
                        </div>
                    </div>
                </div>}
            {!specificationsChosen.mb &&
                <button className="h-[40px] px-[16px] rounded-[10px] flex items-center justify-items-center bg-transparent border border-mint gap-[8px] border-opacity-50 transition transform duration-700 ease-in-out hover:border-opacity-100" onClick={() => setSpecificationsChosen(prevState => {
                    return (
                        {
                            ...prevState,
                            mb: true
                        }
                    )
                })}>
                    <img className="w-[18px]" src="plus.svg" alt="" />
                    <p>Matična ploča</p>
                </button>
            }
            {specificationsChosen.mb &&
                <div className="flex flex-col gap-4 w-full animate__animated animate__fadeIn mt-[40px]">
                    <div className="flex gap-5 self-center">
                        <p className="text-center">Matična ploča</p>
                        <img src="mb.svg" alt="" />
                    </div>
                    <div className="flex flex-wrap gap-5 w-full">
                        <input className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow rounded-[10px]" type="text" placeholder="Proizvodjač matične" value={specifications?.mbMake} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                            return (
                                {
                                    ...prevState,
                                    mbMake: e.target.value
                                }
                            )
                        })} />
                        <input className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow rounded-[10px]" type="text" placeholder="Model matične" value={specifications?.mbModel} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                            return (
                                {
                                    ...prevState,
                                    mbModel: e.target.value.toLowerCase()
                                }
                            )
                        })} />
                    </div>
                </div>}

            {!specificationsChosen?.psu &&
                <button className="h-[40px] px-[16px] rounded-[10px] flex items-center justify-items-center bg-transparent border border-mint gap-[8px] border-opacity-50 transition transform duration-700 ease-in-out hover:border-opacity-100" onClick={() => setSpecificationsChosen(prevState => {
                    return (
                        {
                            ...prevState,
                            psu: true
                        }
                    )
                })}>
                    <img className="w-[18px]" src="plus.svg" alt="" />
                    <p>Napajanje</p>
                </button>
            }
            {specificationsChosen.psu &&
                <div className="flex flex-col gap-4 w-full animate__animated animate__fadeIn mt-[40px]">
                    <div className="flex gap-5 self-center">
                        <p className="text-center">Napajanje</p>
                        <img src="psu.svg" alt="" />
                    </div>
                    <div className="flex flex-wrap gap-5 w-full">
                        <input className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow rounded-[10px]" type="text" placeholder="Proizvodjač napajanja" value={specifications?.psuMake} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                            return (
                                {
                                    ...prevState,
                                    psuMake: e.target.value.toLowerCase()
                                }
                            )
                        })} />
                        <input className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow rounded-[10px]" type="text" placeholder="Model napajanja" value={specifications?.psuModel} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                            return (
                                {
                                    ...prevState,
                                    psuModel: e.target.value.toLowerCase()
                                }
                            )
                        })} />
                        <div className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow rounded-[10px] flex items-center justify-between">
                            <input className="h-[40px] bg-transparent focus:outline-none w-full rounded-[10px]" type="number" placeholder="Jačina napajanja" value={specifications?.psuPower} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                                return (
                                    {
                                        ...prevState,
                                        psuPower: e.target.value
                                    }
                                )
                            })} />
                            <p className="opacity-50">W</p>
                        </div>
                    </div>
                </div>}
            {!specificationsChosen.memory &&
                <button className="h-[40px] px-[16px] rounded-[10px] flex items-center justify-items-center bg-transparent border border-mint gap-[8px] border-opacity-50 transition transform duration-700 ease-in-out hover:border-opacity-100" onClick={EnableStorageInput}>
                    <img className="w-[18px]" src="plus.svg" alt="" />
                    <p>Memorijski prostor</p>
                </button>
            }
            {specificationsChosen.memory &&
                specifications.memory?.map((memory, i) => (
                    <div className="flex flex-col gap-4 w-full animate__animated animate__fadeIn mt-[40px]">
                        <div className="flex gap-5 self-center">
                            <p className="text-center">Memorijski disk</p>
                            <img src="storage.svg" alt="" />
                        </div>
                        <div className="flex flex-wrap gap-5 w-full">
                    <Select title={"Tip memorije"} options={[
                        {
                            title:"SSD",
                            value:"ssd"
                        },
                        {
                            title:"HDD",
                            value:"hdd"
                        },
                        {
                            title:"M.2",
                            value:"m.2"
                        }
                    ]} transparentBG={true} customHeight="40" setStateAppendToList={setMemory} selfIndex = {i}/>
                            <div className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow min-w-[18%] rounded-[10px] flex items-center justify-between">
                                <input className="h-[40px] bg-transparent focus:outline-none w-full rounded-[10px]" type="text" placeholder="Proizvodjač memorije" value={memory.memoryMake} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                                    const updatedMemory = [...prevState.memory];
                                    updatedMemory[i] = {
                                        ...updatedMemory[i],
                                        memoryMake: e.target.value.toLowerCase()
                                    };
                                    return {
                                        ...prevState,
                                        memory: updatedMemory
                                    };
                                })} />

                            </div>
                            <input className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow min-w-[18%] rounded-[10px]" type="text" placeholder="Model memorije" value={memory.memoryModel} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                                const updatedMemory = [...prevState.memory];
                                updatedMemory[i] = {
                                    ...updatedMemory[i],
                                    memoryModel: e.target.value.toLowerCase()
                                };
                                return {
                                    ...prevState,
                                    memory: updatedMemory
                                };
                            })} />
                            <div className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow min-w-[18%] rounded-[10px] flex items-center justify-between">
                                <input className="h-[40px] bg-transparent focus:outline-none w-full rounded-[10px]" type="number" placeholder="Brzina memorije" value={memory.memorySpeed} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                                    const updatedMemory = [...prevState.memory];
                                    updatedMemory[i] = {
                                        ...updatedMemory[i],
                                        memorySpeed: e.target.value
                                    };
                                    return {
                                        ...prevState,
                                        memory: updatedMemory
                                    };
                                })} />
                                <p className="opacity-50">MB/S</p>
                            </div>
                            <div className="px-2 h-[40px] bg-transparent border border-mint focus:outline-none grow min-w-[18%] rounded-[10px] flex items-center justify-between">
                                <input className="h-[40px] bg-transparent focus:outline-none w-full rounded-[10px]" type="number" placeholder="Količina memorije" value={memory.memoryAmount} onChange={(e) => setspecifications((prevState: TSpecifications) => {
                                    const updatedMemory = [...prevState.memory];
                                    updatedMemory[i] = {
                                        ...updatedMemory[i],
                                        memoryAmount: e.target.value
                                    };
                                    return {
                                        ...prevState,
                                        memory: updatedMemory
                                    };
                                })} />
                                <p className="opacity-50">GB</p>
                            </div>
                            {(specifications.memory && i == specifications.memory.length - 1) && <button className="h-[40px] px-[16px] rounded-[10px] flex items-center justify-items-center bg-transparent border border-mint gap-[8px] w-[100 px] border-opacity-50 transition transform duration-700 ease-in-out hover:border-opacity-100" onClick={()=>{AddAnotherMemoryInput();}}>
                                <img className="w-[18px]" src="plus.svg" alt="" />
                                <p>Disk</p>
                            </button>}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ComputerInputs;