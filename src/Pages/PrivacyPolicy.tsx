import { Helmet } from "react-helmet-async";
import Menu from "../Components/Menu";

const PrivacyPolicy = () => {
    return (
        <div className="flex flex-col w-screen h-full text-mint pb-10 sm:max-w-[1150px] mx-auto">
            <Helmet>
                <title>Tech Oglasi | Politika privatnosti</title>
                <meta name='description' content='Tech oglasi vam omogućavaju da prodajete nove ili polovne računare, laptopove kao i komponente.' />
            </Helmet>
            <Menu />
            <h1 className="text-[24px] self-center my-10">Politika privatnosti</h1>

            <p className="text-center text-[18px]">
                Tech-oglasi ozbiljno shvata vašu privatnost. Vaše lične podatke prikupljamo i koristimo samo ako je potrebno da bismo vam pružili naše usluge. Ova Politika privatnosti opisuje kako prikupljamo, koristimo i štitimo vaše lične podatke.
                <br /> <br />
                <h1 className="text-[20px] text-green">Informacije koje prikupljamo</h1> <br />

                Prikupljamo informacije koje nam dajete kada koristite našu veb stranicu, uključujući vaše ime, adresu e-pošte i sve druge informacije koje odlučite da pružite. Takođe prikupljamo kolačiće od Stripe-a i Google Ads-a da bismo vam pomogli da vam pružimo naše usluge.
                <br /> <br />
                <h1 className="text-[20px] text-green">Kako koristimo vaše informacije</h1> <br />

                Koristimo informacije koje prikupljamo da bismo vam pružili naše usluge i poboljšali našu veb stranicu. Takođe možemo da koristimo vaše podatke da bismo komunicirali sa vama o našim uslugama i da bismo odgovorili na vaše upite.
                <br /> <br />
                <h1 className="text-[20px] text-green">Deljenje vaših informacija</h1> <br />

                Ne delimo vaše lične podatke sa trećim licima osim ako je to neophodno da bismo vam pružili naše usluge ili kako to zahteva zakon.
                <br /> <br />

                <h1 className="text-[20px] text-green">Zaštita ličnih podataka</h1> <br />

                Preduzimamo sve mere da zaštitimo vaše lične podatke od neovlašćenog pristupa i korišćenja. Koristimo enkripciju da zaštitimo vaše informacije dok nam se prenose i dok se čuvaju na našim serverima.
                <br /> <br />

                <h1 className="text-[20px] text-green">Vaša prava</h1> <br />

                Imate pravo da pristupite, ispravite ili izbrišete svoje lične podatke koje smo prikupili. Takođe možete uložiti prigovor na obradu vaših ličnih podataka ili zatražiti da ograničimo njihovu upotrebu. Ako imate bilo kakvih pitanja ili nedoumica u vezi sa našom politikom privatnosti ili našim korišćenjem vaših ličnih podataka, kontaktirajte nas na <span className="text-gold font-semibold">support@tech-oglasi.com</span> .
                <br /> <br />

                <h1 className="text-[20px] text-green">Ažuriranje politike privatnosti</h1> <br />

                Možemo s vremena na vreme ažurirati ovu Politiku privatnosti. Ako izvršimo bilo kakve materijalne promene u ovoj Politici privatnosti, obavestićemo vas putem e-pošte ili objavljivanjem obaveštenja na našoj veb stranici.
                <br /> <br />
            </p>

        </div>
    )
}

export default PrivacyPolicy;