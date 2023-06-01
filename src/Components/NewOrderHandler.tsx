import Cookies from "js-cookie";
import { SendPost } from "../../Hooks/useFetch";

const NewOrderHandler = ({ order, orderInfos, GetNewOrders }) => {

    const HandleSent = (orderID: string) => {
        SendPost("change-listing-state", { listingID: orderID, newState: "sent", seshID: Cookies.get("seshID") }).then(data => {
            GetNewOrders();
        })
    }
    const HandleCancel = (orderID: string) => {
        SendPost("change-listing-state", { listingID: orderID, newState: "cancel", seshID: Cookies.get("seshID") }).then(data => {
            GetNewOrders();
        })
    }
    return (
        <div className="flex flex-col p-[32px] sm:gap-[32px] gap-[24px] border border-green rounded-[10px] shadow-2xl">
            <a target="_blank" href={`/listing?listingID=${order._id}`} className="font-medium self-center text-center underline">{order.title}</a>
            <div className="h-[2px] w-[70%] sm:self-center self-center bg-mint opacity-20"></div>
            <div className="flex sm:flex-row flex-col gap-[40px] items-center justify-center">
                <div className="flex flex-col items-center gap-[4px]">
                    <img className="w-[24px] min-w-[24px]" src="user-mint.svg" alt="" />
                    <a className="underline text-[14px]" target="_blank" href={`/account?username=${orderInfos?.username}`}>{orderInfos?.firstName + ' ' + orderInfos?.lastName}</a>
                </div>
                <div className="flex flex-col items-center gap-[4px]">
                    <img className="w-[24px] min-w-[24px]" src="location-mint.svg" alt="" />
                    <p className="text-[14px]">{orderInfos?.city.charAt(0).toUpperCase() + orderInfos?.city.slice(1)}, {orderInfos?.address}</p>
                </div>
                <div className="flex flex-col items-center gap-[4px]">
                    <img className="w-[24px] min-w-[24px]" src="phone-mint.svg" alt="" />
                    <p className="text-[14px]">{orderInfos?.phoneNumber}</p>
                </div>
                <div className="flex flex-col items-center gap-[4px]">
                <img className="w-[24px] min-w-[24px]" src="tag.svg" alt="" />
                    <p className="text-[14px]">{order.price} €</p>
                </div>
            </div>
            <div className="h-[2px] w-[70%] sm:self-center self-center bg-mint opacity-20"></div>
            {order.orderState == "ordered" ?
            <div className="flex flex-col gap-[16px]">
                <div className="flex gap-5 self-center">
                    <button className="flex self-center border border-green text-green font-semibold rounded-[10px] px-[24px] py-[8px] hover:bg-listing-dark gap-2 font-semibold transition transform duration-700 ease-in-out hover:scale-105 hover:bg-listing-light" onClick={() => { HandleSent(order._id) }}>Poslato <img src="truck.svg" alt="" /></button>
                    <button className="flex self-center border border-red rounded-[10px] px-[24px] py-[8px] text-red font-semibold hover:bg-listing-dark gap-2 transition transform duration-700 ease-in-out hover:scale-105 hover:bg-listing-light" onClick={() => HandleCancel(order._id)}>Otkaži <img src="x.svg" alt="" /></button>
                </div>
                <div className="flex items-center gap-3 self-center">
                    <img src="alert-octagon.svg" alt="" />
                    <p className="opacity-25 text-[12px]">Porudžbina mora da se isporuči kurirskoj službi u roku od jednog dana, a ako taj rok istekne, porudžbina će biti automatski otkazana.</p>
                </div>
            </div>

                :
                <div className="flex gap-3 self-center">
                    <p className="text-green font-semibold">Poslato, čeka se da kupac preuzme paket</p>
                    <img className="animate-spin" src="loader-green.svg" alt="" />
                </div>}
            {/* <div className="flex self-center gap-10 max-w-[300px]">
                <div className="flex flex-col gap-5">
                    <p>Oglas u pitanju:</p>
                    <p>Poručilac:</p>
                    <p>Grad:</p>
                    <p>Adresa:</p>
                    <p>Broj telefona:</p>
                    <p>Otkupna cena:</p>
                </div>
                <div className="flex flex-col gap-5">
                <a href={`/listing?listingID=${order._id}`} className="font-semibold underline">{order.title}</a>
                <a className="underline" href={`/account?username=${orderInfos?.username}`}>{orderInfos?.firstName + ' ' + orderInfos?.lastName}</a>
                <p className="">{orderInfos?.city.charAt(0).toUpperCase() + orderInfos?.city.slice(1)}</p>
                <p className=""></p>
                <p className=""></p>
                <p>{order.price}€</p>
                </div>
            </div>
            {order.orderState == "ordered" ?
                <div className="flex gap-5 self-center">
                    <button className="flex self-center border border-mint rounded-[10px] p-3 hover:bg-listing-dark gap-2 font-semibold transition transform duration-700 ease-in-out hover:scale-105 hover:bg-listing-light" onClick={() => { HandleSent(order._id) }}>Poslato <img src="truck.svg" alt="" /></button>
                    <button className="flex self-center border border-red rounded-[10px] p-3  text-red hover:bg-listing-dark gap-2 transition transform duration-700 ease-in-out hover:scale-105 hover:bg-listing-light" onClick={() => HandleCancel(order._id)}>Otkaži <img src="x.svg" alt="" /></button>
                </div>
                :
                <div className="flex gap-3">
                    <h1 className="text-center">Status: </h1>
                    <p>Ceka se na kupca da potvrdi pošiljku</p>
                    <img className="animate-spin" src="loader.svg" alt="" />
                </div>}
                 */}
        </div>
    )
}

export default NewOrderHandler;

