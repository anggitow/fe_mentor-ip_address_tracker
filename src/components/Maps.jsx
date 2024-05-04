import { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import iconLocation from '@assets/icon-location.svg';

const Maps = ({ position }) => {
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const calculateZoomLevel = () => {
    // Check if the map object is available
    if (map) {
      // Empirical method to determine zoom level based on latitude
      return 19 - Math.log2(1 / Math.tan(((map.getZoom() || 0) / 2) * (Math.PI / 180)));
    }
    // Default zoom level if the map is not yet loaded
    return 8;
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '700px' }}
      center={position}
      zoom={calculateZoomLevel()}
      onLoad={(map) => setMap(map)}
    >
      <Marker position={position} icon={iconLocation} />
    </GoogleMap>
  ) : null;
};

export default Maps;
