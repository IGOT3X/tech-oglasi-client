import { Helmet } from "react-helmet-async";
import Menu from "../Components/Menu";

const TermsAndConditions = () => {
    return (
        <div className="flex flex-col w-screen h-full text-mint pb-10 sm:max-w-[1150px] mx-auto">
            <Helmet>
                <title>Tech Oglasi | Uslovi i odredbe</title>
                <meta name='description' content='Tech oglasi vam omogućavaju da prodajete nove ili polovne računare, laptopove kao i komponente.' />
            </Helmet>
            <Menu />
            <h1 className="text-[24px] self-center my-10">Uslovi i odredbe</h1>

            <p className="text-center text-[18px]">
                <h1 className="text-[20px] text-green">Uslovi i odredbe za tech-oglasi, kojima upravlja TECH-TECH</h1> <br />

                Dobrodošli na tech-oglasi, listing veb stranicu kojom upravlja TECH-TECH. Pristupanjem ili korišćenjem naše veb stranice, saglasni ste da budete obavezani ovim Uslovima i odredbama.
                <br /> <br />
                <h1 className="text-[20px] text-green">Korišćenje naše veb stranice</h1> <br />

                Možete koristiti našu veb stranicu samo u zakonite svrhe. Saglasni ste da nećete koristiti našu veb stranicu za angažovanje u bilo kojoj aktivnosti koja krši bilo koji zakon ili narušava prava bilo koje treće strane.

                <br /> <br />
                <h1 className="text-[20px] text-green">Intelektualna svojina</h1> <br />

                Sav sadržaj na našoj veb stranici, uključujući tekst, grafiku, logotipe i slike, vlasništvo je TECH-TECH-a ili njegovih davalaca licence i zaštićen je autorskim pravima i drugim zakonima o intelektualnoj svojini. Ne možete koristiti bilo koji sadržaj sa naše veb stranice bez našeg izričitog pismenog pristanka.

                <br /> <br />
                <h1 className="text-[20px] text-green">Ograničene odgovornosti</h1> <br />

                TECH-TECH nije odgovoran za bilo kakvu štetu nastalu ili u vezi sa vašim korišćenjem naše veb stranice. Nismo odgovorni za tačnost, potpunost ili pouzdanost bilo kog sadržaja na našoj veb stranici, i ne garantujemo da će naša veb lokacija biti bez grešaka ili neprekidna.

                <br /> <br />
                <h1 className="text-[20px] text-green">Obeštećenje</h1> <br />
                Saglasni ste da ćete obeštetiti i držati TECH-TECH i njegove službenike, direktore, zaposlene i agente bezopasnim od bilo kakvog zahteva ili zahteva, uključujući razumne advokatske honorare, koji proizilaze iz ili u vezi sa vašim korišćenjem naše veb stranice.

                <br /> <br />
                <h1 className="text-[20px] text-green">Privatnost</h1> <br />
                Prikupljamo i koristimo vaše lične podatke u skladu sa našom Politikom privatnosti. Korišćenjem naše veb stranice, pristajete na naše prikupljanje i korišćenje vaših ličnih podataka kako je opisano u našoj Politici privatnosti.

                <br /> <br />
                <h1 className="text-[20px] text-green">Kolačići</h1> <br />
                Koristimo kolačiće od Stripe-a i Google Ads-a da bismo vam pomogli da vam pružimo naše usluge. Korišćenjem naše veb stranice, pristajete na našu upotrebu kolačića u skladu sa našom Politikom privatnosti.

                <br /> <br />
                <h1 className="text-[20px] text-green">Prekid pristupa</h1> <br />
                Možemo prekinuti vaš pristup našoj veb stranici u bilo kom trenutku, bez obaveštenja i iz bilo kog razloga.

                <br /> <br />
                <h1 className="text-[20px] text-green">Ažuriranja ovih uslova korišcenja</h1> <br />
                Možemo s vremena na vreme ažurirati ove Uslove i odredbe. Ako izvršimo bilo kakve materijalne promene ovih Uslova i odredbi, obavestićemo vas e-poštom ili postavljanjem obaveštenja na našu veb stranicu.

                <br /> <br />
                <h1 className="text-[20px] text-green">Nadležno pravo</h1> <br />
                Ovi uslovi i odredbe su regulisani zakonima Republike Srbije. Svaki spor koji nastane iz ili u vezi sa ovim Uslovima i odredbama podleže isključivoj nadležnosti sudova.
            </p>

        </div>
    )
}

export default TermsAndConditions;