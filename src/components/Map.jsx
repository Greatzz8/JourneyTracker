import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import Button from "../components/Button";
import { useCity } from "../contexts/CityContext";
import { useState } from "react";
import { useEffect } from "react";
import { useGeolocation } from "../hooks/useGeoLocation";
export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [position, setPosition] = useState([40, 0]);
  const { cities } = useCity();
  const geoLocation = useGeolocation();
  const geoPosition = geoLocation.position;
  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);
  useEffect(() => {
    if (geoPosition.lat && geoPosition.lng) {
      console.log(geoPosition);
      setPosition([geoPosition.lat, geoPosition.lng]);
    }
  }, [geoPosition]);
  return (
    <div className={styles.mapContainer}>
      <button
        onClick={geoLocation.getPosition}
        className={`${styles.btn} ${styles.position}`}
      >
        Use Your Position
      </button>
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city._id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  let map = useMap();

  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      let lngInRange = e.latlng.lng;
      if (e.latlng.lng > 180) {
        lngInRange =
          e.latlng.lng +
          180 -
          Math.floor((e.latlng.lng + 180) / 360) * 360 -
          180;
      }
      if (e.latlng.lng < -180) {
        lngInRange =
          e.latlng.lng -
          180 +
          360 * Math.floor((-e.latlng.lng + 180) / 360) +
          180;
      }
      navigate(`form?lat=${e.latlng.lat}&lng=${lngInRange}`);
    },
  });
}
