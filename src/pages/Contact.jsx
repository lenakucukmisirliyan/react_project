function Contact({lang}) {
    return(
        <div>
            <h1>{lang === 'en' ? 'Contact Page' : 'İletişim Sayfası'}</h1>
            <li>Cep: +90 534 380 66 45</li>
            <li>Adres: Beşiktaş / İstanbul </li>
        </div>
    );
}

export default Contact;