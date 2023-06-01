import { useState, useEffect, useRef } from "react";

import 'animate.css';

import { TMessage } from "../../types";
import { SendGet, SendPost } from "../../Hooks/useFetch";
import Cookies from "js-cookie";
const ChatItem = ({ chatID, newChat, listingID, overrideOpen }: { chatID?: string, newChat?: boolean, listingID?: string, overrideOpen?: boolean }) => {

    const [chatOpen, setChatOpen] = useState(
        overrideOpen ? true : false
    );
    const chatOpenRef = useRef<boolean>();
    chatOpenRef.current = chatOpen;
    // Get first listing pic
    const [listingPic, setListingPic] = useState();
    const [listingPicLoading, setListingPicLoading] = useState(true);
    const [listingTitle, setListingTitle] = useState<string>();

    const [chattingWith, setChattingWith] = useState<string>();
    const [chattingWithPic, setChattingWithPic] = useState();
    const [myPic, setMyPic] = useState();

    // Get listing

    const messageRef = useRef<HTMLInputElement>(null);
    const [messages, setMessages] = useState<TMessage[]>([]);

    // When you open a chat cast to all other chats and turn them off.

    const FetchMessages = () => {
        SendGet("fetch-chat", { chatID: chatID, seshID: Cookies.get("seshID") }).then(data => {
            setMessages(data.chat);
        });
    }

    const SendMessage = () => {
        if (!messageRef.current?.value) return;
        SendPost("send-message", { seshID: Cookies.get("seshID"), reciever: chattingWith, message: messageRef.current.value, listingID: listingID, chatID: chatID }).then(() => {
            messageRef.current!.value = "";
            newChat && document.location.replace('/chat'); // IF NEW MESSAGE STARTED
            FetchMessages();
            setTimeout(() => {
                var elem = document.getElementById('chatBox');
                elem!.scrollTop = elem!.scrollHeight;
            }, 100);
        });
    }

    const GetChattingWith = () => {
        SendGet("fetch-chat", { chatID: chatID }).then(data => {
            setMessages(data.chat); // convert to array and if new messages arrive just add them instead of getting the whole array each time...

            if (data.chat[0].usernameA == Cookies.get("username")) {
                setChattingWith(data.chat[0].usernameB);
            }
            else {
                setChattingWith(data.chat[0].usernameA);
            }

        });
    }

    useEffect(() => {
        if(newChat){
            SendGet("get-seller-username",{listingID:listingID}).then(data=>{
                setChattingWith(data.sellerUsername);
            });
        }
        if (chatID)
            SendGet("fetch-chat", { chatID: chatID }).then(data => {
                setMessages(data.chat); // convert to array and if new messages arrive just add them instead of getting the whole array each time...

                if (data.chat[0].usernameA == Cookies.get("username")) {
                    setChattingWith(data.chat[0].usernameB);
                }
                else {
                    setChattingWith(data.chat[0].usernameA);
                }
            });
        if (listingID) {
            SendGet("get-first-listing-picture", { listingID: listingID }).then(data => {
                setListingPicLoading(false);
                if (!data.listingPic) return;
                setListingPic(data.listingPic.data);
            });
            SendGet("get-listing-title", { listingID: listingID }).then(data => {
                setListingTitle(data.listingTitle);
            });

        }
    }, []);

    useEffect(() => {
        if (!chattingWith) return GetChattingWith();
        SendGet("get-user-pfp", { username: Cookies.get("username") }).then(data => {
            setMyPic(data.pfp.buffer.data);
        });
        SendGet("get-user-pfp", { username: chattingWith }).then(data => {
            setChattingWithPic(data.pfp.buffer.data);
        })
    }, [chattingWith]);

    useEffect(() => {
        HandleFetchLoop();
    }, [chatOpen]);

    useEffect(() => {
        if (!chatOpen) return;
        // CHECK IF PREVIOUS MESSAGES ARE EQUAL TO CURRENT ONES. IF NOT THEN YOU CAN DO THE SCROLL DOWN.
        var elem = document.getElementById('chatBox');
        elem!.scrollTop = elem!.scrollHeight;

    }, [messages]);

    const HandleFetchLoop = () => {
        if (!chatOpenRef.current && chatID) return;
        FetchMessages()
        setTimeout(() => {
            HandleFetchLoop();
        }, 5000);
    }


    return (
        <div className="flex sm:flex-row flex-col gap-10 overflow-x-hidden">
            <div className="flex flex-col gap-5  shadow-2xl">
                <div className={`h-[70px] flex gap-3 text-mint items-center ${(messages && messages.length && messages[messages.length - 1]?.messages && messages[messages.length - 1].messages.length && !messages[messages.length - 1].messages[messages[messages.length - 1].messages.length - 1].seen && messages[messages.length - 1].messages[messages[messages.length - 1].messages.length - 1].sender != Cookies.get("username")) ? "justify-between" : "justify-center"} bg-listing-dark hover:bg-listing-light transition transform duration-700 ease-in-out border border-blue border-opacity-0 hover:border-opacity-50 p-3 rounded-[10px] cursor-pointer w-[350px] ${(chatOpen) && "border border-blue border-opacity-100"} ${(messages && messages.length && messages[messages.length - 1]?.messages && messages[messages.length - 1].messages.length && !messages[messages.length - 1].messages[messages[messages.length - 1].messages.length - 1]?.seen && messages[messages.length - 1].messages[messages[messages.length - 1].messages.length - 1]?.sender != Cookies.get("username")) && "border border-green border-opacity-100"}`} onClick={() => !newChat ? setChatOpen(!chatOpen) : location.replace("/chat")}>
                    {chattingWithPic ? <img className="w-[40px] h-[40px] object-cover rounded-full" src={`data:image/png;base64,${btoa(new Uint8Array(chattingWithPic).reduce((data, byte) => { return data + String.fromCharCode(byte) }, ''))}`} alt="" /> : <img className="w-[40px] h-[40px] object-cover rounded-full" src="doggo.jpeg" />}
                    <p className="w-full font-semibold">{chattingWith}</p>
                    {(!messages[messages.length - 1]?.messages[messages[messages.length - 1].messages.length - 1].seen && messages[messages.length - 1]?.messages[messages[messages.length - 1].messages.length - 1].sender != Cookies.get("username")) && <img className="w-[24px]" src="inbox.svg" alt="" />}
                </div>
                {(chatOpen || newChat) &&
                    <div className="flex flex-col gap-5 animate__animated animate__fadeIn  shadow-2xl">
                        <div className={`flex flex-col gap-3 items-center ${chattingWith != Cookies.get("username") ? "justify-between" : "justify-center"}`}>
                            <a target="_blank" href={`/listing?listingID=${listingID}`} className={`text-[20px] text-center underline ${chattingWith != Cookies.get("username") ? "" : "self-center"}`}>{listingTitle}</a>
                        </div>

                        {!listingPicLoading ? listingPic ? <img className="w-[350px] object-cover h-[360px] rounded-[10px] self-center" src={`data:image/png;base64,${btoa(new Uint8Array(listingPic).reduce((data, byte) => { return data + String.fromCharCode(byte) }, ''))}`} alt="" /> : <p className="self-center w-[350px] h-[360px] flex items-center justify-center border border-mint rounded-[10px]">Oglas ne poseduje slike</p> : <div className="self-center w-[350px] h-[360px] flex items-center justify-center border border-mint rounded-[10px]"><img className="animate-spin w-[24px]" src="loader.svg" /></div>}

                    </div>
                }
            </div>

            {(chatOpen || newChat) &&
                <div className="animate__animated animate__fadeInRight flex flex-col h-[500px] sm:w-[600px] sm:w-[90%] w-full self-center sm:self-start bg-listing-dark rounded-[10px] sm:p-5 mb-20 sm:mb-0 ">
                    {
                        chattingWith != Cookies.get("username") &&
                        <a target="_blank" href={`/order?listingID=${listingID}`} className="ml-2 bg-listing-light text-mint border border-mint flex gap-3 items-center justify-center rounded-[10px] w-[120px] h-[40px] self-start mb-3 mt-3 sm:mt-0">
                            <p className="text-[14px]">Poruči</p>
                            <img src="cart.svg" alt="" />
                        </a>
                    }

                    <div id="chatBox" className="flex flex-col gap-5 overflow-y-auto h-full pr-5 scroll-smooth rounded-[10px] px-0 py-5 sm:p-2 w-[90%] self-center sm:w-full">
                        {(messages && messages.length > 0) ?
                            messages?.map(message => (
                                message.messages &&
                                message.messages.map((messageObject, i) => (
                                    <div className={`flex gap-3 items-center animate__animated animate__fadeIn ${(messageObject.sender == Cookies.get("username")) && 'flex-row-reverse'}`}>
                                        {messageObject.sender == Cookies.get("username") ? <img className="w-[48px] h-[48px] max-h-[48px] max-w-[48px] object-cover rounded-full self-start" src={myPic ? `data:image/png;base64,${btoa(new Uint8Array(myPic).reduce((data, byte) => { return data + String.fromCharCode(byte) }, ''))}` : "doggo.jpeg"} alt="" /> : <a target="_blank" className="self-start w-[48px] h-[48px] flex items-center justify-center max-h-[48px] max-w-[48px]" href={`/account?username=${chattingWith}`}> <img className="max-h-[48px] max-w-[48px] w-[48px] h-[48px] object-cover rounded-full self-start transition transform duration-700 ease-in-out hover:scale-105 border border-mint border-opacity-0 hover:border-opacity-100 rounded-full" src={chattingWithPic ? `data:image/png;base64,${btoa(new Uint8Array(chattingWithPic).reduce((data, byte) => { return data + String.fromCharCode(byte) }, ''))}` : "doggo.jpeg"} alt="" /></a>}
                                        <div className="relative">
                                            <p className={`text-[12px] sm:text-[16px] bg-listing-light p-3 rounded-[10px] ${(messageObject.sender == Cookies.get("username")) ? "rounded-tr-[3px] border border-green" : "rounded-tl-[3px] border border-blue "} ${!messageObject.message.includes(" ") && "break-all"}`}>{messageObject.message}</p>
                                            {(messageObject.seen && messageObject.sender == Cookies.get("username") && i == message.messages.length - 1) ? <div className="flex absolute mt-1 right-0 animate__animated animate__fadeIn"><img className="w-[12px]" src="check.svg" alt="" /><img className="w-[12px]" src="check.svg" alt="" /><p className="ml-1 opacity-50 text-[12px]">pročitano</p></div> : (messageObject.sender == Cookies.get("username") && i == message.messages.length - 1) && <div className="flex absolute right-0 mt-1"><img className="opacity-25 w-[12px]" src="check.svg" alt="" /><p className="opacity-25 text-[12px] ml-1">poslato</p></div>}
                                        </div>


                                    </div>
                                ))
                            ))
                            :
                            <h1 className="text-[20px] self-center">Ovo je početak vašeg razgovora.</h1>
                        }

                    </div>
                    <div className="flex sm:items-end items-center justify-center sm:justify-end mt-5 mb-5 sm:mb-0">
                        <div className="flex bg-transparent border border-mint rounded-[10px] sm:w-full w-[90%] self-center">
                            <input className="bg-transparent w-full rounded-[10px] p-2 focus:outline-none" placeholder="Vaša poruka:" type="text" ref={messageRef} onKeyDown={e => e.key == 'Enter' && SendMessage()} />
                            <button className="px-5" onClick={SendMessage}>
                                <img src="send.svg" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

export default ChatItem;