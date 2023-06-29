'use client'

import Image from "next/image";
import TextHighlight from "../utilities/TextHighlight";
import Link from "next/link";
import useSWR from 'swr';
import { DoctorClass } from "@/classes/doctor";
import ClinicSchedules from "./ClinicSchedules";

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function Doctors() {
  const {data, error, isLoading} = useSWR<DoctorClass[], any>('/api/doctors', fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (isLoading) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  if (!data) return null

  const imageWidth = 300;
  const imageHeight = 600;

  return (
    <>
      <div className="flex flex-col space-x-0 space-y-12 md:flex-row md:space-x-12 md:space-y-0">
        {data.map((doctor: DoctorClass) => (
          <div 
            key={doctor.name}
            className="block">
            <Image
              alt="Art"
              src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="h-96 w-full object-cover"
              width={imageWidth}
              height={imageHeight}
            />

            <h3 className="mt-4 text-lg font-bold text-gray-100 sm:text-xl">
              <TextHighlight bgColor="bg-primary">{doctor.name}</TextHighlight>
            </h3>

            <ClinicSchedules 
              clinicSchedules={doctor.clinicSchedules}
            />
            {/* add set appointment link that auto populates form. add clinic schedule. */}
            <Link
              href={{
                pathname: `/appointment`,
                query: {
                  backNav: `#doctors`
                }
              }} 
              className="block rounded-md bg-primary text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                Request Appointment
            </Link>
          </div>
        ))}
        {/* <Link 
          href={{
            pathname: `/appointment`,
            query: {
              backNav: `#doctors`
            }
          }} 
          className="block">
          <Image
            alt="Art"
            src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="h-96 w-full object-cover"
            width={imageWidth}
            height={imageHeight}
          />

          <h3 className="mt-4 text-lg font-bold text-gray-100 sm:text-xl">
            <TextHighlight bgColor="bg-primary">Dr. Kim Espiritu-Veloso, DPOGS</TextHighlight>
          </h3>

          <p className="mt-2 max-w-sm text-gray-700">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni reiciendis
            sequi ipsam incidunt.
          </p>
        </Link> */}
      </div>
    </>
  );
}