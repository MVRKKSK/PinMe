import React , { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import './App.css';

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <ReactMapGL
      {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle = "mapbox://styles/mvrkksk/ckyydrcgk002m14ntksl7qknt"
    />
  );
}

export default App;
