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

  const currentusername = "john";

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [rating, setRating] = useState(0);

  const [currentplaceid, setCurrentplaceid] = useState(null);
  const [markerplace, setMarkerplace] = useState(null);

  const [pins, setPins] = useState([]);
  const handleClick = (id, lat, lon) => {
    setCurrentplaceid(id);
    setViewport({ ...viewport, latitude: lat, longitude: lon })

  }

  const handleonSubmit = async (e) => {
    e.preventDefault();
    const Addpin = {
      username:currentusername,
      title,
      description,
      rating,
      lat:markerplace.lat,
      lon:markerplace.long
    }
    try{
      const res = await axios.post("/pins" , Addpin);
      setPins([...pins , res.data])
      setMarkerplace(null)
    }
    catch(err){
      console.log(err)
    }
  }
  const handleDoubleclick = (e) => {
    const [long, lat] = e.lngLat;
    setMarkerplace({
      lat,
      long
    })
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
        onDblClick={handleDoubleclick}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mvrkksk/ckyydrcgk002m14ntksl7qknt">
        {pins.map((pin) => (
          <>
            <Marker latitude={pin.lat} longitude={pin.lon} offsetLeft={-20} offsetTop={-10}>
              <Room style={{ fontSize: 30, color: "blue", cursor: "pointer" }}
                onClick={(id) => handleClick(pin._id, pin.lat, pin.lon)} />
            </Marker>
            {pin._id === currentplaceid && (
              <Popup
                latitude={pin.lat}
                longitude={pin.lon}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentplaceid(null)}
                anchor="top" >
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Applicant Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Author</dt>
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
        {markerplace && (
          <Popup
            latitude={markerplace.lat}
            longitude={markerplace.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setMarkerplace(null)}
            anchor="top" >
            <form onSubmit={handleonSubmit}>
              <div class="mb-6">
                <label for="place" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Place</label>
                <input onChange={(e)=>{setTitle(e.target.value)}} type="text" id="place" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>
              <div class="mb-6">
                <label for="descripition" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                <input onChange={(e)=>{setDescription(e.target.value)}} type="text" id="description" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>
              <select onChange={(e)=>{setRating(e.target.value)}} class=" mb-6 form-select form-select-sm
    appearance-none
    block
    w-full
    px-2
    py-1
    text-sm
    font-normal
    text-gray-700
    bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-sm example">
                <option selected>Give your Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add your place</button>
            </form>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
