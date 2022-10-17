import './App.css'
import reactLogo from './assets/react.svg'
import { useEffect, useState } from 'react';

import { Map, MapMarker } from "react-kakao-maps-sdk"

import { database } from '../firebase'
import { ref, onValue } from "firebase/database";

import ReactGA from 'react-ga';


function App() {
  const TRACKING_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_TRACKING_ID
  
  const [geoData, setGeoData] = useState([])
  const dbRef = ref(database, 'users/1');
  
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID)
    ReactGA.pageview(window.location.pathname);

    onValue(dbRef, (snapshot) => {
      const { latitude, longitude } = snapshot.val();
      setGeoData([latitude, longitude])
    });

    setInterval( async () => {
      onValue(dbRef, (snapshot) => {
        const { latitude, longitude } = snapshot.val();
        setGeoData([latitude, longitude])
      });
    }, 20000)
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
          <div style={{color:"#000", width:'152px', display:'flex', justifyContent:'center', marginTop:0, marginBottom: 0}}>요기</div>
        </MapMarker>
      </Map>
    )
  }

  return (
    <main className="App">
      <div>
        <h1>2호차는 어디..?</h1>
        
        <div className="card">
          <MapComponent />
          <p>
            🚀 20초마다 갱신됩니다
          </p>
        </div>
        <p className="read-the-docs">
          API 제한으로 인해 20초마다 갱신해서<br/>버스의 20초 전의 위치를 나타내요.<br/>3 ~ 5분 이상 버스가 안움직이면 버그일 확률도 있습니다.<br/>
        </p>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> 
      </div>
      <footer>
        <a href="mailto:dm10802@gmail.com">✉️ 개선할 점을 보내주세요</a>
      </footer>
    </main>
  )
}

export default App
