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
    component: About
  },
  {
    id: 2,
    label: { tr: "Filmler", en: "Movies" },
    url: '/filmler',
    url_en: '/movies',
    component: Movies
  },
  {
    id: 3,
    label: { tr: "İletişim", en: "Contact" },
    url: '/iletisim',
    url_en: '/contact',
    component: Contact
  },
  {
    id: 4,
    label: { tr: "FilmlerRedux", en: "MoviesRedux" },
    url: '/filmler-redux',
    url_en: '/movies-redux',
    component: Movies_redux
  }
]

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
          const Component = item.component;
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
