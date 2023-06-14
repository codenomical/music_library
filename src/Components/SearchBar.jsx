import { useContext, useRef } from 'react'
import { SearchContext } from '../Context/SearchContext'

function SearchBar () {
    const { term, handleSearch } = useContext(SearchContext)
    // eslint-disable-next-line
    const termRef = useRef(null);

    return (
        <form>
            <input type="text" placeholder="Enter a search term here" ref={termRef} />
            <input type="submit" onClick={(e) => handleSearch(e, termRef.current.value)} />
        </form>
    )
}

export default SearchBar;