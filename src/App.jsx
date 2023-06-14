// Imports for with_context, with_router and with_suspense
import './App.css';
import { useState, Fragment, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchBar from './Components/SearchBar'
import Gallery from './Components/Gallery'
import AlbumView from './Components/AlbumView';
import ArtistView from './Components/ArtistView';
import { DataContext } from './Context/DataContext'
import { SearchContext } from './Context/SearchContext'

function App() {
  let [data, setData] = useState([])
  let [message, setMessage] = useState("Search for music!")
  let searchInput = useRef('')

  const API_URL = 'http://itunes.apple.com/search?term='

  const handleSearch = (e, term) => {
    e.preventDefault()
    document.title = `${term} Music`
    fetch(API_URL + term)
       .then(res => res.json())
       .then(resData => {
          if (resData.results.length > 0) {
            setData(resData.results)
          } else {
            setMessage("No results found!")
          }
       })
  }

  return (
    <Router>
      <div className="App">
        <SearchContext.Provider value={{
          term: searchInput,
          handleSearch: handleSearch
        }}>
            <SearchBar />
        </SearchContext.Provider>
        {message}
        <DataContext.Provider value={data}>
          <Routes>
            <Route 
            path="/" 
            element={
              <Fragment>
                <Gallery />
              </Fragment>
            } /> 
            <Route path="/album/:id" element={<AlbumView />} />
            <Route path="/artist/:id" element={<ArtistView />} />
          </Routes>
        </DataContext.Provider>  
      </div>
    </Router>  
  )
}
// with_router assignment added the id. 
// DataContext added to wrap around the <Gallery /> and Routes.
export default App;