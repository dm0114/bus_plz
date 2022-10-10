import './App.css'
import reactLogo from './assets/react.svg'
import { useEffect, useState } from 'react';

import { Map, MapMarker } from "react-kakao-maps-sdk"

import { database } from '../firebase'
import { ref, onValue } from "firebase/database";

function App() {
  const [geoData, setGeoData] = useState([])
  const dbRef = ref(database, 'users/1');

  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      const { latitude, longitude } = snapshot.val();
      setGeoData([latitude, longitude])
      console.log(latitude, longitude);
    });

    setInterval( async () => {
      onValue(dbRef, (snapshot) => {
        const { latitude, longitude } = snapshot.val();
        setGeoData([latitude, longitude])
        console.log(latitude, longitude);
      });
    }, 60000)
  }, [])

  useEffect(() => {
  }, [geoData])


  const MapComponent = () => {
    return (
      <Map
      center={{ lat: geoData[0], lng: geoData[1] }}
      style={{ width: "100%", height: "360px" }}
      >
        <MapMarker position={{ lat: geoData[0], lng: geoData[1] }}>
          <div style={{color:"#000"}}>Hello World!</div>
        </MapMarker>
      </Map>
    )
  }

  return (
    <main className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> 
      </div>
      <h1>Taxi or Bus</h1>
      
      <div className="card">
        <MapComponent />
        <p>
          오차 범위가 발생할 수 있어요ㅎㅎ
        </p>
      </div>
      <p className="read-the-docs">
        🚀 1분마다 갱신됩니다?
      </p>
      <footer>
        <a href="mailto:dm10802@gmail.com">✉️ 개선할 점을 보내주세요</a>
      </footer>
    </main>
  )
}

export default App
