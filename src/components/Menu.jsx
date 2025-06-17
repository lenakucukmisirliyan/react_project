import React from "react";
import { Link } from 'react-router-dom';

const menuData = [
    { id : 1, label : "Hakkımda", label_en : "About Me"},
    { id : 2, label : "Sevdiğim Filmler", label_en : "Favourite Movies"},
    { id : 3, label : "İletişim", label_en : "Contact"}
];

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