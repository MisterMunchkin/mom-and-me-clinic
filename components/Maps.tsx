'use client'

import { LocationInterface } from "@/interfaces/locations";
import useSWR from "swr";
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useState } from "react";
import MapDirectionsLink from "./MapDirectionsLink";

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

//10.308838976790662, 123.89214388108886
const center = {
  lat: 10.308838976790662,
  lng: 123.89214388108886
}

const containerStyle = {
  height: '500px',
  width: '100%'
}

// Velez medical arts center: 10.307526405862564, 123.8973729327618
export default function Maps() {
  const { data, error, isLoading } = useSWR<LocationInterface[], any>('/api/locations', fetcher);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY ?? ''
  });

  const [map, setMap] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState<LocationInterface | undefined>(undefined);
  console.log(data);
  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (isLoading) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  if (!data) return null

  return (
    // Important! Always set the container height explicitly
    <>
      {isLoaded &&
        <div className="w-[300px] sm:w-[500px] md:w-[600px] lg:w-[1000px]">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
          >
            {data.map((location) => (
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
                  pixelOffset: {
                    width: 0,
                    height: -40
                  }
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