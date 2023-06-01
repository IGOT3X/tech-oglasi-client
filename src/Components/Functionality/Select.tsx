import { useEffect, useState } from "react";


const Select = ({ title, options, customWidth,customHeight, reference, setState ,setStateAppendToList,selfIndex,transparentBG }: { title: string, options: { title: string, value: string }[], customWidth?: string,customHeight?:string,transparentBG?:boolean, reference?: any, setState?: Function, setStateAppendToList?:Function,selfIndex?:number }) => {
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState<{ title: string, value: string }>();

    useEffect(() => {
        if (reference) reference.current = selected?.value;
        if (selected?.value) setState && setState(selected?.value)

        if (selected?.value && setStateAppendToList) {
            setStateAppendToList((prevAppendState: string[]) => {
              // If selfIndex is defined and within the bounds of the array, update the value at that index
              if (typeof selfIndex === 'number' && selfIndex >= 0 && selfIndex < prevAppendState.length) {
                return prevAppendState.map((value, index) => {
                  if (index === selfIndex) {
                    return selected.value;
                  } else {
                    return value;
                  }
                });
              } else {
                // If selfIndex is not defined or out of bounds, append the new value to the end of the array
                return [...prevAppendState, selected.value];
              }
            });
          }

    }, [selected]);

    return (
        <div className={`${!customWidth ? "w-[294px]" : `${customWidth != "full" ? `w-[${customWidth}px]` : "w-full"}`} flex flex-col gap-[7px]`}>
            <div onClick={() => setExpanded(!expanded)} className={`${!customWidth ? "w-[294px]" : `${customWidth != "full" ? `w-[${customWidth}px]` : "w-full"}`} ${customHeight ?` h-[${customHeight}px] `:"py-[12px]"} text-mint font-semibold ${transparentBG?"bg-transparent border-opacity-100":"bg-listing-dark border-opacity-0 hover:border-opacity-25"} rounded-[10px] flex items-center justify-center relative cursor-pointer transition transform duration-700 ease-in-out border border-mint " ${expanded ? !transparentBG && "border-opacity-50" : ""}`}>
                <p>{!selected ? title : selected.title}</p>
                <div className="absolute right-5">
                    <img className={`transition transform duration-700 ease-in-out ${expanded ? "rotate-180" : "rotate-0"}`} src="chevron-down.svg" alt="" />
                </div>
            </div>
            {
                expanded &&
                <div className={`${!customWidth ? "w-[294px]" : `${customWidth != "full" ? `w-[${customWidth}px]` : "w-full"}`} py-[12px] text-mint font-semibold ${transparentBG?"bg-listing-dark border-opacity-100 border border-mint":"bg-listing-dark border-opacity-0"} rounded-[10px] flex flex-col items-center justify-center mt-[10px]`}>
                    {
                        options.map(option => (
                            <p onClick={() => { setSelected({ title: option.title, value: option.value }); setExpanded(false) }} className="cursor-pointer py-[12px] w-[90%] text-center transition transform duration-700 ease-in-out border-b border-mint border-opacity-5 hover:bg-listing-light rounded-[10px]">{option.title}</p>
                        ))
                    }
                </div>
            }
        </div >

    )
}

export default Select;