import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menu from './components/Menu';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import About from './pages/About';
import Movies from './pages/Movies';
import Contact from './pages/Contact';
import Movies_redux from './pages/Movies_redux';

export const menu = [
  {
    id: 1,
    label: { tr: "Hakkımda", en: "AboutMe" },
    url: '/hakkimda',
    url_en: '/about-me',
  },
  {
    id: 2,
    label: { tr: "Filmler", en: "Movies" },
    url: '/filmler',
    url_en: '/movies',
  },
  {
    id: 3,
    label: { tr: "İletişim", en: "Contact" },
    url: '/iletisim',
    url_en: '/contact',
  },
  {
    id: 4,
    label: { tr: "FilmlerRedux", en: "MoviesRedux" },
    url: '/filmler-redux',
    url_en: '/movies-redux',
  }
]

export const PAGE_ID_LIST = {
  ABOUT: "1",
  MOVIES: "2",
  CONTACT: "3",
  MOVIES_REDUX: "4",
};

const routeList = {
  [PAGE_ID_LIST.ABOUT]: About,
  [PAGE_ID_LIST.MOVIES]: Movies,
  [PAGE_ID_LIST.CONTACT]: Contact,
  [PAGE_ID_LIST.MOVIES_REDUX]: Movies_redux,
};


function App() {
  const [lang, setLang] = useState('tr')

  return (
    <div>
      <button onClick={() => setLang('tr')}>Türkçe</button>
      <button onClick={() => setLang('en')}>English</button>

      <Menu lang={lang} />

      <Routes>
        <Route path="/" element={<Navigate to="/about-me" replace />} />

        {menu.map((item) => {
          const Component = routeList[item.id];
          return (
            <Route
              key={item.id}
              path={lang === 'tr'? item.url : item.url_en}
              element={<Component lang={lang} />}
            />
          )})}
      </Routes>


    </div>
  );
}

export default App;
