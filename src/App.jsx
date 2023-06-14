import './App.css';
import { useState, Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './Components/SearchBar';
import Gallery from './Components/Gallery';
import AlbumView from './Components/AlbumView';
import ArtistView from './Components/ArtistView';
import { DataContext } from './Context/DataContext';

function App() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("Search for music!");

  const API_URL = 'http://itunes.apple.com/search?term=';

  const handleSearch = (e, term) => {
    e.preventDefault();
    fetch(API_URL + term)
      .then(res => res.json())
      .then(resData => {
        if (resData.results.length > 0) {
          setData(resData.results);
          document.title = `${term} Music`;
        } else {
          setMessage("No results found!");
        }
      });
  };

  return (
    <Router>
      <div className="App">
        <SearchBar handleSearch={handleSearch} />
        {message}
        <DataContext.Provider value={data}>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
              <Route
                path="/"
                element={
                  <Fragment>
                    <Gallery />
                  </Fragment>
                }
              />
              <Route path="/album/:id" element={<AlbumView />} />
              <Route path="/artist/:id" element={<ArtistView />} />
            </Routes>
          </Suspense>
        </DataContext.Provider>
      </div>
    </Router>
  );
}

export default App;
