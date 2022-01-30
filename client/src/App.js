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

  const [currentplaceid, setCurrentplaceid] = useState(null);

  const [pins, setPins] = useState([]);
  const handleClick = (id) => {
    setCurrentplaceid(id);
  }

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
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
              <Room style={{ fontSize: 30, color: "blue" , cursor:"pointer" }}
                onClick={(id) => handleClick(pin._id)} />
            </Marker>
            {pin._id === currentplaceid && (
              <Popup
                latitude={pin.lat}
                longitude={pin.lon}
                closeButton={true}
                closeOnClick={false}
                onClose={()=>setCurrentplaceid(null)}
                anchor="top" >
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Applicant Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">username</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{pin.username}</dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Place</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{pin.title}</dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{pin.description}</dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Rating</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{pin.rating}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </Popup>
            )}
          </>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
