import Navigation from './components/Navigation/Navigation';
import './App.scss';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router';
import Movie from './pages/Movie/Movie';
import Tv from './pages/Tv/Tv';
import Trending from './pages/Trending/Trending';
import Search from './pages/Search/Search';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path="" element={<Trending />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
      <Navigation />
    </div>
  );
}

export default App;
