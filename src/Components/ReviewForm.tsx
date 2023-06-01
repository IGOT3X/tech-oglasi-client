import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { SendPost } from "../../Hooks/useFetch";
import { TListing } from "../../types";

import 'animate.css';

const ReviewForm = ({listing}:{listing:TListing}) => {
    const [isReviewPositive, setIsReviewPositive] = useState(true);
    const reviewRef = useRef<HTMLTextAreaElement>(null);
    const [charsLeft,setCharsLeft] = useState<number>(100);

    const HandleSendReview = () => {
        SendPost("send-review", { listingID: listing._id, reviewPositive: isReviewPositive, reviewComment: reviewRef.current!.value, reviewer: Cookies.get("username") }).then(data => {
            console.log(data);
            location.reload();
        })
    }

    const CalcCharsLeft =() =>{
        const textareaElement = document.getElementById("reviewTextarea");

        setCharsLeft(100- textareaElement?.value.length);
    }
    return (
        <div className={`w-[294px] flex flex-col gap-3 self-center items-center my-5 bg-listing-dark py-5 rounded-[10px] border border-2  shadow-2xl ${!isReviewPositive?"border-red":"border-transparent"}`}>
            <p className="text-[20px]">{listing.title}</p>
            <div className="w-[216px] h-[3px] bg-mint opacity-25 mx-auto rounded-[10px] my-2"></div>

            <div className="flex gap-5 self-center my-5">
                <div className="w-[30px] h-[30px] flex items-center justify-center" onClick={() => setIsReviewPositive(true)}>
                    <img className={`cursor-pointer transition transform ${!isReviewPositive&&"hover:scale-125"} duration-700 ease-in-out ${isReviewPositive && "scale-150"}`} src="smile.svg" alt="" />
                </div>
                <div className="w-[30px] h-[30px] flex items-center justify-center" onClick={() => setIsReviewPositive(false)}>
                    <img className={`cursor-pointer transition transform ${isReviewPositive&&"hover:scale-125"} duration-700 ease-in-out ${isReviewPositive == false && "scale-150"}`} src="frown.svg" alt="" />
                </div>
            </div>
                <div className="flex flex-col w-[216px]">
                    <textarea maxLength={100} id="reviewTextarea" className={`2xl:text-[20px] p-2 border border-mint bg-transparent focus:outline-none w-full rounded-[10px]`} cols={30} rows={7} placeholder={isReviewPositive?"Vaš komentar":"Molimo vas bez uvreda"} ref={reviewRef} onChange={CalcCharsLeft} />
                    <p className="text-[12px] opacity-25 self-end mx-1 mt-2">Ostalo karaktera: {charsLeft}</p>
                    <button className="w-[216px] my-5 h-[44px] bg-transparent self-center border border-mint rounded-[10px] flex items-center justify-center flex gap-3" onClick={HandleSendReview}>
                        <p>Ostavi utisak</p>
                    </button>
                </div>
                <div className="flex w-[216px] items-start gap-3">
                    <img src="alert-octagon.svg" alt="" />
                    <p className="opacity-25 text-[12px]">Imate još 3 dana da ostavite utisak. Nakon toga automatski se računa da ste imali pozitivno iskustvo.</p>
                </div>
        </div>
    )
}

export default ReviewForm;