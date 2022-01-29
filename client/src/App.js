import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import axios from "axios"
import './App.css';
import { Room } from '@material-ui/icons'
function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  const [pins, setPins] = useState([]);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/post");
        setPins(res.data);
      }
      catch (err) {

      }
    }
    getPins();
  }, [])

  return (
    <div>
      <ReactMapGL {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mvrkksk/ckyydrcgk002m14ntksl7qknt">
        {pins.map((pin) => (
          <>
            <Marker latitude={pin.lat} longitude={pin.lon} offsetLeft={-20} offsetTop={-10}>
              <Room style={{ fontSize: 30, color: "blue" }} />
            </Marker>
            <Popup
              latitude={pin.lat}
              longitude={pin.lon}
              closeButton={true}
              closeOnClick={false}
              anchor="top" >
              <div className="popup_main">
                <p className='username-popup'>User:<span className='username-popup'>{pin.username}</span></p>
                <p className='username-popup'>Place:<span className='username-popup'>{pin.title}</span></p>
                <p className='username-popup'>Description:<span className='username-popup'>{pin.description}</span></p>
                <p className='username-popup'>Rating:<span className='username-popup'>{pin.rating}</span></p>
              </div>
            </Popup>
          </>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
