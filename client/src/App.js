import React, { useState } from 'react';
import ReactMapGL, { Marker , Popup } from 'react-map-gl';
import './App.css';
import {Room} from '@material-ui/icons'

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <div>
      <ReactMapGL {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mvrkksk/ckyydrcgk002m14ntksl7qknt">


        <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
        <Room style = {{fontSize: 30 , color:"blue"}} />
        
        </Marker>
        <Popup
          latitude={37.78}
          longitude={-122.41}
          closeButton={true}
          closeOnClick={false}
          anchor="top" >
          <div className = "popup_main">
            <p className='username-popup'>User:<span className='username-popup'>Kautilya</span></p>
            <p className='username-popup'>Title:<span className='username-popup'>Kautilya</span></p>
            <p className='username-popup'>Description:<span className='username-popup'>Kautilya</span></p>
            <p className='username-popup'>Rating:<span className='username-popup'>Kautilya</span></p>
            
          </div>
        </Popup>
         

      </ReactMapGL>
    </div>
  );
}

export default App;
