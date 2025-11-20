import Head from 'next/head';
import DreamPalacesMap from '../components/DreamPalacesMap';

export default function DreamPalacesPage() {
  const handleMapLoad = () => {
    console.log('Dream Palaces Map loaded successfully!');
  };

  const handleMapError = (error) => {
    console.error('Error loading Dream Palaces Map:', error);
  };

  return (
    <>
      <Head>
        <title>Dream Palaces Interactive Map</title>
        <meta name="description" content="Explore Dream Palaces around the world with our interactive mapping project" />
      </Head>
      
      <div style={{ padding: '20px' }}>
        <header style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h1>🏰 Dream Palaces Mapping Project</h1>
          <p>Discover and explore dream palaces from around the world</p>
        </header>

        <main>
          <DreamPalacesMap
            width="100%"
            height="80vh"
            serverUrl="http://localhost:3001"
            onLoad={handleMapLoad}
            onError={handleMapError}
            className="main-map"
          />
        </main>

        <footer style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
          <p>Interactive mapping powered by Leaflet.js and custom projections</p>
        </footer>
      </div>
    </>
  );
}

// Optional: Add server-side props if needed
export async function getServerSideProps() {
  // You can add server-side configuration here
  return {
    props: {
      // serverUrl: process.env.DREAM_PALACES_SERVER_URL || 'http://localhost:3001'
    }
  };
}