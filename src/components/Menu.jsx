import React from "react";
import { Link } from 'react-router-dom';
import { MENU_ITEMS } from "../constants/constant";


function Menu({lang}) {
    return (
        <nav>
            <ul>
                {MENU_ITEMS.map(item => (
                    <li key={item.id}>
                        <Link to={lang === 'tr' ? item.url : item.url_en}>
                            {item.label[lang]}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}


export default Menu;