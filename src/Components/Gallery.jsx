import { useContext } from 'react'
import { DataContext } from '../Context/DataContext'
import GalleryItem from './GalleryItem'


function Gallery () {
    const data = useContext(DataContext)

    const display = data?.map((song, i) => <GalleryItem song= 
        {song} key={i} />)

    return (
        <div>
            <h1>Gallery</h1>
            {display}
        </div>
    )
}

export default Gallery;