import { LocationInterface } from "@/interfaces/locations";

interface MapDirectionsLinkProps {
  destination: LocationInterface | undefined
}

export default function MapDirectionsLink({destination}: MapDirectionsLinkProps) {
  const encodedAddress = encodeURIComponent(destination?.address ?? '');
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  
  return (
    <>
      {destination &&
        <a 
          href={googleMapsUrl} 
          target="_blank"
          className="text-primary decoration-primary underline md:no-underline hover:underline">
          Directions on Google Maps
        </a>
      }
    </>
  );
}