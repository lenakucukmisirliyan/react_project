const LanguageSwitcher = ({ locale, setLocale }) => {
  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('appLocale', newLocale);
  };

  return (
    <div className='switch-button'>
      <button className="btn btn-danger" onClick={() => changeLocale('tr')}>
        Türkçe
      </button>
      <button className="btn btn-primary" onClick={() => changeLocale('en')}>
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;
