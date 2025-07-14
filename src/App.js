import Menu from './components/Menu';
import { Routes, Route, Navigate } from 'react-router-dom';
import About from './pages/about';
import Movies from './pages/movies';
import Contact from './pages/contact';
import { MENU_ITEMS, PAGE_ID_LIST } from './constants/index';
import './styles/main.scss';
import Loader from './components/Loader';
import NotFound from './pages/NotFound';
import MovieDetail from './pages/movies/MovieDetail';

const routeList = {
  [PAGE_ID_LIST.ABOUT]: About,
  [PAGE_ID_LIST.MOVIES]: Movies,
  [PAGE_ID_LIST.CONTACT]: Contact,
};

const App = ({ lang }) => {
  return (
    <div className="app-container">

      <Menu lang={lang} />
      <Loader />
      <Routes>
        <Route path="/" element={<Navigate to="/about-me" replace />} />
        {MENU_ITEMS.map(item => {
          const Component = routeList[item.id];
          return (
            <Route
              key={item.id}
              path={item.url}
              element={<Component lang={lang} />}
            />
          );
        })}
        <Route path="/movies/:id" element={<MovieDetail lang={lang} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
