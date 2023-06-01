import Cookies from "js-cookie";
import { SendPost } from "../../Hooks/useFetch";

const ContactItem = ({ contact,GetContacts }: { contact: string,GetContacts:Function }) => {
    const HandleDeleteFromContacts = (event) => {
        event.cancelBubble = true;
        event.preventDefault();
        event.stopPropagation();
        SendPost("delete-from-contacts", { seshID: Cookies.get("seshID"), contact: contact }).then(data => {
            if (data.status != 200) return alert("Greška u brisanju korisnika iz adresara");
            GetContacts();
        });
    }
    return (
        <a href={`/account?username=${contact}`} target="_blank" className="w-[294px] py-5 bg-listing-dark rounded-[10px] flex items-center justify-center gap-5 hover:bg-listing-light transition transform duration-700 ease-in-out hover:scale-105 font-semibold">
            <p className="text-[20px]">{contact}</p>
            <button onClick={HandleDeleteFromContacts} className="transition transform duration-700 ease-in-out hover:scale-125 group"><img className="border border-mint border-opacity-0 rounded-full group-hover:border-opacity-100 transition transform duration-700 ease-in-out" src="exit.svg" alt="" /></button>
        </a>
    )
}

export default ContactItem;