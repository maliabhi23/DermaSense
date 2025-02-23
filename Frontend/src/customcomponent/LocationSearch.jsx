import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const LocationSearch = ({ onSelectLocation }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const geocoderContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_AccessToken;

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [77.1025, 28.7041], // Default: Delhi [lng, lat]
        zoom: 10,
      });
    }

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
    });

    geocoder.on("result", (e) => {
      onSelectLocation(e.result);
    });

    if (geocoderContainer.current) {
      geocoderContainer.current.appendChild(geocoder.onAdd(map.current));
    }

    return () => {
      map.current.remove();
    };
  }, []);

  return (
    <div style={{width:'100%'}}>
      <div ref={geocoderContainer} style={{ marginBottom: "10px"}} />
      <div ref={mapContainer} style={{ width: "100%", height: "300px" }} />
    </div>
  );
};

export default LocationSearch;
