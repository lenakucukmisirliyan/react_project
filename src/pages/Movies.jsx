function Movies({lang}) {
    return (
        <div>
            <h1>{lang === 'en' ? 'Favorite Movies' : 'Sevdiğim Filmler'}</h1>
                <ul>
                    <li>{lang == 'en' ? 'Lorem, ipsum dolor' : 'Totam, aliquam iure?'}</li>
                    <li>{lang == 'en' ? 'Voluptas, ipsa recusandae' : 'Officia, cum autem?'}</li>
                    <li>{lang == 'en' ? 'Optio, soluta saepe.' : 'Tempora, illum aliquam.'}</li>
                    <li>{lang == 'en' ? 'Vel, explicabo eos!' : 'Officia, cum autem?'}</li>
                    <li>{lang == 'en' ? 'Mollitia, in voluptate!' : 'Officia, cum autem?'}</li>
                    <li>{lang == 'en' ? 'empora, illum aliquam.' : 'Officia, cum autem?'}</li>
                    <li>{lang == 'en' ? 'Delectus, animi doloremque.' : 'Officia, cum autem?'}</li>
                    <li>{lang == 'en' ? 'Delectus, sequi dignissimos.' : 'Officia, cum autem?'}</li>
                    <li>{lang == 'en' ? 'Totam, aliquam iure?' : 'Officia, cum autem?'}</li>
                    <li>{lang == 'en' ? 'Officia, cum autem?' : 'Officia, cum autem?'}</li>
                </ul>
        </div>
    );
}

export default Movies;