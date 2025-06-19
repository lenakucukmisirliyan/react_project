import React from "react";
import { Link } from 'react-router-dom';
import { menu } from '../App';


function Menu({lang}) {
    return (
        <nav>
            <ul>
                {menu.map(item => (
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