const LanguageSwitcher = ({ locale, setLocale }) => {
  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('appLocale', newLocale);
  };

  return (
    <div className="switch-button">
      <button
        className={`btn btn-danger ${locale === 'tr' ? 'active' : ''}`}
        onClick={() => changeLocale('tr')}
      >
        Türkçe
      </button>
      <button
        className={`btn btn-primary ${locale === 'en' ? 'active' : ''}`}
        onClick={() => changeLocale('en')}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;
