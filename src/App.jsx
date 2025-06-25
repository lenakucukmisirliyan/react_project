import { useState } from 'react'
import './App.css'
import Menu from './components/Menu';
import { Routes, Route, Navigate } from 'react-router-dom';
import About from './pages/about';
import Movies from './pages/movies';
import Contact from './pages/contact';
import Movies_redux from './pages/movies';
import { MENU_ITEMS, PAGE_ID_LIST } from './constants/constant';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const routeList = {
  [PAGE_ID_LIST.ABOUT]: About,
  [PAGE_ID_LIST.MOVIES]: Movies,
  [PAGE_ID_LIST.CONTACT]: Contact,
  [PAGE_ID_LIST.MOVIES_REDUX]: Movies_redux,
};

const App = ({lang}) => {

  return (
    <div className="app-container">
      <Menu />

      <Routes>
        <Route path="/" element={<Navigate to="/about-me" replace />} />

        {MENU_ITEMS.map((item) => {
          const Component = routeList[item.id];
          return (
            <Route
              key={item.id}
              path={item.url_en}
              element={<Component lang={lang}/>}
            />
          )
        })}
      </Routes>


    </div>
  );
}

export default App;
