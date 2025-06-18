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
  
  if (id === '1') return <About lang={lang}/>
  if (id === '2') return <Movies lang={lang}/>
  if (id === '3') return <Contact lang={lang}/>
  
  return <h1>{lang === 'en' ? 'Page not found' : 'Sayfa bulunamadı'}</h1>
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
        <Route path="/page/:id" element={<Page lang={lang} />} />
      </Routes>


    </div>
  );
}

export default App;
