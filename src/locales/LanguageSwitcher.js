const LanguageSwitcher = ({ locale, setLocale }) => {
  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('appLocale', newLocale);
  };

  return (
    <div className="lang-button">
      <button
        className={`btn btn-danger ${locale === 'tr' ? 'active' : ''}`}
        onClick={() => changeLocale('tr')}
      >
        TR
      </button>
      <button
        className={`btn btn-primary ${locale === 'en' ? 'active' : ''}`}
        onClick={() => changeLocale('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
