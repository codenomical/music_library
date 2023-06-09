import './App.css';
import { useEffect, useState, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchBar from './Components/SearchBar'
import Gallery from './Components/Gallery'
import AlbumView from './Components/AlbumView';
import ArtistView from './Components/ArtistView';

function App() {
  let [search, setSearch] = useState("")
  let [data, setData] = useState([])
  let [message, setMessage] = useState("Search for music!")

  const API_URL = 'http://itunes.apple.com/search?term='

  useEffect(() => {
    if (search) {
       document.title = `${search} Music`
       fetch(API_URL + search)
       .then(res => res.json())
       .then(resData => {
          if (resData.results.length > 0) {
            setData(resData.results)
          } else {
            setMessage("No results found!")
          }
       })
    }
  }, [search])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
          path="/" 
          element={
            <Fragment>
              <SearchBar handleSearch={handleSearch} />
              {message}
              <Gallery data={data} />
            </Fragment>
          } />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </div>
    </Router>  
  )
}

export default App;
