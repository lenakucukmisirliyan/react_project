import { useState } from "react";
import { FormattedMessage } from "react-intl";

const Contact = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Form has been sent')

        setName('');
        setSurname('');
        setEmail('');
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <h2 className = "header-font"><FormattedMessage id="contact.title" /></h2>
                <label className="form-label">
                    <FormattedMessage id="contact.name"/>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e?.target?.value)}
                        className="form-control"
                    />
                </label>
                <br></br>
                <label className="form-label">
                    <FormattedMessage id="contact.surname"/>
                    <input 
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e?.target?.value)}
                        className="form-control"
                    />
                </label>
                <br></br>
                <label className="form-label">
                    <FormattedMessage id="contact.email"/>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e?.target?.value)}
                        className="form-control"
                    />
                </label>
                <br></br>
                <button type="submit" className="btn btn-info"><FormattedMessage id="form.send"/></button>
            </div>
        </form>
    )
}


export default Contact;