import React from "react";
import { Link } from 'react-router-dom';
import menuData from '../data/menuData.json'


function Menu({lang}) {
    return (
        <nav>
            <ul>
                {menuData.map(item => (
                    <li key={item.id}>
                        <Link to = {`/page/${item.id}`}>
                            {lang === 'en' ? item.label_en : item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}


export default Menu;