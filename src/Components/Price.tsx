import { useState,useEffect } from "react";

const Price = ({basePrice}:{basePrice:Number|undefined}) =>{

    const [currency,setCurrency] = useState("EUR");

    useEffect(()=>{
        

    },[currency])
    return(
        <div className="flex gap-0">
            {
                basePrice&&
            <p>{basePrice.toString()} <button className="" onClick={()=>{
                if(currency=="EUR") return setCurrency("RSD");
                return setCurrency("EUR");
            }}>{currency=="EUR" ? "€" :"RSD"}</button></p>
            }

        </div>
    )
}

export default Price;