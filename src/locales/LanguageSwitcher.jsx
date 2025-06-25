import React from 'react';

const LanguageSwitcher = ({ locale, setLocale }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '1rem' }}>
            <button className="btn btn-danger" style={{ marginRight: '10px' }} onClick={() => setLocale('tr')}>Türkçe</button>
            <button className="btn btn-primary" onClick={() => setLocale('en')}>English</button>
        </div>
    );
}

export default LanguageSwitcher;