import React from 'react';

const LanguageSwitcher = ({ locale, setLocale }) => {
    return (
        <div className='switch-button'>
            <button className="btn btn-danger" onClick={() => setLocale('tr')}>Türkçe</button>
            <button className="btn btn-primary" onClick={() => setLocale('en')}>English</button>
        </div>
    );
}

export default LanguageSwitcher;