import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '400px'
};

const center = {
  lat: 0,
  lng: 0
};

const refs = {};

function MyComponents({setAddress, address}) {
  const [marker, setMarker] = useState(center);
  const [libraries] = useState(['places']);
  // const [address, setAddress] = useState('');

  const handleCoordsChange = (e) => {
    console.log('event', e);
    const coords = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      }
      setMarker(coords);
  }

 const onLoad = (ref) => refs.searchBox = ref

 const onPlacesChanged = () => {
  const place = refs.searchBox.getPlaces();
  const coords = {
    lat: place[0].geometry.location.lat(),
    lng: place[0].geometry.location.lng(),
  }
  setMarker(coords);
  setAddress(place[0].formatted_address);

 }


  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCGsyrM6XN6-rpZ26F7ZyXrmkzGeInQaEk"
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={marker}
        zoom={10}
        onClick={handleCoordsChange}
        onLoad={onLoad}
      >
          <Marker
          position={marker}
          draggable
          onDragEnd={handleCoordsChange}
        />
        <StandaloneSearchBox
          onLoad={onLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
            value={address}
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px"
            }}
          />
        </StandaloneSearchBox>
      </GoogleMap>
    </LoadScript>
  )
}

export default MyComponents;