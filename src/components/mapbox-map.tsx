import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set the Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiNDIwYnRjIiwiYSI6ImNtOTN3ejBhdzByNjgycHF6dnVmeHl2ZTUifQ.Utq_q5wN6DHwpkn6rcpZdw';

interface MapboxMapProps {
  location: string;
  className?: string;
}

// Function to geocode location string to coordinates
const geocodeLocation = async (location: string): Promise<[number, number] | null> => {
  try {
    // Clean and prepare the location string for better geocoding
    const cleanLocation = location.trim();
    
    // Use Mapbox Geocoding API with improved parameters
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(cleanLocation)}.json?access_token=${mapboxgl.accessToken}&limit=5&types=country,region,place,locality,neighborhood`
    );
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      // Look for the best match by checking if all words in the location are present
      const locationWords = cleanLocation.toLowerCase().split(/[,\s]+/).filter(word => word.length > 0);
      
      for (const feature of data.features) {
        const featureName = feature.place_name.toLowerCase();
        const featureContext = feature.context ? feature.context.map((c: any) => c.text.toLowerCase()).join(' ') : '';
        const fullFeatureText = `${featureName} ${featureContext}`;
        
        // Check if most of the location words are present in the feature
        const matchingWords = locationWords.filter(word => 
          fullFeatureText.includes(word) || 
          featureName.includes(word)
        );
        
        // If at least 70% of words match, consider it a good result
        if (matchingWords.length >= Math.ceil(locationWords.length * 0.7)) {
          const coordinates = feature.center;
          return [coordinates[0], coordinates[1]]; // [longitude, latitude]
        }
      }
      
      // If no good match found, try with the first result but prioritize places over streets
      const prioritizedFeature = data.features.find((feature: any) => 
        feature.place_type.includes('place') || 
        feature.place_type.includes('locality') ||
        feature.place_type.includes('region') ||
        feature.place_type.includes('country')
      ) || data.features[0];
      
      const coordinates = prioritizedFeature.center;
      return [coordinates[0], coordinates[1]]; // [longitude, latitude]
    }
    
    return null;
  } catch (error) {
    console.error('Error geocoding location:', error);
    return null;
  }
};

export const MapboxMap: React.FC<MapboxMapProps> = ({ location, className = '' }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [0, 0], // Default center
      zoom: 2
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Geocode the location and add marker
    const setupMap = async () => {
      const coordinates = await geocodeLocation(location);
      
      if (coordinates && map.current) {
        // Fly to the location with animation
        map.current.flyTo({
          center: coordinates,
          zoom: 12,
          duration: 2000, // 2 seconds animation
          essential: true
        });
        
        // Add marker
        marker.current = new mapboxgl.Marker({
          color: '#3B82F6' // Blue color
        })
          .setLngLat(coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<div class="p-2"><strong>${location}</strong></div>`)
          )
          .addTo(map.current);
      }
    };

    setupMap();

    // Cleanup function
    return () => {
      if (marker.current) {
        marker.current.remove();
      }
      if (map.current) {
        map.current.remove();
      }
    };
  }, [location]);

  return (
    <div 
      ref={mapContainer} 
      className={`w-full h-64 rounded-lg ${className}`}
      style={{ minHeight: '256px' }}
    />
  );
};