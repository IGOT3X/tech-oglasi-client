import { TListing, TReview } from "../../types"
import { useState, useEffect, useRef } from "react";
import { SendGet, SendPost } from "../../Hooks/useFetch";
import Cookies from "js-cookie";

import 'animate.css';

const Review = ({ review }: { review: TReview }) => {
    const [listingTitle, setListingTitle] = useState<string>();
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [charsLeft, setCharsLeft] = useState(100);

    const replyRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        SendGet("get-listing-title", { listingID: review.listingID }).then(data => {
            setListingTitle(data.listingTitle);
        });
    }, []);

    const CalcCharsLeft = () => {
        const textareaElement = document.getElementById("reviewTextarea");

        setCharsLeft(100 - textareaElement?.value.length);
    }

    const HandleSendReply = () => {
        SendPost("send-reply", { reviewID: review._id, reply: replyRef.current!.value }).then(data => {
            setShowReplyForm(false);
            location.reload();
        });
    }

    return (
        <div className={`flex flex-col gap-5 border rounded-[10px] items-center shadow-2xl ${!review.isPositive ? "border-red" : "border-transparent"} bg-listing-dark w-[294px]`}>
            <h1 className="text-[20px] font-semibold text-center mt-5 px-5">{listingTitle}</h1>
            <div className="w-[180px] h-[3px] bg-mint opacity-25 mx-auto rounded-[10px] my-2"></div>
            <img className="w-[48px]" src={`${review.isPositive ? "smile-big.svg" : "frown-big.svg"}`} alt="" />
            <p className="text-left p-[10px] mx-[20px] bg-listing-light rounded-[10px] h-[120px] w-[260px]">{review.comment}</p>
            {(!review.isPositive && Cookies.get("username") == review.reviewedUser && !review.reply) &&
                <button className="flex gap-3 w-[260px]" onClick={() => setShowReplyForm(true)}>
                    <img src="plus-circle.svg" alt="" />
                    <p>Dodaj odgovor</p>
                </button>
            }
            {
                showReplyForm &&
                <div className="flex flex-col w-[260px] animate__animated animate__fadeIn">
                    <textarea maxLength={100} id="reviewTextarea" className={`2xl:text-[20px] p-2 border border-mint bg-transparent focus:outline-none w-full rounded-[10px]`} cols={30} rows={7} placeholder="Vaš komentar" ref={replyRef} onChange={CalcCharsLeft} />
                    <p className="text-[12px] opacity-25 self-end mx-1 mt-2">Ostalo karaktera: {charsLeft}</p>
                    <button className="w-[260px] my-5 h-[44px] bg-transparent self-center border border-mint rounded-[10px] flex items-center justify-center flex gap-3" onClick={HandleSendReply}>
                        <p>Ostavi odgovor</p>
                    </button>
                </div>
            }
            {
                review.reply &&
                <div className="flex flex-col gap-3 w-[260px]">
                    <div className="flex gap-3 items-center">
                        <img src="reply-arrow.svg" alt="" />
                        <p>Odgovor prodavca:</p>
                    </div>
                    <p className="self-start text-left p-[10px] bg-listing-light rounded-[10px] h-[140px] w-[260px]">{review.reply}</p>
                </div>
            }

            <div className="opacity-25 self-center h-full items-end pb-5 flex">
                <p>
                    Utisak ostavio: <a href={`/account?username=${review.reviewer}`} className="underline font-semibold">{review.reviewer}</a>
                </p>
            </div>

        </div>
    )
}

export default Review