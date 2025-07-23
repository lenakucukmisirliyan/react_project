import { NavLink } from 'react-router-dom';
import { MENU_ITEMS } from "../constants/index";
import LanguageSwitcher from '../locales/LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

const Menu = ({ lang, setLocale }) => {
  return (
    <nav className="menu navbar navbar-expand-lg navbar-light bg-warning">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {MENU_ITEMS.map(item => (
            <li key={item.id} className="nav-item">
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive ? "nav-link fw-bold text-primary" : "nav-link fw-bold text-dark"
                }
              >
                {item.label[lang]}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="switch button d-flex align-items-center gap-2 ms-auto">
          <LanguageSwitcher locale={lang} setLocale={setLocale} />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Menu;
