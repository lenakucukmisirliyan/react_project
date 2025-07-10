import { NavLink } from 'react-router-dom';
import { MENU_ITEMS } from "../constants/index";

const Menu = ({ lang }) => {
  return (
    <nav className="menu navbar navbar-expand-lg navbar-light bg-warning">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-auto">
          {MENU_ITEMS.map(item => (
            <li key={item.id} className="nav-item">
              <NavLink
                to={item.url}
                className="nav-link fw-bold"
                style={({ isActive }) => ({
                  color: isActive ? 'blue' : 'black',
                })}
              >
                {item.label[lang]}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
