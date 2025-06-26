import React from "react";
import { Link } from 'react-router-dom';
import { MENU_ITEMS } from "../constants/constant";
import { FormattedMessage } from "react-intl";


const Menu = () => {
    return (
        <nav 
            className="menu navbar navbar-expand-lg navbar-light bg-warning">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-auto">
                    {MENU_ITEMS.map(item => (
                        <li key={item.id}
                            className="nav-item">
                            <Link className="nav-link fw-bold" to={item.url_en}>
                                <FormattedMessage id={`menu.${item.id}`}/>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}


export default Menu;