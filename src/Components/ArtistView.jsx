// Added for with_router
// These components will be making separate API calls from the app
// component to serve specific data from our artist
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ArtistView() {
    const { id } = useParams();
    const [artistData, setArtistData] = useState(null);

    useEffect(() => {
        // Make the API call to fetch artist data based on the 'id' parameter
        fetch(`API_URL/artists/${id}`)
            .then(response => response.json())
            .then(data => setArtistData(data))
            .catch(error => {
                console.error('Error fetching artist data:', error);
                setArtistData(null);
            });
    }, [id]);

    return (
        <div>
            <h2>The id passed was: {id}</h2>
            {artistData ? (
                <div>
                    <h3>Artist Name: {artistData.name}</h3>
                    <p>Genre: {artistData.genre}</p>
                    {/* Display other artist data */}
                </div>
            ) : (
                <p>Loading artist data...</p>
            )}
        </div>
    );
}

export default ArtistView;
