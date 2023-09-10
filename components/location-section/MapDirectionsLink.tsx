import { LocationInterface } from "@/shared/interfaces/locations";
import { ReactNode } from "react";

interface MapDirectionsLinkProps {
  destination: LocationInterface | undefined;
  children: ReactNode;
}

export default function MapDirectionsLink({destination, children}: MapDirectionsLinkProps) {
  const encodedAddress = encodeURIComponent(destination?.address ?? '');
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  
  return (
    <>
      {destination &&
        <a 
          href={googleMapsUrl} 
          target="_blank">
          {children}
        </a>
      }
    </>
  );
}