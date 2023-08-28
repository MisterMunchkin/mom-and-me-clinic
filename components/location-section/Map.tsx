'use client'

import { LocationInterface } from "@/interfaces/locations";
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import MapDirectionsLink from "./MapDirectionsLink";
import LoadingMap from "../loading/loading-map";

interface MapProps {
  locations: LocationInterface[];
}

// Velez medical arts center
const center = {
  lat: 10.308838976790662,
  lng: 123.89214388108886
}

const containerStyle = {
  height: '500px',
  width: '100%'
}

export default function Map({ locations }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY ?? ''
  });
  const [selectedPlace, setSelectedPlace] = useState<LocationInterface | undefined>(undefined);
  
  if (!isLoaded) return <LoadingMap />

  return (
    <>
      {isLoaded &&
        <div className="w-screen h-full sm:w-[500px] md:w-[600px] lg:w-[1000px] md:px-6 md:pb-6">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
          >
            {locations.map((location) => (
              <MarkerF 
                key={`${location.address}-${location.name}-${location.lat}-${location.long}`}
                position={{lat: location.lat, lng: location.long}}
                onClick={() => {
                  location === selectedPlace
                  ? setSelectedPlace(undefined)
                  : setSelectedPlace(location)
                }}
              />
            ))}
            {selectedPlace &&
              <InfoWindowF
                position={{
                  lat: selectedPlace.lat,
                  lng: selectedPlace.long
                }}
                zIndex={1}
                options={{
                  pixelOffset: new google.maps.Size(0, -40)
                }}
                onCloseClick={() => setSelectedPlace(undefined)}
              >
                <div>
                  <h3 className="mb-1.5 font-semibold">{selectedPlace.name}</h3>
                  <MapDirectionsLink destination={selectedPlace} />
                </div>
              </InfoWindowF>
            }
          </GoogleMap>
        </div>
      }
    </>
  );
}