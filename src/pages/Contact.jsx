function Contact({lang}) {
    return(
        <div>
            <h1>{lang === 'en' ? 'Contact' : 'İletişim'}</h1>
            <li>{lang == 'tr' ? 'Cep: +90 534 380 66 45' : 'Phone: +90 534 380 66 45'}</li>
            <li>{lang == 'tr' ? 'Adres: Beşiktaş / İstanbul' : 'Adress: Beşiktaş / İstanbul'}</li>
        </div>
    );
}

export default Contact;