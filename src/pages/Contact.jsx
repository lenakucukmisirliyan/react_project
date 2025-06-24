import { useState } from "react";
import { FormattedMessage } from "react-intl";

function Contact () {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    
    function handleSubmit (e) {
        e.preventDefault()
        alert('Form has been sent')

        setName('');
        setSurname('');
        setEmail('');
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <h2><FormattedMessage id="contact.title" /></h2>
            <label>
                <FormattedMessage id="contact.name"/>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <br></br>
            <label>
                <FormattedMessage id="contact.surname"/>
                <input 
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
            </label>
            <br></br>
            <label>
                <FormattedMessage id="contact.email"/>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <br></br>
            <button type="submit"><FormattedMessage id="form.send"/></button>
        </form>
    )
}


export default Contact;