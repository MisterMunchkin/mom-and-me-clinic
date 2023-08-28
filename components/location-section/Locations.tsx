import { LocationInterface } from "@/interfaces/locations";
import Map from "@/components/location-section/Map";

export default async function Locations() {
  const locations = await getLocations();

  if (!locations) return <div>No locations fetched.</div>

  return (
    <Map 
      locations={locations}
    />
  );
}

const getLocations = async(): Promise<LocationInterface[]> => {
  const res = await fetch(`${process.env.URL}/api/locations`);

  if (!res.ok) {
    throw new Error("failed to fetch locations");
  }

  const data = await res.json() as LocationInterface[];
  return data;
}