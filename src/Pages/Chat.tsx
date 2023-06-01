import Menu from "../Components/Menu";
import ChatItem from "../Components/ChatItem";

import { useEffect, useState } from "react";
import { TMessage } from "../../types";
import { SendGet } from "../../Hooks/useFetch";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import MobileBack from "../Components/MobileBack";

const Chat = () => {

    const [chats, setChats] = useState<TMessage[]>([]);
    const [initiateNewChat, setInitiateNewChat] = useState(false);
    const [newChatListingID, setNewChatListingID] = useState<string>();
    const [chatLoading,setChatLoading] = useState(true);
    const navigate = useNavigate()

    // Check to see in the url if there are params that we want to send a new message...

    const GetChats = () => {
        SendGet("fetch-chats", { seshID: Cookies.get("seshID") }).then(data => {
            setChats(data.chats);
            setChatLoading(false);
        });
    }


    useEffect(() => {

        if (!Cookies.get("seshID")) return navigate("/login?reason=message");

        // Fetch messages and for each object do a render of a chat item.
        GetChats();

        setInterval(() => {
            GetChats();
        }, 60000);


        if (window.location.href.includes("?messageUser=")) {
            if (!window.location.href.includes("?listingID=")) return;
            setInitiateNewChat(true);
            setNewChatListingID(window.location.href.split("?listingID=")[1]);
        }

    }, []);

    return (
        <div className="text-mint sm:max-w-[1150px] mx-auto">
            <Menu />
            <MobileBack />

            {
                (chats.length > 0 || initiateNewChat) ?
                    <div className="flex flex-col gap-10 items-center">
                        <h1 className="sm:text-[32px] text-[24px]">Chat</h1>
                        <div className={`flex flex-col gap-5 sm:w-[1000px] ${initiateNewChat && "flex-col-reverse"}`}>
                            {
                                chats.map((chat, i) => (
                                    <ChatItem chatID={chat._id} listingID={chat.listingID} overrideOpen={(window.innerWidth>400)&&(i==0)}/>
                                ))
                            }
                            {
                                initiateNewChat &&
                                <ChatItem newChat={true} listingID={newChatListingID} />
                            }

                        </div>

                    </div>
                    : (!initiateNewChat && !chatLoading) ?
                    <h1 className="text-[24px] text-center mt-20">Nemate ni jednu poruku...</h1>
                    :
                    <div className="flex gap-5 self-center mt-20 items-center justify-center">
                        <p>Chat se učitava...</p>
                        <img className="animate-spin" src="loader.svg" alt="" />
                    </div>
            }


        </div>

    )
}

export default Chat;