import { LocationInterface } from "@/shared/interfaces/locations";
import Image from 'next/image';
import PlanIcon from '@/public/lifesavers_plant.png';
import VelezGMap from '@/public/maps/velez_medical_arts-gmap.png';
import MapDirectionsLink from "./MapDirectionsLink";
import CopyButton from "../utilities/CopyButton";
import fetch from 'node-fetch';

const defaultMapLocation = encodeURIComponent('Mom & Me Clinic - Room 611');

export default async function Locations() {
  const locations = await getLocations();

  if (!locations) return <div>No locations fetched.</div>

  return (
    <>
      <div className="mx-auto pb-4 pl-6 md:pb-6 md:px-24">
        <div className="text-left">
          <h1 className="text-xl font-bold tracking-tight text-gray-650 sm:text-4xl">Our Location</h1>
        </div>
      </div>
      <div className='flex flex-col items-center md:flex-row md:justify-center md:space-x-8'>
        <div className='flex justify-around items-end pb-4 md:pb-0 space-x-8 md:space-y-8 md:flex-col md:place-content-start'>
          <div>
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
            className='md:place-self-center'
            width={85}
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
    </>
  );
}

const getLocations = async(): Promise<LocationInterface[]> => {
  try {
    const res = await fetch(`${process.env.URL}/api/locations?name=${defaultMapLocation}`);

    if (!res.ok) {
      throw new Error("failed to fetch locations");
    }

    const data = await res.json() as LocationInterface[];
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}