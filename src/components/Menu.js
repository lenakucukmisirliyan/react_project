import { NavLink } from 'react-router-dom';
import { MENU_ITEMS } from "../constants/index";
import LanguageSwitcher from '../locales/LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

const Menu = ({ lang, setLocale }) => {
  return (
    <aside className="sidebar">
      {/* Üstte Dil ve Tema Switcher */}
      <div className="sidebar-top">
        <LanguageSwitcher locale={lang} setLocale={setLocale} />
        <ThemeSwitcher />
      </div>

      {/* Menü Listesi */}
      <nav className="sidebar-nav">
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
      </nav>
    </aside>
  );
};

export default Menu;
