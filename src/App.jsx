import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menu from './components/Menu';
import { Routes, Route, useParams, Navigate} from 'react-router-dom';
import About from './pages/About';
import Movies from './pages/Movies';
import Contact from './pages/Contact';

const pageContents = {
  1: { tr: "Hakkımda", en: "About Me" },
  2: { tr: "Sevdiğim Filmler", en: "Favorite Movies" },
  3: { tr: "İletişim", en: "Contact" }
};

function Page({lang}) {
  const {id} = useParams();
  const content = pageContents[id];

  if (!content) {
    return <h1>{lang === 'en' ? 'Page not found' : 'Sayfa bulunamadı'}</h1>
  }
  else
    return <h1>{content[lang]}</h1>
}

function App() {
  const [lang, setLang] = useState('tr')

  return (
    <div>
      <button onClick = {() => setLang('tr')}>Türkçe</button>
      <button onClick = {() => setLang('en') }>English</button>

      <Menu lang = {lang}/>

      <Routes>
        <Route path="/" element={<Navigate to="/page/1" replace />} />
        <Route path='/page/1' element={<About lang={lang}/>} />
        <Route path='/page/2' element={<Movies lang={lang}/>} />
        <Route path='/page/3' element={<Contact lang={lang}/>} />
      </Routes>

    </div>
  );
}

export default App;
