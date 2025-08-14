import { NavLink } from 'react-router-dom';
import { MENU_ITEMS } from "../constants/index";
import LanguageSwitcher from '../locales/LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

const Menu = ({ lang, setLocale, isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Üstte Dil ve Tema Switcher */}
      <div className="sidebar-top">
        <LanguageSwitcher locale={lang} setLocale={setLocale} />
        <ThemeSwitcher />
      </div>

      {/* Menü Listesi */}
      <div className="sidebar-nav">
        <ul>
          {MENU_ITEMS.map(item => (
            <li key={item.id}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                {item.label[lang]}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Menu;
