import { useState } from "react";
import Select from "./Functionality/Select";

const FAQ = () =>{
    const [selectedFAQ, setSelectedFAQ] = useState("posting");

    return(
        <div className="self-center flex items-start flex-wrap justify-between w-full mt-20 gap-10">
                <div className="hidden sm:flex flex-col justify-center sm:gap-0 gap-5 items-center sm:items-start mb-10 mx-auto sm:mx-0 w-[90%] sm:w-auto">
                    <div className="flex gap-2 items-center sm:w-[230px] w-full">
                        <div className={`${selectedFAQ == "posting" ? "w-[4px] bg-green" : "w-[2px] bg-mint"} h-[64px] rounded-[1px] sm:block hidden`}></div>
                        <button className="w-full sm:w-auto" onClick={() => {setSelectedFAQ("posting");window.innerWidth<600&&window.scrollTo(0, document.body.scrollHeight);}}><p className={`${selectedFAQ == "posting" ? "font-semibold border-green" : "border-mint"} border rounded-[10px] p-2 sm:border-0 sm:p-0 sm:rounded-[0px]"`}>Postavljanje oglasa</p></button>
                    </div>
                    <div className="flex gap-2 items-center sm:w-[230px] w-full">
                        <div className={`${selectedFAQ == "promoting" ? "w-[4px] bg-green" : "w-[2px] bg-mint"} h-[64px] rounded-[1px] sm:block hidden`}></div>
                        <button className="w-full sm:w-auto" onClick={() => {setSelectedFAQ("promoting");window.innerWidth<600&&window.scrollTo(0, document.body.scrollHeight);}}><p className={`${selectedFAQ == "promoting" ? "font-semibold border-green" : "border-mint"} border rounded-[10px] p-2 sm:border-0 sm:p-0 sm:rounded-[0px]"`}>Promovisanje oglasa</p></button>
                    </div>
                    <div className="flex gap-2 items-center sm:w-[230px] w-full">
                        <div className={`${selectedFAQ == "filtering" ? "w-[4px] bg-green" : "w-[2px] bg-mint"} h-[64px] rounded-[1px] sm:block hidden`}></div>
                        <button className="w-full sm:w-auto" onClick={() => {setSelectedFAQ("filtering");window.innerWidth<600&&window.scrollTo(0, document.body.scrollHeight);}}><p className={`${selectedFAQ == "filtering" ? "font-semibold border-green" : "border-mint"} border rounded-[10px] p-2 sm:border-0 sm:p-0 sm:rounded-[0px]"`}>Filtriranje oglasa</p></button>
                    </div>
                    <div className="flex gap-2 items-center sm:w-[230px] w-full">
                        <div className={`${selectedFAQ == "ordering" ? "w-[4px] bg-green" : "w-[2px] bg-mint"} h-[64px] rounded-[1px] sm:block hidden`}></div>
                        <button className="w-full sm:w-auto" onClick={() => {setSelectedFAQ("ordering");window.innerWidth<600&&window.scrollTo(0, document.body.scrollHeight);}}><p className={`${selectedFAQ == "ordering" ? "font-semibold border-green" : "border-mint"} border rounded-[10px] p-2 sm:border-0 sm:p-0 sm:rounded-[0px]"`}>Poručivanje sa oglasa</p></button>
                    </div>
                    <div className="flex gap-2 items-center sm:w-[230px] w-full">
                        <div className={`${selectedFAQ == "verified" ? "w-[4px] bg-green" : "w-[2px] bg-mint"} h-[64px] rounded-[1px] sm:block hidden`}></div>
                        <button className="w-full sm:w-auto" onClick={() => {setSelectedFAQ("verified");window.innerWidth<600&&window.scrollTo(0, document.body.scrollHeight);}}><p className={`${selectedFAQ == "verified" ? "font-semibold border-green" : "border-mint"} border rounded-[10px] p-2 sm:border-0 sm:p-0 sm:rounded-[0px]"`}>Verifikovani korisnici</p></button>
                    </div>
                    <div className="flex gap-2 items-center sm:w-[230px] w-full">
                        <div className={`${selectedFAQ == "ranking" ? "w-[4px] bg-green" : "w-[2px] bg-mint"} h-[64px] rounded-[1px] sm:block hidden`}></div>
                        <button className="w-full sm:w-auto" onClick={() => {setSelectedFAQ("ranking");window.innerWidth<600&&window.scrollTo(0, document.body.scrollHeight);}}><p className={`${selectedFAQ == "ranking" ? "font-semibold border-green" : "border-mint"} border rounded-[10px] p-2 sm:border-0 sm:p-0 sm:rounded-[0px]"`}>Ranking sistem</p></button>
                    </div>
                    <div className="flex gap-2 items-center sm:w-[230px] w-full">
                        <div className={`${selectedFAQ == "reputation" ? "w-[4px] bg-green" : "w-[2px] bg-mint"} h-[64px] rounded-[1px] sm:block hidden`}></div>
                        <button className="w-full sm:w-auto" onClick={() => {setSelectedFAQ("reputation");window.innerWidth<600&&window.scrollTo(0, document.body.scrollHeight);}}><p className={`${selectedFAQ == "reputation" ? "font-semibold border-green" : "border-mint"} border rounded-[10px] p-2 sm:border-0 sm:p-0 sm:rounded-[0px]"`}>Sistem reputacije</p></button>
                    </div>
                    <div className="flex gap-2 items-center sm:w-[230px] w-full">
                        <div className={`${selectedFAQ == "dataprotection" ? "w-[4px] bg-green" : "w-[2px] bg-mint"} h-[64px] rounded-[1px] sm:block hidden`}></div>
                        <button className="w-full sm:w-auto" onClick={() => {setSelectedFAQ("dataprotection");window.innerWidth<600&&window.scrollTo(0, document.body.scrollHeight);}}><p className={`${selectedFAQ == "dataprotection" ? "font-semibold border-green" : "border-mint"} border rounded-[10px] p-2 sm:border-0 sm:p-0 sm:rounded-[0px]"`}>Zaštita podataka</p></button>
                    </div>
                </div>
                <div className="sm:hidden flex flex-col justify-center sm:gap-0 gap-5 items-center sm:items-start mx-auto sm:mx-0 w-[90%] sm:w-auto">
                    <Select title="Izaberi pitanje" customWidth={"full"} setState={setSelectedFAQ} options={[
                        {title:"Postavljanje oglasa",value:"posting"},
                        {title:"Poručivanje oglasa",value:"ordering"},
                        {title:"Promovisanje oglasa",value:"promoting"},
                        {title:"Filtriranje oglasa",value:"filtering"},
                        {title:"Verifikovani korisnici",value:"verified"},
                        {title:"Ranking sistem",value:"ranking"},
                        {title:"Sistem reputacije",value:"reputation"},
                        {title:"Zaštita podataka",value:"dataprotection"}
                        ]}/>
                </div>
                <div className="sm:w-[743px] w-[90%] py-5 px-10 bg-mint rounded-[20px] text-black mx-auto sm:mx-0">
                        <div className={`flex flex-col gap-5 ${!(selectedFAQ == "posting" || !selectedFAQ) && "hidden"}`}>
                            <div className="flex flex-col gap-2 w-[150px]">
                                <p className="text-[14px] font-semibold">
                                    Postavljanje oglasa
                                </p>
                                <div className="w-[80%] bg-green h-[2px]"></div>
                            </div>
                            <div className="flex gap-5 sm:flex-row flex-col">
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Kako da postavim oglas?</p>
                                    <p className="text-[12px]">Svaki oglas mora imati kategoriju koju vi birate. Nakon toga ukoliko želite da vaš oglas bude lakše pronadjen od strane potencijalnih kupaca možete uneti specifikacije stvari koju prodajete. </p>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Da li su specifikacije potrebne?</p>
                                    <p className="text-[12px]">Ako ne želite da navedete specifikacije, ne morate, ali vaš oglas možda neće biti prikazan toliko puta kao oglas koji ih ima.</p>
                                </div>
                            </div>

                        </div>
                        
                        <div className={`flex flex-col gap-5 ${!(selectedFAQ == "promoting" ) && "hidden"}`}>
                            <div className="flex flex-col gap-2 w-[170px]">
                                <p className="text-[14px] font-semibold">
                                    Promovisanje oglasa
                                </p>
                                <div className="w-[80%] bg-green h-[2px]"></div>
                            </div>
                            <div className="flex gap-5 sm:flex-row flex-col">
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Kako da promovišem svoj oglas?</p>
                                    <p className="text-[12px]">Promovisanje oglasa vršite tako što kliknete na 3 vertikalne tačke oglasa a zatim izaberete opciju "promoviši oglas" i nakon toga birate tip promovisanja. Kada ste sve to odradili preostaje samo plaćanje koje se vrši kartično. Kada je vaš oglas promovisan on se neće prikazivati u popularnim sekcijama na početnoj strani.</p>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Razlike izmedju promocija?</p>
                                    <p className="text-[12px]">
                                        <span className="text-[14px] font-medium">1. Vrh oglasa</span> <br />
                                        Kada promovišete vaš oglas na vrh onda će vaš oglas stajati na vrhu "oglasi" stranice. <br />
                                        <span className="text-[14px] font-medium">2. Početna strana</span> <br />
                                        Kada promovišete vaš oglas na početnoj strani onda će vaš oglas stajati na početnoj stranici, kao i na vrhu "oglasi" stranice.
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div className={`${!(selectedFAQ == "filtering") && "hidden"} flex flex-col gap-5`}>
                            <div className="flex flex-col gap-2 w-[150px]">
                                <p className="text-[14px] font-semibold">
                                    Filtriranje oglasa
                                </p>
                                <div className="w-[80%] bg-green h-[2px]"></div>
                            </div>
                            <div className="flex gap-5 sm:flex-row flex-col">
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Šta su filteri?</p>
                                    <p className="text-[12px]">Filteri vam omogućavaju da pretražujete oglase po specifikacijama. Na primer želite računar sa intel i5 procesorom i 16gb ram-a.</p>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Praćenje filtera</p>
                                    <p className="text-[12px]">Ova opcija vam omogućava da pratite filter koji ste prethodno sastavili. Kada neki oglas sa tim specifikacijama bude postavljen vi ćete biti obavešteni odmah.</p>
                                </div>
                            </div>
                            <div className="flex gap-5 sm:flex-row flex-col">
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Kako otpratiti filter?</p>
                                    <p className="text-[12px]">Na vašoj nalog stranici možete obrisati sve filtere koje više ne želite pratiti.</p>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Email notifikacije</p>
                                    <p className="text-[12px]">Osim što ćete dobiti notifikaciju na tech-oglasima pristići će vam i Email sa oglasom koji je objavljen a poseduje specifikacije koje ste uneli za praćenje.</p>
                                </div>
                            </div>

                        </div>
                        <div className={`flex flex-col gap-5 ${!(selectedFAQ == "verified") && "hidden"}`}>
                            <div className="flex flex-col gap-2 w-[150px]">
                                <p className="text-[14px] font-semibold">
                                    Verifikovani korisnici
                                </p>
                                <div className="w-[80%] bg-green h-[2px]"></div>
                            </div>
                            <div className="flex gap-5 sm:flex-row flex-col">
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Kako se dobija verifikacija?</p>
                                    <p className="text-[12px]">Verifikaciju dobijate nakon što unesete vaš JMBG kao i broj lične karte. Pročitajte <button className="underline" onClick={() => setSelectedFAQ("dataprotection")}>zaštitu podataka</button> ukoliko želite da saznate kako štitimo vaše podatke od zloupotreba.</p>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Čemu slużi verifikacija?</p>
                                    <p className="text-[12px]">Verifikacija služi kao još jedan sloj zaštite naših korisnika. Verifikovani korisnici su manje podložni prevarama. Ukoliko ipak dodje do prevare od strane verifikovanog korisnika mi možemo delovati efektivnije.</p>
                                </div>
                            </div>

                        </div>
                        <div className={`flex flex-col gap-5 ${!(selectedFAQ == "ranking") && "hidden"}`}>
                            <div className="flex flex-col gap-2 w-[150px]">
                                <p className="text-[14px] font-semibold">
                                    Ranking sistem
                                </p>
                                <div className="w-[80%] bg-green h-[2px]"></div>
                            </div>
                            <div className="flex gap-5 sm:flex-row flex-col">
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Šta predstavlja ranking sistem?</p>
                                    <p className="text-[12px]">Ranking sistem služi da se odvoje "novajlije" od prodavaca sa više iskustva.</p>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Koji su to sve rankovi?</p>
                                    <p className="text-[12px]">Trenutno postoje sledeći rankovi: <br />
                                        1. Bronza <br />
                                        2. Srebro <br />
                                        3. Zlato  <br />
                                        4. Platina  <br />
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-5 sm:flex-row flex-col">
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Kako mogu da povećam svoj rank?</p>
                                    <p className="text-[12px]">Sa svakom uspešnom prodajom dobijate bod prema većem ranku. Kada sakupite dovoljno bodova za sledeći rank automatski će vaš rank biti prikazan.</p>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold"></p>
                                    <p className="text-[12px]"></p>
                                </div>
                            </div>

                        </div>
                        <div className={`flex flex-col gap-5 ${!(selectedFAQ == "reputation") && "hidden"}`}>
                            <div className="flex flex-col gap-2 w-[150px]">
                                <p className="text-[14px] font-semibold">
                                    Sistem reputacije
                                </p>
                                <div className="w-[80%] bg-green h-[2px]"></div>
                            </div>
                            <div className="flex gap-5 sm:flex-row flex-col">
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Šta je sistem reputacije?</p>
                                    <p className="text-[12px]">Svaki registrovani korisnik dobija reputaciju 100%. Ukoliko su njegove recenzije pozitivne on zadržava 100% reputaciju. Ukoliko dobije negativnu recenziju njegova reputacija opada u zavisnosti od odnosa pozitivnih prema negativnim recenzijama.</p>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Negativan uticaj loše reputacije?</p>
                                    <p className="text-[12px]">Ukoliko imate ispod 90% reputacije gubite verifikaciju sve dok ne popravite istu. Ukoliko je vaša reputacija ispod 50% vaš nalog će biti suspendovan.</p>
                                </div>
                            </div>

                        </div>
                        <div className={`flex flex-col gap-5 ${!(selectedFAQ == "dataprotection") && "hidden"}`}>
                            <div className="flex flex-col gap-2 w-[150px]">
                                <p className="text-[14px] font-semibold">
                                    Zaštita podataka
                                </p>
                                <div className="w-[80%] bg-green h-[2px]"></div>
                            </div>
                            <div className="flex gap-5 sm:flex-row flex-col">
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Kako štitimo vaše podatke?</p>
                                    <p className="text-[12px]">"TECH-TECH" jako ozbiljno shvata zaštitu ličnih podataka. Iz tog razloga svi podatci koji unesete su zakonom zaštićeni od bilo kakve zloupotrebe, prodaje marketinškim firmama kao i od hakerskih napada. <button className="underline">Pročitaj više</button></p>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Vidljive informacije</p>
                                    <p className="text-[12px]">Svaki korisnik može videti vaš broj telefona, grad koji ste uneli, datum registracije, firmu ukoliko ste je uneli. Kada poručite sa nekog oglasa prodavac može videti vašu adresu. Niko osim nas nema uvid u vaš JMBG,broj lične karte kao niti vaš E-Mail.</p>
                                </div>
                            </div>
                        </div>
                        <div className={`flex flex-col gap-5 ${!(selectedFAQ == "ordering") && "hidden"}`}>
                            <div className="flex flex-col gap-2 w-[150px]">
                                <p className="text-[14px] font-semibold">
                                    Poručivanje oglasa
                                </p>
                                <div className="w-[80%] bg-green h-[2px]"></div>
                            </div>
                            <div className="flex gap-5 sm:flex-row flex-col">
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Kako se vrše porudžbine?</p>
                                    <p className="text-[12px]">Da bi ste poručili sa nekog oglasa morate imati unešene podatke kao što su: <br />
                                        1. Broj telefona <br />
                                        2. Adresa <br />
                                        3. Ime i prezime <br />
                                        Porudžbinu vršite klikom na dugme "Poruči".
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Sistem porudžbina (prodavac)</p>
                                    <p className="text-[12px]">Kada vam neko poruči sa oglasa dobijate notifikaciju i na vašoj nalog stranici ćete videti porudžbinu sa detaljima kupca. Možete otkazati porudžbinu ili je markirati kao "poslato".</p>
                                </div>
                            </div>
                            <div className="flex gap-5 sm:flex-row flex-col">
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Vremenski rokovi?</p>
                                    <p className="text-[12px]">Kupac ima rok 72H da obeleži porudžbinu kao "Preuzeto". Ukoliko on to ne učini porudžbina se automatski markira kao preuzeta. Rok za recenzije je isti. Ukoliko prodje 72H bez recenzije prodavac automatski dobija pozitivnu recenziju.</p>
                                </div>
                                <div className="flex flex-col gap-2 sm:w-[50%]">
                                    <p className="font-semibold">Sistem porudžbina (kupac)</p>
                                    <p className="text-[12px]">Kada poručite sa nekog oglasa čekate da prodavac obeleži porudžbinu kao "Poslato". Pre nego što on to učini imate pravo da otkažete porudžbinu.</p>
                                </div>
                            </div>

                        </div>
                </div>
            </div>
    )
}

export default FAQ;