import { useState } from "react";

function Contact ({lang}) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    
    function handleSubmit (e) {
        e.preventDefault()
        alert(lang === 'tr' ? 'Form Gönderildi!' : 'Form has been sent')

        setName('');
        setSurname('');
        setEmail('');
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <label>
                {lang == 'tr' ? 'Ad : ' : 'Name : '}
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <br></br>
            <label>
                {lang == 'tr' ? 'Soyad : ' : 'Surname : '}
                <input 
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
            </label>
            <br></br>
            <label>
                {lang == 'tr' ? 'E-mail : ' : 'E-mail : '}
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <br></br>
            <button type="submit">{lang === 'tr' ? 'Gönder' : 'Send'}</button>
        </form>
    )
}


export default Contact;