import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_TOKEN;

const MapRoutes = ({ setwaypointlist, removeWaypointIndex }) => {
  const mapContainerRef = useRef(null);
  const [waypoints, setWaypoints] = useState([]);
  const mapRef = useRef(null);
  const markersRef = useRef(new Map());

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [122.97418954848911, 10.799033752975717],
      zoom: 12.5,
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.on('click', async (e) => {
      const newWaypoint = { lng: e.lngLat.lng, lat: e.lngLat.lat };
      const marker = new mapboxgl.Marker()
        .setLngLat([newWaypoint.lng, newWaypoint.lat])
        .addTo(map);

      markersRef.current.set(newWaypoint, marker);

      await logLocationName(newWaypoint);

      setWaypoints((prevWaypoints) => {
        const updatedWaypoints = [...prevWaypoints, newWaypoint];

        if (updatedWaypoints.length >= 2) {
          fetchRoute(updatedWaypoints);
        }

        return updatedWaypoints;
      });
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (removeWaypointIndex !== null) {
      removeMarker(removeWaypointIndex);
    }
  }, [removeWaypointIndex]);

  const fetchRoute = async (waypoints) => {
    if (waypoints.length < 2) return;
    const coordinates = waypoints.map((w) => `${w.lng},${w.lat}`).join(';');
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
    if (mapRef.current.getSource('route')) {
      mapRef.current.getSource('route').setData({ type: 'Feature', geometry: routeData });
    } else {
      mapRef.current.addSource('route', { type: 'geojson', data: { type: 'Feature', geometry: routeData } });
      mapRef.current.addLayer({
        id: 'route',
        source: 'route',
        type: 'line',
        paint: { 'line-width': 3, 'line-color': '#228B22' },
      });
    }
  };

  const logLocationName = async (waypoint) => {
    const reverseGeocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${waypoint.lng},${waypoint.lat}.json?access_token=${mapboxgl.accessToken}`;

    try {
      const response = await axios.get(reverseGeocodeUrl);
      const placeName = response.data.features[0]?.place_name || 'Unknown location';

      setwaypointlist((prevWaypointList) => [
        ...prevWaypointList,
        { placename: placeName, coordinates: [waypoint.lng, waypoint.lat] },
      ]);
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
  };

  const removeMarker = (index) => {
    const waypointToRemove = waypoints[index];
    const marker = markersRef.current.get(waypointToRemove);

    if (marker) {
      marker.remove();
      markersRef.current.delete(waypointToRemove);
    } else {
      console.warn('Marker not found for waypoint:', waypointToRemove);
    }

    const updatedWaypoints = waypoints.filter((_, i) => i !== index);
    setWaypoints(updatedWaypoints);

    setwaypointlist((prevWaypointList) => prevWaypointList.filter((_, i) => i !== index));

    if (updatedWaypoints.length >= 2) {
      fetchRoute(updatedWaypoints);
    } else {
      clearRoute();
    }
  };

  const clearRoute = () => {
    if (mapRef.current.getSource('route')) {
      mapRef.current.removeLayer('route');
      mapRef.current.removeSource('route');
    }
  };

  return <div className="w-full h-[50vh]" ref={mapContainerRef}></div>;
};

export default MapRoutes;
