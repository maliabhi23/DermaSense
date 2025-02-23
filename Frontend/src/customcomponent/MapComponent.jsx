import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Container } from "react-bootstrap";
import Aos from "aos";

mapboxgl.accessToken = import.meta.env.VITE_AccessToken;

const MapComponent = ({ hospitalData }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    Aos.init({
      duration: 500,
      delay: 200,
    });
  }, []);

  useEffect(() => {
    // Initialize map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [73.8567, 18.5204], // Default center: Pune
      zoom: 10,
    });

    // Add markers for hospitals
    if (hospitalData?.length > 0) {
      hospitalData.forEach((hospital) => {
        new mapboxgl.Marker()
          .setLngLat([hospital.lng, hospital.lat]) // [Longitude, Latitude]
          .setPopup(
            new mapboxgl.Popup().setHTML(`<h5>${hospital.name}</h5><p>${hospital.address}</p>`)
          ) // Popup on click
          .addTo(mapRef.current);
      });

      // Fit map to markers
      const bounds = new mapboxgl.LngLatBounds();
      hospitalData.forEach((hospital) => bounds.extend([hospital.lng, hospital.lat]));
      mapRef.current.fitBounds(bounds, { padding: 50 });
    }

    // Cleanup function
    return () => mapRef.current.remove();
  }, [hospitalData]);

  return (
    <Container fluid className="mt-5" data-aos="fade-up">
      <h2 className="text-center">Nearby Hospitals</h2>
      <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} className="rounded-5" />
    </Container>
  );
};

export default MapComponent;
