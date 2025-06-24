import React from "react";
import { Link } from 'react-router-dom';
import { MENU_ITEMS } from "../constants/constant";
import { FormattedMessage } from "react-intl";


function Menu() {
    return (
        <nav>
            <ul>
                {MENU_ITEMS.map(item => (
                    <li key={item.id}>
                        <Link to={item.url_en}>
                            <FormattedMessage id={`menu.${item.id}`}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}


export default Menu;