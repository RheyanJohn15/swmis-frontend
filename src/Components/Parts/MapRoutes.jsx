import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios'; // We'll use axios to fetch directions

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_TOKEN;

const MapRoutes = ({setwaypointlist}) => {
  const mapContainerRef = useRef(null);
  const [waypoints, setWaypoints] = useState([]);
  const mapRef = useRef(null); // Reference to the map instance

  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [122.97418954848911, 10.799033752975717], // Default location
      zoom: 12.5,
    });

    mapRef.current = map;

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // Event listener for map clicks
    map.on('click', async (e) => {
      const newWaypoint = {
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
      };

      // Add marker to map at clicked location
      new mapboxgl.Marker()
        .setLngLat([newWaypoint.lng, newWaypoint.lat])
        .addTo(map);

      // Log the coordinates and name of the location
      await logLocationName(newWaypoint);

      // Add the new waypoint to the list
      setWaypoints((prevWaypoints) => {
        const updatedWaypoints = [...prevWaypoints, newWaypoint];

        // Update the route with the new set of waypoints
        if (updatedWaypoints.length >= 2) {
          fetchRoute(updatedWaypoints);
        }

        return updatedWaypoints;
      });
    });

    // Clean up map when component unmounts
    return () => map.remove();
  }, []);

  const fetchRoute = async (waypoints) => {
    const coordinates = waypoints.map((waypoint) => `${waypoint.lng},${waypoint.lat}`).join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await axios.get(url);
      const routeData = response.data.routes[0].geometry;

      drawRoute(routeData);
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const drawRoute = (routeData) => {
    // If the source already exists, update the data, otherwise create a new source and layer
    if (mapRef.current.getSource('route')) {
      mapRef.current.getSource('route').setData({
        type: 'Feature',
        geometry: routeData,
      });
    } else {
      mapRef.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: routeData,
        },
      });

      mapRef.current.addLayer({
        id: 'route',
        source: 'route',
        type: 'line',
        paint: {
          'line-width': 3,
          'line-color': '#228B22',
        },
      });
    }
  };

  // Function to log the name of the location and coordinates
  const logLocationName = async (waypoint) => {
    const reverseGeocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${waypoint.lng},${waypoint.lat}.json?access_token=${mapboxgl.accessToken}`;

    try {
      const response = await axios.get(reverseGeocodeUrl);
      const placeName = response.data.features[0]?.place_name || 'Unknown location';

      setwaypointlist((prevWaypointList) => [...prevWaypointList, {
        placename: placeName,
        coordinates: [waypoint.lng, waypoint.lat]
      }]);
      
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
  };

  return (
    <div className="w-full h-[50vh]" ref={mapContainerRef}></div>
  );
};

export default MapRoutes;
