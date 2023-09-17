import { LocationInterface } from "@/shared/interfaces/locations";
import Image from 'next/image';
import PlanIcon from '@/public/lifesavers_plant.png';
import VelezGMap from '@/public/maps/velez_medical_arts-gmap.png';
import MapDirectionsLink from "./MapDirectionsLink";
import CopyButton from "../utilities/CopyButton";

const defaultMapLocation = encodeURIComponent('Mom & Me Clinic - Room 611');

export default async function Locations() {
  const locations = await getLocations();

  if (!locations) return <div>No locations fetched.</div>

  return (
    <div className='flex flex-col items-center md:flex-row md:justify-center md:space-x-8'>
      <div className='flex justify-around pb-4 space-x-8 md:space-y-8 md:flex-col md:place-content-start'>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-650 sm:text-4xl">Our Location</h1>
          <div className='indent-3 text-md font-light tracking-light text-gray-650 sm:text-lg'>
            Room 611
          </div>
          <div className='indent-3 text-md font-light tracking-light text-gray-650 sm:text-lg'>
            Velez Medical Arts Building
          </div>
          <div className='indent-3 text-md font-light tracking-light text-gray-650 sm:text-lg'>
            V. Ranudo st., Cebu City
          </div>
          <div className="indent-3 ">
            <CopyButton
              value="+63 916 560 9404"
            />
          </div>
        </div>
        <Image
          src={PlanIcon}
          alt='Plant'
          className='w-[75px] h-[100px] md:w-[100px] md:h-[150px] md:place-self-center'
        />
      </div>
      {/* <Locations />  */}
      {/* should be a picture with a link instead */}
      <MapDirectionsLink
        destination={locations[0]}
      >
        <Image
          src={VelezGMap}
          alt='google map'
          className="w-[300px] h-[300px] md:w-[370px] md:h-[370px] rounded-xl"
          sizes="(max-width:720px) 60vw, 30vw"
          placeholder="blur"
        />
      </MapDirectionsLink>
    </div>
  );
}

const getLocations = async(): Promise<LocationInterface[]> => {
  const res = await fetch(`${process.env.URL}/api/locations?name=${defaultMapLocation}`);

  if (!res.ok) {
    throw new Error("failed to fetch locations");
  }

  const data = await res.json() as LocationInterface[];
  return data;
}