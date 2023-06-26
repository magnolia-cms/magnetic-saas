import React from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

function Map(props) {
  const { lat, lng, infoWindow, zoom } = props;
  const center = { lat: +lat, lng: +lng };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCResFDqMxHKIIbKLMNCbMKiD5lkADAhGQ',
  });

  return isLoaded ? (
    <GoogleMap
      className='map'
      mapContainerStyle={{
        width: '100%',
        height: '50vh',
      }}
      center={center}
      zoom={+zoom || 10}
    >
      <InfoWindow position={center}>
        <div dangerouslySetInnerHTML={{ __html: infoWindow }} />
      </InfoWindow>
    </GoogleMap>
  ) : null;
}

export default React.memo(Map);
