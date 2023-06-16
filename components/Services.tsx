//https://dribbble.com/shots/14163991-List-of-Services-UI-dashboard
//In the services screen, list the services in a card list.
//in the card list, have a book appointment button that when clicked, 
//will redirect to the booking form section with the appropriate fields populated.
// each service could have a schedule, and once schedule and service is selected,
//we can filter out the doctors that are available for that service & schedule.
'use client'
import path from "path";
import useSWR from 'swr';

//we should retrieve services through a call.
//add search feature by name
//filter feature by tag
//useSWR allows the use of SWR inside function components

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function Services() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR('/api/services', fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file

  console.log(data);
  return (
    <>
    </>
  )
}